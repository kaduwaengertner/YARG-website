import { useState } from "react";

const CommandEdit = ({ command, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    category: command.category,
    command_EN: command.command_EN,
    command_PTBR: command.command_PTBR,
    description: command.description,
    status: command.status,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div>
      <h2>Edit Command</h2>
      <form>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="command_EN">Command (EN):</label>
          <input
            type="text"
            id="command_EN"
            name="command_EN"
            value={formData.command_EN}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="command_PTBR">Command (PT-BR):</label>
          <input
            type="text"
            id="command_PTBR"
            name="command_PTBR"
            value={formData.command_PTBR}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </form>
      <div>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CommandEdit;
