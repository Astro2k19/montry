import React from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import styles from "@styles/components/CashInput.module.scss";
import { SourceInfo } from "react-number-format/types/types";

interface ICashInput {
  title: string;
  placeholder: string;
  changeHandler: CashInputType;
  name: string;
}

export type CashInputType = (
  _: NumberFormatValues,
  sourceInfo: SourceInfo
) => void;

const CashInput: React.FC<ICashInput> = ({
  title,
  changeHandler,
  placeholder = "0",
  name,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const clickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.select();
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focusout", (event) => {
        const target = event.target as HTMLInputElement;
        if (target.value.trim() === "") {
          target.value = "$0";
        }
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <NumericFormat
        type="text"
        allowNegative={false}
        thousandSeparator=","
        valueIsNumericString={true}
        prefix={"$"}
        value={placeholder}
        onValueChange={changeHandler}
        onClick={clickHandler}
        getInputRef={inputRef}
        className={styles.input}
        name={name}
      />
    </div>
  );
};
export default CashInput;
