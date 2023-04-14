import { useState, useEffect } from "react";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";

const LeaderboardPage = () => {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`)
			.then((response) => response.json())
			.then((data) => {
				// Convert object to array
				const membersArray = Object.values(data);

				// Filter out blacklisted members and the two specific ids
				const filteredMembers = membersArray.filter((member) => {
					return (
						!member.blacklisted &&
						member.id.toString() !== "567743325" &&
						member.id.toString() !== "574701947"
					);
				});

				// Sort by season_experience in descending order
				filteredMembers.sort(
					(a, b) => b.season_experience - a.season_experience
				);

				// Only keep the first 10 members
				const topMembers = filteredMembers.slice(0, 10);

				setMembers(topMembers);
			});
	}, []);

	return (
		<div>
            <div className="page-container">
			<Header />
			<h1 className="page-header">Leaderboard</h1>
			<ul className="leaderboard-list">
				{members.map((member, index) => (
					<li key={member.id} className={`rank-${index + 1}`}>
						<span>{member.name_display}</span>
						<span>Level: {member.season_level}</span>
						<span>Experience: {member.season_experience}</span>
					</li>
				))}
			</ul>
            <Footer />
            </div>
		</div>
	);
};

export default LeaderboardPage;
