import React from "react";
import styles from "@styles/components/AccountBox.module.scss";

interface IAccountBox {
  text: string;
  amount: string | number;
  Icon: React.ReactElement;
  compStyle: React.CSSProperties;
}

export const AccountBox: React.FC<IAccountBox> = ({
  text,
  amount,
  Icon,
  compStyle,
}) => {
  return (
    <div className={styles.accountBox} style={compStyle}>
      <Icon />
      <div>
        <span className={styles.text}>{text}</span>
        <span className={styles.amount}>{amount}</span>
      </div>
    </div>
  );
};
