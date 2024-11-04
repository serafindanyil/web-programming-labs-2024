import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/Context";
import BarProduct from "../ BarProduct/BarProduct";
import Wrapper from "../Wrapper/Wrapper";
import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Input from "../Input/Input";
import toKebabCase from "../../functions/toKebabCase";
import Button from "../Button/Button";
import "./Item.css";

export default function Item({ ...props }) {
	const { id } = useParams();
	const { currentCards } = useContext(ProductContext);

	const currentCard = currentCards.find((obj) => toKebabCase(obj.title) === id);

	return (
		<main id="wrapper">
			<BarProduct type="full" {...currentCard}>
				<Wrapper style={{ display: "flex", gap: "3.2rem" }}>
					<Input title="Peace count" placeholder="10..."></Input>
					<Filter title="Percent value">
						<Option>Select percent value</Option>
					</Filter>
				</Wrapper>
			</BarProduct>
			<div className="container" id="action-bar">
				<span id="price">
					Price: ${currentCard.bondPrice.toLocaleString("de-DE")}
				</span>
				<div id="button-wrapper">
					<Button type="outline">Go back</Button>
					<Button type="solid">Add to card</Button>
				</div>
			</div>
		</main>
	);
}
