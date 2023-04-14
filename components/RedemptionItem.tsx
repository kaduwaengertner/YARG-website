import React from 'react';
import Image from "next/image";

const RedemptionItem = ({ reward }) => {
  return (
    <div>
      <h3>{reward.title}</h3>
      <p>Cost: {reward.cost}</p>
      <p>{reward.is_enabled ? 'Enabled' : 'Disabled'}</p>
      <Image src={reward.default_image.url_1x} alt={reward.title} width="50" height="50"/>
    </div>
  );
};

export default RedemptionItem;
