import React, { useEffect, useState } from "react";
import axios from "axios";

interface ModeratorItemProps {
  id: string;
  name: string;
}

interface ModeratorData {
  season_level: number;
  season_experience: number;
  user_status: string;
}

const ModeratorItem: React.FC<ModeratorItemProps> = ({ id, name }) => {
  const [moderatorData, setModeratorData] = useState<ModeratorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${id}.json`);
        setModeratorData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!moderatorData) {
    return null;
  }

  const { season_level, season_experience, user_status } = moderatorData;

  // Add a blacklist array with the IDs of moderators to exclude
  const blacklist = [
    "567743325" // BillyOGatinho
  ];

  // If the moderator ID is in the blacklist, return null to exclude the moderator from the list
  if (blacklist.includes(id)) {
    return null;
  }

  return (
    <li>
      {name} ({id}) - Season Level: {season_level}, Season Experience: {season_experience}, User Status: {user_status}
    </li>
  );
};

export default ModeratorItem;
