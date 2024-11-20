import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalQuantity: 0,
		totalPrice: 0,
		changed: false,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.totalPrice = action.payload.totalPrice;
			state.items = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const itemExsist = state.items.find(
				(item) =>
					item.id === newItem.id && item.percentage === newItem.bondPercent
			);
			const reduceTotalAmount = newItem.bondPrice * newItem.quantity;

			state.totalPrice += reduceTotalAmount;
			state.changed = true;

			if (!itemExsist) {
				state.items.push({
					id: newItem.id,
					title: newItem.title,
					imgSrc: newItem.imgSrc,
					price: newItem.bondPrice,
					percentage: newItem.bondPercent,
					quantity: newItem.quantity,
					totalPrice: reduceTotalAmount,
				});
			} else {
				itemExsist.quantity += newItem.quantity;
				itemExsist.totalPrice = itemExsist.price * itemExsist.quantity;
			}

			state.totalQuantity = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0
			);
		},
		removeItemFromCart(state, action) {
			const id = action.payload.id;
			const percentage = action.payload.bondPercent;

			const itemExsist = state.items.find(
				(item) => item.id === id && item.percentage === percentage
			);

			if (!itemExsist) return;
			const reduceTotalAmount = itemExsist.price;
			state.totalPrice -= reduceTotalAmount;

			if (itemExsist.quantity === 1) {
				state.items = state.items.filter(
					(item) => !(item.id === id && item.percentage === percentage)
				);
			} else {
				itemExsist.quantity--;
				itemExsist.totalPrice -= reduceTotalAmount;
			}

			state.totalQuantity = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0
			);
			state.changed = true;
		},
		removeCardFromCart(state, action) {
			const id = action.payload.id;
			const percentage = action.payload.bondPercent;

			const itemExsist = state.items.find(
				(item) => item.id === id && item.percentage === percentage
			);

			if (!itemExsist) return;
			const reduceTotalAmount = itemExsist.price * itemExsist.quantity;
			state.totalPrice -= reduceTotalAmount;

			if (itemExsist) {
				state.items = state.items.filter(
					(item) => !(item.id === id && item.percentage === percentage)
				);
			}

			state.totalQuantity = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0
			);
			state.changed = true;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
