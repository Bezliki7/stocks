import React from 'react';

import { FieldsetContainer, Legend, Content } from './fieldset.css';

import { FieldsetProps } from './fieldset.interface';

const Fieldset = ({ title, children }: FieldsetProps) => {
  return (
    <FieldsetContainer>
      <Legend>{title}</Legend>

      <Content>{children}</Content>
    </FieldsetContainer>
  );
};

export default Fieldset;
