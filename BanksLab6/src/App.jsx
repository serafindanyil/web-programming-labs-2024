import React, { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Item from "./components/Item/Item";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProviders } from "./context/Context";

function App() {
	const [currentPage, changePage] = useState("Home");

	return (
		<div className="wrapper">
			<AppProviders>
				<Router>
					<Header isSearch={currentPage === "Catalog" ? true : false}>
						<LinkButton
							to="/"
							isActive={currentPage}
							onClick={() => changePage("Home")}>
							Home
						</LinkButton>
						<LinkButton
							to="/catalog"
							isActive={currentPage}
							onClick={() => changePage("Catalog")}>
							Catalog
						</LinkButton>
						<LinkButton
							to="*"
							isActive={currentPage}
							onClick={() => changePage("Cart")}>
							Cart
						</LinkButton>
					</Header>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/catalog" element={<Catalog />} />
						<Route path="/item/:id" element={<Item />} />
						<Route path="*" />
					</Routes>
					<Footer />
				</Router>
			</AppProviders>
		</div>
	);
}

export default App;
