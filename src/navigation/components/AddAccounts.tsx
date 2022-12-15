import React from "react";
import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import styles from "@styles/components/Navigation.module.scss";
import { ReactComponent as Expenses } from "@assets/icons/Expense.svg";
import { ReactComponent as Income } from "@assets/icons/Income.svg";
import { ReactComponent as MoneyExchange } from "@assets/icons/Money-Exchange.svg";
import { AddAccount } from "@/navigation/components/AddAccount";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const accountsList = [
  {
    path: "transaction",
    children: <MoneyExchange />,
    classes: styles.addTransaction,
  },
  { path: "expenses", children: <Expenses />, classes: styles.addExpense },
  { path: "income", children: <Income />, classes: styles.addIncome },
];

export const AddAccounts = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button className={styles.addAccounts}>
        <PlusIcon />
      </button>
      <div className={styles.accountsList}>
        {accountsList.map((item) => (
          <AddAccount {...item} />
        ))}
      </div>
    </>
  );
};
