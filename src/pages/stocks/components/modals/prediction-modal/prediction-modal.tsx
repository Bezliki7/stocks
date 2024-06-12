import React from 'react';
import { observer } from 'mobx-react-lite';
import { FormProvider, useForm } from 'react-hook-form';

import Modal from '../../../../../components/modal/modal';
import useStore from '../../../../../hooks/use-store';
import GraphChart from './components/graph-chart/graph-chart';
import { ModalContent } from './prediction-modal.css';
import PeriodSelector from './components/period/period';
import RiskSelector from './components/risk/risk';
import Prediction from './components/prediction/prediction';
import Name from './components/name/name';

import type { FormFields } from '../../../../../store/store.interface';

const PredictionModal = () => {
  const { store } = useStore();

  const methods = useForm<FormFields>();

  const { trigger } = methods;

  const handleClose = () => {
    store.setPredictionModalOpen(false);
  };

  const handleSave = async () => {
    const isValid = await trigger('name');

    if (isValid) {
      store.save();
    }
  };

  return (
    <Modal onClose={handleClose} onSave={handleSave}>
      <ModalContent>
        <FormProvider {...methods}>
          <Name />
          <GraphChart />
          <RiskSelector />
          <PeriodSelector />
          <Prediction />
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default observer(PredictionModal);
