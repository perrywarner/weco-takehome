import React, { FC } from "react";
import { MenuEntry } from "../types/MenuEntry";
import { parseHtmlContent } from "../utils/parseHtmlContent";

interface MenuItemProps {
  entry: MenuEntry;
  quantity: number;
  onSubtract: () => void;
  onAdd: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
  entry,
  quantity,
  onAdd,
  onSubtract,
}) => {
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

  // TODO uncomment when done with testing (everything seems to be sold out right now)
  //   const soldOut = entry.sold_out
  const soldOut = false;

  return (
    <div style={{ display: "flex" }}>
      <p style={{ flex: "5" }}>
        <strong>
          {soldOut ? "SOLD OUT!!" : null}&nbsp;
          {entry.item.name}&nbsp;|&nbsp;
        </strong>
        {getFormattedDescription(entry.item.description)}
      </p>
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <input
          type={"button"}
          value="-"
          style={{ height: "2em", width: "2em" }}
          onClick={onSubtract}
          disabled={soldOut}
        />
        <p>{quantity}</p>
        <input
          type={"button"}
          value="+"
          style={{ height: "2em", width: "2em" }}
          onClick={onAdd}
          disabled={soldOut}
        />
      </div>
    </div>
  );
};
