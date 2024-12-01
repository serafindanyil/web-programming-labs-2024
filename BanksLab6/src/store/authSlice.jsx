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
		error: null,
	},
	reducers: {
		// тестовий редюсер
		loginUser(state, action) {
			const { token, userName, email } = action.payload;

			if (!state.isAuthorizated) {
				state.token = token;
				state.user.name = userName;
				state.user.email = email;
			} else {
				state.error = "User already loggined. Please log out!";
			}
		},

		setError(state, action) {
			state.error = action.payload.error;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
