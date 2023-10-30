import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import NoteCard from "../../components/NoteCard/NoteCard";
import { Note } from "../../types/Note";
import "./Notebook.css";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from 'react-query';
import api from '../../services/api';
import React, { useState } from 'react';

export default function Notebook() {
  const [newNote, setNewNote] = useState({ title: '', description: '' });
  const queryClient = useQueryClient();

  const {
    data: notes,
    isFetching,
    isError,
  } = useQuery("notes", async () => {
    const response = await fetch("http://localhost:5000/notes");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return response.json();
  });

  const addNoteMutation = useMutation(async (newNoteData) => {
    const response = await api.post('notes', newNoteData);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to add a new note');
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes'); 
      setNewNote({ title: '', description: '' });
    },
  });

  const handleAddNote = () => {
    addNoteMutation.mutate(newNote);
  };

  const deleteTodo = useMutation({
    mutationFn: async (todo: { id: number }) => {
       const response =  await fetch(`http://localhost:5000/notes/${todo.id}`, { method: "DELETE" })
       if(!response.ok) { throw new Error("Erro ao remover") }
   },
   onSuccess: () => queryClient.invalidateQueries('notes')
})

const handleDeleteNote = (id: number) => {
  deleteTodo.mutate({ id })
};

  const handleEditNote = () => {
    // Lógica para edição aqui
  };

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <div>
      <h1>Bloco de notas</h1>
      <div className="notebook">
        

        {/* List of existing notes */}
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            description={note.description}
            handleDelete={() => handleDeleteNote(note.id)}
            handleEdit={handleEditNote}
          />
        ))}

        {/* Form to add a new note */}
        <div className="add-note-form" >
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
    </div>
  );
}
