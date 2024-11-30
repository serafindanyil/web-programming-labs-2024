import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthorizated: true,
		user: {
			name: "test username",
			email: "",
		},
		token: null,
		error: null,
	},
	reducers: {
		// тестовий редюсер
		setUserName(state, action) {
			state.user.name = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
