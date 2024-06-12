import React, { useState } from 'react';

import { RadioButtonContainer, RadioButtonGroupContainer } from './radio-button.css';

import { RadioButtonGroupProps, RadioButtonProps } from './radio-button.interface';

const RadioButton = ({ value, title, checked, onChange }: RadioButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <RadioButtonContainer>
      <input type="radio" value={value} checked={checked} onChange={(e) => handleChange(e)} />
      <label>{title}</label>
    </RadioButtonContainer>
  );
};

const RadioButtonGroup = ({ options, defaultValue, onChange }: RadioButtonGroupProps) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
    setCurrentValue(value);
  };

  return (
    <RadioButtonGroupContainer onChange={handleChange}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          title={option.title}
          value={option.value}
          checked={currentValue === option.value}
        />
      ))}
    </RadioButtonGroupContainer>
  );
};

export default RadioButtonGroup;
