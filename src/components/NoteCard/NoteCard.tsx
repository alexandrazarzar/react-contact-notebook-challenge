import "./NoteCard.css";
import React, { useState } from 'react';

type NoteCardInput = {
  title: string;
  description: string;
  isEditing: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
  handleSave: () => void;
};

export default function NoteCard({
  title,
  description,
  isEditing,
  handleDelete,
  handleEdit,
  handleSave,
}: NoteCardInput) {

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <button onClick={handleDelete}>Remover</button>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )
        }
      </div>
    </div>
  );
}
