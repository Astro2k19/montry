import React from "react";
import { Balance } from "./components/Balance";
import { Header } from "@/routes/Dashboard/components/Header";
import {
  useGetDashboardGeneralDataQuery,
  useGetSpendingDataQuery,
  useGetTransactionsQuery,
} from "@/redux/api/apiDashboard";
import { useAppSelector } from "@/redux/hooks";
import { SpendingChart } from "@/routes/Dashboard/components/SpendingChart";
import { SpendingChartFiltr } from "@/routes/Dashboard/components/SpendingChartFiltr";
import { RecentTransactions } from "@/routes/Dashboard/components/RecentTransactions";
import { AccountBox } from "@/routes/Dashboard/components/AccountBox";
import { ReactComponent as IncomeIcon } from "@assets/icons/Income.svg";
import { ReactComponent as ExpenseIcon } from "@assets/icons/Expense.svg";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Home = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingGeneral, data } = useGetDashboardGeneralDataQuery(
    authUser?.uid
  );
  const { data: spendingData, isLoading: isLoadingSpending } =
    useGetSpendingDataQuery({
      uid: authUser?.uid,
    });
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery({
      uid: authUser?.uid,
    });

  const isLoading = () => {
    return [isLoadingSpending, isLoadingTransactions, isLoadingGeneral].some(
      Boolean
    );
  };

  return (
    <div className={"dashboardHome"}>
      <Header />
      <Balance isLoading={isLoading()} />
      <div styles={{ display: "flex", gap: "16px" }}>
        <AccountBox text={"Income"} amount={500} Icon={<IncomeIcon />} />
        <AccountBox text={"Expenses"} amount={900} Icon={<ExpenseIcon />} />
      </div>
      <SpendingChart data={data} isLoading={isLoading()} />
      <SpendingChartFiltr />
      <RecentTransactions transactions={transactions} isLoading={isLoading()} />
    </div>
  );
};
export default Home;
