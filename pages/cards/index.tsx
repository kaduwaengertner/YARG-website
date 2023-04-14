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
				<title>Cards 🎴 | Kadu&apos;s Crazy Lab 🧪</title>
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
				title="Digital Cards"
				subtitle="Unleash Your Collection with our Collectibles &rsquo;"
				text="Welcome to the world of digital card collecting! Dive into the excitement of acquiring and trading unique cards while watching your favorite streams. Get ready to embark on an interactive journey, where you can enhance your experience and earn exclusive rewards."
			/>
			<section>
				Show Cards stats overall: Total Cards in Circulation: Discover the
				impressive variety of cards waiting to be collected. (display current
				number of cards) Card Packs Opened: See how many packs have been opened
				so far by our enthusiastic community. (display number of packs opened)
				Most Collected Card: Find out which card is the most popular among our
				collectors. (display card name and image) Rarest Card Found: Uncover the
				rarest card discovered in our platform to date. (display card name and
				image) Top Collector: Celebrate our most dedicated card collector and
				their achievements. (display user name and total cards collected)
			</section>
			<section id="how-it-works">
				<h2>How to get Cards</h2>
				<div>
					Step 1: Earn Channel Points (Bolts) During Streams While watching the
					stream, you&apos;ll accumulate Channel Points, also known as Bolts. The
					more you watch, the more Bolts you&apos;ll earn!
				</div>
				<div>
					Step 2: Redeem Your Card Packs with Bolts Use your Bolts to redeem
					Card Packs, which contain three random cards. Witness the thrill of
					opening Card Packs live during the stream, and find your new cards
					waiting in your profile&apos;s Cards tab.
				</div>
			</section>
			<section>
				Cards Leaderboard here, showing 10, name, cards amount and how much they
				value in fragment Explain how the card points work Uncommon (1 Star)
				Epic (2 Stars) Rare (3 Stars) Legendary (4 Stars) Mythic (5 Stars)
				Mythic (5 Stars Foil)
			</section>
			<section>
				Earn XP and Level Up with Your Cards The cards you collect also grant
				you XP based on their rarity. As you accumulate XP, you&apos;ll level up,
				unlocking even more exciting rewards and opportunities.
			</section>
			<section>
				Disenchant Cards, Gain Fragments, and Customize Your Character Not all
				cards are a perfect fit for your collection. Disenchant the ones you
				don&apos;t want to receive Fragments. Use these Fragments to buy unique items
				for your Character in the Marketplace, personalizing your experience and
				standing out from the crowd.
			</section>
			<Footer />
		</>
	);
}
