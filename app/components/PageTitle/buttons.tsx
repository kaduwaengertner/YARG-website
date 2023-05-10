
"use client";
import styles from './PageTitle.module.css';
import { KeyboardEventHandler, MouseEventHandler } from 'react';

type ButtonsProps = {
    children?: React.ReactNode
}

const PageButtons: React.FC<ButtonsProps> = ({children}) => {
  return <div className={styles.buttons}>
    {children}
  </div>;
}

type ButtonProp = {
  disabled?: boolean,
  onAction?: Function,
  onClick?: MouseEventHandler,
  children?: React.ReactNode
  className?: string,
}

const PageButton: React.FC<ButtonProp> = ({children, onClick, onAction, disabled, className = ""}) => {

  const onKeyDown:KeyboardEventHandler<HTMLDivElement> = (event) => {
    if(["enter", " "].includes(event.key.toLowerCase())) {
        if(onAction) {
            onAction();
        }
    }
  };

  return <div role="button" tabIndex={0} aria-pressed="false" onClick={onClick || onAction as MouseEventHandler} onKeyDown={onKeyDown} className={`${styles.button} ${className}`} data-disabled={!!disabled}>
    {children}
  </div>
}

export { PageButtons, PageButton };