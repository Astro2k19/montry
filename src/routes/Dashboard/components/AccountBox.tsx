import React from "react";
import styles from "@styles/components/AccountBox.module.scss";

interface IAccountBox {
  text: string;
  amount: string | number;
  Icon: React.ComponentType;
  compStyles: React.CSSProperties;
}

export const AccountBox: React.FC<IAccountBox> = ({
  text,
  amount,
  Icon,
  compStyles,
}) => {
  return (
    <div className={styles.accountBox} styles={compStyles}>
      <Icon />
      <div>
        <span className={styles.text}>{text}</span>
        <span className={styles.amount}>{amount}</span>
      </div>
    </div>
  );
};
