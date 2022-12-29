import React from "react";
import styles from "@styles/components/AccountBox.module.scss";
import { AccountBoxSkeleton } from "@/routes/Dashboard/components/AccountBoxSkeleton";

interface IAccountBox {
  text: string;
  amount: string | number;
  Icon: JSX.Element;
  compStyle: React.CSSProperties;
  isLoading: boolean;
}

export const AccountBox: React.FC<IAccountBox> = ({
  text,
  amount,
  Icon,
  compStyle,
  isLoading,
}) => {
  return isLoading ? (
    <AccountBoxSkeleton />
  ) : (
    <div className={styles.accountBox} style={compStyle}>
      {Icon}
      <div>
        <div className={styles.text}>{text}</div>
        <span className={styles.amount}>${amount}</span>
      </div>
    </div>
  );
};
