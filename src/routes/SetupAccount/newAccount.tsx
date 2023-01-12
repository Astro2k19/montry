import React from "react";
import styles from "@styles/routes/SetupAccount.module.scss";
import { selectStyles } from "@/scss/components/SelectStyles";
import { TopBar, TopBarTypes } from "@/navigation/components/TopBar";
import BottomPanel from "@/components/ui/BottomPanel";
import { InputGroup } from "@/components/ui/InputGroup";
import { DataInput } from "@/components/form/DataInput";
import { Button, ButtonType } from "@/components/ui/Button";
import CashInput from "@/components/form/CashInput";
import Select from "react-select";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import {
  useSaveNewWalletMutation,
  useFinishSetupMutation,
} from "@/redux/api/apiSetup";
import { useGetSpecificDocQuery } from "@/redux/api/apiSlice";
import { DASHBOARD_SCREEN, SETUP_ACCOUNT_SCREEN } from "@/navigation/CONSTANTS";
import Loader from "@/components/ui/Loader";
import { Navigate } from "react-router-dom";
import { IOption, onChangeSelect } from "@/utils/selectHandlers";
import { onCashInputChange, onChangeInput } from "@/utils/stateHandlers";
import { transformDataToArray } from "@/utils/utils";
import { IWallet } from "@/redux/interfaces";

const options: IOption[] = [
  { value: "bank", label: "Bank" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface IWallets {
  [key: string]: IWallet;
}

const SetupNewAccount = () => {
  const [setupState, setSetupState] = React.useState({
    name: "",
    balance: "00.0",
  });
  const [selectState, setSelectState] = React.useState({
    label: options[0].label,
    value: options[0].value,
  });

  const { authUser } = useAppSelector((state) => state.auth);
  const [saveNewWallet, { isLoading }] = useSaveNewWalletMutation();
  const [finishSetup, { isLoading: isLoadingFinishing, isSuccess }] =
    useFinishSetupMutation();
  const { data: wallets = [] } = useGetSpecificDocQuery({
    path: "wallets",
    pathSegment: authUser?.uid,
    transformData: transformDataToArray,
  });
  const { avatarPreview } = useAppSelector((state) => state.setup);
  const navigate = useNavigate();

  const addWallet = async () => {
    if (setupState.name && setupState.balance) {
      const wallet = {
        name: setupState.name,
        type: selectState.value,
        balance: setupState.balance,
      };
      await saveNewWallet({ wallet, uid: authUser?.uid });
      clearStates();
    }
  };

  const saveAndAddNewWallet = async () => {
    clearStates();
    await addWallet();
  };

  const clearStates = () => {
    setSetupState({
      name: "",
      balance: "0.00",
    });
    setSelectState({
      label: options[0].label,
      value: options[0].value,
    });
  };

  if (isSuccess && !isLoadingFinishing) {
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
          changeHandler={(values, sourceInfo) =>
            onCashInputChange(Number(values.value), sourceInfo, setSetupState)
          }
          name={"balance"}
        />
        <BottomPanel>
          <InputGroup>
            <DataInput
              handleOnChange={(e) => onChangeInput(e, setSetupState)}
              value={setupState.name}
              placeholder={"Name"}
              type={"text"}
              name={"name"}
            />
            <Select
              onChange={(newValue) => onChangeSelect(newValue, setSelectState)}
              options={options}
              styles={selectStyles}
              value={{
                value: selectState.value,
                label: selectState.label,
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
              clickHandler={async () => {
                await finishSetup({
                  uid: authUser?.uid,
                  avatarPreview,
                });
              }}
              disabled={wallets.length === 0}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
