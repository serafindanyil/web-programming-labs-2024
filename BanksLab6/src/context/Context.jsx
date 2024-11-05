import React, { createContext, useContext, useState } from "react";
import PRODUCTS from "../../data/data";

import { useEffect } from "react";

const ProductContext = createContext();
const SearchContext = createContext();

const Context = (props) => {
	const clusterSize = 3;
	const lastObjIndex = PRODUCTS.length - 1; // ластовий індекс обєкта або в майбутньому добавити кількість записів, щоб перевірити чи можна буде в наступний раз зробити фетч даних

	const [currentIndex, setIndex] = useState(clusterSize);
	const [currentCards, setCards] = useState(() =>
		PRODUCTS.slice(0, clusterSize)
	);

	const lazyLoading = () => {
		const nextClusterIndex = currentIndex + clusterSize;
		setCards((oldCards) => [
			...oldCards,
			...PRODUCTS.slice(currentIndex, nextClusterIndex),
		]);
		setIndex(nextClusterIndex);
	};

	return (
		<ProductContext.Provider value={{ currentCards, lazyLoading }}>
			{props.children}
		</ProductContext.Provider>
	);
};

const Search = (props) => {
	const { currentCards } = useContext(ProductContext);
	const [currentFilterCards, setFilterCards] = useState(currentCards);
	const [currentSearchCards, setSearchCards] = useState(currentCards);

	const [currentSorting, setSorting] = useState({
		title: null,
		price: null,
		percentage: null,
	});

	useEffect(() => {
		setFilterCards(currentCards);
	}, [currentCards]);

	// useEffect(() => {
	// 	// перевірка чи старе сортування не дорівнює current, шоб не перевантажувати сторінку, коли однаковий селект опшин
	// 	setSorting((oldSortingObj) => {
	// 		const oldSortingStr = JSON.stringify(oldSortingObj);
	// 		const newSortingStr = JSON.stringify(sortingTypeObj);

	// 		return oldSortingStr !== newSortingStr
	// 			? { ...sortingTypeObj }
	// 			: oldSortingObj;
	// 	});
	// });

	// FIXME: НЕ ПРАЦЄЮ ФІЛЬТР
	const useFilter = (sortingTypeObj) => {
		switch (sortingTypeObj.title) {
			case "alphabet":
				setFilterCards((oldSearchCards) => {
					return [...oldSearchCards].sort((a, b) =>
						a.title.localeCompare(b.title)
					);
				});
				break;
			case null:
				setFilterCards(currentCards);
		}
	};

	useEffect(() => {
		setSearchCards(currentFilterCards);
	}, [currentFilterCards]);

	const useSearch = (keyword) => {
		// name.toLowerCase().includes(findingValue.trim().toLowerCase())
		const findedObjects = currentFilterCards.filter((item) =>
			item.title.toLowerCase().includes(keyword)
		);

		setSearchCards(findedObjects);
	};

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
