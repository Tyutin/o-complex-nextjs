import classNames from 'classnames';
import './Input.scss';
import { ChangeEvent } from 'react';
import ReactInputMask from 'react-input-mask';

type InputProps = {
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  mask?: string;
  maskChar?: string;
  placeholder?: string;
  size?: number;
};
export default function Input({
  className,
  value,
  onChange,
  placeholder,
  mask,
  maskChar,
  size,
}: InputProps) {
  if (mask) {
    return (
      <ReactInputMask
        className={classNames('input', className)}
        {...{ value, onChange, placeholder, mask, maskChar, size }}
      />
    );
  }
  return (
    <input
      type="text"
      className={classNames('input', className)}
      {...{ value, onChange, placeholder }}
    />
  );
}
