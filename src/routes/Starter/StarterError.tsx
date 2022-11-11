import React from "react";
import styles from './Starter.module.scss';
import {useRouteError} from "react-router";

export const StarterError: React.FC = () => {
    const error = useRouteError();

    return (
        <div className={styles.root}>
            {error.message}
        </div>
    );
}

