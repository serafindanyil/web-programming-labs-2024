import BarProductInfo from "../HomePage/BarPoductInfo";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Button from "../Button/Button.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";

import PRODUCTS from "../../../data/data.js";

export default function Home() {
	const randomBankObj = Math.floor(Math.random() * PRODUCTS.length);

	return (
		<main className="margin-top-md margin-btm-bg">
			<BarProductInfo {...PRODUCTS[randomBankObj]} />
			<CardWrapper className="grid grid--3-col gap--96 container margin-btm-md">
				{PRODUCTS.map((item) => (
					<CardProduct {...item} />
				))}
			</CardWrapper>
			<Wrapper style={{ textAlign: "center" }}>
				<Button>View more</Button>
			</Wrapper>
		</main>
	);
}
