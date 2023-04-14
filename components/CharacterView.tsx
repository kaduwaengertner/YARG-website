// CharacterView.tsx
import { useState, useEffect } from "react";

const itemsDatabase = process.env.ITEMS_DATABASE;

function CharacterView({ user, equippedItems }) {
	const [characterItems, setCharacterItems] = useState([]);

	useEffect(() => {
		async function fetchCharacterItems() {
			const itemsData = await Promise.all(
				equippedItems.map(async (itemId) => {
					const response = await fetch(
						`${itemsDatabase}/items/${itemId}.json`
					);
					const itemData = await response.json();
					return itemData;
				})
			);
			setCharacterItems(itemsData);
		}

		fetchCharacterItems();
	}, [equippedItems]);

	return (
		<div>
			<h2>Your Character</h2>
            <div className="character-view">
			{characterItems.map((item) => (
				<div
                className={item.type}
                key={item.id}
                style={{
                    backgroundImage: `url('../assets/items/${item.number}.png')`,
                }}
              >
				</div>
			))}
            </div>
		</div>
	);
}

export default CharacterView;
