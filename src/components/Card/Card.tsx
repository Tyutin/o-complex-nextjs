import classNames from 'classnames';
import { ReactNode } from 'react';

import './Card.scss'

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return <div className={classNames('card', className)}>{children}</div>;
}
