import React from 'react';
import { observer } from 'mobx-react-lite';

import useStore from '../../../../../../../hooks/use-store';
import Checkbox from '../../../../../../../components/ui/checkbox/checkbox';
import Fieldset from '../../../../../../../components/fieldset/fieldset';

const RiskSelector = () => {
  const { store } = useStore();

  const handleChange = (value: boolean) => {
    store.setProperties({ isMoreRisk: value });
  };

  return (
    <Fieldset title="Риск портфеля">
      <Checkbox
        title="Выбор боллее прибыльных и рисковых портфелей"
        checked={store.isMoreRisk}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export default observer(RiskSelector);
