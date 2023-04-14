import React, { useState, useRef } from "react";
import { Tooltip } from "reactstrap";
import Image from "next/image";

function InventoryItem({
  item,
  isEquipped,
  disabledEquip,
  onEquip,
  onUnequip,
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const itemRef = useRef(null);

  return (
    <div>
      <Image
        src={item.image}
        alt={item.name}
        ref={itemRef} // Add this reference to the image element
      />
      <Tooltip
        target={itemRef} // Update the target prop to use the reference
        isOpen={tooltipOpen}
        toggle={toggleTooltip}
      >
        {item.name}
      </Tooltip>
      {isEquipped ? (
        <button onClick={onUnequip}>Unequip</button>
      ) : (
        <button onClick={onEquip} disabled={disabledEquip}>
          Equip
        </button>
      )}
    </div>
  );
}

export default InventoryItem;
