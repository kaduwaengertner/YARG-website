import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardSettings = () => {
  const [formValues, setFormValues] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [memberKey, setMemberKey] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [overwrite, setOverwrite] = useState(false);
  const [updatingMembers, setUpdatingMembers] = useState(false);
  const [updateError, setUpdateError] = useState('');
  
  const handleUpdateMembers = async () => {
    setUpdatingMembers(true);
    setUpdateError('');
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`);
      const membersObj = await response.json();
  
      // Convert the object to an array
      const members = Object.keys(membersObj).map((key) => ({
        id: key,
        ...membersObj[key],
      }));
  
      // Update the key-value pair for all members
      const updates = {};
      members.forEach((member) => {
        // Only add/update the value if the key doesn't already exist, or if the overwrite checkbox is checked
        if (!member[memberKey] || overwrite) {
          updates[`/members/${member.id}/${memberKey}`] = memberValue;
        }
      });
  
      if (Object.keys(updates).length > 0) {
        await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
  
        toast.success(`Added/updated key "${memberKey}" with value "${memberValue}" to ${Object.keys(updates).length} members.`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.info(`No members require adding/updating key "${memberKey}".`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error(error);
      setUpdateError('Failed to update members');
    }
  
    setUpdatingMembers(false);
  };
  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`);
      const settings = await response.json();
      setFormValues(settings);
      setOriginalValues(settings);
    };

    fetchSettings();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const changedValues = Object.keys(formValues).reduce((acc, key) => {
      if (formValues[key] !== originalValues[key]) {
        acc[key] = formValues[key];
      }
      return acc;
    }, {});
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedValues),
    });
    
    if (response.ok) {
      // handle success
      toast.success('Setting updated successfully', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      const updatedSettings = await response.json();
      setFormValues(updatedSettings);
      setOriginalValues(updatedSettings);
    } else {
      // handle error
      toast.error('Failed to update settings', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    setSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUpdateSeasonExperience = async () => {
    if (window.confirm('Are you sure you want to update all members\' season_experience to 0?')) {
      setUpdatingMembers(true);
      setUpdateError('');
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`);
        const membersObj = await response.json();
  
        // Convert the object to an array
        const members = Object.keys(membersObj).map((key) => ({
          id: key,
          ...membersObj[key],
        }));
  
        // Check if the `season_experience` field exists in the first member object
        const fieldExists = members.length > 0 && Object.prototype.hasOwnProperty.call(members[0], 'season_experience');
  
        // If the field doesn't exist, create it with a value of 0
        if (!fieldExists) {
          await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ season_experience: 0 }),
          });
        }
  
        // Update the `season_experience` field for all members
        const updatedMembers = members.map((member) => ({
          ...member,
          season_experience: 0,
        }));
  
        await Promise.all(
          updatedMembers.map(async (member) => {
            await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${member.id}.json`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(member),
            });
          })
        );
      } catch (error) {
        console.error(error);
        setUpdateError('Failed to update members');
      }
  
      setUpdatingMembers(false);
    }
  };

  const handleUpdateSeasonLevel = async () => {
    if (window.confirm('Are you sure you want to update all members\' season level?')) {
      setUpdatingMembers(true);
      setUpdateError('');
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`);
        const membersObj = await response.json();
  
        // Convert the object to an array
        const members = Object.keys(membersObj).map((key) => ({
          id: key,
          ...membersObj[key],
        }));
  
        const settingsResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`);
        const settings = await settingsResponse.json();
  
        const updatedMembers = members.map((member) => {
          const { season_experience, season_level } = member;
          const experienceRequired = settings.experience_base * season_level;
  
          if (season_experience >= experienceRequired) {
            return {
              ...member,
              season_level: season_level + 1,
            };
          }
  
          return member;
        });
  
        await Promise.all(
          updatedMembers.map(async (member) => {
            await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${member.id}.json`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(member),
            });
          })
        );
  
        toast.success('Season level updated successfully', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        console.error(error);
        setUpdateError('Failed to update season level');
      }
  
      setUpdatingMembers(false);
    }
  };
  
  const handleResetSeasonLevel = async () => {
    if (window.confirm('Are you sure you want to reset all members\' season_level to 1?')) {
      setUpdatingMembers(true);
      setUpdateError('');
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`);
        const membersObj = await response.json();
  
        // Convert the object to an array
        const members = Object.keys(membersObj).map((key) => ({
          id: key,
          ...membersObj[key],
        }));
  
        // Check if the `season_experience` field exists in the first member object
        const fieldExists = members.length > 0 && Object.prototype.hasOwnProperty.call(members[0], 'season_level');
  
        // If the field doesn't exist, create it with a value of 0
        if (!fieldExists) {
          await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ season_level: 1 }),
          });
        }
  
        // Update the `season_experience` field for all members
        const updatedMembers = members.map((member) => ({
          ...member,
          season_level: 1,
        }));
  
        await Promise.all(
          updatedMembers.map(async (member) => {
            await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${member.id}.json`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(member),
            });
          })
        );
      } catch (error) {
        console.error(error);
        setUpdateError('Failed to update members');
      }
  
      setUpdatingMembers(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Settings</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Base:
          <input type="text" name="experience_base" value={formValues.experience_base || ''} onChange={handleInputChange} />
        </label>
        <label>
          Points:
          <input type="text" name="experience_points" value={formValues.experience_points || ''} onChange={handleInputChange} />
        </label>
        <label>
          Supporter Multiplier:
          <input type="text" name="experience_supporter_bonus" value={formValues.experience_supporter_bonus || ''} onChange={handleInputChange} />
        </label>
        <label>
          Season:
          <input type="text" name="season" value={formValues.season || ''} onChange={handleInputChange} />
        </label>
        <label>
          Language:
          <input type="text" name="language" value={formValues.language || ''} onChange={handleInputChange} />
        </label>
        <label>
          Theme:
          <input type="text" name="theme" value={formValues.theme || ''} onChange={handleInputChange} />
        </label>
        <label>
          Version:
          <input type="text" name="version" value={formValues.version || ''} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
      <div className="Add Fields">
        <label>
          Name:
          <input type="text" name="member_key" value={memberKey} onChange={(e) => setMemberKey(e.target.value)} />
        </label>
        <label>
          Value:
          <input type="text" name="member_value" value={memberValue} onChange={(e) => setMemberValue(e.target.value)} />
        </label>
        <label>
          Overwrite:
          <input type="checkbox" name="overwrite" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} />
        </label>
        <button onClick={handleUpdateMembers} disabled={updatingMembers}>Update members</button>
        {updateError && <p>{updateError}</p>}
      </div>

      <button onClick={handleUpdateSeasonExperience} disabled={updatingMembers}>Reset season experience for all members</button>
      <button onClick={handleResetSeasonLevel} disabled={updatingMembers}>Reset season level for all members</button>
      <button onClick={handleUpdateSeasonLevel} disabled={updatingMembers}>Update season level for all members</button>
      {updateError && <p>{updateError}</p>}
    </div>
  );
};

export default DashboardSettings;
