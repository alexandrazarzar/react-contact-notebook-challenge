import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { Contact } from "../../types/Contact";
import "./Contacts.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from '../services/api';

export default function Contacts() {
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
            key={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            handleDelete={() => handleDeleteContact(contact.id)}
            handleEdit={handleEditContact}
          />
        ))}
      </div>
    </div>
  );
}
