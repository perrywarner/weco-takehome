import React, { FC } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { MenuEntry } from "./types/MenuEntry";
import { parseHtmlContent } from "./utils/parseHtmlContent";

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

const ApiTestComponent = () => {
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
    return (
      <div>
        {menuEntries.map((entry) => {
          // needed since:
          // * entry.item.description looks like "<span data-sheets-value="...">puffed tofu, snow peas...</span>"
          // * where we only care about "puffed tofu, snow peas..." here
          const parsedDescription = parseHtmlContent(entry.item.description);

          // TODO extract as component
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
        })}
      </div>
    );
  }
};
