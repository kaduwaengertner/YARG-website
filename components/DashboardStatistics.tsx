import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

const DashboardStatistics = () => {
  const [events, setEvents] = useState<Record<string, any>[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/statistics/events.json`);
      const data = await response.json();
      const eventList = Object.values(data).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEvents(eventList);
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateRange(event.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const date = new Date(event.date);
    switch (selectedDateRange) {
      case '24h':
        return Date.now() - date.getTime() < 86400000;
      case '7d':
        return Date.now() - date.getTime() < 604800000;
      case '30d':
        return Date.now() - date.getTime() < 2592000000;
      default:
        return true;
    }
  });

  const eventCounts = filteredEvents.reduce((counts: Record<string, number>, event) => {
    const eventType = event.event;
    counts[eventType] = (counts[eventType] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      <h1>Statistics</h1>
      <div>
        <h2>Latest Events</h2>
        <div>
          <label htmlFor="date-range">Date Range:</label>
          <select id="date-range" value={selectedDateRange} onChange={handleDateRangeChange}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <ul>
          {filteredEvents.map((event) => (
            <EventItem key={event.date} event={event} />
          ))}
        </ul>
      </div>
      <div>
        <h2>Event Counts</h2>
        <ul>
          {Object.entries(eventCounts).map(([eventType, count]) => (
            <li key={eventType}>
              <p>{eventType}: {count}</p>
              <p>{count > 0 ? "✓" : ""}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardStatistics;
