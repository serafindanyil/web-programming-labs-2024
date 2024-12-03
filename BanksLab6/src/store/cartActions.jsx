import { cartActions } from "./cartSlice";
import { errorActions } from "./errorSlice";

export const resetStoreAction = (data) => {
	return async (dispatch, getState) => {
		try {
			const { totalQuantity } = getState().cart;
			if (totalQuantity !== 0) {
				dispatch(cartActions.resetStore());

				dispatch(
					errorActions.setStatus({
						type: "success",
						text: "Thank you for order!",
					})
				);
			} else {
				throw new Error(
					"You are have 0 items in cart. Please add items to create new order!"
				);
			}
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.response?.data?.error || error.message,
				})
			);
		}
	};
};
