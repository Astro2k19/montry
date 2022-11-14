import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authUser: null,
    email: '',
    uid: '',
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData(state, action) {
            return action.payload;
        },
        updateData() {

        },
        clearData() {

        }
    }
});

export const {setData, updateData, clearData} = authSlice.actions;
export default authSlice.reducer;