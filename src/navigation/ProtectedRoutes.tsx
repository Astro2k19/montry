import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {useIsUserSetupQuery} from "@/redux/api/apiSetup";

interface IProtectedRoutesProps {
  requireSetup?: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = ({
  requireSetup = true,
}) => {
  const { authUser } = useAppSelector((state) => state.auth);

  if (!authUser) return <Navigate to={"/login"} replace={true} />;

  const {data: isSetup, isLoading} = useIsUserSetupQuery({uid: authUser?.uid});

  console.log('protected route, is setup', isSetup);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return requireSetup ? (
      isSetup ? (
      <Outlet />
    ) : (
      <Navigate to={"/setup-account"} replace={true} />
    )
  ) : !isSetup ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} replace={true} />
  );
};
export default ProtectedRoutes;
