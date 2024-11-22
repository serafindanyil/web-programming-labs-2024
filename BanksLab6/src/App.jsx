import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Notification from "./components/Notifications/Notifications";

function App() {
	const location = useLocation();
	const currentPath = location.pathname.slice(1);
	const [currentPage, changePage] = useState(currentPath);

	useEffect(() => {
		changePage(currentPath);
	}, [currentPath]);

	const totalQuantity = useSelector((state) => state.cart.totalQuantity);

	return (
		<div className="wrapper">
			{/* <Notification type="error">
				При обробці карток виникла помилка!
			</Notification> */}
			<Header>
				<LinkButton to="/home" isActive={currentPage}>
					Home
				</LinkButton>
				<LinkButton to="/catalog" isActive={currentPage}>
					Catalog
				</LinkButton>
				<LinkButton
					to="/cart"
					isActive={currentPage}
					cartCount={totalQuantity || null}>
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
		</div>
	);
}

export default App;
