import "./NoteCard.css";
import React, { useState } from 'react';

type NoteCardInput = {
  id: number;
  title: string;
  description: string;
  handleDelete: () => void;
  updateNoteMutation: any;
};

export default function NoteCard({
  id,
  title: initialTitle,
  description: initialDescription,
  handleDelete,
  updateNoteMutation,
}: NoteCardInput) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    if (title.trim() !== "" && description.trim() !== ""){
    updateNoteMutation.mutate({ id, title, description });
    setIsEditing(false);
    } else {
      window.alert("⚠️ Insira uma nota válida");
        return;
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => setIsEditing(true)}>Editar</button>
          </div>
        </>
      )}
    </div>
  );
}
