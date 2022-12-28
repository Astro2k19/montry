import React from "react";
import styles from "@styles/components/AccountBox.module.scss";
import { AccountBoxSkeleton } from "@/routes/Dashboard/components/AccountBoxSkeleton";

interface IAccountBox {
  text: string;
  amount: string | number;
  Icon: React.ComponentType;
  compStyle: React.CSSProperties;
  isLoading: boolean;
}

export const AccountBox: React.FC<IAccountBox> = ({
  text,
  amount,
  // Icon,
  compStyle,
  isLoading,
}) => {
  return isLoading ? (
    <AccountBoxSkeleton />
  ) : (
    <div className={styles.accountBox} style={compStyle}>
      {/*<Icon />*/}
      <div>
        <span className={styles.text}>{text}</span>
        <span className={styles.amount}>{amount}</span>
      </div>
    </div>
  );
};
