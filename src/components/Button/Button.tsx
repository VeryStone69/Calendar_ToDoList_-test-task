import React from 'react';

type Props = {
    callback: () => void
    title: string
    styleName?: string
}

export const Button = ({callback, title, styleName = ""}: Props) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        callback()
    }

    return (
        <button className={styleName} onClick={handleClick}>{title}</button>
    );
};
