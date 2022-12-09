import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/redux/hooks";
import {LogInUserWithCredentials} from "@/redux/slices/authSlice";
import {DataInput} from "@/components/form/DataInput";
import {Button, ButtonType} from "@/components/ui/Button";
import {InputGroup} from "@/components/ui/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import {onChange} from "../utils";
import {SIGNUP_SCREEN} from "@/navigation/CONSTANTS";

export const LoginForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        isReadRules: false,
    });
    const dispatch = useAppDispatch();

    const logInUser = async () => {
        dispatch(
            LogInUserWithCredentials({
                email: formData.email,
                password: formData.password,
            })
        );
    };

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
                    text={"LoginForm"}
                    type={ButtonType.VIOLET}
                    clickHandler={logInUser}
                />
            </InputGroup>
            <p className={styles.bottomText}>
                Don’t have an account yet? <Link to={SIGNUP_SCREEN}> Sign Up </Link>
            </p>
        </>
    )
}