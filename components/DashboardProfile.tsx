import React, { useState } from "react";
import Image from "next/image";

const DashboardProfile = ({ user, memberData, handleTabClick }) => {
	const handleLinkClick = (tab) => {
		handleTabClick(tab);
	};

	return (
		<div className="left-sidebar">
			<div className="dashboard-profile-block">
				<div className="dashboard-profile-header">
					<div className="dashboard-profile-photo">
						<Image
							src={user.profile_image_url}
							alt={user.display_name + " Profile Picture"}
							width="100"
							height="100"
						/>
					</div>
					<div className="dashboard-profile-level">
						{memberData ? memberData.season_level : ""}
					</div>
				</div>
				<h1>Welcome, {user.display_name}!</h1>
				<div className="dashboard-profile-role">
					{memberData ? memberData.role : "Viewer"}
				</div>
				<div className="dashboard-profile-menu">
					<ul>
						<li>
							<a href="#" onClick={() => handleLinkClick("home")}>
								Home
							</a>
						</li>
						<li>
							<a href="#" onClick={() => handleLinkClick("profile")}>
								Edit your Profile
							</a>
						</li>
						<li>
							<a href="#" onClick={() => handleLinkClick("customize")}>
								Customize your Character
							</a>
						</li>
						{memberData && memberData.subscriber && (
							<li>
								<a href="#" onClick={() => handleLinkClick("subscriber")}>
									Subscriber Area
								</a>
							</li>
						)}
					</ul>
				</div>
				<div className="dashboard-profile-footer">Account ID #{user.id}</div>
			</div>
			{memberData && (memberData.broadcaster || memberData.moderator) && (
				<div className="dashboard-moderator-menu">
					<h3>Moderator</h3>
					<ul>
						<li>
							<a href="#" onClick={() => handleLinkClick("announcements")}>
								Announcements
							</a>
						</li>
						<li>
							<a href="#" onClick={() => handleLinkClick("commands")}>
								Commands
							</a>
						</li>
						<li>
							<a href="#" onClick={() => handleLinkClick("members")}>
								Members
							</a>
						</li>
						<li>
							<a href="#" onClick={() => handleLinkClick("statistics")}>
								Statistics
							</a>
						</li>
					</ul>
				</div>
			)}
			{memberData && memberData.broadcaster && (
				<div className="dashboard-subscriber-menu">
					<h3>Broadcaster</h3>
					<ul>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("moderators")}
								className="active"
							>
								Moderators
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("leveling-system")}
								className="active"
							>
								Leveling System
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("badges")}
								className="active"
							>
								Badges
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("cards")}
								className="active"
							>
								Cards
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("items")}
								className="active"
							>
								Items
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("redemptions")}
								className="active"
							>
								Channel Points
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("control-room")}
								className="active"
							>
								Control Room
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleLinkClick("settings")}
								className="active"
							>
								Settings
							</a>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default DashboardProfile;
