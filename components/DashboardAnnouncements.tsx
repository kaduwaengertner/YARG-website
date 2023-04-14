import React, { useState } from "react";

const DashboardAnnouncements = () => {
  const [language, setLanguage] = useState("EN");
  const [text, setText] = useState("");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = language === "EN" ? process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_EN : process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_PTBR;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      if (!response.ok) {
        throw new Error("Failed to send announcement");
      }
      // TODO: show success message
    } catch (error) {
      console.error(error);
      // TODO: show error message
    }
  };

  return (
    <div>
      <h1>Announcements</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="EN">English</option>
            <option value="PTBR">Português Brasileiro</option>
          </select>
        </label>
        <br />
        <label>
          Text:
          <textarea value={text} onChange={handleTextChange} />
        </label>
        <br />
        <button type="submit">Send Announcement</button>
      </form>
    </div>
  );
};

export default DashboardAnnouncements;
