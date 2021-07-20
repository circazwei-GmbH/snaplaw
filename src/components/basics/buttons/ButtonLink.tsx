import React from 'react';

import Button from "./Button";

interface ButtonPropsInterface {
    text: string;
    to: string;
    style?: object,
    type?: 'primary' | 'secondary'
}

export default function ButtonLink({ text, style, type } : ButtonPropsInterface) {

    const onPressHandler = () => {
        // tbd
    }

    return (
        <Button text={text} style={style} type={type} onPress={onPressHandler} />
    )
}