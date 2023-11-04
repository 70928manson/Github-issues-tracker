import React, { ReactNode } from 'react';

import "../styles/components/button.css"

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

const Button: React.FC<IButtonProps> = ({ type, variant = 'primary', children, ...rest }) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`button button--${variant}`}
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
      className={`button button_select`}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;