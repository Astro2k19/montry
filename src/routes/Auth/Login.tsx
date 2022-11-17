import { TopBar, TopBarTypes } from "../../components/TopBar";
import React from "react";
import styles from "@styles/routes/EntryForm.module.scss";
import {Link} from "react-router-dom";
import {Input} from "../../components/Input";
import {InputGroup} from "../../components/InputGroup";
import {Button, ButtonType} from "../../components/Button";

export const Login = () => {

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

  const logInWithEmail = () => {}


  return (
      <>
        <TopBar text={'Login'} type={TopBarTypes.DARK}/>
        <div className={styles.root}>
          <InputGroup>
            <Input handleOnChange={onChange} value={formData.email} placeholder={'Email'} type={'email'}
                   name={'email'}/>
            <Input handleOnChange={onChange} value={formData.password} placeholder={'Password'} type={'password'}
                   name={'password'}/>
            <Button text={'Login'} type={ButtonType.VIOLET} clickHandler={logInWithEmail} />
          </InputGroup>
          <p className={styles.bottomText}>Don’t have an account yet? <Link to={'/signup'}> Sign Up </Link></p>
        </div>
      </>
  );
}
