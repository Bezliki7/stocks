import React from 'react';
import { observer } from 'mobx-react-lite';

import Modal from '../../../../../components/modal/modal';
import useStore from '../../../../../hooks/use-store';
import {
  ButtonsContainer,
  InfoContainer,
  ModalContent,
} from './model-info-modal.css';
import { Button } from '../../../../../components/ui';
import { trainModel } from '../../../../../utils/train-model';

const ModelInfoModal = () => {
  const { store } = useStore();

  const handleClose = () => {
    store.setProperties({ isModelInfoOpen: false });
  };

  const handleDownloadModel = () => {
    if (store.model) {
      store.model.save('downloads://model');
    }
  };

  const handleTrain = async () => {
    await store.getStocks();

    const { maes, model } = await trainModel(store.stocks);

    store.setProperties({ model });
    store.setMaesOnStocks(maes);
  };

  return (
    <Modal onClose={handleClose}>
      <ModalContent>
        {store.model ? (
          <InfoContainer>
            <span>Название модели: {store.model.name}</span>

            <ButtonsContainer>
              <Button variant='default' onClick={handleTrain}>
                Начать обучение модели
              </Button>

              <Button variant='default' onClick={handleDownloadModel}>
                Скачать модель
              </Button>
            </ButtonsContainer>
          </InfoContainer>
        ) : (
          'Модель не загружена'
        )}
      </ModalContent>
    </Modal>
  );
};

export default observer(ModelInfoModal);
