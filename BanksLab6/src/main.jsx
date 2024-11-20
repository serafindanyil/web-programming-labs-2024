import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./context/Context";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Router>
			<AppProviders>
				<App />
			</AppProviders>
		</Router>
	</Provider>
);
