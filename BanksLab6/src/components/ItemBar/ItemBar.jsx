import Button from "../Button/Button";
import "./ItemBar.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { addListener } from "@reduxjs/toolkit";

export default function ItemBar({
	id,
	title,
	imgSrc,
	price,
	percentage,
	quantity,
	totalPrice,
	...props
}) {
	const dispatch = useDispatch();

	const handleClickIncrease = () => {
		dispatch(
			cartActions.addItemToCart({
				id,
				title,
				imgSrc,
				bondPrice: price,
				bondPercent: percentage,
				quantity: 1,
			})
		);
	};

	const handleClickDecrease = () => {
		dispatch(
			cartActions.removeItemFromCart({
				id,
				bondPercent: percentage,
			})
		);
	};

	const handleClickRemoveCard = () => {
		dispatch(
			cartActions.removeCardFromCart({
				id,
				bondPercent: percentage,
			})
		);
	};

	return (
		<div id="item-bar" {...props}>
			<img src={imgSrc} id="item-bar__img" />
			<h3 className="heading-tertiary" id="item-bar__heading">
				{title}
			</h3>
			<div id="item-bar__wrapper">
				<Button type="outline" onClick={handleClickDecrease} isSmall="true">
					-
				</Button>
				<span id="item-bar__count-peace">{quantity}</span>
				<Button type="outline" onClick={handleClickIncrease} isSmall="true">
					+
				</Button>
			</div>
			<span id="item-bar__percentage">%{percentage}</span>
			<span id="item-bar__price">${totalPrice.toLocaleString("de-DE")}</span>
			<button id="item-bar__btn-close" onClick={handleClickRemoveCard}>
				x
			</button>
		</div>
	);
}
