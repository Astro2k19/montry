import React from "react";
import styles from "@styles/components/AccountBox.module.scss";

export const AccountBox = ({ text, amount, Icon, compStyles }) => {
  return (
    <div className={styles.accountBox} styles={compStyles}>
      <Icon />g
      <div>
        <span className={styles.text}>{text}</span>
        <span className={styles.amount}>{amount}</span>
      </div>
    </div>
  );
};
