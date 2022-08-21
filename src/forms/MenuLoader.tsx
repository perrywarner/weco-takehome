import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuEntry } from "../types/MenuEntry";
import { Menu } from "./Menu";

const fetchMenu = (): Promise<MenuEntry[]> => {
  return fetch("https://app-staging.weco-dev.com/api/v1/sample/").then(
    (res) => {
      return res.json();
    }
  );
};

/**
 * `<MenuLoader>` is <Menu>'s parent
 * 1. attempts to GET the Menu data from the API, then:
 * 2. if success: renders <Menu> with Menu data
 * 3. else: displays simple text describing loading/error
 * @returns JSX.Element
 */
export const MenuLoader: FC = () => {
  const {
    isLoading,
    error,
    data: menuEntries,
  } = useQuery(["repoData"], fetchMenu);

  if (isLoading || !menuEntries) {
    return <p>"Loading..."</p>;
  } else if (error) {
    const asserted = error as any;
    return <p>{"An error has occurred: " + asserted.message}</p>;
  } else {
    return <Menu data={menuEntries} />;
  }
};
