import React, { useState } from 'react';

const StatsForm = () => {
  const [event, setEvent] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [provider, setProvider] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const requestBody = {
      [Date.now()]: data,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/statistics/events.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();
    console.log(responseData); // should log the response object
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="event">Event:</label>
        <input type="text" id="event" value={event} onChange={(e) => setEvent(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="userName">User Name:</label>
        <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="provider">Provider:</label>
        <input type="text" id="provider" value={provider} onChange={(e) => setProvider(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="currency">Currency:</label>
        <input type="text" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="cost">Cost:</label>
        <input type="text" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StatsForm;