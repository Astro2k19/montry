import React from "react";
import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";

import styles from "@styles/routes/EntryForm.module.scss";
import Loader from "@/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/routes/Auth/components/SignUpForm";
import {
  useGetSpecificUserFieldQuery,
  useSignUpNewUserMutation,
} from "@/redux/api/apiSlice";

export const SignUpPage = () => {
  const { authUser, isSetup } = useAppSelector((state) => state.auth);
  // const { isSetup } = useAppSelector((state) => state.setup);
  // const isSetup = false;
  // const { data } = useGetSpecificUserFieldQuery("isSetup", authUser?.uid ?? 0);
  // console.log(data);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser && isSetup) navigate("/dashboard", { replace: true });
  }, [isSetup]);

  return (
    <>
      <TopBar text={"Sign Up"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        <SignUpForm />
      </div>
    </>
  );
};
