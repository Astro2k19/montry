import React from "react";
import Balance from "../../components/Balance";

const Home = () => {
  return (
    <div className={"dashboardHome"}>
      <h3 className="balanceText">Account Balance</h3>
      <Balance />
    </div>
  );
};
export default Home;
