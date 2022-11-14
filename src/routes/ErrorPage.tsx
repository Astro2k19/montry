import React from "react";
// import styles from './Starter.module.scss';
import {useRouteError} from "react-router";

export const ErrorPage: React.FC = () => {
    const error = useRouteError();

    return (
        <div>
            {error.message}
        </div>
    );
}

