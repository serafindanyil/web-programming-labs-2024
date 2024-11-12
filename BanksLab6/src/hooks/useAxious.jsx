// import axios from "axios";
// import { useState } from "react";

// function useAxios() {
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	const [data, setData] = useState([]);

// 	const getData = async (url) => {
// 		setLoading(true);
// 		setError(null);

// 		try {
// 			const response = await axios.get(url);
// 			setData(response.data);
// 		} catch (error) {
// 			setError(error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { getData, loading, error, data };
// }

// export default useAxios;

import axios from "axios";
import { useState } from "react";

function useAxios() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	const getData = async (url, delay = 0) => {
		setLoading(true);
		setError(null);

		setTimeout(async () => {
			try {
				const response = await axios.get(url);
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}, delay);
	};

	return { getData, loading, error, data };
}

export default useAxios;
