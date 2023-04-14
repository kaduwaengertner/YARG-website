import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";

const RewardItem = ({ reward, user }) => {
  const [isClaimed, setIsClaimed] = useState(reward.claimed);
  const [experienceBase, setExperienceBase] = useState(0);
  const { mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchExperienceBase = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`
      );
      const settingsData = await response.json();
      setExperienceBase(settingsData.experience_base);
    };
    fetchExperienceBase();
  }, []);

  const handleClaim = async () => {
    if (!user?.isLoggedIn) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`
    );
    const userData = await response.json();

    const newExperience = userData.season_experience + reward.experience;
    const seasonLevel = Math.floor(newExperience / experienceBase);

    const claimedReward = {
      ...reward,
      claimed: true,
    };

    const rewards = userData.rewards || [];
    const index = rewards.findIndex((r) => r.name === reward.name);

    const updatedRewards = rewards.map((r, i) =>
      i === index ? claimedReward : r
    );

    const updatedUserData = {
      ...userData,
      season_experience: newExperience,
      rewards: updatedRewards,
    };

    if (newExperience >= experienceBase * userData.season_level) {
      updatedUserData.season_level = seasonLevel + 1;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/rewards/${index}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          claimed: true,
        }),
      }
    );

    const updateUserResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedUserData),
      }
    );

    const updatedUser = await updateUserResponse.json();
    //mutateUser(updatedUser);

    setIsClaimed(true);
    router.reload();
  };

  return (
    <div>
      {!isClaimed && (
        <div>
          <h2>{reward.name}</h2>
          <p>{reward.description}</p>
          <button onClick={handleClaim}>Claim</button>
        </div>
      )}
      {isClaimed && (
        <div>
          <h2>Claimed</h2>
          <p>{reward.description}</p>
        </div>
      )}
    </div>
  );
};

export default RewardItem;
