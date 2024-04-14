import { ReactNode } from 'react';
import './Button.scss';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
};

export default function Button({
  children,
  className,
  onClick,
  disabled = false,
  type = 'submit',
}: ButtonProps) {
  return (
    <button
      className={classNames('button', className)}
      {...{ onClick, disabled, type }}
    >
      {children}
    </button>
  );
}
