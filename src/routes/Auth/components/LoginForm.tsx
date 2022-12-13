import React from "react";
import { Link } from "react-router-dom";
import { DataInput } from "@/components/form/DataInput";
import { Button, ButtonType } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import { onChange } from "../utils";
import { SETUP_ACCOUNT_SCREEN, SIGNUP_SCREEN } from "@/navigation/CONSTANTS";

interface ILoginForm {
  formHandler: (email: string, password: string) => void;
}

export const LoginForm: React.FC<ILoginForm> = ({ formHandler }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    isReadRules: false,
  });

  return (
    <>
      <InputGroup>
        <DataInput
          handleOnChange={(event) => onChange(event, setFormData)}
          value={formData.email}
          placeholder={"Email"}
          type={"email"}
          name={"email"}
        />
        <DataInput
          handleOnChange={(event) => onChange(event, setFormData)}
          value={formData.password}
          placeholder={"Password"}
          type={"password"}
          name={"password"}
        />
        <Button
          text={"Login"}
          type={ButtonType.VIOLET}
          clickHandler={() => formHandler(formData.email, formData.password)}
        />
      </InputGroup>
      <p className={styles.bottomText}>
        Don’t have an account yet? <Link to={SIGNUP_SCREEN}> Sign Up </Link>
      </p>
    </>
  );
};
