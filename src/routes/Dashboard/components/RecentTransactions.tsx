import React from "react";
import { TransactionSkeleton } from "@/components/TransactionSketeton";
import styles from "@/scss/components/Transactions.module.scss";

interface ITransaction {
  icon: string;
  title: string;
  description: string;
  price: number | string;
  timestamp: Date;
}

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
  const data = transactions.map((item) => {
    const formattedDate = new Date(item.timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return (
      <div className={styles.transactionItem}>
        <div className="icon">{item.icon}</div>
        <div className={styles.transactionBody}>
          <h6>{item.title}</h6>
          <div className={styles.transactionDescription}>
            {item.description}
          </div>
        </div>
        <div className={styles.transactionMeta}>
          <div className={styles.transactionPrice}>{item.price}</div>
          <div className={styles.transactionTime}>{formattedDate}</div>
        </div>
      </div>
    );
  });

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
