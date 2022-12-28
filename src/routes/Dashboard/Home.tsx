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
import { useGetSpecificUserFieldQuery } from "@/redux/api/apiSlice";
import TopPanel from "@/components/ui/TopPanel";

const dataSpend = [
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
    return false;
  };

  let incomeStyle: React.CSSProperties = {
    backgroundColor: "#00A86B",
  };

  const expensesStyle: React.CSSProperties = {
    backgroundColor: "#FD3C4A",
  };

  console.log(data);

  return (
    <div className={"dashboardHome"}>
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
