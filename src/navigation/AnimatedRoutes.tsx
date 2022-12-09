import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ReactRoutes from "./ReactRoutes";

export const AnimatedRoutes: React.FC = () => {
  return (
    <AnimatePresence>
      <ReactRoutes />
    </AnimatePresence>
  );
};
