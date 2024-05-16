import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Statistics from "./pages/stocks/stocks";
import StoreContext, { contextValue } from "./store/store.context";
import "./App.css";

function App() {
  return (
    <StoreContext.Provider value={contextValue}>
      <Statistics />
      {/* <Test /> */}
    </StoreContext.Provider>
  );
}

export default App;
