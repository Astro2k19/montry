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
import { doc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserSetup } from "@/redux/slices/setupSlice";
import { useNavigate } from "react-router";
import {useSaveNewWalletMutation, useUpdateUserDataMutation} from "@/redux/api/apiSetup";
import {useGetSpecificUserFieldQuery} from "@/redux/api/apiSlice";

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

  const { authUser } = useAppSelector((state) => state.auth);
  const [saveNewWallet, { isLoading }] = useSaveNewWalletMutation();
  const [updateUserData, { isLoading: isLoadingUpdates }] = useUpdateUserDataMutation()
  const {data: wallets = []} = useGetSpecificUserFieldQuery({fieldName: 'wallets', uid: authUser?.uid});
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
      await saveNewWallet({ wallet, uid: authUser?.uid });
      clearStates();
    }
  };

  const finishSetup = async () => {
    const data = {
      isSetup: true
    }

    const params = {
      uid: authUser?.uid,
      data,
      providedTags: ['setup']
    }

    await updateUserData(params);
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
              text={"Add wallet"}
              type={ButtonType.VIOLET}
              clickHandler={saveAndAddNewWallet}
            />
            <Button
              text={"Finish setup"}
              type={ButtonType.VIOLET}
              clickHandler={finishSetup}
              disabled={wallets.length === 0}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
