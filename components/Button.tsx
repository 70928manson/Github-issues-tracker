import React, { ReactNode } from 'react';
import styles from '../styles/modules/button.module.scss';

interface IButtonProps {
  type?: string;
  variant: string;
  children: ReactNode;
  onClick?: () => void;
}

interface ISelectButtonProps {
  children: ReactNode;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

function Button({ type, variant = 'primary', children, ...rest }: IButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }: ISelectButtonProps) {
  return (
    <select
      id={id}
      className={`${styles.button} ${styles.button__select}`}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;