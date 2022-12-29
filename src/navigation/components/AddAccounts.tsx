import React from "react";
import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import styles from "@styles/components/Navigation.module.scss";
import { ReactComponent as Expenses } from "@assets/icons/Expense.svg";
import { ReactComponent as Income } from "@assets/icons/Income.svg";
import { ReactComponent as MoneyExchange } from "@assets/icons/Money-Exchange.svg";
import { AddAccount } from "@/navigation/components/AddAccount";
import { motion } from "framer-motion";

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

  const toggleButton = () => {
    setIsOpen((prevState) => !prevState);
  };

  const list = accountsList.map((item) => <AddAccount {...item} />);
  return (
    <motion.button
      className={styles.addAccounts}
      whileTap={{ scale: 0.97 }}
      onClick={() => setIsOpen((prevState) => !prevState)}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.span variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}>
        <PlusIcon />
      </motion.span>
      <motion.div
        className={styles.accountsList}
        variants={{
          open: { scale: 1 },
          closed: { scale: 0 },
        }}
      >
        {list}
      </motion.div>
    </motion.button>
  );
};
