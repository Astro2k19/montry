import React from "react";
import { TopBar, TopBarTypes } from "../../components/TopBar";
import { Input } from "@components/Input";
import { InputGroup } from "@components/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import { Button, ButtonType } from "@components/Button";
import { Link } from "react-router-dom";
import googleLogo from "@assets/google.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setUser, setStatus} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router";

export const SignUp = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    isReadRules: false,
  });
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.loading);
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

  console.log(isLoading)

  const signUpWithEmail = async  () => {

    try {
      dispatch(setStatus(true));

      const {user} = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
      );

      dispatch(setUser({
        email: user.email,
        uid: user.uid,
      }))

      dispatch(setStatus(false));
      navigate('/dashboard');

    } catch (error) {
      alert(error.message)
    }

  };

  const signUpWithGoogleAcc = () => {

  };

  return (
    <>
      <TopBar text={"Sign Up"} type={TopBarTypes.DARK} />
      <div className={styles.root}>
        <InputGroup>
          <Input
            handleOnChange={onChange}
            value={formData.name}
            placeholder={"Name"}
            type={"text"}
            name={"name"}
          />
          <Input
            handleOnChange={onChange}
            value={formData.email}
            placeholder={"Email"}
            type={"email"}
            name={"email"}
          />
          <Input
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
      </div>
    </>
  );
};
