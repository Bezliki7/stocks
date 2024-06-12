import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { LineChart } from '@mui/x-charts';
import { format } from 'date-fns';

import useStore from '../../../../../../../hooks/use-store';
import { ChartsContainer, HeaderContainer } from './graph-chart.css';
import { Button, DatePicker } from '../../../../../../../components/ui';
import { determineTrendType } from '../../../../../../../utils/trend';
import Fieldset from '../../../../../../../components/fieldset/fieldset';
import Alert from '../../../../../../../components/alert/alert';

const GraphChart = () => {
  const { store } = useStore();
  const [isFetched, setFetched] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const onChange = (type: 'startDate' | 'endDate', value: string) => {
    console.log(value);
    store.setProperties({ [type]: value });
  };

  const handleClick = async () => {
    await store.getMoexIndexesByPeriod();
    setFetched(true);
  };
  const arr: any = [['Index', 'Date']];

  const indexes = store.moexIndexes.map((el) => +el.index);
  const dates = store.moexIndexes.map((el, i) => {
    const date = new Date(el.date);
    arr.push([date, indexes[i]]);
    return date;
  });

  const type = determineTrendType(indexes);

  return (
    <Fieldset title="График">
      <HeaderContainer>
        <DatePicker
          defaultValue={new Date(store.startDate)}
          onChange={(value) => onChange('startDate', value.toISOString())}
          style={{ height: 23 }}
        />
        <DatePicker
          defaultValue={new Date(store.endDate)}
          onChange={(value) => onChange('endDate', value.toISOString())}
          style={{ height: 23 }}
        />
        <Button variant="default" onClick={handleClick}>
          Получить данные
        </Button>

        <Button
          variant="default"
          onClick={() => setAlertOpen(true)}
          disabled={!store.moexIndexes.length}>
          Просмотр графика
        </Button>
      </HeaderContainer>

      {isAlertOpen ? (
        <Alert onClose={() => setAlertOpen(false)}>
          {store.moexIndexes.length ? (
            <ChartsContainer>
              {type}

              <LineChart
                xAxis={[
                  {
                    data: dates,
                    scaleType: 'time',
                    valueFormatter: (date) => format(date, 'dd.MM.yyyy'),
                  },
                ]}
                series={[
                  {
                    data: indexes,
                  },
                ]}
                width={800}
                height={400}
              />
            </ChartsContainer>
          ) : (
            isFetched && 'данные за такой период не найдены'
          )}
        </Alert>
      ) : null}
    </Fieldset>
  );
};

export default observer(GraphChart);
