import React, { FC, useState } from "react";
import { MenuEntry } from "../types/MenuEntry";
import { MenuItem } from "./MenuItem";

enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

type TransportChoice = "pickup" | "delivery";

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

  return (
    <div>
      {data.map((entry) => {
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
    </div>
  );
};
