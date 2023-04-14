import React, { useEffect, useState } from "react";
import useUser from "../lib/useUser";
import MarketplaceItem from "../components/MarketplaceItem";

function Marketplace() {
	const { user } = useUser();
	const [featuredTitle, setFeaturedTitle] = useState("");
	const [featuredDescription, setFeaturedDescription] = useState("");
	const [featuredAlias, setFeaturedAlias] = useState("");
	const [featuredItems, setFeaturedItems] = useState([]);
	const [weeklyItems, setWeeklyItems] = useState([]);
	const [points, setPoints] = useState(0);
	const [pointsName, setPointsName] = useState("");
	const [isAnyItemBuying, setIsAnyItemBuying] = useState(false);
	const [userPoints, setUserPoints] = useState(null);

	useEffect(() => {
		fetch("https://light-fury-default-rtdb.firebaseio.com/featured.json")
			.then((response) => response.json())
			.then((data) => {
				if (data.active) {
					setFeaturedTitle(data.title);
					setFeaturedDescription(data.description);
					setFeaturedAlias(data.alias);
					setFeaturedItems(data.items);
				}
			});

		fetch("https://light-fury-default-rtdb.firebaseio.com/.json")
			.then((response) => response.json())
			.then((data) => {
				setWeeklyItems(data.weekly);
			});

		if (user?.id) {
			fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`)
				.then((response) => response.json())
				.then((data) => {
					if (data?.points) {
						setPoints(data.points);
						setUserPoints(data.points); // Make sure this line is here
					}
				});

			fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`)
				.then((response) => response.json())
				.then((data) => {
					if (data?.points_name) {
						setPointsName(data.points_name);
					}
				});
		}
	}, [user]);

	return (
		<div>
			{user?.id && (
				<div>
					<p>
						You currently have {userPoints} {pointsName}
					</p>
				</div>
			)}

			{featuredItems.length > 0 && (
				<div>
					<h2>{featuredTitle}</h2>
					<p>{featuredDescription}</p>
					<p>Alias: {featuredAlias}</p>
					<ul>
						{featuredItems.map((item) => (
							<MarketplaceItem
								key={item}
								item={item}
								showExtraInfo={user?.isLoggedIn}
								isAnyItemBuying={isAnyItemBuying}
								onBuyStart={() => setIsAnyItemBuying(true)}
								onBuyEnd={(updatedPoints) => {
									setIsAnyItemBuying(false);
									setUserPoints(updatedPoints);
								}}
								userPoints={userPoints}
							/>
						))}
					</ul>
				</div>
			)}

			{weeklyItems && weeklyItems.length > 0 && (
				<div>
					<h2>Weekly Rotation</h2>
					<ul>
						{weeklyItems.map((item) => (
							<MarketplaceItem
								key={item}
								item={item}
								showExtraInfo={user?.isLoggedIn}
								isAnyItemBuying={isAnyItemBuying}
								onBuyStart={() => setIsAnyItemBuying(true)}
								onBuyEnd={(updatedPoints) => {
									setIsAnyItemBuying(false);
									setUserPoints(updatedPoints);
								}}
								userPoints={userPoints}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Marketplace;
