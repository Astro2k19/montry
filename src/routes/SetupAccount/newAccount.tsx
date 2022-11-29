import React, { useState } from "react";
import styles from "@styles/routes/SetupAccount.module.scss";
import selectStyles from "@styles/components/Select.module.scss";
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

  const saveAndFinishSetup = () => {
    // const
  };

  const saveAndCreateAnother = () => {};

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
              styles={{
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
              }}
              value={{
                value: selectState.typeValue,
                label: selectState.typeLabel,
              }}
            />
            <Button
              text={"Save and create another one"}
              type={ButtonType.VIOLET}
              clickHandler={() => console.log("hello")}
              style={{ marginTop: "15px" }}
            />
            <Button
              text={"Save and finish setup"}
              type={ButtonType.VIOLET}
              clickHandler={() => console.log("hello")}
              style={{ marginTop: "15px" }}
            />
          </InputGroup>
        </BottomPanel>
      </div>
    </div>
  );
};
export default SetupNewAccount;
