import Link from "next/link";

const DisconnectedDashboard = () => {
  return (
    <div>
      <p>You must be logged in to view this page.</p>
      <Link href="/login">Click to go to the login page</Link>
    </div>
  );
};

export default DisconnectedDashboard;
