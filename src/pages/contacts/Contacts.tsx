import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { Contact } from "../../types/Contact";
import "./Contacts.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from '../../services/api';
import React, { useState } from 'react';


export default function Contacts() {
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: ''});

  const {
    data: contacts,
    isFetching,
    isError,
  } = useQuery("contacts", async () => {
    const response = await fetch("http://localhost:5000/contacts");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return response.json();
  });

  const queryClient = useQueryClient();

  const addContactMutation = useMutation(async (newContactData) => {
    const response = await api.post('contacts', newContactData);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to add a new contact');
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts'); 
      setNewContact({ name: '', email: '', phone: ''});
    },
  });

  const handleAddContact = () => {
    if (newContact.name.trim() !== "" && newContact.email.trim() !== "" && newContact.phone.trim() !== "") {
    addContactMutation.mutate(newContact);
    } else {
      window.alert("⚠️ Insira um contato válida");
      return;
    }
  };

  const deleteContact = useMutation({
    mutationFn: async (contact: { id: number }) => {
       const response =  await fetch(`http://localhost:5000/contacts/${contact.id}`, { method: "DELETE" })
       if(!response.ok) { throw new Error("Erro ao remover") }
   },
   onSuccess: () => queryClient.invalidateQueries('contacts')
})

const handleDeleteContact = (id: number) => {
  deleteContact.mutate({ id })
};

const updateContactMutation = useMutation(
  async (contact: { id: number, name: string, email: string, phone: string}) => {
    const response = await api.put(`contacts/${contact.id}`, { name: contact.name, email: contact.email, phone: contact.phone});
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update the contact');
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts');
    },
  }
);

  const handleEditContact = () => {
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
      <h1>Contatos</h1>
      <div className="contacts">
        {contacts.map((contact: Contact) => (
          <ContactCard
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            handleDelete={() => handleDeleteContact(contact.id)}
            updateContactMutation={updateContactMutation}
          />
        ))}
        {/* Form to add a new contact */}
        <div className="card">
          <div>
            <h3 className="left-aligned">{'Nome'}</h3>
            <input
              type="text"
              placeholder="Nome"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
          </div>
          <div>
            <h3 className="left-aligned">{'Telefone'}</h3>
            <input
              type="text"
              placeholder="Telefone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
          </div>
          <div>
            <h3 className="left-aligned">{'E-mail'}</h3>
            <input
              type="text"
              placeholder="E-mail"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
          </div>
          <button onClick={handleAddContact}>Criar Contato</button>
        </div>
      </div>
    </div>
  );
}  