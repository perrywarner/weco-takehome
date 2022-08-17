import React, { FC } from "react";
import { MenuEntry } from "../types/MenuEntry";
import { parseHtmlContent } from "../utils/parseHtmlContent";

interface MenuItemProps {
  entry: MenuEntry;
}

export const MenuItem: FC<MenuItemProps> = ({ entry }) => {
  // entry.item.description takes two "shapes":
  // * text (OK to use): "puffed tofu, snow peas..."
  // * HTML (need eliminate HTML part): "<span data-sheets-value="...">puffed tofu, snow peas...</span>"
  const getFormattedDescription = (input: string) => {
    const parsedDescription = parseHtmlContent(entry.item.description);
    if (parsedDescription !== null) {
      return parsedDescription;
    } else {
      return input;
    }
  };

  return (
    <div>
      <p>
        <strong>
          {entry.sold_out ? "SOLD OUT!!" : null}&nbsp;
          {entry.item.name}&nbsp;|&nbsp;
        </strong>
        {getFormattedDescription(entry.item.description)}
      </p>
    </div>
  );
};
