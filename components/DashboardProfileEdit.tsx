import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const DashboardProfileEdit = ({ memberData }) => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setUser(memberData);
    setFormData(memberData);
  }, [memberData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox input
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setUser(data);
    setFormData(data);
  };

  const handleSubmitSocial = async (e) => {
    e.preventDefault();

    // Update formData object with social_visible property
    const socialVisible = e.target.social_visible.checked;
    const updatedFormData = { ...formData, social_visible: socialVisible };

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
    const data = await response.json();
    setUser(data);
    setFormData(data);
  };

  const handleSubmitSetup = async (e) => {
    e.preventDefault();

    // Update formData object with social_visible property
    const setupVisible = e.target.setup_visible.checked;
    const updatedFormData = { ...formData, setup_visible: setupVisible };

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setUser(data);
    setFormData(data);
  };

  if (!user.id) {
    return <Spinner animation="border" variant="warning" />;
  }

  return (
    <div>
      <h1>Edit your Profile</h1>
      <form onSubmit={handleSubmitProfile}>
        <label htmlFor="birthday">Birthday</label>
        <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} />

        <label htmlFor="color">Profile Main Color</label>
        <input type="color" name="color" value={formData.color} onChange={handleInputChange} />

        <label htmlFor="user_description">Bio:</label>
        <input type="text" name="user_description" maxlength="160" value={formData.user_description} onChange={handleInputChange} />

        <label htmlFor="user_status">Status:</label>
        <input type="text" name="user_status" maxlength="80" value={formData.user_status} onChange={handleInputChange} />

        <button type="submit">Save</button>
      </form>
      <h1>Social</h1>
      <form onSubmit={handleSubmitSocial}>
        <label>
          <input type="checkbox" name="social_visible" checked={formData.social_visible} onChange={handleInputChange} />
          Show my social media links
        </label>

        <label htmlFor="social_twitter">Twitter:</label>
        <input type="text" name="social_twitter" placeholder="username"  maxlength="24" value={formData.social_twitter} onChange={handleInputChange} />

        <label htmlFor="social_github">Github:</label>
        <input type="text" name="social_github" placeholder="username"  maxlength="24" value={formData.social_github} onChange={handleInputChange} />

        <label htmlFor="social_epic">Epic Games:</label>
        <input type="text" name="social_epic" placeholder="username" maxlength="24" value={formData.social_epic} onChange={handleInputChange} />

        <label htmlFor="social_psn">Playstation Network:</label>
        <input type="text" name="social_psn" placeholder="username" maxlength="24" value={formData.social_psn} onChange={handleInputChange} />

        <label htmlFor="social_steam">Steam:</label>
        <input type="text" name="social_steam" placeholder="username" maxlength="24" value={formData.social_steam} onChange={handleInputChange} />

        <label htmlFor="social_xbox">Xbox Live:</label>
        <input type="text" name="social_xbox" placeholder="username" maxlength="24" alue={formData.social_xbox} onChange={handleInputChange} />

        <button type="submit">Save</button>
      </form>
      <h1>Setup</h1>
      <form onSubmit={handleSubmitSetup}>
      <label>
          <input type="checkbox" name="setup_visible" checked={formData.setup_visible} onChange={handleInputChange} />
          Show my setup
        </label>

        <label htmlFor="setup_cooler">Cooler:</label>
        <input type="text" name="setup_cooler" placeholder="Cooler Name" maxlength="48" value={formData.setup_cooler} onChange={handleInputChange} />

        <label htmlFor="setup_cpu">CPU:</label>
        <input type="text" name="setup_cpu" placeholder="CPU Name" maxlength="48" value={formData.setup_cpu} onChange={handleInputChange} />

        <label htmlFor="setup_display">Display:</label>
        <input type="text" name="setup_display" placeholder="Display Name" maxlength="48" value={formData.setup_display} onChange={handleInputChange} />

        <label htmlFor="setup_gpu">GPU:</label>
        <input type="text" name="setup_gpu" placeholder="GPU Name" maxlength="48" value={formData.setup_gpu} onChange={handleInputChange} />

        <label htmlFor="setup_hdd">HDD:</label>
        <input type="text" name="setup_hdd" placeholder="HDD Name" maxlength="48" value={formData.setup_hdd} onChange={handleInputChange} />

        <label htmlFor="setup_keyboard">Keyboard:</label>
        <input type="text" name="setup_keyboard" placeholder="Kayboard Name" maxlength="48" value={formData.setup_keyboard} onChange={handleInputChange} />

        <label htmlFor="setup_motherboard">Motherboard:</label>
        <input type="text" name="setup_motherboard" placeholder="Motherboard Name" maxlength="48" value={formData.setup_motherboard} onChange={handleInputChange} />

        <label htmlFor="setup_mouse">Mouse:</label>
        <input type="text" name="setup_mouse" placeholder="Mouse Name" maxlength="48" value={formData.setup_mouse} onChange={handleInputChange} />

        <label htmlFor="setup_ram">RAM:</label>
        <input type="text" name="setup_ram" placeholder="RAM Name" maxlength="48" value={formData.setup_ram} onChange={handleInputChange} />

        <label htmlFor="setup_ssd">SSD:</label>
        <input type="text" name="setup_ssd" placeholder="SSD Name" maxlength="48" value={formData.setup_ssd} onChange={handleInputChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DashboardProfileEdit;
