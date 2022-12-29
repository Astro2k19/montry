import React from "react";
import { Balance } from "./components/Balance";
import { Header } from "@/routes/Dashboard/components/Header";
import { useGetDashboardGeneralDataQuery } from "@/redux/api/apiDashboard";
import { useAppSelector } from "@/redux/hooks";
import { SpendingChart } from "@/routes/Dashboard/components/SpendingChart";
import { SpendingChartFiltr } from "@/routes/Dashboard/components/SpendingChartFiltr";
import { RecentTransactions } from "@/routes/Dashboard/components/RecentTransactions";
import { AccountBox } from "@/routes/Dashboard/components/AccountBox";
import { ReactComponent as IncomeIcon } from "@assets/icons/Income.svg";
import { ReactComponent as ExpenseIcon } from "@assets/icons/Expense.svg";
import { useGetSpecificUserFieldQuery } from "@/redux/api/apiSlice";
import TopPanel from "@/components/ui/TopPanel";
import styles from "@/scss/routes/Dashboard.module.scss";
import { serverTimestamp } from "firebase/firestore";

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

const transactionsData = [
  {
    icon: "",
    title: "Shopping",
    description: "Buy some grocery",
    price: 120,
    timestamp: serverTimestamp(),
  },
];

const Home = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingGeneral, data } = useGetDashboardGeneralDataQuery(
    authUser?.uid
  );
  const { data: spendingData, isLoading: isLoadingSpending } =
    useGetSpecificUserFieldQuery({
      fieldName: "transactions",
      uid: authUser?.uid,
    });
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetSpecificUserFieldQuery({
      fieldName: "transactions",
      uid: authUser?.uid,
    });

  const isLoading = () => {
    return [isLoadingGeneral, isLoadingSpending, isLoadingTransactions].some(
      Boolean
    );
  };

  let incomeStyle: React.CSSProperties = {
    backgroundColor: "#00A86B",
  };

  const expensesStyle: React.CSSProperties = {
    backgroundColor: "#FD3C4A",
  };

  console.log(data);

  return (
    <div className={styles.dashboardHome}>
      <Header />

      <TopPanel>
        <Balance amount={data?.balance} isLoading={isLoading()} />
        <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
          <AccountBox
            text={"Income"}
            amount={data?.income}
            Icon={<IncomeIcon />}
            compStyle={incomeStyle}
            isLoading={isLoading()}
          />
          <AccountBox
            text={"Expenses"}
            amount={data?.expenses}
            Icon={<ExpenseIcon />}
            compStyle={expensesStyle}
            isLoading={isLoading()}
          />
        </div>
      </TopPanel>
      <SpendingChart data={dataSpend} isLoading={isLoading()} />
      <SpendingChartFiltr />
      <RecentTransactions transactions={transactions} isLoading={isLoading()} />
    </div>
  );
};
export default Home;
