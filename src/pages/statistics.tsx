// @ts-ignore
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, DatePicker } from 'antd';
import { observer } from 'mobx-react-lite';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import TrendChart from '../components/trend-chart';

import useStore from '../hooks/use-store';
import { determineTrendType } from '../utils/trend';
import { ChartsContainer, Container, HeaderContainer } from './styled.css';

const Statistics = () => {
  const { store } = useStore();
  const [isFetched, setFetched] = useState(false);

  const onChange = (type: 'startDate' | 'endDate', value: string) => {
    store.setProperties({ [type]: value });
  };

  const onCLick = async () => {
    await store.getMoexIndexesByPeriod();
    setFetched(true);
  };
  const arr: any = [['Index', 'Date']];

  const indexes = store.statics.map((el) => +el.index);
  const dates = store.statics.map((el, i) => {
    const date = new Date(el.date);
    arr.push([date, indexes[i]]);
    return date;
  });

  const type = determineTrendType(indexes);

  return (
    <Container>
      <HeaderContainer>
        <DatePicker
          onChange={(value) => onChange('startDate', value.toISOString())}
          style={{ height: 32 }}
        />
        <DatePicker
          onChange={(value) => onChange('endDate', value.toISOString())}
          style={{ height: 32 }}
        />
        <Button
          title="получить данные"
          type="default"
          onClick={onCLick}
          children={'получить данные'}
        />

        {store.statics.length ? type : null}
      </HeaderContainer>

      {store.statics.length ? (
        <ChartsContainer>
          <TrendChart data={arr} />

          <LineChart
            xAxis={[
              {
                data: dates,
                scaleType: 'time',
                valueFormatter: (date) => dayjs(date).format('DD.MM.YYYY'),
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
    </Container>
  );
};

export default observer(Statistics);
