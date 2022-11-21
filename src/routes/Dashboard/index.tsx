import React from "react";
import Navigation from "@components/Navigation";
import styles from "@styles/routes/Dashboard.module.scss";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={styles.dashboardPage}>
      <Outlet />
      <Navigation />
    </div>
  );
};
export default Dashboard;
