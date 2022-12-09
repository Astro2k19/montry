import { TopBar, TopBarTypes } from "../../../navigation/components/TopBar";
import React from "react";
import styles from "@styles/routes/EntryForm.module.scss";
import { Link } from "react-router-dom";
import { DataInput } from "@components/DataInput";
import { InputGroup } from "@components/InputGroup";
import { Button, ButtonType } from "@components/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router";
import Loader from "@components/Loader";
import { LogInUserWithCredentials } from "../../../redux/slices/authSlice";

export const Login = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    isReadRules: false,
  });
  const dispatch = useAppDispatch();
  const { status, error, authUser } = useAppSelector((state) => state.auth);
  const { isSetup } = useAppSelector((state) => state.setup);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.name) return;

    const name = event.target.name;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const logIn = async () => {
    dispatch(
      LogInUserWithCredentials({
        email: formData.email,
        password: formData.password,
      })
    );
  };

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
          <>
            <InputGroup>
              <DataInput
                handleOnChange={onChange}
                value={formData.email}
                placeholder={"Email"}
                type={"email"}
                name={"email"}
              />
              <DataInput
                handleOnChange={onChange}
                value={formData.password}
                placeholder={"Password"}
                type={"password"}
                name={"password"}
              />
              <Button
                text={"Login"}
                type={ButtonType.VIOLET}
                clickHandler={logIn}
              />
            </InputGroup>
            <p className={styles.bottomText}>
              Don’t have an account yet? <Link to={"/signup"}> Sign Up </Link>
            </p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
