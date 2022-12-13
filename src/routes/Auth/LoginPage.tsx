import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";
import React from "react";
import styles from "@styles/routes/EntryForm.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import Loader from "@/components/ui/Loader";
import { LoginForm } from "@/routes/Auth/components/LoginForm";
import { DASHBOARD_SCREEN, SETUP_ACCOUNT_SCREEN } from "@/navigation/CONSTANTS";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import { useLogInUserWithCredentialsMutation } from "@/redux/api/apiSlice";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { data: isSetup } = useIsUserSetupQuery({ uid: authUser?.uid });
  const navigate = useNavigate();

  const [logInUserWithCredentials, { isSuccess, isLoading, isError, error }] =
    useLogInUserWithCredentialsMutation();

  const logInUser = async (email: string, password: string) => {
    console.log(email, password);
    if (email && password) {
      await logInUserWithCredentials({
        email,
        password,
      });
    }
  };

  React.useEffect(() => {
    if (authUser && isSetup) navigate(DASHBOARD_SCREEN, { replace: true });
  }, []);

  return isSuccess ? (
    <Navigate to={SETUP_ACCOUNT_SCREEN} replace={true} />
  ) : isLoading ? (
    <Loader />
  ) : (
    <>
      <TopBar text={"Login"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        {isError && <p>{error.message}</p>}
        <LoginForm formHandler={logInUser} />
      </div>
    </>
  );
};
