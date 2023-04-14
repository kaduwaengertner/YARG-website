import { useState, useEffect } from "react";
import Link from "next/link";
import Head from 'next/head'
import DashboardProfile from "./DashboardProfile";
import DashboardContent from "./DashboardContent";

const ConnectedDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("home"); // added here
  const [memberData, setMemberData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STREAM_DATABASE}/users/${user.id}.json`
        );
        const data = await response.json();
        console.log(data);
        setMemberData(data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [user]);

  return (
    <>
      <Head>
        <title>Dashboard 🧰 | Kadu&apos;s Crazy Lab 🧪</title>
        <meta name="description" content="Creating a world of fun, one crazy experiment at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardProfile user={user} memberData={memberData} handleTabClick={handleTabClick} />
      {/* <DashboardContent user={user} memberData={memberData} activeTab={activeTab} /> */}
    </>
  );
};

export default ConnectedDashboard;
