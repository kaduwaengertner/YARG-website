import { CSSProperties } from "react";

type HeaderButtonProps = {
    background?: string,
    color?: string,
    children?: React.ReactNode
    style?: CSSProperties,
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ background, color = "var(--background)", children, style }) => {
    return <button style={{ ...style, background, color }}>{children}</button>;
}

export { HeaderButton };