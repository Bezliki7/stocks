import React from 'react';
import { observer } from 'mobx-react-lite';

import useStore from '../../../../hooks/use-store';
import PredictionModal from './prediction-modal/prediction-modal';
import ModelInfoModal from './model-info-modal/model-info-modal';

const Modals = () => {
  const { store } = useStore();

  return (
    <>
      {store.isPredictionModalOpen ? <PredictionModal /> : null}

      {store.isModelInfoOpen ? <ModelInfoModal /> : null}
    </>
  );
};

export default observer(Modals);
