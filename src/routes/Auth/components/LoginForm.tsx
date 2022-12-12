import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/redux/hooks";
import {DataInput} from "@/components/form/DataInput";
import {Button, ButtonType} from "@/components/ui/Button";
import {InputGroup} from "@/components/ui/InputGroup";
import styles from "@styles/routes/EntryForm.module.scss";
import {onChange} from "../utils";
import {SETUP_ACCOUNT_SCREEN, SIGNUP_SCREEN} from "@/navigation/CONSTANTS";
import {useLogInUserWithCredentialsMutation} from "@/redux/api/apiSlice";
import Loader from "@/components/ui/Loader";

export const LoginForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        isReadRules: false,
    });
    const [logInUserWithCredentials, {isSuccess, isLoading, isError, error}] = useLogInUserWithCredentialsMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logInUser = async () => {
        if (formData.email && formData.password) {
            logInUserWithCredentials({
                email: formData.email,
                password: formData.password,
                dispatch
            });
        }
    };

    console.log(isLoading)

    React.useEffect(() => {
        if (isSuccess) {
            navigate(SETUP_ACCOUNT_SCREEN);
        }
    }, [isSuccess]);

    return isLoading ? (
        <Loader/>
    ) : (
        <>
            {isError && <p>{error.message}</p>}
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
                    clickHandler={logInUser}
                />
            </InputGroup>
            <p className={styles.bottomText}>
                Don’t have an account yet? <Link to={SIGNUP_SCREEN}> Sign Up </Link>
            </p>
        </>
    );
}