import React from "react";

const CommandItem = ({ command, onEdit, onDelete }) => {
  const handleEditClick = () => {
    onEdit(command);
  };

  const handleDeleteClick = () => {
    onDelete(command);
  };

  return (
    <tr>
      <td>{command.name}</td>
      <td>{command.category}</td>
      <td>{command.status}</td>
      <td>{command.description}</td>
      <td>{command.command_EN}</td>
      <td>{command.command_PTBR}</td>
      <td>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
};

export default CommandItem;
