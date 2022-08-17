import React, { FC, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { MenuEntry } from "./types/MenuEntry";
import { MenuItem } from "./components/MenuItem";

const queryClient = new QueryClient();

// <ApiTest> is a spaghetti component for API <-> React testing purposes.
// It's inspired by <QueryExample> in "src/QueryExample" if looking for context about it
export const ApiTest: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiTestComponent />
    </QueryClientProvider>
  );
};

const fetchMenu = (): Promise<MenuEntry[]> => {
  return fetch("https://app-staging.weco-dev.com/api/v1/sample/").then(
    (res) => {
      return res.json();
    }
  );
};

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

const ApiTestComponent = () => {
  // React useState with Map type (object of key-value pairs) isn't a normal design pattern.
  // However, I chose it since we have an indeterminate length of "Menu Entries" that only are available to this component after the request loads,
  // and I think a Map is the best data structure for when I want to capture a value attached to a unique ID and I don't know the available IDs ahead of time.
  const [menuChoice, setMenuChoice] = useState<Map<number, number>>(new Map());
  const [transportChoice, setTransportChoice] = useState<
    Map<Day, TransportChoice>
  >(new Map());

  const {
    isLoading,
    error,
    data: menuEntries,
  } = useQuery(["repoData"], fetchMenu);

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

  if (isLoading || !menuEntries) {
    return <p>"Loading..."</p>;
  } else if (error) {
    const asserted = error as any;
    return <p>{"An error has occurred: " + asserted.message}</p>;
  } else {
    return (
      <div>
        {menuEntries.map((entry) => {
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
  }
};
