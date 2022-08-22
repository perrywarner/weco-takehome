import React from "react";
import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";
import sampleData from "../test/sampleApiData.json";
import { MenuEntry } from "../types/MenuEntry";

const testData: MenuEntry[] = sampleData;

describe("Menu", () => {
  // if I could've gotten Cypress going, Cypress would be appropriate to help test against the backing data too, making it more of an E2E test
  it("should generate Menu Items from the Menu data provided by props", () => {});
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
