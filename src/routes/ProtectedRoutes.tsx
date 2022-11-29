import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IProtectedRoutesProps {
  requireSetup?: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = ({
  requireSetup = true,
}) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { isSetupAccount } = useAppSelector((state) => state.setup);

  if (!authUser) return <Navigate to={"/login"} replace={true} />;

  return requireSetup ? (
    isSetupAccount ? (
      <Outlet />
    ) : (
      <Navigate to={"/setup-account"} replace={true} />
    )
  ) : !isSetupAccount ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} replace={true} />
  );
};
export default ProtectedRoutes;
