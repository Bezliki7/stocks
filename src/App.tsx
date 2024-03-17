// @ts-ignore
import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Statistics from './pages/statistics';
import StoreContext, { contextValue } from './store/store.context';
import './App.css';


function App() {
  return (
    <StoreContext.Provider value={contextValue}>
      <Statistics />
    </StoreContext.Provider>
  );
}

export default App;
