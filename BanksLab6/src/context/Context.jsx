import React, { createContext, useContext, useState, useEffect } from "react";
// import PRODUCTS from "../../data/data";
import useAxios from "../hooks/useAxious";

const ProductContext = createContext();
const SearchContext = createContext();

const Context = (props) => {
	const { getData, loading, error, data } = useAxios();

	useEffect(() => {
		getData("http://127.0.0.1:8080/bank/", 3000);
	}, []);

	const clusterSize = 3;

	const [currentIndex, setIndex] = useState(clusterSize);
	const [currentCards, setCards] = useState([]);

	useEffect(() => {
		setCards(() => data.slice(0, clusterSize));
	}, [data]);

	const lazyLoading = () => {
		const nextClusterIndex = currentIndex + clusterSize;
		setCards((oldCards) => [
			...oldCards,
			...data.slice(currentIndex, nextClusterIndex),
		]);
		setIndex(nextClusterIndex);
	};

	return (
		<ProductContext.Provider value={{ currentCards, lazyLoading, loading }}>
			{props.children}
		</ProductContext.Provider>
	);
};

const Search = (props) => {
	const { currentCards } = useContext(ProductContext);
	const [currentFilterCards, setFilterCards] = useState(currentCards);
	const [currentSearchCards, setSearchCards] = useState(currentCards);
	const [currentKeyword, setKeyword] = useState("");

	useEffect(() => {
		setFilterCards(currentCards);
	}, [currentCards]);

	const useFilter = (sortingTypeObj) => {
		setFilterCards(() => {
			let sortedCards = [...currentCards];

			if (sortingTypeObj.title === "alphabet") {
				sortedCards = sortedCards.sort((a, b) =>
					a.title.localeCompare(b.title)
				);
			}

			if (sortingTypeObj.price === "lowPrice") {
				sortedCards = sortedCards.sort((a, b) => a.bondPrice - b.bondPrice);
			} else if (sortingTypeObj.price === "highPrice") {
				sortedCards = sortedCards.sort((a, b) => b.bondPrice - a.bondPrice);
			}

			if (sortingTypeObj.percentage) {
				sortedCards = sortedCards.filter((item) =>
					item.bondPercent.includes(sortingTypeObj.percentage)
				);
			}

			return sortedCards;
		});
	};

	const useSearch = (keyword) => {
		setKeyword(keyword);
		const filteredObjects = currentFilterCards.filter((item) =>
			item.title.toLowerCase().includes(keyword.toLowerCase())
		);
		setSearchCards(filteredObjects);
	};

	useEffect(() => {
		if (currentKeyword) {
			useSearch(currentKeyword);
		} else {
			setSearchCards(currentFilterCards);
		}
	}, [currentFilterCards, currentKeyword]);

	return (
		<SearchContext.Provider
			value={{ currentSearchCards, useSearch, useFilter }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export const AppProviders = ({ children }) => (
	<Context>
		<Search>{children}</Search>
	</Context>
);

export { ProductContext, SearchContext };
