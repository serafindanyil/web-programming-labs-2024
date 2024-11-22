import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./cartSlice";

const persistConfig = {
	key: "cart",
	storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
	reducer: {
		cart: persistedCartReducer,
	},
});

export const persistor = persistStore(store);
export default store;
