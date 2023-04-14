import React, { useEffect, useState } from "react";
import useUser from "../lib/useUser";
import Spinner from 'react-bootstrap/Spinner';

function MarketplaceItem({
	item,
	showExtraInfo,
	isAnyItemBuying,
	onBuyStart,
	onBuyEnd,
	userPoints,
}) {
	const [itemDetails, setItemDetails] = useState({});
	const { user, mutateUser } = useUser();
	const [isOwned, setIsOwned] = useState(false);
	const [isBuyable, setIsBuyable] = useState(false);
	const [isBuying, setIsBuying] = useState(false); // add this line

	useEffect(() => {
		if (item) {
			fetch(`https://light-fury-default-rtdb.firebaseio.com/items/${item}.json`)
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						setItemDetails(data);
					} else {
						console.error(`Item ${item} not found`);
					}
				})
				.catch((error) => {
					console.error(`Error fetching item ${item}`);
				});
		}
	}, [item]);

	useEffect(() => {
		if (user?.id) {
			fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`)
				.then((response) => response.json())
				.then((data) => {
					if (data?.inventory) {
						setIsOwned(data.inventory.includes(item));
					}
					if (data?.points) {
						setIsBuyable(!isOwned && itemDetails.price <= data.points);
					}
				});
		}
	}, [item, user, itemDetails.price, isOwned]);

	const handleBuy = () => {
		if (isBuying) return;
		setIsBuying(true);
		onBuyStart();
		fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`)
			.then((response) => response.json())
			.then((data) => {
				const updatedPoints = data.points - itemDetails.price;
				const updatedInventory = data.inventory
					? data.inventory.concat(item)
					: [item];
				const updatedData = {
					...data,
					points: updatedPoints,
					inventory: updatedInventory,
				};
				fetch(
					`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedData),
					}
				)
					.then((response) => response.json())
					.then((data) => {
						console.log("Inventory updated successfully");
						mutateUser();
						setIsBuying(false);
						setIsOwned(true);
						onBuyEnd(updatedPoints);
					})
					.catch((error) => {
						console.error("Error updating inventory");
						setIsBuying(false);
					});
			})
			.catch((error) => {
				console.error("Error fetching user data");
				setIsBuying(false);
			});
	};

	return (
		<li>
			{itemDetails ? (
				<>
					<h3>{itemDetails.name}</h3>
					<p>{itemDetails.description}</p>
					<p>Price: ${itemDetails.price}</p>
					<p>Rarity: {itemDetails.rarity}</p>
					<p>Type: {itemDetails.type}</p>
					{showExtraInfo && (
						<>
							<p>Creator: {itemDetails.creator_name}</p>
							<p>Creator Link: {itemDetails.creator_link}</p>
						</>
					)}
					{isOwned ? (
						<div>OWNED</div>
					) : isBuyable ? (
						<button
							onClick={handleBuy}
							disabled={
								isBuying ||
								isOwned ||
								itemDetails.price > userPoints ||
								isAnyItemBuying
							}
						>
							{isBuying ? "Buying..." : "BUY"}
						</button>
					) : (
						<div>NOT ENOUGH POINTS</div>
					)}
				</>
			) : (
				<Spinner animation="border" variant="warning" />
			)}
		</li>
	);
}

export default MarketplaceItem;
