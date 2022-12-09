import { TopBar, TopBarTypes } from "../../navigation/components/TopBar";
import React from "react";
import styles from "@styles/routes/EntryForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import Loader from "@/components/ui/Loader";
import {LoginForm} from "@/routes/Auth/components/LoginForm";

export const LoginPage = () => {
  const { status, error, authUser } = useAppSelector((state) => state.auth);
  const { isSetup } = useAppSelector((state) => state.setup);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser && isSetup) navigate("/dashboard", { replace: true });
  }, []);

  React.useEffect(() => {
    if (status === "success") {
      navigate("/dashboard", { replace: true });
    }
  }, [status]);

  return (
    <>
      <TopBar text={"Login"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        {status === "error" && <div>{error}</div>}
        {status === "loading" ? (
          <Loader />
        ) : status === "success" ||
          status === "error" ||
          status === "initial" ? (
              <LoginForm />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
