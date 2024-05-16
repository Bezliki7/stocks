// @ts-ignore
import React from 'react';

import styles from './button.module.css';

type ButtonVariants = 'ghost' | 'default';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant: ButtonVariants;
  children: React.ReactNode;
}

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
};
