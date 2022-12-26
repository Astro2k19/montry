import React from "react";
import { TransactionSkeleton } from "@/components/TransactionSketeton";

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
}
export const RecentTransactions: React.FC<IRecentTransactions> = ({
  transactions,
  isLoading,
}) => {
  const data = transactions.map((item) => {
    const formatedDate = new Date(item.timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return (
      <div className={"transactionItem"}>
        <div className="icon">{item.icon}</div>
        <div className="transactionBody">
          <h6>{item.title}</h6>
          <div className="transactionDescription">{item.description}</div>
        </div>
        <div className="transactionMeta">
          <div className="transactionPrice">{item.price}</div>
          <div className="transactionTime">{formatedDate}</div>
        </div>
      </div>
    );
  });

  return (
    <div className={"recentTransactions"}>
      <div className="recentTransactionHeader">
        <p>Recent Transaction</p>
        <button onClick={console.log}>See All</button>
      </div>
      {isLoading
        ? new Array(3).fill(0).map(() => <TransactionSkeleton />)
        : data}
    </div>
  );
};
