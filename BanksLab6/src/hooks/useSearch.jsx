import { useState } from "react";
import useAxios from "./useAxious";

function useSearch() {
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(null);
	// const [data, setData] = useState([]);

	// const getData = async (url, delay = 0) => {
	// 	setLoading(true);
	// 	setError(null);

	// 	setTimeout(async () => {
	// 		try {
	// 			const response = await axios.get(url);
	// 			setData(response.data);
	// 		} catch (error) {
	// 			setError(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}, delay);
	// };

	const { getData, loading, error, data } = useAxios();
	const [cards, setCards] = useState(data);

	useEffect(() => {
		getData("http://127.0.0.1:8080/bank/", 1000);
	}, []);

	useEffect(() => {
		getData("http://127.0.0.1:8080/bank/", 1000);
	}, [data]);

	const useFilter = (sortingType) => {
		setCards(() => {});
	};

	return { cards, useSearch, loading };
}

export default useSearch;

// const { currentCards, lazyLoading, loading } = useContext(ProductContext);
// 	const [isLoad, setIsLoad] = useState(loading);

// 	useEffect(() => {
// 		setIsLoad((oldLoad) => !oldLoad);
// 	}, [loading]);
