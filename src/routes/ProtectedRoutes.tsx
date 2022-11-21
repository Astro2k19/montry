import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.authUser);

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
export default ProtectedRoutes;
