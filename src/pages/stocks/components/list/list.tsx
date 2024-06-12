import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Container, Item } from './list.css';
import useStore from '../../../../hooks/use-store';

const List = () => {
  const { store } = useStore();

  useEffect(() => {
    const fetchPortfolios = async () => {
      await store.getPortfolios();
    };

    fetchPortfolios();
  }, []);

  return (
    <Container>
      {store.portfolios.map((portfolio) => (
        <Item
          selected={store.selectedPortfolioId === portfolio.id}
          key={portfolio.id}
          onClick={() => store.setSelectedPortfolioId(portfolio.id)}>
          {portfolio.name}
        </Item>
      ))}
    </Container>
  );
};

export default observer(List);
