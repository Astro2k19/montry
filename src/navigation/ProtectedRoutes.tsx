import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import Loader from "@/components/ui/Loader";

interface IProtectedRoutesProps {
  requireSetup?: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = ({
  requireSetup = true,
}) => {
  const { authUser } = useAppSelector((state) => state.auth);

  if (authUser === null || authUser === undefined)
    return <Navigate to={"/login"} replace={true} />;

  const {
    data: isSetup,
    isLoading,
    isFetching,
    isSuccess,
  } = useIsUserSetupQuery({
    uid: authUser?.uid,
  });

  console.log("protected route, is loading", isLoading);
  console.log("protected route, is success", isSuccess);

  // if (isFetching || isLoading) return <Loader />;

  if (isSuccess) {
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
  }
};
export default ProtectedRoutes;
