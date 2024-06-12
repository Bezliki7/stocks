import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import StoreContext, { contextValue } from './store/store.context';
import Stocks from './pages/stocks/components/stocks-page/stocks';
import './App.css';

function App() {
  return (
    <StoreContext.Provider value={contextValue}>
      <Stocks />
    </StoreContext.Provider>
  );
}

export default App;
