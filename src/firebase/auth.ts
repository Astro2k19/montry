import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { setUser } from "../redux/slices/authSlice";

export const init = () => {
  // const dispath = useAppDispatch();

  const onChangedUserState = (user) => {
    if (!user) {
      // dispath(setUser(null));
    }
  };

  const unsubscribe = onAuthStateChanged(auth, onChangedUserState);

  return {
    authUser: null,
    email: "",
    uid: "",
    token: "",
  };
};
