import React from "react";

import Router from "router";

import { ContextProvider } from "context";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
