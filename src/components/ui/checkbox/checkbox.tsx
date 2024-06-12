import React from 'react';

import { CheckboxContainer } from './checkbox.css';

import { CheckboxProps } from './checkbox.interface';

const Checkbox = ({ title, checked, onChange }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange(checked);
  };

  return (
    <CheckboxContainer>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <label>{title}</label>
    </CheckboxContainer>
  );
};

export default Checkbox;
