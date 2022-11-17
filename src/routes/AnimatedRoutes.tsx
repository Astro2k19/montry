import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router";
import { Starter } from "./Starter";
import { ErrorPage } from "./ErrorPage";
import { Auth } from "./Auth";
import { Login } from "./Auth/Login";
import { SignUp } from "./Auth/SignUp";
import { AnimatePresence } from "framer-motion";

export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Starter />} errorElement={<ErrorPage />} />
        <Route path="/auth" element={<Auth />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Starter />} errorElement={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};
