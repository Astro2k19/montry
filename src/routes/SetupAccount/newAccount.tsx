import React from "react";
import styles from "@styles/routes/SetupAccount.module.scss";
import { selectStyles } from "@/scss/components/SelectStyles";
import { TopBar, TopBarTypes } from "@/navigation/components/TopBar";
import BottomPanel from "@/components/ui/BottomPanel";
import { InputGroup } from "@/components/ui/InputGroup";
import { DataInput } from "@/components/form/DataInput";
import { Button, ButtonType } from "@/components/ui/Button";
import CashInput from "@/components/form/CashInput";
import { NumberFormatValues } from "react-number-format";
import Select from "react-select";
import {
  ActionMeta,
  InputActionMeta,
  OnChangeValue,
} from "react-select/dist/declarations/src/types";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { updateUserSetup } from "@/redux/slices/setupSlice";
import { useNavigate } from "react-router";
// import { useSaveNewWalletMutation } from "@/redux/api/apiSetup";

const options = [
  { value: "bank", label: "Bank" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SetupNewAccount = () => {
  const [setupState, setSetupState] = React.useState({
    name: "",
    balance: "00.0",
  });
  const [selectState, setSelectState] = React.useState({
    typeLabel: options[0].label,
    typeValue: options[0].value,
  });

  const useSaveNewWalletMutation = () => {};

  const { authUser } = useAppSelector((state) => state.auth);
  const [saveNewWallet, { isLoading }] = useSaveNewWalletMutation();
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
    if (setupState.name && setupState.balance) {
      const wallet = {
        name: setupState.name,
        type: selectState.typeValue,
        balance: setupState.balance,
      };
      await saveNewWallet({ wallet, authUser });
      clearStates();
    }
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
          placeholder={setupState.balance}
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
            />
            <Button
              text={"Save and finish setup"}
              type={ButtonType.VIOLET}
              clickHandler={saveAndFinishSetup}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
