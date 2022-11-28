import React from "react";
import Navigation from "@components/Navigation";
import styles from "@styles/routes/Dashboard.module.scss";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { isSetupAccount } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSetupAccount) {
    }
  });

  return (
    <div className={styles.dashboardPage}>
      <Outlet />
      <Navigation />
    </div>
  );
};
export default Dashboard;
