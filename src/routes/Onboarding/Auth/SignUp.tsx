import React from "react";
import { TopBar, TopBarTypes } from "../../../components/TopBar";
import { DataInput } from "@components/DataInput";
import { InputGroup } from "@components/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import { Button, ButtonType } from "@components/Button";
import { Link } from "react-router-dom";
import googleLogo from "@assets/google.svg";
import Loader from "@components/Loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setUser,
  setStatus,
  signUpNewUser,
} from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    isReadRules: false,
  });
  const dispatch = useAppDispatch();
  const { status, error, authUser } = useAppSelector((state) => state.auth);
  const { isSetupAccount } = useAppSelector((state) => state.setup);
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

  const signUpWithEmail = async () => {
    await dispatch(
      signUpNewUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      })
    );
  };

  const signUpWithGoogleAcc = () => {};

  React.useEffect(() => {
    if (authUser && isSetupAccount) navigate("/dashboard", { replace: true });
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
            <InputGroup>
              <DataInput
                handleOnChange={onChange}
                value={formData.name}
                placeholder={"Name"}
                type={"text"}
                name={"name"}
              />
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
            </InputGroup>
            <div className={styles.rules}>
              <input
                type="checkbox"
                name="isReadRules"
                id="rules"
                onChange={onChange}
              />
              <p>
                By signing up, you agree to the{" "}
                <a href="#">Terms of Service and Privacy Policy</a>
              </p>
            </div>
            <InputGroup>
              <Button
                text={"Sign Up"}
                type={ButtonType.VIOLET}
                clickHandler={signUpWithEmail}
                disabled={!formData.isReadRules}
              />
              <Button
                text={"Sign Up with Google"}
                type={ButtonType.WHITE}
                clickHandler={signUpWithGoogleAcc}
                icon={googleLogo}
                disabled={!formData.isReadRules}
              />
            </InputGroup>
            <p className={styles.bottomText}>
              Already have an account? <Link to={"/login"}> Login </Link>
            </p>
          </>
        ) : (
          "s"
        )}
      </div>
    </>
  );
};
