import "./NoteCard.css";

type NoteCardInput = {
  title: string;
  description: string;
  handleDelete: () => void;
  handleEdit: () => void;
};

export default function NoteCard({
  title,
  description,
  handleDelete,
  handleEdit,
}: NoteCardInput) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <button onClick={handleDelete}>Remover</button>
        <button onClick={handleEdit}>Editar</button>
      </div>
    </div>
  );
}
