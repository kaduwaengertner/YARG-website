import React from 'react';
import styles from '@/styles/Tag.module.css';

type Props = {
    background?: string,
    color?: string,
    children?: React.ReactNode
}

const Tag: React.FC<Props> = ({background = "var(--tag-background)", color = "var(--accent)", children}) => {

    return <div style={{background, color}} className={styles.tag}>
        {children}
    </div>;
}

export default Tag;