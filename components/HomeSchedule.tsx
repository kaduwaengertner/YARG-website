import { useState, useEffect } from 'react';

const HomeSchedule = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const channelId = '574701947'; // Replace with your channel ID
      const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5'; // Replace with your Twitch API client ID
      const accessToken = 'your_access_token_here'; // Replace with your Twitch API access token

      try {
        const response = await fetch(`https://api.twitch.tv/helix/channel/goals?broadcaster_id=${channelId}`, {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await response.json();
        setGoals(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {goals.map(goal => (
        <div key={goal.id}>
          <p>{goal.title}</p>
          <p>{goal.current_amount} / {goal.target_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeSchedule;