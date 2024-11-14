import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/Context";
import BarProduct from "../BarProduct/BarProduct";
import Wrapper from "../Wrapper/Wrapper";
import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Item.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

export default function Item() {
	const { getDataById } = useAxios();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState(null); // Стан для збереження даних картки

	const fetchCard = async () => {
		try {
			const response = await getDataById(
				"http://127.0.0.1:8080/bank",
				parseInt(id)
			);
			setCardData(response); // Зберігаємо дані у стані cardData
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCard();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<main id="wrapper">
			<BarProduct type="full" {...cardData}>
				<Wrapper style={{ display: "flex", gap: "3.2rem" }}>
					<Input title="Peace count" placeholder="10..."></Input>
					<Filter title="Percent value">
						<Option>Select percent value</Option>
						{cardData.bondPercent.map((item, id) => (
							<Option key={id} value={item}>
								{item}
							</Option>
						))}
					</Filter>
				</Wrapper>
			</BarProduct>
			<div className="container" id="action-bar">
				<span id="price">
					Price: ${cardData.bondPrice.toLocaleString("de-DE")}
				</span>
				<div id="button-wrapper">
					<Button tag="link" type="outline" to={`/catalog`}>
						Go back
					</Button>
					<Button type="solid">Add to card</Button>
				</div>
			</div>
		</main>
	);
}
