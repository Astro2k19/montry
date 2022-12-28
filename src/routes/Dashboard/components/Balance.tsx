import React from "react";
import styles from "@styles/components/Balance.module.scss";
import { BalanceSkeleton } from "@/routes/Dashboard/components/BalanceSkeleton";

interface IBalance {
  amount: number | string;
  isLoading: boolean;
}

export const Balance: React.FC<IBalance> = ({ amount = 0, isLoading }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.balanceText}>Account Balance</h3>
      {isLoading ? (
        <BalanceSkeleton />
      ) : (
        <span className={styles.balance}>{amount}</span>
      )}
    </div>
  );
};
