import { ReactNode } from 'react';
import './Popup.scss';
import classNames from 'classnames';
type PopupProps = {
  children: ReactNode;
  className?: string;
};

export default function Popup({ children, className }: PopupProps) {
  return (
    <div className={classNames('popup', className)}>
      <div className="popup__content">{children}</div>
    </div>
  );
}
