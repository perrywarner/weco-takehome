import React, { FC } from "react";
import { MenuEntry } from "../types/MenuEntry";
import { parseHtmlContent } from "../utils/parseHtmlContent";

interface MenuItemProps {
  entry: MenuEntry;
}

export const MenuItem: FC<MenuItemProps> = ({ entry }) => {
  // needed since:
  // * entry.item.description looks like "<span data-sheets-value="...">puffed tofu, snow peas...</span>"
  // * where we only care about "puffed tofu, snow peas..." here
  const parsedDescription = parseHtmlContent(entry.item.description);

  return (
    <div>
      <p>
        <strong>
          {entry.sold_out ? "SOLD OUT!!" : null}&nbsp;
          {entry.item.name}&nbsp;|&nbsp;
        </strong>
        {parsedDescription}
      </p>
    </div>
  );
};
