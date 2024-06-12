import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

import useStore from '../../../../hooks/use-store';
import { Container, ListContainer } from './stocks.css';
import Modals from '../modals/modals';
import trainModel from '../../../../utils/train-model';
import List from '../list/list';
import Header from '../header/header';

const StocksPage = () => {
  const { store } = useStore();

  useEffect(() => {
    const initialize = async () => {
      await store.getStocks();
      if (!store.stocks.length) return;

      let maes: number[] = [];
      const data = localStorage.getItem('maed');

      if (data) {
        const parsed: number[] = JSON.parse(data);
        maes = parsed;
      } else {
        const { maes: newMaes, model } = await trainModel(store.stocks);
        runInAction(() => {
          store.model = model;
        });
        maes = newMaes;
        localStorage.setItem('maes', JSON.stringify(maes));
      }

      store.setMaesOnStocks(maes);
    };

    initialize();
  }, []);

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
