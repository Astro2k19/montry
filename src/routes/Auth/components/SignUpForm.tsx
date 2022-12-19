import React from "react";
import { Link } from "react-router-dom";
import { DataInput } from "@/components/form/DataInput";
import { Button, ButtonType } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import googleLogo from "@/assets/google.svg";
import { onChange } from "../utils";
import { LOGIN_SCREEN, SETUP_ACCOUNT_SCREEN } from "@/navigation/CONSTANTS";

interface ISignUpForm {
  formHandler: (email: string, name: string, password: string) => void;
}

export const SignUpForm: React.FC<ISignUpForm> = ({ formHandler }) => {
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
          value={formData.name}
          placeholder={"Name"}
          type={"text"}
          name={"name"}
        />
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
      </InputGroup>
      <div className={styles.rules}>
        <input
          type="checkbox"
          name="isReadRules"
          id="rules"
          onChange={(event) => onChange(event, setFormData)}
        />
        <p>
          By signing up, you agree to the
          <a href="#">Terms of Service and Privacy Policy</a>
        </p>
      </div>
      <InputGroup>
        <Button
          text={"Sign Up"}
          type={ButtonType.VIOLET}
          clickHandler={() =>
            formHandler(formData.email, formData.name, formData.password)
          }
          disabled={!formData.isReadRules}
        />
        <Button
          text={"Sign Up with Google"}
          type={ButtonType.WHITE}
          clickHandler={formHandler}
          icon={googleLogo}
          disabled={!formData.isReadRules}
        />
      </InputGroup>
      <p className={styles.bottomText}>
        Already have an account? <Link to={LOGIN_SCREEN}> Login </Link>
      </p>
    </>
  );
};
