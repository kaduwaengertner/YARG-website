import useUser from "../lib/useUser";
import ConnectedDashboard from "../components/ConnectedDashboard";
import DisconnectedDashboard from "../components/DisconnectedDashboard";

const DashboardPage = () => {
  const { user } = useUser();

  if (!user?.isLoggedIn) {
    return <DisconnectedDashboard />;
  }

  return <ConnectedDashboard user={user} />;
};

export default DashboardPage;
