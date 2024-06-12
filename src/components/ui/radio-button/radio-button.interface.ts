import React from 'react';

export type RadioButtonProps = {
  title: string;
  value: string | number;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Options = {
  title: string;
  value: string | number;
};

export type RadioButtonGroupProps = {
  options: Options[];
  defaultValue: string | number;
  onChange: (v: string | number) => void;
};
