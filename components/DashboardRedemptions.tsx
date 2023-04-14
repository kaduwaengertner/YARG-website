import React, { useState, useEffect } from 'react';
import RedemptionItem from './RedemptionItem';

const DashboardRedemptions = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Fetch custom rewards from Twitch API
    fetch('https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=574701947', {
      headers: {
        'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
        'Authorization': 'Bearer iq9kcpwxkd7m0za0h3c7i62ks90zm4'
      }
    })
      .then(response => response.json())
      .then(data => setRewards(data.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Redemptions</h1>
      {rewards.map(reward => (
        <RedemptionItem key={reward.id} reward={reward} />
      ))}
    </div>
  );
};

export default DashboardRedemptions;
