import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface SubscriberItemProps {
  id: string;
  tier: string;
}

interface SubscriberData {
  display_name: string;
  profile_image_url: string;
}

const SubscriberItem: React.FC<SubscriberItemProps> = ({ id, tier }) => {
  const [subscriberData, setSubscriberData] = useState<SubscriberData | null>(null);
  const [avatar, setAvatar] = useState<string>("https://via.placeholder.com/64");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.twitch.tv/helix/users?id=${id}`, {
          headers: {
            "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN}`,
          },
        });
        setSubscriberData(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  let content = null;

  if (subscriberData) {
    content = (
      <>
        <Image src={subscriberData.profile_image_url} alt="Avatar" />
        <div>{subscriberData.display_name} ({id})</div>
      </>
    );
  } else {
    content = (
      <>
        <Image src={avatar} alt="Avatar" />
        <div>{id}</div>
      </>
    );
  }

  return (
    <li>
      {content}
      <div>Tier: {tier}</div>
    </li>
  );
};

export default SubscriberItem;
