import FilterBar from "../FilterBar/FilterBar";
import CardWrapper from "../CardProduct/CardWrapper";
import CardProduct from "../CardProduct/CardProduct";

import PRODUCTS from "../../../data/data.js";

export default function Catalog() {
	return (
		<main>
			<FilterBar className="margin-btm-md" />
			<CardWrapper className="grid grid--3-col gap--96 margin-btm-md container">
				{PRODUCTS.map((item) => (
					<CardProduct {...item} type="full" />
				))}
			</CardWrapper>
		</main>
	);
}
