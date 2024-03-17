// @ts-ignore
import React, { createContext } from 'react';
import { Store } from './store';

export const contextValue = {
  store: new Store(),
};
export const StoreContext = createContext(contextValue);

export default StoreContext;
