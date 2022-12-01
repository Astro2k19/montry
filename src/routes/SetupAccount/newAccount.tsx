import React, { useState } from "react";
import styles from "@styles/routes/SetupAccount.module.scss";
import { TopBar, TopBarTypes } from "@components/TopBar";
import BottomPanel from "@components/BottomPanel";
import { InputGroup } from "@components/InputGroup";
import { DataInput } from "@components/DataInput";
import { Button, ButtonType } from "@components/Button";
import CashInput from "@components/CashInput";
import { NumberFormatValues } from "react-number-format";
import Select from "react-select";
import {
  ActionMeta,
  InputActionMeta,
  OnChangeValue,
} from "react-select/dist/declarations/src/types";
import { SourceInfo } from "react-number-format/types/types";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { updateUserSetup } from "../../redux/slices/setupSlice";
import { useNavigate } from "react-router";

const options = [
  { value: "bank", label: "Bank" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "16px",
    borderColor: state.isFocused ? "#91919F" : "#F1F1FA",
    borderWidth: "2px",
    boxShadow: "none",
    minHeight: "50px",
  }),
  indicatorSeparator: (baseStyles, state) => ({
    display: "none",
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "#91919F",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "16px",
    overflow: "hidden",
  }),
};

const SetupNewAccount = () => {
  const [setupState, setSetupState] = React.useState({
    name: "",
    balance: "00.0",
  });
  const [selectState, setSelectState] = React.useState({
    typeLabel: options[0].label,
    typeValue: options[0].value,
  });

  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeSelect = (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectState({
      typeLabel: newValue.label,
      typeValue: newValue.value,
    });
  };

  const onChangeInput = (event: React.SyntheticEvent) => {
    if (!event) return;

    const target = event.target as HTMLInputElement;
    const name = target.name;

    setSetupState((prevSetupState) => ({
      ...prevSetupState,
      [name]: target.value,
    }));
  };

  const onCashInputChange = (values: NumberFormatValues) => {
    setSetupState((prevSetupState) => ({
      ...prevSetupState,
      balance: values.value,
    }));
  };

  const addWallet = async () => {
    const userRef = doc(db, "users", authUser.uid);

    try {
      await updateDoc(userRef, {
        wallets: arrayUnion({
          id: nanoid(),
          name: setupState.name,
          type: selectState.typeValue,
          balance: Number(setupState.balance),
        }),
        balance: increment(Number(setupState.balance)),
      });
    } catch (e) {
      alert(e);
    }

    clearStates();
  };

  const saveAndFinishSetup = async () => {
    const userRef = doc(db, "users", authUser.uid);
    await addWallet();

    try {
      await dispatch(
        updateUserSetup({
          uid: authUser.uid,
          data: {
            isSetup: true,
          },
        })
      );

      navigate("/dashboard");
    } catch (e) {
      alert(e);
    }
  };

  const saveAndAddNewWallet = async () => {
    clearStates();
    addWallet();
  };

  const clearStates = () => {
    setSetupState({
      name: "",
      balance: "0.00",
    });
    setSelectState({
      typeLabel: options[0].label,
      typeValue: options[0].value,
    });
  };

  return (
    <div className={styles.root}>
      <TopBar text={"Add new wallet"} type={TopBarTypes.LIGHT} />
      <div className={styles.setupBlock}>
        <CashInput
          title={"Balance"}
          placeholder={"00.0"}
          changeHandler={onCashInputChange}
          name={"balance"}
        />
        <BottomPanel>
          <InputGroup>
            <DataInput
              handleOnChange={onChangeInput}
              value={setupState.name}
              placeholder={"Name"}
              type={"text"}
              name={"name"}
            />
            <Select
              onChange={onChangeSelect}
              options={options}
              styles={selectStyles}
              value={{
                value: selectState.typeValue,
                label: selectState.typeLabel,
              }}
            />
            <Button
              text={"Save and create another one"}
              type={ButtonType.VIOLET}
              clickHandler={saveAndAddNewWallet}
              style={{ marginTop: "15px" }}
            />
            <Button
              text={"Save and finish setup"}
              type={ButtonType.VIOLET}
              clickHandler={saveAndFinishSetup}
              style={{ marginTop: "15px" }}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
