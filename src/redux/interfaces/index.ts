export type SignInStatus = "loading" | "success" | "error" | "initial";

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