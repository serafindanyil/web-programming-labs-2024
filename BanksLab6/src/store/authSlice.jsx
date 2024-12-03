import { createSlice } from "@reduxjs/toolkit";
import useAxios from "../hooks/useAxios";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthorizated: false,
		user: {
			name: "test username",
			email: "",
		},
		token: null,
	},
	reducers: {
		// тестовий редюсер
		loginUser(state, action) {
			const { token, userName, email } = action.payload;

			if (!state.isAuthorizated) {
				state.isAuthorizated = true;
				state.token = token;
				state.user.name = userName;
				state.user.email = email;
			}
		},
		logoutUser(state) {
			if (state.isAuthorizated) {
				state.isAuthorizated = false;
				state.user = { name: "", email: "" };
				state.token = null;
			}
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
