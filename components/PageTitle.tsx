import React from 'react';
import styles from '@/styles/PageTitle.module.css'

type Props = {
    title?: string,
    description?: string
    children?: React.ReactNode
}

const PageTitle: React.FC<Props> = ({title, description, children}) => {
  return <div className={styles.titleBox}>
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
  children?: React.ReactNode
}

const PageButton: React.FC<ButtonProp> = ({children}) => {
  return <div className={styles.button}>
    {children}
  </div>
}

export { PageButtons, PageButton };