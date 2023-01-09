import { IWallet } from "@/redux/interfaces";
import { ITransaction } from "@/routes/Dashboard/components/TransactionItem";

export const capitalizeFirstLetter = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const transformDataToArray = <T extends {}, R extends IWallet>(
  docData: T
) => {
  return Object.entries(docData).map((item) => {
    const [key, value] = item as [string, R];
    value["id"] = key;
    return value;
  });
};
