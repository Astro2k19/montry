import React from "react";
import styles from "@styles/components/Balance.module.scss";
import { BalanceSkeleton } from "@/routes/Dashboard/components/BalanceSkeleton";

export const Balance = ({ amount, isLoading }) => {
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <BalanceSkeleton />
      ) : (
        <>
          <h3 className={styles.balanceText}>Account Balance</h3>
          <span className={styles.balance}>{amount}</span>
        </>
      )}
    </div>
  );
};
