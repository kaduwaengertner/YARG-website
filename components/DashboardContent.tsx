import React from "react";
import DashboardHome from "./DashboardHome";
import DashboardSubscriber from "./DashboardSubscriber";
import DashboardCommands from "./DashboardCommands";
import DashboardAnnouncements from "./DashboardAnnouncements";
import DashboardMembers from "./DashboardMembers";
import DashboardStatistics from "./DashboardStatistics";
import DashboardInsufficientPermissions from "./DashboardInsufficientPermissions";
import DashboardRedemptions from "./DashboardRedemptions";
import DashboardSettings from "./DashboardSettings";
import DashboardProfileEdit from "./DashboardProfileEdit";
import DashboardCustomize from "./DashboardCustomize";

const DashboardContent = ({ user, memberData, activeTab }) => {
  let content;

  if (activeTab === "subscriber") {
    if (memberData && memberData.role === "Subscriber") {
      content = <DashboardSubscriber />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Subscriber" />
      );
    }
  } else if (activeTab === "announcements") {
    if (
      memberData &&
      (memberData.role === "Moderator" || memberData.role === "Broadcaster")
    ) {
      content = <DashboardAnnouncements />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Moderator" />
      );
    }
  } else if (activeTab === "profile") {
    content = <DashboardProfileEdit memberData={memberData} />;
  } else if (activeTab === "customize") {
    content = <DashboardCustomize memberData={memberData} />;
  } else if (activeTab === "members") {
    if (
      memberData &&
      (memberData.role === "Moderator" || memberData.role === "Broadcaster")
    ) {
      content = <DashboardMembers />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Moderator" />
      );
    }
  } else if (activeTab === "commands") {
    if (memberData && memberData.role === "Broadcaster") {
      content = <DashboardCommands />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Broadcaster" />
      );
    }
  } else if (activeTab === "statistics") {
    if (
      memberData &&
      (memberData.role === "Moderator" || memberData.role === "Broadcaster")
    ) {
      content = <DashboardStatistics />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Broadcaster" />
      );
    }
  } else if (activeTab === "redemptions") {
    if (
      memberData &&
      (memberData.role === "Broadcaster")
    ) {
      content = <DashboardRedemptions />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Broadcaster" />
      );
    }
  } else if (activeTab === "settings") {
    if (
      memberData &&
      (memberData.role === "Broadcaster")
    ) {
      content = <DashboardSettings />;
    } else {
      content = (
        <DashboardInsufficientPermissions neededPermision="Broadcaster" />
      );
    }
  } else {
    content = <DashboardHome />;
  }

  return <div className="dashboard-content-block">{content}</div>;
};

export default DashboardContent;
