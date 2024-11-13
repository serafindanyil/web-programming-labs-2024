import React, { createContext, useState, useEffect, useCallback } from "react";
import useAxios from "../hooks/useAxious";
import axios from "axios";

const ProductContext = createContext();
const SearchContext = createContext();

const Context = (props) => {
	const getData = async (sliceCount) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8080/bank/cluster/${sliceCount}`
			);
			const [nextQueryObj, ...cards] = response.data;
			const nextQuery = nextQueryObj.nextQuery;

			return { nextQuery, cards };
		} catch (error) {
			console.error(error);
		}
	};
	const clusterSize = 3;

	const [currentIndex, setIndex] = useState(0);
	const [currentLoading, SetLoading] = useState(true);
	const [currentNextQuery, setNextQuery] = useState(true);
	const [currentCards, setCards] = useState([]);

	useEffect(() => {
		lazyLoading();
	}, []);

	const lazyLoading = async () => {
		const nextClusterIndex = currentIndex + clusterSize;
		try {
			const { cards, nextQuery } = await getData(currentIndex);

			// Фільтруємо нові картки, щоб уникнути дублювання
			setCards((oldCards) => {
				const uniqueCards = [...oldCards, ...cards];
				return uniqueCards;
			});

			SetLoading(false);
			setNextQuery(nextQuery);
			setIndex(nextClusterIndex);
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};

	return (
		<ProductContext.Provider
			value={{ currentCards, lazyLoading, currentLoading, currentNextQuery }}>
			{props.children}
		</ProductContext.Provider>
	);
};

const Search = (props) => {
	const { getData, loading, error, data } = useAxios();
	const [filterProperty, setFilterProperty] = useState({
		title: "",
		price: "",
		percentage: "",
	});
	const [cards, setCards] = useState(data);
	const [currentKeyword, setKeyword] = useState("");

	// // Підтягуємо картки
	// useEffect(() => {
	// 	getData("http://127.0.0.1:8080/bank/", 3000);
	// }, []);

	// Оновлюємо картки при наших запитах
	useEffect(() => {
		setCards(() => data);
	}, [data]);

	const useFilter = (sortTypeObj = filterProperty) => {
		setFilterProperty((oldFilterProp) => {
			if (oldFilterProp !== sortTypeObj) {
				return sortTypeObj;
			} else {
				return oldFilterProp;
			}
		});
		const { title, price, percentage } = sortTypeObj;

		// по суті, якщо друге сортування застосовано, тобто воно true, тоді перше сортування застосоване не буде. І якщо 2 сортування застосовано, то всепівер поверне price
		const sortingType = () => {
			price ? price : title;

			if (price) {
				return price;
			} else if (title) {
				return title;
			} else {
				return null;
			}
		};
		const queryPart = sortingType() ? `&type=${sortingType()}` : "";

		getData(
			`http://127.0.0.1:8080/bank/?key=${currentKeyword}${queryPart}&only=${percentage}`,
			250
		);
	};

	const updateKeyword = (keyword) => {
		setKeyword(() => keyword);
	};

	useEffect(() => {
		useFilter();
	}, [currentKeyword]);

	return (
		<SearchContext.Provider
			value={{ cards, updateKeyword, useFilter, loading }}>
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
