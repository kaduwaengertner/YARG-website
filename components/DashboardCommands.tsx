import React, { useState, useEffect } from "react";
import CommandItem from "./CommandItem";
import CommandAdd from "./CommandAdd";
import CommandEdit from "./CommandEdit";
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardCommands = () => {
  const [commands, setCommands] = useState(null);
  const [selectedCommand, setSelectedCommand] = useState(null)
  const [showEditCommandForm, setShowEditCommandModal] = useState(false);
  const [showAddCommandForm, setShowAddCommandForm] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STREAM_DATABASE}/commands.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch commands");
        }
        return response.json();
      })
      .then((data) => {
        setCommands(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [shouldUpdate]);

  const handleSaveCommand = async (command) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STREAM_DATABASE}/commands/${command.name}.json`,
        {
          method: "PUT",
          body: JSON.stringify(command),
        }
      );
      if (response.ok) {
        toast.success('Command added', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setCommands({ ...commands, [command.name]: command });
        setShowAddCommandForm(false);
      } else {
        toast.error('Failed to add command', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error saving command:", error);
    }
  };

  const handleAddCommandClick = () => {
    setShowAddCommandForm(true);
  }
  
  const handleCancelAddCommand = () => {
    setShowAddCommandForm(false);
  }

  const handleEditCommandClick = (command) => {
    setSelectedCommand(command);
    setShowEditCommandModal(true);
  };

  const handleCancelEditCommand = () => {
    setShowEditCommandModal(false);
    setSelectedCommand(null);
  };

  const handleUpdateCommand = (updatedCommand) => {
    // send a PUT request to update the command in the API
    fetch(`${process.env.NEXT_PUBLIC_STREAM_DATABASE}/commands/${selectedCommand.name}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCommand),
    })
      .then((response) => {
        if (!response.ok) {
            toast.error('Failed to update command', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Command edited!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // update the commands state to reflect the changes
        setShouldUpdate(!shouldUpdate);
        setSelectedCommand(null);
        setShowEditCommandModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCommand = (commandName) => {
    fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/commands/${commandName}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(null),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error('Failed to delete command', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.info('Command deleted', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCommands((prevCommands) => {
          const newCommands = { ...prevCommands };
          delete newCommands[commandName];
          return newCommands;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
        <ToastContainer />
      <h1>Commands</h1>
      <button onClick={handleAddCommandClick}>Add New Command</button>
    {showAddCommandForm && (
      <CommandAdd onSave={handleSaveCommand} onClose={handleCancelAddCommand} />
    )}
    {showEditCommandForm && (
        <CommandEdit command={selectedCommand} onSave={handleUpdateCommand} onClose={handleCancelEditCommand} setCommands={setCommands} />
      )}
      {commands ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(commands).map((key) => (
  <CommandItem 
    key={key}
    command={{ name: key, ...commands[key] }} 
    onEdit={handleEditCommandClick} 
    onDelete={() => handleDeleteCommand(key)}
  />
))}
          </tbody>
        </table>
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
    </div>
  );
};

export default DashboardCommands;
