import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";
import React from "react";
import styles from "@styles/routes/EntryForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import Loader from "@/components/ui/Loader";
import {LoginForm} from "@/routes/Auth/components/LoginForm";
import {DASHBOARD_SCREEN} from "@/navigation/CONSTANTS";
import {useIsUserSetupQuery} from "@/redux/api/apiSetup";

export const LoginPage = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const {data: isSetup} = useIsUserSetupQuery({uid: authUser?.uid});
  const navigate = useNavigate();

    console.log('login page, is setup', isSetup);

  React.useEffect(() => {
    if (authUser && isSetup) navigate(DASHBOARD_SCREEN, { replace: true });
  }, []);

  return (
    <>
      <TopBar text={"Login"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        <LoginForm />
      </div>
    </>
  );
};
