export interface IInitialUserState {
  authUser: IAuthUser | null;
}

export interface IAuthUser {
  email: string;
  uid: string;
  isSetup: boolean;
}

export interface INewUser {
  email: string;
  name?: string;
  password: string;
}

export interface IWallet {
  [key: string]: string | number;
  value: string;
  type: string;
  balance: number;
}
