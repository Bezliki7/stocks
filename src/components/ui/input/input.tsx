import React, { forwardRef } from 'react';
import { InputContainer } from './input.css';

interface InputProps extends React.ComponentProps<'input'> {}

const Input = forwardRef(({ ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <InputContainer>
      <input ref={ref} {...props} style={{ height: 20 }} />
    </InputContainer>
  );
});

export default Input;
