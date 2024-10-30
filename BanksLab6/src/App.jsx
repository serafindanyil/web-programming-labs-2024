import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	const [currentPage, changePage] = useState("Home");

	return (
		<>
			<Header isSearch={false}>
				<LinkButton isActive={currentPage} onClick={() => changePage("Home")}>
					Home
				</LinkButton>
				<LinkButton
					isActive={currentPage}
					onClick={() => changePage("Catalog")}>
					Catalog
				</LinkButton>
				<LinkButton isActive={currentPage} onClick={() => changePage("Cart")}>
					Cart
				</LinkButton>
			</Header>
			{/* <Home /> */}
			<Catalog />
			<Footer />
		</>
	);
}

export default App;
