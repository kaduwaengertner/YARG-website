import React from 'react';
import styles from '@/styles/Feature.module.css';

type Props = {
    title?: string,
    description?: string,
    image?: string,
}

const Feature: React.FC<Props> = ({title, description, image}) => {
    return (
        <div style={{background: image ? `var(--gradient), url(${image}) no-repeat right / 70%` : `var(--feature-background)`}}  className={styles.feature}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
        </div>
    );
}

export default Feature;