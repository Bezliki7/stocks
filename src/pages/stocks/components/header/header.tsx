import React from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../../components/ui';
import useStore from '../../../../hooks/use-store';
import { HeaderContainer } from './header.css';

const Header = () => {
  const { store } = useStore();

  const handleAddClick = () => {
    store.openPredictionModalToCreate();
  };

  const handleUpdateClick = () => {
    store.openPredictionModalToEdit();
  };

  const handleDeleteClick = () => {
    store.deletePortdolio();
  };

  return (
    <HeaderContainer>
      <Button variant="ghost" onClick={handleAddClick}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Button variant="ghost" onClick={handleUpdateClick} disabled={!store.selectedPortfolioId}>
        <FontAwesomeIcon icon={faPen} />
      </Button>

      <Button variant="ghost" onClick={handleDeleteClick} disabled={!store.selectedPortfolioId}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </HeaderContainer>
  );
};

export default observer(Header);
