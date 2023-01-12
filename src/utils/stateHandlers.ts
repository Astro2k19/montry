import React from "react";
import { NumberFormatValues } from "react-number-format";
import { SourceInfo } from "react-number-format/types/types";

export const onChangeInput = <T>(
  event: React.SyntheticEvent,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  if (!event) return;

  const target = event.target as HTMLInputElement;
  const name = target.name;

  setState((prevSetupState: T) => ({
    ...prevSetupState,
    [name]: target.value,
  }));
};

export const onCashInputChange = <T>(
  value: number | string,
  sourceInfo: SourceInfo,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const target = sourceInfo.event?.target as HTMLInputElement | undefined;

  if (target) {
    setState((prevSetupState: T) => ({
      ...prevSetupState,
      [target.name]: value,
    }));
  }
};
