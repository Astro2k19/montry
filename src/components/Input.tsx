import React from "react";
import {IconBaseProps} from 'react-icons';
import styles from '@styles/components/Input.module.scss';

interface IInput {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
    type: string;
    name: string;
    Icon?: React.ElementType
}

export const Input: React.FC<IInput> = ({handleOnChange, value,type = 'text', placeholder = '', name = '', Icon}) => {
    return (
        <div className={styles.inputWrapper}>
            <input type={type} className={styles.input} placeholder={placeholder} value={value} onChange={handleOnChange} name={name}/>
            {Icon  ? <Icon /> : ''}
        </div>
    )
}
