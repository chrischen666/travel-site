import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "test",
    email: "test@gmail.com",
    message:'testMessage',
    tel: "0912346768",
    address: "kaohsiung",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData(state, action) {
            const { name, message, tel, address, email } = action.payload;
            state.name = name;
            state.email = email;
            state.message = message;
            state.tel = tel;
            state.address = address;
        },
    },
});
export const { updateUserData } = userSlice.actions;

export default userSlice.reducer