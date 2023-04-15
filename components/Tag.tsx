import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from '@/styles/Tag.module.css';

type Props = {
    background?: string,
    color?: string,
    style?: CSSProperties,
    className?: string,
    attributes?: any,
    onClick?: MouseEventHandler,
    children?: React.ReactNode
}

const Tag: React.FC<Props> = ({background = "var(--tag-background)", color = "var(--accent)", style = {}, className, children, onClick, attributes}) => {

    return <div onClick={onClick} style={{background, color, ...style}} className={`${styles.tag} ${className}`} {...attributes}>
        {children}
        <style jsx>{`
            .clickable {
                cursor: pointer;
            }

            [data-active="false"] {
                opacity: 0.5;
            }
        `}</style>
    </div>;
}

export default Tag;