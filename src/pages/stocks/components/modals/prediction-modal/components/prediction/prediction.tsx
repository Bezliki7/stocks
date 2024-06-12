import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import Fieldset from '../../../../../../../components/fieldset/fieldset';
import { Button } from '../../../../../../../components/ui';
import {
  ImageContainer,
  PredictionContainer,
  PredictionRow,
  StocksContainer,
} from './prediction.css';
import useStore from '../../../../../../../hooks/use-store';
import Alert from '../../../../../../../components/alert/alert';
import { convertPeriodType } from '../../../../../../../utils/period';
import { DATE_FORMAT } from '../../../../../../../store/store.constant';

const Prediction = () => {
  const { store } = useStore();
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const startDate = format(store.dateOfCreation, DATE_FORMAT);
  const endDate = convertPeriodType(store.periodType);
  const alertTitle = `акции c ${startDate} по ${endDate}`;

  const handleGetPredictions = async () => {
    setLoading(true);
    const data = localStorage.getItem('maes');

    if (!data) return;
    const parsedData = JSON.parse(data);

    if (parsedData) {
      store.setMaesOnStocks(parsedData);
      await store.getPrediction();
    }
    setLoading(false);
  };

  return (
    <Fieldset title="Портфель">
      <PredictionContainer>
        <Button variant="default" onClick={handleGetPredictions}>
          Получить акции
        </Button>

        <Button
          variant="default"
          onClick={() => setAlertOpen(true)}
          disabled={!store.predictionsIsReady || isLoading}>
          Просмотреть акции
        </Button>
      </PredictionContainer>

      {isAlertOpen ? (
        <Alert onClose={() => setAlertOpen(false)}>
          <StocksContainer>
            <span>{alertTitle}</span>

            {store.predictionOnStocks.map((p) => (
              <PredictionRow key={p.name}>
                <ImageContainer>
                  <img src={`src/assets/images/${p.name}.jpg`} />
                </ImageContainer>
                {p.name + ' - '} средняя цена {Math.round(p.profit) + 'p'} - {p.mae}
              </PredictionRow>
            ))}
          </StocksContainer>
        </Alert>
      ) : null}
    </Fieldset>
  );
};

export default observer(Prediction);
