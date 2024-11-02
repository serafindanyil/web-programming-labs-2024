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
					<Route path="*" />
				</Routes>

				<Footer />
			</Router>
		</>
	);
}

export default App;
