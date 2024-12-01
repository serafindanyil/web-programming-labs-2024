import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import HomePage from "./components/HomePage/HomePage";
import BarProductInfo from "./components/HomePage/BarPoductInfo";
import CardWrapper from "./components/CardProduct/CardWrapper.jsx";
import CardProduct from "./components/CardProduct/CardProduct";
import ButtonSolid from "./components/Buttons/ButtonSolid.jsx";

import PRODUCTS from "../data/data.js";

function App() {
	const [currentPage, changePage] = useState("Home");

	const randomBankObj = Math.floor(Math.random() * PRODUCTS.length);

	return (
		<>
			<Header>
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
			<HomePage>
				<BarProductInfo {...PRODUCTS[randomBankObj]} />
				<CardWrapper>
					{PRODUCTS.map((item) => (
						<CardProduct {...item} />
					))}
				</CardWrapper>
				<ButtonSolid>View more</ButtonSolid>
			</HomePage>
			<Footer />
		</>
	);
}

export default App;
