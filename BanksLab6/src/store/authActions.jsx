// actions.js
import useAxios from "../hooks/useAxios";
import { authActions } from "./authSlice";

export const loginAction = (data) => {
	const { postData } = useAxios();

	return async (dispatch) => {
		try {
			const { token, userName, email } = await postData(
				"http://127.0.0.1:8080/auth/login",
				data
			);

			dispatch(authActions.loginUser({ token, userName, email }));
		} catch (error) {
			dispatch(
				authActions.setError({ error: error.message || "Something broke!" })
			);
		}
	};
};

export const registrationAction = (data) => {
	const { postData } = useAxios();

	return async (dispatch) => {
		try {
			const { token, userName, email } = await postData(
				"http://127.0.0.1:8080/auth/register",
				data
			);

			dispatch(authActions.loginUser({ token, userName, email }));
		} catch (error) {
			dispatch(
				authActions.setError({ error: error.message || "Something broke!" })
			);
		}
	};
};
