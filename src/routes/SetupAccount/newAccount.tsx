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
  OnChangeValue,
} from "react-select/dist/declarations/src/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import {
  useSaveNewWalletMutation,
  useFinishSetupMutation,
} from "@/redux/api/apiSetup";
import { useGetSpecificUserFieldQuery } from "@/redux/api/apiSlice";
import { DASHBOARD_SCREEN, SETUP_ACCOUNT_SCREEN } from "@/navigation/CONSTANTS";
import Loader from "@/components/ui/Loader";
import { Navigate } from "react-router-dom";

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
  const [finishSetup, { isLoading: isLoadingFinishing, isSuccess }] =
    useFinishSetupMutation();
  const { data: wallets = [] } = useGetSpecificUserFieldQuery({
    fieldName: "wallets",
    uid: authUser?.uid,
  });
  const dispatch = useAppDispatch();
  const { avatarPreview } = useAppSelector((state) => state.setup);
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

  const onFinishSetup = async () => {
    await finishSetup({
      uid: authUser?.uid,
      avatarPreview,
    });
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

  console.log(isLoadingFinishing, "isLoadingFinishing");

  if (isSuccess) {
    return <Navigate to={DASHBOARD_SCREEN} replace={true} />;
  }

  return isLoadingFinishing ? (
    <Loader />
  ) : (
    <div className={styles.root}>
      <TopBar
        text={"Add new wallet"}
        type={TopBarTypes.LIGHT}
        backPath={SETUP_ACCOUNT_SCREEN}
      />
      <div className={styles.setupBlock}>
        <CashInput
          title={"Balance"}
          placeholder={"$00.0"}
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
              disabled={isLoading}
            />
            <Button
              text={"Finish setup"}
              type={ButtonType.VIOLET}
              clickHandler={onFinishSetup}
              disabled={wallets.length === 0}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
