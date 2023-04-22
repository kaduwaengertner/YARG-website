import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from '@/styles/Tag.module.css';

type Props = {
    background?: string,
    color?: string,
    style?: CSSProperties,
    className?: string,
    attributes?: any,
    onClick?: MouseEventHandler,
    onAction?: Function,
    children?: React.ReactNode
}

const Tag: React.FC<Props> = ({background = "var(--tag-background)", color = "rgb(var(--accent))", style = {}, className, children, onClick, onAction, attributes}) => {

    const onKeyDown = (event: KeyboardEvent) => {
        if(["enter", " "].includes(event.key.toLowerCase())) {
            if(onAction) {
                onAction();
            }
        }
    };

    return <div role="button" tabIndex={0} aria-pressed="false" onClick={onClick || onAction as MouseEventHandler} onKeyDown={onKeyDown} style={{background, color, ...style}} className={`${styles.tag} ${className}`} {...attributes}>
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