import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuLoader } from "./components/MenuLoader";
import "./App.css";

const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  children?: React.ReactNode;
}

/**
 * ReactQueryProvider is a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) that initializes React Query and provides a reference to RQ to the rest of the app via React Context.
 *
 * React Query talks about this in their tutorial and this tutorial component is <QueryExample> in "src/QueryExample" if you're looking for an example
 *
 * @param children basic React [props.children](https://reactjs.org/docs/glossary.html#propschildren). Used explicitly here since this component is a HoC
 * @returns React [child components](https://reactjs.org/docs/glossary.html#propschildren)
 */
export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const App = () => {
  return (
    <ReactQueryProvider>
      <div className="App">
        <MenuLoader />
      </div>
    </ReactQueryProvider>
  );
};

export default App;
