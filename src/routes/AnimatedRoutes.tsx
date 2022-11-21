import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router";
import { LaunchScreen } from "./Onboarding/LaunchScreen";
import { ErrorPage } from "./ErrorPage";
import { Auth } from "./Onboarding/Auth";
import { Login } from "./Onboarding/Auth/Login";
import { SignUp } from "./Onboarding/Auth/SignUp";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./Dashboard/Home";
import Transactions from "./Dashboard/Transactions";
import Profile from "./Dashboard/Profile";

export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
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
      </Routes>
    </AnimatePresence>
  );
};
