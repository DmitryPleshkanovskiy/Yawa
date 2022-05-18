import { Notifications } from "components/simple";
import React from "react";

import Router from "router";

import { ContextProvider } from "store";

function App() {
  return (
    <ContextProvider>
      <Router />
      <Notifications />
    </ContextProvider>
  );
}

export default App;
