import React from "react";
import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";
import sampleData from "../test/sampleApiData.json";
import { MenuEntry } from "../types/MenuEntry";

const testData: MenuEntry[] = sampleData;

describe("Menu", () => {
  // In the future, Cypress E2E would be a good extra step since it actually looks at a browser and relies on the API for data instead of injecting data into components via props.
  it("should generate Menu Items from the Menu data provided by props", () => {
    render(<Menu data={testData} />);
    const menuItemName = testData[0].item.name;
    // note: getByText(menuItemName) isn't enough by itself since element also contains "SOLD OUT!!" and " |"
    const menuItemElement = screen.getByText(`SOLD OUT!! ${menuItemName} |`);
    expect(menuItemElement).toBeVisible();
  });
  it.todo("should make sure that Menu Items are sorted by Day");
  it.todo(
    "should enable the user to select one of Pickup or Delivery for a given Day"
  );
  it.todo(
    "should not allow the user to select both Pickup and Delivery for a given Day"
  );
  it.todo(
    "should enable the user to add one or more Menu Items to their order"
  );
  it.todo(
    "should enable the user to add one or more Menu Items to their order and then remove those items"
  );
  it.todo(
    "should not allow the user to remove an item when the quantity of that item is already 0"
  );
});
