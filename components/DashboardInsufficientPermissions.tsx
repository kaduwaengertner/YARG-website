const DashboardInsufficientPermissions = ({ neededPermision }) => {
    return (
      <div>
        <h1>This is a {neededPermision} only Area</h1>
        <p>You don&apos;t have authorization to access this page.</p>
      </div>
    );
  };
  
  export default DashboardInsufficientPermissions;
  