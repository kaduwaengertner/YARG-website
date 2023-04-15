import React from 'react';
import styles from '@/styles/PageTitle.module.css'

type Props = {
    title?: string,
    description?: string
}

const PageTitle: React.FC<Props> = ({title, description}) => {
  return <div className={styles.titleBox}>
    <h1 className={styles.title}>{title}</h1>
    <span className={styles.description}>{description}</span>
  </div>;
}

export default PageTitle;