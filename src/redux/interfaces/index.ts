export type SignInStatus = "loading" | "success" | "error" | "initial";

export interface IInitialUserState {
    authUser: IAuthUser | null;
    status: SignInStatus;
    error: string;
}

export interface IAuthUser {
    email: string;
    uid: string;
}

export interface INewUser {
    email: string;
    name?: string;
    password: string;
}