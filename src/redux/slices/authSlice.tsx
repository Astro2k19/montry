import {createSlice} from "@reduxjs/toolkit";
import {init} from "../../firebase/auth";

const initialState = init();

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
        setStatus() {

        }
    }
});

export const {setUser, clearUser, updateUser} = authSlice.actions;
export default authSlice.reducer;