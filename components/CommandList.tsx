import React from "react";
import CommandItem from "./CommandItem";

const CommandList = ({ commands, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Status</th>
          <th>Description</th>
          <th>EN</th>
          <th>PTBR</th>
        </tr>
      </thead>
      {commands ? (
        <tbody>
          {Object.keys(commands).map((key) => (
            <CommandItem key={key} name={key} command={commands[key]} onEdit={() => onEdit(key)} />
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan="3">No commands found</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default CommandList;
