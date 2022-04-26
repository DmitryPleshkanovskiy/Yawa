import React from "react";

import Router from "router";

import { ContextProvider } from "store";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
