import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

function SendPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    title: "",
    description: "",
    alias: "",
    experience: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`
    );
    const membersData = await response.json();

    const targetUser = Object.values(membersData).find(
      (member) =>
        member.name &&
        member.name.toLowerCase() === formValues.username.toLowerCase()
    );

    if (targetUser) {
      const newReward = {
        title: formValues.title,
        description: formValues.description,
        alias: formValues.alias,
        experience: parseInt(formValues.experience),
        claimed: false,
      };
      targetUser.rewards = targetUser.rewards || [];
      targetUser.rewards.push(newReward);

      await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${targetUser.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ rewards: targetUser.rewards }),
        }
      );

      setIsLoading(false);
      alert("Reward sent successfully!");
    } else {
      setIsLoading(false);
      alert(`Could not find user "${formValues.username}".`);
    }
  };

  if (!user?.isLoggedIn || (user.role !== "Broadcaster" && !user.moderator)) {
    return (
      <div>
        <h1>Create Reward</h1>
        {isLoading && <Spinner animation="border" variant="warning" />}
        {!isLoading && (
          <form onSubmit={handleFormSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Title:
              <select
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
              >
                <option value="">-- Select Title --</option>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
            </label>
            <br />
            <label>
              Description:
              <select
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              >
                <option value="">-- Select Description --</option>
                <option value="You did it!">You did it!</option>
                <option value="You are amazing!!">You are amazing!!</option>
                <option value="Awesome work!">Awesome work!</option>
              </select>
            </label>
            <br />
            <label>
              Alias:
              <select
                name="alias"
                value={formValues.alias}
                onChange={handleInputChange}
              >
                <option value="">-- Select Alias --</option>
                <option value="bronze-01">bronze-01</option>
                <option value="silver-01">silver-01</option>
                <option value="gold-01">gold-01</option>
              </select>
            </label>
            <br />
            <label>
              Experience:
              <input
                type="number"
                name="experience"
                value={formValues.experience}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default SendPage;
