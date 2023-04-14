import { useState, useEffect } from "react";
import CommandView from "../../components/CommandView";
import Head from "next/head";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import HeroHeader from "@/components/modules/HeroHeader";
import Image from "next/image";

function CommandsPage() {
	const [commands, setCommands] = useState({});

	useEffect(() => {
		const fetchCommands = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/commands.json`
				);
				const data = await response.json();
				const activeCommands = Object.values(data).filter(
					(command) => command.status === "active"
				);
				const groupedCommands = activeCommands.reduce((acc, command) => {
					const category = command.category;
					if (!acc[category]) {
						acc[category] = [];
					}
					acc[category].push(command);
					return acc;
				}, {});
				setCommands(groupedCommands);
			} catch (error) {
				console.error("Error fetching commands:", error);
			}
		};

		fetchCommands();
	}, []);

	return (
		<>
			<Head>
				<title>Commands ⌨️ | Kadu&apos;s Crazy Lab 🧪</title>
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
				page="cards"
				title="Commands"
				subtitle="Discover the Power of Commands at Your Fingertips"
			/>
			<div className="content-full">
				<div className="content-container">
					{Object.keys(commands).map((category) => (
						<div className="category-group" key={category}>
							<div className="command-category-title">
								<Image src={`/assets/commands/${category}.png`} width="20" alt=""/>
								{category}
							</div>
							<div className="command-category-group">
								{commands[category].map((command) => (
									<CommandView key={command.name} command={command} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default CommandsPage;
