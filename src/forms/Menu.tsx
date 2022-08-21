import React, { FC, useState } from "react";
import { MenuEntry } from "../types/MenuEntry";
import { MenuItem } from "../components/MenuItem";
import { MenuSubheader } from "../components/MenuSubheader";

enum Day {
  Monday = "mon",
  Tuesday = "tue",
  Wednesday = "wed",
  Thursday = "thu",
  Friday = "fri",
  Saturday = "sat",
  Sunday = "sun",
}

type TransportChoice = "pickup" | "delivery" | "unset";

const sortByDay = (entries: MenuEntry[]): Map<Day, MenuEntry[]> => {
  const map = new Map<Day, MenuEntry[]>();
  entries.forEach((entry) => {
    // "as Day" assertion is hack to get string value to play nice with Day enum
    // TODO re-check SO to remove hack when time allows: https://stackoverflow.com/a/47755096
    const day = entry.day as Day;

    // TODO check: is entry.day always "mon", "tue", ... ? if not, this'll break
    if (Object.values(Day).includes(day)) {
      const existing = map.get(day);
      // append entry to array if exist in Map; otherwise create new K/V pair
      if (existing) {
        map.set(day, [...existing, entry]);
      } else {
        map.set(day, [entry]);
      }
    } else {
      console.error(
        `Failed to sort Menu Entry ${entry.id} by day. Unhandled value was ${entry.day}. Please report to technical support. Full object: `,
        entry
      );
    }
  });

  return map;
};

interface MenuProps {
  data: MenuEntry[];
}

export const Menu: FC<MenuProps> = ({ data }) => {
  // React useState with Map type (object of key-value pairs) isn't a normal design pattern.
  // However, I chose it since we have an indeterminate length of "Menu Entries" that only are available to this component after the request loads,
  // and I think a Map is the best data structure for when I want to capture a value attached to a unique ID and I don't know the available IDs ahead of time.
  const [menuChoice, setMenuChoice] = useState<Map<number, number>>(new Map());
  const [transportChoice, setTransportChoice] = useState<
    Map<Day, TransportChoice>
  >(new Map());

  // TODO think about what happens if we try to add quantity that ends up exceeding the max available? Is this something to consider?
  // ** Probably belongs in an on submit,
  const updateQuantity = (id: MenuEntry["id"], op: "add" | "sub") => {
    // info: "??" sets previous to menuChoice.get(id) or 0 if menuChoice.get(id) returns undefined
    //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
    const previous = menuChoice.get(id) ?? 0;
    if (op === "add") {
      // in order to apply new State, need to setState a new Map that's a clone of prev but with the new applied state
      // reason: see tail end of this article: https://medium.com/swlh/using-es6-map-with-react-state-hooks-800b91eedd5f
      setMenuChoice(new Map(menuChoice.set(id, previous + 1)));
    } else if (op === "sub" && previous > 0) {
      setMenuChoice(new Map(menuChoice.set(id, previous - 1)));
    }
  };

  const selectTransport = (day: Day, choice: TransportChoice) => {
    const prev = transportChoice.get(day);
    const next = choice;
    // scenario: user clicked the same checkbox as that which already was selected
    if (prev === next) {
      setTransportChoice(new Map(transportChoice.set(day, "unset")));
    } else {
      setTransportChoice(new Map(transportChoice.set(day, choice)));
    }
  };

  const sortedData = sortByDay(data);
  const iterableSorted = Array.from(sortedData.entries());

  return (
    <div className="menu-list">
      {iterableSorted.flatMap((day) => {
        const entriesForDay = day[1];
        const capitalizedDay = day[0].toLocaleUpperCase();
        const pickupId = `${capitalizedDay}-pickup`;
        const deliveryId = `${capitalizedDay}-delivery`;
        const stateOfCurrDay = transportChoice.get(day[0]);
        const pickupSelected = Boolean(
          stateOfCurrDay && stateOfCurrDay === "pickup"
        );
        const deliverySelected = Boolean(
          stateOfCurrDay && stateOfCurrDay === "delivery"
        );
        return (
          <>
            <MenuSubheader
              day={day[0]}
              pickupId={pickupId}
              deliveryId={deliveryId}
              pickupSelected={pickupSelected}
              deliverySelected={deliverySelected}
              onPickupClick={(day) => selectTransport(day, "pickup")}
              onDeliveryClick={(day) => selectTransport(day, "delivery")}
            />
            {entriesForDay.map((entry) => {
              return (
                <MenuItem
                  entry={entry}
                  quantity={menuChoice.get(entry.id) ?? 0}
                  onAdd={() => updateQuantity(entry.id, "add")}
                  onSubtract={() => updateQuantity(entry.id, "sub")}
                  key={entry.id}
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
};
