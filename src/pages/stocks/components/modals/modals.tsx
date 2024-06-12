import React from 'react';
import { observer } from 'mobx-react-lite';

import useStore from '../../../../hooks/use-store';
import PredictionModal from './prediction-modal/prediction-modal';

const Modals = () => {
  const { store } = useStore();

  return <>{store.isPredictionModalOpen ? <PredictionModal /> : null}</>;
};

export default observer(Modals);
