import React from "react";
import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";

import styles from "@styles/routes/EntryForm.module.scss";
import Loader from "@/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import {SignUpForm} from "@/routes/Auth/components/SignUpForm";

export const SignUpPage = () => {
  const { status, error, authUser } = useAppSelector((state) => state.auth);
  const { isSetup } = useAppSelector((state) => state.setup);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser && isSetup) navigate("/dashboard", { replace: true });
  }, []);

  React.useEffect(() => {
    if (status === "success") {
      navigate("/setup-account");
    }
  }, [status]);

  return (
    <>
      <TopBar text={"Sign Up"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        {status === "error" && <div>{error}</div>}

        {status === "loading" ? (
          <Loader />
        ) : status === "success" ||
          status === "initial" ||
          status === "error" ? (
          <>
           <SignUpForm />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
