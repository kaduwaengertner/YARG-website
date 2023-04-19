import React, { MouseEventHandler } from 'react';
import styles from '@/styles/HomeComponent.module.css'

type Props = {
    title?: string,
    description?: string
    children?: React.ReactNode
}

const HomeComponent: React.FC<Props> = ({title, description, children}) => {
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

export default HomeComponent;
