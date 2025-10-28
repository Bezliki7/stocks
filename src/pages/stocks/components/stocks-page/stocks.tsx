import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import useStore from '../../../../hooks/use-store';
import { Container, ListContainer } from './stocks.css';
import Modals from '../modals/modals';
import List from '../list/list';
import Header from '../header/header';

const StocksPage = () => {
  const { store } = useStore();

  useEffect(() => {
    store.getModel();
  }, [store]);

  return (
    <Container>
      <ListContainer>
        <Header />

        <List />
      </ListContainer>

      <Modals />
    </Container>
  );
};

export default observer(StocksPage);
