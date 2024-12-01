import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Button from "../Button/Button";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/Context.jsx";

import "./FilterBar.css";

export default function FilterBar({ ...props }) {
	const { useFilter } = useContext(SearchContext);

	const [currentTitle, setTitle] = useState(null);
	const [currentPrice, setPrice] = useState(null);
	const [currentPercentage, setPercentage] = useState(null);

	const parseData = (item) => (item === "" ? null : item);
	const parseInteger = (item) => (item === "" ? null : parseFloat(item));

	function handleButtonFilter() {
		const filterParametersObj = {
			title: parseData(currentTitle),
			price: parseData(currentPrice),
			percentage: parseFloat(currentPercentage),
		};

		useFilter(filterParametersObj);
	}

	return (
		<section {...props} id="section">
			<div id="section-filter" className=" container">
				<div id="filter-wrapper">
					<Filter
						name="title"
						className="margin-right-md"
						onChange={(event) => setTitle(event.target.value)}>
						<Option value="">Select sorting</Option>
						<Option value="alphabet">Alphabet</Option>
					</Filter>
					<Filter
						name="price"
						className="margin-right-md"
						onChange={(event) => setPrice(event.target.value)}>
						<Option value="">Select sorting</Option>
						<Option value="lowPrice">Low price</Option>
						<Option value="highPrice">High price</Option>
					</Filter>
					<Filter
						name="percentage"
						className="margin-right-md"
						onChange={(event) => setPercentage(event.target.value)}>
						<Option value="">Select sorting</Option>
						<Option value="1.5">1.5%</Option>
						<Option value="2.5">2.5%</Option>
						<Option value="5">5%</Option>
					</Filter>
				</div>
				<Button type="outline" onClick={handleButtonFilter}>
					Apply
				</Button>
			</div>
		</section>
	);
}

// setFilterCards((oldSearchCards) => {
// 	if (oldSearchCards.title !== sortingTypeObj.title) {
// 		return [...currentCards].sort((a, b) =>
// 			a.title.localeCompare(b.title)
// 		);
// 	}
// 	return oldSearchCards;
// });
