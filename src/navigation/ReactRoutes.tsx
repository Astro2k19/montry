import React from "react";
import { Routes, useLocation, Navigate } from "react-router-dom";
import { Route } from "react-router";
import { LaunchScreen } from "../routes/LaunchScreen";
import { Auth } from "../routes/Auth";
import { ErrorPage } from "./ErrorPage";
import { LoginPage } from "../routes/Auth/LoginPage";
import { SignUpPage } from "../routes/Auth/SignUpPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../routes/Dashboard";
import Home from "../routes/Dashboard/Home";
import Transactions from "../routes/Dashboard/Transactions";
import Profile from "../routes/Dashboard/Profile";
import SetupAccountIndex from "../routes/SetupAccount";
import NewAccount from "../routes/SetupAccount/newAccount";
import {
  ADD_EXPENSE_SCREEN,
  ADD_INCOME_SCREEN,
  AUTH_SCREEN,
  DASHBOARD_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  PROFILE_SCREEN,
  SETUP_ACCOUNT_SCREEN,
  SETUP_BALANCE_SCREEN,
  SETUP_LOGO_SCREEN,
  SIGNUP_SCREEN,
  TRANSACTIONS_SCREEN,
} from "./CONSTANTS";
import SetupLogo from "@/routes/SetupAccount/SetupLogo";
import { NewTransaction } from "@/routes/Dashboard/NewTransaction";

const incomeCategories = [
  {
    value: "salary",
    label: "Salary",
  },
  {
    value: "salary",
    label: "Salary",
  },
];

const expenseCategories = [
  {
    value: "food",
    label: "Food",
  },
  {
    value: "shopping",
    label: "Shopping",
  },
  {
    value: "subscription",
    label: "Subscription",
  },
  {
    value: "transportation",
    label: "Transportation",
  },
];

const ReactRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LaunchScreen />} />
      <Route
        path={AUTH_SCREEN}
        element={<Auth />}
        errorElement={<ErrorPage />}
      />
      <Route path={LOGIN_SCREEN} element={<LoginPage />} />
      <Route path={SIGNUP_SCREEN} element={<SignUpPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path={DASHBOARD_SCREEN}
          element={<Dashboard />}
          errorElement={<ErrorPage />}
        >
          <Route path={HOME_SCREEN} element={<Home />} />
          <Route path={TRANSACTIONS_SCREEN} element={<Transactions />} />
          <Route path={PROFILE_SCREEN} element={<Profile />} />
        </Route>
        <Route
          path={ADD_INCOME_SCREEN}
          element={
            <NewTransaction
              title={"Income"}
              categories={incomeCategories}
              style={{ background: "#00A86B" }}
            />
          }
        />
        <Route
          path={ADD_EXPENSE_SCREEN}
          element={
            <NewTransaction
              title={"Expense"}
              categories={expenseCategories}
              style={{ background: "#FD3C4A" }}
            />
          }
        />
      </Route>
      <Route element={<ProtectedRoutes requireSetup={false} />}>
        <Route
          index
          path={SETUP_ACCOUNT_SCREEN}
          element={<SetupAccountIndex />}
        />
        <Route path={SETUP_LOGO_SCREEN} element={<SetupLogo />} />
        <Route path={SETUP_BALANCE_SCREEN} element={<NewAccount />} />
      </Route>
    </Routes>
  );
};
export default ReactRoutes;
