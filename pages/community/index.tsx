import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import HeroHeader from "@/components/modules/HeroHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Kadu&apos;s Crazy Lab 🧪</title>
				<meta
					name="description"
					content="Creating a world of fun, one crazy experiment at a time."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header style="light" />
			<HeroHeader
				style="light"
				type="page"
				page="cards"
				title="Our Thriving Community"
				subtitle="Experience a World of Fun, Creativity, and Connection"
				text="Welcome to our vibrant community, where gamers and makers from around the globe come together to celebrate their shared passions. Join us and be part of an inclusive, dynamic, and engaging environment where good vibes and new friendships are always just a click away."
			/>
			<section>
				By the Numbers: Our Growing Community Total Members:<br></br>Experience
				the strength of our diverse and ever-expanding community. (display
				current number of members)
				<br></br>
				<br></br>
				Languages Supported:<br></br>Enjoy our bilingual streams in English and
				Portuguese, bringing gamers and makers closer together.
				<br></br>
				<br></br>
				Community Events:<br></br>Participate in our regular events, fostering
				fun, creativity, and collaboration. (display number of past events)
			</section>
			<section>
				Collectible Digital Cards<br></br>
				Discover the excitement of collecting and trading digital cards, each
				with unique designs and varying rarity levels. With new cards released
				each season, there&apos;s always something fresh to look forward to!
				<br></br>
				<br></br>
				Customizable Characters<br></br>
				Create your own custom character and show off your personal style. Use
				Fragments earned from disenchanting cards to purchase unique items in
				the Marketplace, adding flair to your virtual persona.
				<br></br>
				<br></br>
				Badges and Achievements<br></br>
				Earn badges and achievements as you engage with the community, attend
				events, and participate in various activities. Show off your
				accomplishments and climb the ranks among fellow gamers and makers.
				<br></br>
				<br></br>
				Responsive Commands and Interactive Experiences<br></br>
				Enjoy responsive commands and interactive experiences during streams,
				ensuring you always feel heard and engaged.
			</section>
			<section>
				Our Good Vibes Philosophy<br></br>
				We pride ourselves on maintaining a positive, welcoming, and supportive
				environment for all our members. Harassment and toxicity have no place
				here. Our community is built on mutual respect, camaraderie, and a
				genuine love for gaming and creativity.
			</section>
			<Footer />
		</>
	);
}
