import React from "react";
import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";
import styles from "@styles/routes/EntryForm.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/routes/Auth/components/SignUpForm";
import {DASHBOARD_SCREEN} from "@/navigation/CONSTANTS";
import {useIsUserSetupQuery} from "@/redux/api/apiSetup";

export const SignUpPage = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const {data: isSetup} = useIsUserSetupQuery({uid: authUser?.uid});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser && isSetup) navigate(DASHBOARD_SCREEN, { replace: true });
  }, [authUser]);

  return (
    <>
      <TopBar text={"Sign Up"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        <SignUpForm />
      </div>
    </>
  );
};
