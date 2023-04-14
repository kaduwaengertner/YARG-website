import Link from "next/link";
import { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import groupBy from "lodash.groupby";
import InventoryItem from "../components/InventoryItem";
import CharacterView from "../components/CharacterView";
import Accordion from 'react-bootstrap/Accordion';

function DashboardCustomize() {
	const { user } = useUser();
	const [inventory, setInventory] = useState([]);
	const [itemDetails, setItemDetails] = useState([]);
	const [equippedItems, setEquippedItems] = useState(null);

	useEffect(() => {
		async function fetchInventoryAndCharacter() {
			const responseInventory = await fetch(
				`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/inventory.json`
			);
			const inventoryData = await responseInventory.json();

			const responseCharacter = await fetch(
				`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/character.json`
			);
			const characterData = await responseCharacter.json();

			setInventory(inventoryData);
			setEquippedItems(characterData);
		}

		if (user) {
			fetchInventoryAndCharacter();
		}
	}, [user]);

	useEffect(() => {
		async function fetchItems() {
			const fetchedItems = await Promise.all(
				inventory.map(async (itemId) => {
					const response = await fetch(
						`https://light-fury-default-rtdb.firebaseio.com/items/${itemId}.json`
					);
					const itemData = await response.json();
					return { ...itemData, id: itemId };
				})
			);
			setItemDetails(fetchedItems);
		}

		fetchItems();
	}, [inventory]);

	const equipItem = async (itemId, itemType) => {
        const newEquippedItems = equippedItems
          ? equippedItems.filter(
              (id) =>
                !itemDetails.find((item) => item.id === id && item.type === itemType)
            )
          : [];
      
        newEquippedItems.push(itemId);
      
        await fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/character.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEquippedItems),
        });
      
        setEquippedItems(newEquippedItems);
      };
      

	const unequipItem = async (itemId) => {
		const newEquippedItems = equippedItems.filter((id) => id !== itemId);

		await fetch(
			`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}/character.json`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newEquippedItems),
			}
		);

		setEquippedItems(newEquippedItems);
	};

	const groups = groupBy(itemDetails, "type");

	return (
        <div>
          <h1>Customize your Character</h1>
          <CharacterView user={user} equippedItems={equippedItems || []} />
          <Accordion defaultActiveKey="0">
            {Object.keys(groups).map((groupType, index) => (
              <Accordion.Item eventKey={index.toString()} key={groupType}>
                <Accordion.Header>{groupType}</Accordion.Header>
                <Accordion.Body>
                  {groups[groupType].map((item) => {
                    const isEquipped = equippedItems && equippedItems.includes(item.id);
                    const disabledEquip = equippedItems && equippedItems.some(
                      (id) => item.type === itemDetails.find((i) => i.id === id).type
                    );
    
                    return (
                      <InventoryItem
                        key={item.id}
                        item={item}
                        isEquipped={isEquipped}
                        disabledEquip={!isEquipped && disabledEquip}
                        onEquip={() => equipItem(item.id, item.type)}
                        onUnequip={() => unequipItem(item.id)}
                      />
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      );
    }
    
    export default DashboardCustomize;
