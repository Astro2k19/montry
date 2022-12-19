import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DASHBOARD_SCREEN } from "@/navigation/CONSTANTS";
import { useAppSelector } from "@/redux/hooks";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import { useNavigate } from "react-router";

export const useAuthUser = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { data: isSetup } = useIsUserSetupQuery({ uid: authUser?.uid });
  const navigate = useNavigate();

  if (authUser && isSetup) {
    navigate(DASHBOARD_SCREEN, { replace: true });
  }
};
