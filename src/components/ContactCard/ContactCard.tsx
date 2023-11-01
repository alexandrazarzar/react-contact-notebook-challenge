import PhoneIcon from "../../assets/icons/phone.png";
import EmailIcon from "../../assets/icons/e-mail.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";
import "./ContactCard.css";
import React, { useState } from 'react';

type ContactCardInput = {
  id: number;
  name: string;
  email: string;
  phone: string;
  handleDelete: () => void;
  handleEdit: () => void;
  updateContactMutation: any;
};

export default function ContactCard({
  id,
  name: initialName,
  email: initialEmail,
  phone: initialPhone,
  handleDelete,
  handleEdit,
  updateContactMutation,
}: ContactCardInput) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const handleSave = () => {
    if (name.trim() !== "" && email.trim() !== "" && phone.trim() !== "") {
    updateContactMutation.mutate({ id, name, email, phone });
    setIsEditing(false);
    } else {
      window.alert("⚠️ Insira um contato válido");
        return;
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <img className="card-image" src={AvatarPlaceholder} alt="avatar" />
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <img className="card-image" src={AvatarPlaceholder} alt="avatar" />
          <h3>{name}</h3>
          <div className="card-contact-info">
            <img height="20px" src={PhoneIcon} alt="phone icon" />
            <p>{phone}</p>
          </div>
          <div className="card-contact-info">
            <img height="20px" src={EmailIcon} alt="e-mail icon" />
            <p>{email}</p>
          </div>
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => setIsEditing(true)}>Editar</button>
          </div>
        </>
      )}
    </div>
  );
}