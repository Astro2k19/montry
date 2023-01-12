import React from "react";
import { TopBar, TopBarTypes } from "@/navigation/components/TopBar";
import CashInput from "@/components/form/CashInput";
import { IOption, onChangeSelect } from "@/utils/selectHandlers";
import { selectStyles } from "@/scss/components/SelectStyles";
import Select from "react-select";
import BottomPanel from "@/components/ui/BottomPanel";
import { DataInput } from "@/components/form/DataInput";
import { onCashInputChange, onChangeInput } from "@/utils/stateHandlers";
import { useGetSpecificDocQuery } from "@/redux/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { InputGroup } from "@/components/ui/InputGroup";
import { ImageFileUploader } from "@/components/form/ImageFileUploader";
import { Button, ButtonType } from "@/components/ui/Button";
import styles from "@/scss/components/AddTransaction.module.scss";
import { capitalizeFirstLetter, transformDataToArray } from "@/utils/utils";
import { HOME_SCREEN } from "@/navigation/CONSTANTS";
import { IWallet } from "@/redux/interfaces";
import ScreenCurtain from "@/components/ui/ScreenCurtain";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/scss/components/DatePicker.scss";

interface ICategory extends IOption<string> {}

interface INewTransaction {
  title: string;
  categories: ICategory[];
  style: React.CSSProperties;
}

interface IWalletsQuery {
  data: IWallet[];
  isLoading: boolean;
}

export const NewTransaction: React.FC<INewTransaction> = ({
  title,
  categories,
  style,
}) => {
  const { authUser } = useAppSelector((state) => state.auth);

  const { data: wallets = [], isLoading } =
    useGetSpecificDocQuery<IWalletsQuery>({
      path: "wallets",
      pathSegment: authUser?.uid,
      transformData: transformDataToArray,
    });

  const [category, setCategory] = React.useState({});
  const [wallet, setWallet] = React.useState<IWallet | {}>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const curtainRef = React.useRef<HTMLDivElement | undefined>();

  const [transaction, setTransaction] = React.useState({
    amount: 0,
    description: "",
    attachmentData: "",
    date: new Date(),
  });

  const clickHandler = () => {
    console.log(wallet, "wallet");
    console.log(category, "category");
    console.log(transaction, "transaction");
    const { amount } = transaction;

    if (wallet.balance && wallet.balance >= transaction.amount) {
      //   transaction amount cannot be equal - 0;
      //   category & wallet must be chosen
      //   description & attachment are optional, but before submitting data there should be an alert popup for confirmation or canceling
      //   wallet balance cannot be lesser than transaction amount
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const closeCurtain = (event: React.MouseEvent) => {
    if (!curtainRef.current) return;

    const { className = "" } = curtainRef.current;
    const target = event.target as HTMLElement;

    if (!target.closest(`.${className}`)) {
      setIsOpen(false);
    }
  };
  const formatWallets = () => {
    if (!isLoading) {
      return wallets.map((wallet) => ({
        ...wallet,
        label: `${capitalizeFirstLetter(wallet.value)} - ${wallet.balance}$`,
      }));
    }
  };

  return (
    <div style={style} className={styles.root}>
      <TopBar text={title} type={TopBarTypes.LIGHT} backPath={HOME_SCREEN} />
      <div className={styles.main}>
        <CashInput
          title={"How much?"}
          placeholder={"$0"}
          changeHandler={(values, sourceInfo) => {
            console.log(values);
            onCashInputChange(Number(values.value), sourceInfo, setTransaction);
          }}
          name={"amount"}
        />
        <BottomPanel>
          <InputGroup>
            <Select
              onChange={(newValue) => onChangeSelect(newValue, setCategory)}
              options={categories}
              styles={selectStyles}
              placeholder={"Category"}
            />
            <DataInput
              handleOnChange={(e) => onChangeInput(e, setTransaction)}
              value={transaction.description}
              placeholder={"Description"}
              type={"text"}
              name={"description"}
            />
            <Select
              onChange={(newValue) => onChangeSelect(newValue, setWallet)}
              options={formatWallets()}
              styles={selectStyles}
              isLoading={isLoading}
              placeholder={"Wallet"}
            />
            <div>
              <DatePicker
                selected={transaction.date}
                onChange={(date) =>
                  setTransaction((prevState) => ({ ...prevState, date }))
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                style={{ marginBottom: "15px" }}
              />
            </div>
            <ImageFileUploader
              onFileSelectSuccess={(attachmentData) =>
                setTransaction((prevState) => ({
                  ...prevState,
                  attachmentData,
                }))
              }
              onFileSelectError={console.log}
              text={"Add attachment"}
            />
            <Button
              text={"Next"}
              type={ButtonType.VIOLET}
              clickHandler={clickHandler}
            />
          </InputGroup>
        </BottomPanel>
      </div>
      <ScreenCurtain
        isOpen={isOpen}
        closeCurtain={closeCurtain}
        ref={curtainRef}
      >
        <DatePicker
          selected={transaction.date}
          onChange={(date) =>
            setTransaction((prevState) => ({ ...prevState, date }))
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          style={{ marginBottom: "15px" }}
        />
        <Button
          text={"Next"}
          type={ButtonType.VIOLET}
          clickHandler={console.log}
        />
      </ScreenCurtain>
    </div>
  );
};
