import useUser from "../../lib/useUser";
import { useEffect, useState } from "react";
import RewardItem from "../../components/RewardItem";
import Head from "next/head";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import HeroHeader from "@/components/modules/HeroHeader";

function RewardsPage() {
  const { user } = useUser();
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      if (user?.isLoggedIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/rewards.json`
        );
        const data = await response.json();
        const rewards = data ? Object.values(data) : [];
        setRewards(rewards);
      }
    };

    fetchRewards();
  }, [user]);

  const unclaimedRewards = rewards.filter(reward => !reward.claimed);

  return (
    <>
      <Head>
				<title>Rewards 📖 | Kadu&apos;s Crazy Lab 🧪</title>
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
      <h1>Rewards</h1>
      {unclaimedRewards.map((reward, index) => (
        <RewardItem key={index} reward={reward} user={user} index={index} />
      ))}
      <Footer />
    </>
  );
}


export default RewardsPage;