import React from "react";
import logo from "./logo.svg";
import QueryExample from "./QueryExample";
import { ApiTest } from "./ApiTest";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ApiTest />
        {/* <QueryExample /> */}
      </header>
    </div>
  );
};

export default App;
