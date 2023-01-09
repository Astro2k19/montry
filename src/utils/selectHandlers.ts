import { OnChangeValue } from "react-select/dist/declarations/src/types";
import { Dispatch } from "react";

export interface IOption<T> {
  [key: string]: T;
  value: T;
  label: T;
}

export const onChangeSelect = (
  newValue: OnChangeValue<IOption<string | number>, false>,
  setSelectState: Dispatch<IOption<string | number>>
) => {
  setSelectState({
    ...newValue,
  });
};
