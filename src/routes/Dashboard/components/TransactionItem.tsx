import React from "react";
import styles from "@/scss/components/Transactions.module.scss";
import classNames from "classnames/bind";
import { Timestamp } from "firebase/firestore";

const cx = classNames.bind(styles);

export interface ITransaction {
  icon: string;
  title: string;
  description: string;
  price: number | string;
  timestamp: Timestamp;
  type: "income" | "expense";
}

export const TransactionItem: React.FC<ITransaction> = ({
  icon,
  title,
  description,
  price,
  timestamp,
  type,
}) => {
  const formattedDate = new Date(timestamp.seconds).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  return (
    <div className={cx("transactionItem", type)}>
      <div className="icon">
        <img src={icon} alt="" />
      </div>
      <div className={styles.transactionBody}>
        <h6>{title}</h6>
        <div className={styles.transactionDescription}>{description}</div>
      </div>
      <div className={styles.transactionMeta}>
        <div className={styles.transactionPrice}>${price}</div>
        <div className={styles.transactionTime}>{formattedDate}</div>
      </div>
    </div>
  );
};
