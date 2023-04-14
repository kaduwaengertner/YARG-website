import { useState } from "react";

const CommandAdd = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    command_EN: "",
    command_PTBR: "",
    category: "",
    description: "",
    status: "active",
    command_type: "simple",
    platform: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? (checked ? "advanced" : "simple") : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSaveClick = () => {
    onSave(formData);
    onClose && onClose();
  };

  return (
    <div>
      <h2>Add New Command</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
            required
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
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
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
            required
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
        <div>
          <label htmlFor="command_type">Command Type:</label>
          <input
            type="checkbox"
            id="command_type"
            name="command_type"
            checked={formData.command_type === "advanced"}
            onChange={handleInputChange}
          />
          <label htmlFor="command_type">Advanced</label>
        </div>
      </form>
      <div>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CommandAdd;