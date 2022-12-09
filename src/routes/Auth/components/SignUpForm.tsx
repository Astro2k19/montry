import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/redux/hooks";
import {signUpNewUser} from "@/redux/slices/authSlice";
import {DataInput} from "@/components/form/DataInput";
import {Button, ButtonType} from "@/components/ui/Button";
import {InputGroup} from "@/components/ui/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import googleLogo from "@/assets/google.svg";
import {onChange} from "../utils";
import {LOGIN_SCREEN} from "@/navigation/CONSTANTS";

export const SignUpForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        isReadRules: false,
    });
    const dispatch = useAppDispatch();

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
                <p>By signing up, you agree to the
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
                Already have an account? <Link to={LOGIN_SCREEN}> Login </Link>
            </p>
        </>
    )
}