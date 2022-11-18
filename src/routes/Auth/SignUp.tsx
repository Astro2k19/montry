import React from "react";
import {TopBar, TopBarTypes} from "../../components/TopBar";
import {Input} from "@components/Input";
import {InputGroup} from "@components/InputGroup";
import styles from '@styles/routes/EntryForm.module.scss';
import {Button, ButtonType} from "@components/Button";
import {Link} from "react-router-dom";
import googleLogo from '@assets/google.svg';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/firebase.config";

export const SignUp = () => {

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        isReadRules: false
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.name) return;

        const name = event.target.name;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            }
        })
    }

    const signUpWithEmail = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .catch(error => console.error(error))
    }

    const signUpWithGoogleAcc = () => {

    }


    return (
        <>
            <TopBar text={'Sign Up'} type={TopBarTypes.DARK}/>
            <div className={styles.root}>
                <InputGroup>
                    <Input handleOnChange={onChange} value={formData.name} placeholder={'Name'} type={'text'}
                           name={'name'}/>
                    <Input handleOnChange={onChange} value={formData.email} placeholder={'Email'} type={'email'}
                           name={'email'}/>
                    <Input handleOnChange={onChange} value={formData.password} placeholder={'Password'} type={'password'}
                           name={'password'}/>
                </InputGroup>
                <div className={styles.rules}>
                    <input type="checkbox" name="isReadRules" id="rules" onChange={onChange}/>
                    <p>By signing up, you agree to the <a href="#">Terms of Service and Privacy Policy</a></p>
                </div>
                <InputGroup>
                    <Button text={'Sign Up'} type={ButtonType.VIOLET} clickHandler={signUpWithEmail} />
                    <Button text={'Sign Up with Google'} type={ButtonType.WHITE} clickHandler={signUpWithGoogleAcc} icon={googleLogo}/>
                </InputGroup>
                <p className={styles.bottomText}>Already have an account? <Link to={'/login'}> Login </Link></p>
            </div>
        </>
    );
}
