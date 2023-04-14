import { useState } from 'react';

type MemberData = {
  ID: string;
  name: string;
  messages_twitch: number;
  role: string;
  bio: string;
};

type MemberInfoProps = {
  memberData: MemberData;
  onEdit: (data: MemberData) => void;
};

function MemberInfo({ memberData, onEdit }: MemberInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(memberData);

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(memberData);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(memberData);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${memberData.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        onEdit(formData);
        setIsEditing(false);
      } else {
        console.error('Failed to update member data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <p>Name: {memberData.name}</p>
      <p>Messages: {memberData.messages_twitch}</p>

      {isEditing ? (
        <div>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleInputChange}>
              {memberData.role === "Broadcaster" && <option value="Broadcaster">Broadcaster</option>}
              <option value="Moderator">Moderator</option>
              <option value="Subscriber">Subscriber</option>
              <option value="VIP">VIP</option>
              <option value="Viewer">Viewer</option>
            </select>
          </label>
          <label>
            Bio:
            <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
          </label>

          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Role: {memberData.role}</p>
          <p>Bio: {memberData.bio}</p>

          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}
  
  export default MemberInfo;