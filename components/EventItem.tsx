import React from 'react';
import moment from 'moment';

interface EventItemProps {
  event: {
    date: string;
    event: string;
    user_name: string;
    message: string;
  };
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    const formatDate = (dateString: string) => {
        const date = moment(dateString);
        return date.fromNow();
      };

  return (
    <li>
      <p>{formatDate(event.date)}</p>
      <p>{event.event}</p>
      <p>{event.user_name}</p>
      <p>{event.message}</p>
    </li>
  );
};

export default EventItem;
