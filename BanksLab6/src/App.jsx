import React, { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProviders } from "./context/Context";
import { useLocation } from "react-router-dom";

function App() {
	const location = useLocation();
	const currentPath = location.pathname.slice(1);
	const [currentPage, changePage] = useState(currentPath);

	return (
		<div className="wrapper">
			<AppProviders>
				<Header>
					{/* <Header isSearch={currentPage === "catalog" ? true : false}> */}
					<LinkButton
						to="/home"
						isActive={currentPage}
						onClick={() => changePage("home")}>
						Home
					</LinkButton>
					<LinkButton
						to="/catalog"
						isActive={currentPage}
						onClick={() => changePage("catalog")}>
						Catalog
					</LinkButton>
					<LinkButton
						to="/cart"
						isActive={currentPage}
						onClick={() => changePage("cart")}>
						Cart
					</LinkButton>
				</Header>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/item/:id" element={<Item />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
				<Footer />
			</AppProviders>
		</div>
	);
}

export default App;
