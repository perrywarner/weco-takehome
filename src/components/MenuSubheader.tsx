import React, { FC } from "react";
import "./MenuSubheader.css";

enum Day {
  Monday = "mon",
  Tuesday = "tue",
  Wednesday = "wed",
  Thursday = "thu",
  Friday = "fri",
  Saturday = "sat",
  Sunday = "sun",
}

function lookupFullWord(day: Day) {
  switch (day) {
    case "mon":
      return "Monday";
    case "tue":
      return "Tuesday";
    case "wed":
      return "Wednesday";
    case "thu":
      return "Thursday";
    case "fri":
      return "Friday";
    case "sat":
      return "Saturday";
    case "sun":
      return "Sunday";
  }
}

interface MenuProps {
  day: Day;
  pickupId: string;
  deliveryId: string;
  pickupSelected: boolean;
  deliverySelected: boolean;
  onPickupClick: (day: Day) => void;
  onDeliveryClick: (day: Day) => void;
}

export const MenuSubheader: FC<MenuProps> = ({
  day,
  pickupId,
  deliveryId,
  pickupSelected,
  deliverySelected,
  onPickupClick,
  onDeliveryClick,
}) => {
  const firstLetterOfDay = day.charAt(0).toLocaleUpperCase();
  const fullWord = lookupFullWord(day);

  return (
    <div className="menu-subheader">
      <div className="menu-subheader-left">
        <div className="menu-date">&nbsp;{firstLetterOfDay}&nbsp;</div>
        <p style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
          {fullWord}
        </p>
      </div>
      <div className="menu-subheader-right">
        <input
          type={"checkbox"}
          id={pickupId}
          name="pickup"
          onClick={() => onPickupClick(day)}
          checked={pickupSelected}
        />
        <label htmlFor={pickupId}>Pickup</label>
        <input
          type={"checkbox"}
          id={deliveryId}
          name="delivery"
          onClick={() => onDeliveryClick(day)}
          checked={deliverySelected}
        />
        <label htmlFor={deliveryId}>Delivery</label>
      </div>
    </div>
  );
};
