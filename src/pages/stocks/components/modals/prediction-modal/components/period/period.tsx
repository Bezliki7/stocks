import React from 'react';
import { observer } from 'mobx-react-lite';

import { PeriodContainer } from './period.css';
import useStore from '../../../../../../../hooks/use-store';
import { PERIOD_TYPE, TRANSLATED_PERIOD_TYPE } from './period.constant';
import { PeriodType } from '../../../../../../../store/store.interface';
import RadioButtonGroup from '../../../../../../../components/ui/radio-button/radio-button';
import Fieldset from '../../../../../../../components/fieldset/fieldset';

const PeriodSelector = () => {
  const { store } = useStore();

  const options = Object.values(PERIOD_TYPE).map((v) => ({
    title: TRANSLATED_PERIOD_TYPE[v],
    value: v,
  }));

  const handleChange = (type: PeriodType) => {
    store.setProperties({ periodType: type });
  };

  return (
    <Fieldset title="Срок владения">
      <PeriodContainer>
        <RadioButtonGroup
          defaultValue={store.periodType}
          options={options}
          onChange={(v) => handleChange(v as PeriodType)}
        />
      </PeriodContainer>
    </Fieldset>
  );
};

export default observer(PeriodSelector);
