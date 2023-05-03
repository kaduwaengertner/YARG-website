import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import styles from '@/styles/PageTitle.module.css'

type Props = {
    title?: string,
    description?: string,
    sticky?: boolean,
    children?: React.ReactNode
}

const PageTitle: React.FC<Props> = ({title, description, children, sticky = false}) => {
  return <div data-sticky={sticky}  className={styles.titleBox}>
    <div className={styles.text}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{description}</span>
    </div>
    <div className={styles.children}>
      {children}
    </div>
  </div>;
}

export default PageTitle;

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
}

const PageButton: React.FC<ButtonProp> = ({children, onClick, onAction, disabled}) => {

  const onKeyDown:KeyboardEventHandler<HTMLDivElement> = (event) => {
    if(["enter", " "].includes(event.key.toLowerCase())) {
        if(onAction) {
            onAction();
        }
    }
  };

  return <div role="button" tabIndex={0} aria-pressed="false" onClick={onClick || onAction as MouseEventHandler} onKeyDown={onKeyDown} className={styles.button} data-disabled={!!disabled}>
    {children}
  </div>
}

export { PageButtons, PageButton };