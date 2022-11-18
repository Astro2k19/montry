import {createSlice} from "@reduxjs/toolkit";

interface IInitialUserState {
    authUser: IAuthUser | null,
    loading: boolean
}

interface IAuthUser {
    email: string;
    uid: string;
}

const initialState: IInitialUserState = {
    authUser: {
        email: "",
        uid: "",
    },
    loading: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.authUser = action.payload;
        },
        clearUser(state) {
            state.authUser = null;
        },
        updateUser() {

        },
        setStatus(state, action) {
            state.loading = action.payload;
        }
    }
});

export const {setUser, clearUser, updateUser, setStatus} = authSlice.actions;
export default authSlice.reducer;