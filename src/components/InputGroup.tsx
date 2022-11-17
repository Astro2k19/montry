import React from "react";
import styles from '@styles/components/Input.module.scss';

export const InputGroup = ({children}: React.PropsWithChildren) => {
    return <div className={styles.inputGroup}>{children}</div>
}
