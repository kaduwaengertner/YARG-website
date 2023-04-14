import React, { useEffect, useState } from "react";
import axios from "axios";
import ModeratorItem from "../../components/ModeratorItem";
import Head from "next/head";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import HeroHeader from "@/components/modules/HeroHeader";

const getModerators = async () => {
	const client_id = "YOUR_TWITCH_API_CLIENT_ID";
	const channel_name = "574701947";

	try {
		const response = await axios.get(
			`https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${channel_name}`,
			{
				headers: {
					"Client-ID": "gp762nuuoqcoxypju8c569th9wz7q5",
					Authorization: `Bearer iq9kcpwxkd7m0za0h3c7i62ks90zm4`,
				},
			}
		);

		const moderators = response.data.data.map((moderator) => ({
			id: moderator.user_id,
			name: moderator.user_name,
		}));
		return moderators;
	} catch (error) {
		console.error(error);
	}

	// Return an empty array if there are no moderators
	return [];
};

const AboutPage: React.FC = () => {
	const [moderators, setModerators] = useState<{ id: string; name: string }[]>(
		[]
	);

	useEffect(() => {
		const fetchModerators = async () => {
			const moderators = await getModerators();
			setModerators(moderators);
		};

		fetchModerators();
	}, []);

	return (
		<>
			<Head>
				<title>About 📖 | Kadu&apos;s Crazy Lab 🧪</title>
				<meta
					name="description"
					content="Creating a world of fun, one crazy experiment at a time."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header style="dark" />
			<HeroHeader
				style="dark"
				type="page"
				page="about"
				title="About"
				subtitle="Discover the Power of Commands at Your Fingertips"
			/>
			<h1>About Page</h1>
			<p>This is the about page.</p>
			<section>
				<h2>Moderators</h2>
				<ul>
					{moderators.map((moderator) => (
						<ModeratorItem
							key={moderator.id}
							id={moderator.id}
							name={moderator.name}
						/>
					))}
				</ul>
			</section>
		</>
	);
};

export default AboutPage;
