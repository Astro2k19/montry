import React from "react";
import { Balance } from "./components/Balance";
import { Header } from "@/routes/Dashboard/components/Header";
import { useGetDashboardGeneralDataQuery } from "@/redux/api/apiDashboard";
import { useAppSelector } from "@/redux/hooks";
import { SpendingChart } from "@/routes/Dashboard/components/SpendingChart";
import { SpendingChartFiltr } from "@/routes/Dashboard/components/SpendingChartFiltr";
import { RecentTransactions } from "@/routes/Dashboard/components/RecentTransactions";
import { ITransaction } from "@/routes/Dashboard/components/TransactionItem";
import { AccountBox } from "@/routes/Dashboard/components/AccountBox";
import { ReactComponent as IncomeIcon } from "@assets/icons/Income.svg";
import { ReactComponent as ExpenseIcon } from "@assets/icons/Expense.svg";
import { useGetSpecificDocQuery } from "@/redux/api/apiSlice";
import TopPanel from "@/components/ui/TopPanel";
import styles from "@/scss/routes/Dashboard.module.scss";
import { Timestamp } from "firebase/firestore";
import foodIcon from "@/assets/icons/food.svg";
import shoppingIcon from "@/assets/icons/shopping.svg";
import transportationIcon from "@/assets/icons/transportation.svg";
import subscriptionIcon from "@/assets/icons/subscription.svg";
import { transformDataToArray } from "@/utils/utils";

const dataSpend = [
  {
    name: "Monday",
    uv: 4000,
  },
  {
    name: "Tuesday",
    uv: 5000,
  },
  {
    name: "Wednesday",
    uv: 2000,
  },
  {
    name: "Thursday",
    uv: 2780,
  },
  {
    name: "Friday",
    uv: 1890,
  },
  {
    name: "Sunday",
    uv: 2390,
  },
  {
    name: "Saturday",
    uv: 3490,
  },
];

const transactionsData: ITransaction[] = [
  {
    icon: foodIcon,
    title: "Food",
    description: "Buy a ramen",
    price: 120,
    timestamp: Timestamp.now(),
    type: "expense",
  },
  {
    icon: shoppingIcon,
    title: "Shopping",
    description: "Buy some grocery",
    price: 80,
    timestamp: Timestamp.now(),
    type: "expense",
  },
  {
    icon: subscriptionIcon,
    title: "Subscription",
    description: "Disney+ Annual..",
    price: 32,
    timestamp: Timestamp.now(),
    type: "income",
  },
];

const Home = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingGeneral, data } = useGetDashboardGeneralDataQuery(
    authUser?.uid
  );
  const { data: spendingData, isLoading: isLoadingSpending } =
    useGetSpecificDocQuery({
      path: "transactions",
      pathSegment: authUser?.uid,
      transformData: transformDataToArray,
    });

  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetSpecificDocQuery({
      path: "transactions",
      pathSegment: authUser?.uid,
      transformData: transformDataToArray,
    });

  const isLoading = () => {
    return [isLoadingGeneral, isLoadingSpending, isLoadingTransactions].some(
      Boolean
    );

    // return false;
  };

  const incomeStyle: React.CSSProperties = {
    backgroundColor: "#00A86B",
  };

  const expensesStyle: React.CSSProperties = {
    backgroundColor: "#FD3C4A",
  };

  return (
    <div className={styles.dashboardHome}>
      <Header />
      <TopPanel>
        <Balance amount={data?.balance} isLoading={isLoading()} />
        <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
          <AccountBox
            text={"Income"}
            amount={data?.income ?? 0}
            Icon={<IncomeIcon />}
            compStyle={incomeStyle}
            isLoading={isLoading()}
          />
          <AccountBox
            text={"Expenses"}
            amount={data?.expenses ?? 0}
            Icon={<ExpenseIcon />}
            compStyle={expensesStyle}
            isLoading={isLoading()}
          />
        </div>
      </TopPanel>
      <SpendingChart data={dataSpend} isLoading={isLoading()} />
      <SpendingChartFiltr />
      <RecentTransactions
        transactions={transactionsData}
        isLoading={isLoading()}
        isFetching={isLoading()}
      />
    </div>
  );
};
export default Home;
