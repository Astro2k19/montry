import { OnChangeValue } from "react-select/dist/declarations/src/types";
import { Dispatch } from "react";

export interface IOption {
  value: string;
  label: string;
}

export const onChangeSelect = (
  newValue: OnChangeValue<IOption, false>,
  setSelectState: Dispatch<IOption>
) => {
  setSelectState({
    label: newValue!.label,
    value: newValue!.value,
  });
};
