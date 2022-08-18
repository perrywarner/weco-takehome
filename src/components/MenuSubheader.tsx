import React, { FC } from "react";
import "./Menu.css";

enum Day {
  Monday = "mon",
  Tuesday = "tue",
  Wednesday = "wed",
  Thursday = "thu",
  Friday = "fri",
  Saturday = "sat",
  Sunday = "sun",
}

interface MenuProps {
  day: Day;
  pickupId: string;
  deliveryId: string;
}

export const MenuSubheader: FC<MenuProps> = ({ day, pickupId, deliveryId }) => {
  const firstLetterOfDay = day[0].charAt(0).toLocaleUpperCase();
  const capitalizedDay = day[0].toLocaleUpperCase();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="menu-left"
        style={{
          width: "auto",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        <div className="menu-date">&nbsp;{firstLetterOfDay}&nbsp;</div>
        <p style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
          {capitalizedDay}
        </p>
      </div>
      <div
        className="menu-right"
        style={{
          width: "auto",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        {/* TODO convert to controlled component */}
        <input
          type={"checkbox"}
          id={pickupId}
          name="pickup"
          style={{ height: "2em", width: "2em", marginTop: ".5rem" }}
        />
        <label htmlFor={pickupId}>Pickup</label>
        <input
          type={"checkbox"}
          id={deliveryId}
          name="delivery"
          style={{ height: "2em", width: "2em", marginTop: ".5rem" }}
        />
        <label htmlFor={deliveryId}>Delivery</label>
      </div>
    </div>
  );
};
