import React, { createContext, useState, useEffect } from "react";
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
