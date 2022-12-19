import React from "react";
import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";
import styles from "@styles/routes/EntryForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { SignUpForm } from "@/routes/Auth/components/SignUpForm";
import {
  AUTH_SCREEN,
  DASHBOARD_SCREEN,
  SETUP_ACCOUNT_SCREEN,
} from "@/navigation/CONSTANTS";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import { useSignUpNewUserMutation } from "@/redux/api/apiSlice";
import Loader from "@/components/ui/Loader";

export const SignUpPage = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { data: isSetup } = useIsUserSetupQuery({ uid: authUser?.uid });
  const [signUpNewUser, { isSuccess, isLoading, isError, error }] =
    useSignUpNewUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUpWithEmail = async (
    email: string,
    name: string,
    password: string
  ) => {
    await signUpNewUser({
      email,
      name,
      password,
      dispatch,
    });
  };

  if (authUser && isSetup) {
    return <Navigate to={DASHBOARD_SCREEN} replace={true} />;
  }

  console.log(isSuccess);

  if (isSuccess) {
    return <Navigate to={SETUP_ACCOUNT_SCREEN} replace={true} />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <TopBar text={"Sign Up"} type={TopBarTypes.DARK} backPath={AUTH_SCREEN} />
      <div className={styles.root}>
        {isError && <p>{error.message}</p>}
        <SignUpForm formHandler={signUpWithEmail} />
      </div>
    </>
  );
};
