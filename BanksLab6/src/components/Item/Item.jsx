import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BarProduct from "../BarProduct/BarProduct";
import Wrapper from "../Wrapper/Wrapper";
import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Item.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

export default function Item() {
	const { getDataById } = useAxios();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState(null); // Стан для збереження даних картки

	const dispatch = useDispatch();

	const quantityRef = useRef(null);
	const bondPercentRef = useRef(null);

	const navigate = useNavigate();

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

	function validationInputField(value) {
		if (!isNaN(value)) {
			return parseInt(value);
		} else {
			alert("Має бути число!");
		}
	}

	function validationSelectField(value) {
		if (!isNaN(value)) {
			return parseFloat(value);
		} else {
			alert("Виберіть процент!");
		}
	}

	const handleClickAddItemToCart = () => {
		const { id, title, imgSrc, bondPrice } = cardData;

		dispatch(
			cartActions.addItemToCart({
				id,
				title,
				imgSrc,
				bondPrice,
				bondPercent: validationSelectField(bondPercentRef.current.value),
				quantity: validationInputField(quantityRef.current.value),
			})
		);

		alert(`Товари додані в корзину: ${quantityRef.current.value}`);
	};

	return (
		<main id="wrapper">
			<BarProduct type="full" {...cardData}>
				<Wrapper style={{ display: "flex", gap: "3.2rem" }}>
					<Input
						title="Peace count"
						placeholder="10..."
						typeValue="number"
						min="0"
						ref={quantityRef}></Input>
					<Filter title="Percent value" ref={bondPercentRef}>
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
					<Button tag="link" type="outline" onClick={() => navigate(-1)}>
						Go back
					</Button>
					<Button type="solid" onClick={handleClickAddItemToCart}>
						Add to card
					</Button>
				</div>
			</div>
		</main>
	);
}
