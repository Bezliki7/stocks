import { addDays, format } from 'date-fns';

import { PERIOD_TYPE } from '../pages/stocks/components/modals/prediction-modal/components/period/period.constant';

import type { PeriodType } from '../store/store.interface';

export const convertPeriodType = (value: PeriodType) => {
  const today = new Date();
  let date = '';

  switch (value) {
    case PERIOD_TYPE.SHORT:
      date = format(addDays(today, 30), 'dd-MM-yyyy');
      break;
    case PERIOD_TYPE.MID:
      date = format(addDays(today, 180), 'dd-MM-yyyy');
      break;
    case PERIOD_TYPE.LONG:
      date = format(addDays(today, 365), 'dd-MM-yyyy');
      break;
  }

  return date;
};
