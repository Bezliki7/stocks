import React, { forwardRef } from 'react';

import { InputContainer } from './input.css';

interface InputProps extends React.ComponentProps<'input'> {
  isError?: boolean;
}

const Input = forwardRef(
  (
    { isError, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <InputContainer hasError={isError}>
        <input ref={ref} {...props} style={{ height: 20 }} />
      </InputContainer>
    );
  },
);

export default Input;
