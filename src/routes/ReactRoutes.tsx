import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router";
import { LaunchScreen } from "./Onboarding/LaunchScreen";
import { Auth } from "./Onboarding/Auth";
import { ErrorPage } from "./ErrorPage";
import { Login } from "./Onboarding/Auth/Login";
import { SignUp } from "./Onboarding/Auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Dashboard";
import Home from "./Dashboard/Home";
import Transactions from "./Dashboard/Transactions";
import Profile from "./Dashboard/Profile";
import SetupRoutes from "./SetupRoutes";
import SetupAccountIndex from "./SetupAccount";
import NewAccount from "./SetupAccount/newAccount";

const ReactRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LaunchScreen />} />
      <Route path="/auth" element={<Auth />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes requireSetup={false} />}>
        <Route index path="setup-account" element={<SetupAccountIndex />} />
        <Route path="setup-balance" element={<NewAccount />} />
      </Route>
    </Routes>
  );
};
export default ReactRoutes;
