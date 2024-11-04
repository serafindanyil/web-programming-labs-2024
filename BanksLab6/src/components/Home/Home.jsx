import { useContext, useEffect } from "react";
import BarProduct from "../ BarProduct/BarProduct.jsx";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Button from "../Button/Button.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";

import { ProductContext, SearchContext } from "../../context/Context.jsx";

export default function Home() {
	const { currentCards, lazyLoading } = useContext(ProductContext);

	const randomBankObj = Math.floor(Math.random() * currentCards.length);

	return (
		<main className="margin-top-md margin-btm-md">
			<BarProduct type="simple" {...currentCards[randomBankObj]} />
			<CardWrapper className="grid grid--3-col gap--96 container margin-btm-md">
				{currentCards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} />
				))}
			</CardWrapper>
			<Wrapper style={{ textAlign: "center" }}>
				<Button onClick={() => lazyLoading()}>View more</Button>
			</Wrapper>
		</main>
	);
}
