import { useContext } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CardWrapper from "../CardProduct/CardWrapper";
import CardProduct from "../CardProduct/CardProduct";

import { SearchContext } from "../../context/Context.jsx";

export default function Catalog() {
	const { currentSearchCards } = useContext(SearchContext);

	return (
		<main>
			<FilterBar className="margin-btm-md" />
			<CardWrapper className="grid grid--3-col gap--96 margin-btm-md container">
				{currentSearchCards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} type="full" />
				))}
			</CardWrapper>
		</main>
	);
}
