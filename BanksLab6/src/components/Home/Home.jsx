import BarProductInfo from "../HomePage/BarPoductInfo";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Button from "../Button/Button.jsx";

import PRODUCTS from "../../../data/data.js";

export default function Home() {
	const randomBankObj = Math.floor(Math.random() * PRODUCTS.length);

	return (
		<main>
			<BarProductInfo {...PRODUCTS[randomBankObj]} />
			<CardWrapper>
				{PRODUCTS.map((item) => (
					<CardProduct {...item} />
				))}
			</CardWrapper>
			<Button>View more</Button>
		</main>
	);
}
