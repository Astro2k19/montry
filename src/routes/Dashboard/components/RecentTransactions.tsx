import React from "react";
import { TransactionSkeleton } from "@/components/TransactionSketeton";
import styles from "@/scss/components/Transactions.module.scss";
import {
  ITransaction,
  TransactionItem,
} from "@/routes/Dashboard/components/TransactionItem";

interface IRecentTransactions {
  transactions: ITransaction[];
  isLoading: boolean;
  isFetching: boolean;
}

export const RecentTransactions: React.FC<IRecentTransactions> = ({
  transactions,
  isLoading,
  isFetching,
}) => {
  const data = transactions.map((item) => <TransactionItem {...item} />);

  return (
    <div className={styles.recentTransactions}>
      <div className={styles.recentTransactionsHeader}>
        <h4>Recent Transaction</h4>
        <button onClick={console.log}>See All</button>
      </div>
      <div className={styles.recentTransactionsBody}>
        {isLoading
          ? new Array(3).fill(0).map(() => <TransactionSkeleton />)
          : data}
      </div>
    </div>
  );
};
