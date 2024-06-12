import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormContext } from 'react-hook-form';

import Fieldset from '../../../../../../../components/fieldset/fieldset';
import Input from '../../../../../../../components/ui/input/input';
import useStore from '../../../../../../../hooks/use-store';
import { ErrorMessage, NameContainer } from './name.css';

import type { FormFields } from '../../../../../../../store/store.interface';

export const Name = () => {
  const { store } = useStore();

  const { register, formState, trigger } = useFormContext<FormFields>();

  const nameField = register('name', {
    required: {
      value: true,
      message: 'Поле "Название" обязательно',
    },
    minLength: {
      value: 2,
      message: 'Название должно состоять хотя бы из 2 букв',
    },
    maxLength: {
      value: 255,
      message: 'Кол-во букв в поле "Название" не должно превышать 255 букв',
    },
    onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      store.setProperties({ name: value });
      await trigger('name');
    },
  });

  return (
    <Fieldset title="Название">
      <NameContainer>
        <Input {...nameField} value={store.name} autoComplete="off" />
        <ErrorMessage>{formState.errors.name?.message}</ErrorMessage>
      </NameContainer>
    </Fieldset>
  );
};

export default observer(Name);
