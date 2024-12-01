// Cart.jsx

import PRODUCTS from "../../../data/data";
import ItemBar from "../ItemBar/ItemBar";
import Button from "../Button/Button";
import "./Cart.css";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Cart() {
	const cartItems = useSelector((state) => state.cart.items);
	const totalAmounts = useSelector((state) => state.cart.totalPrice);

	const isAuthorizated = useNavigate((state) => state.auth.isAuthorizated);

	const navigate = useNavigate();

	if (isAuthorizated) {
		return (
			<main className="container">
				<div style={{ textAlign: "center" }}>
					<h2 className="heading-secondary margin-top-md margin-btm-md">
						Please login to account
					</h2>
					<Button type="solid">Back to login page</Button>
				</div>
			</main>
		);
	}

	if (!totalAmounts) {
		return (
			<main>
				<div className="container">
					<span id="shoping-cart_empty">Shoping cart is empty!</span>
				</div>
			</main>
		);
	}

	return (
		<main>
			<div className="container">
				<h2
					className="heading-secondary margin-top-md margin-btm-md"
					id="cart__heading">
					Shopping Cart
				</h2>
				<div id="cart__item-wrapper">
					{cartItems.map((item) => {
						return <ItemBar className="margin-btm-sm" {...item}></ItemBar>;
					})}
				</div>
				<div id="cart__total-amout" className="margin-btm-bg">
					<span id="cart__text">Total amout:</span>
					<span id="cart__total-price">
						${totalAmounts.toLocaleString("de-DE")}
					</span>
				</div>
				<div id="cart__button-wrapper" className="margin-btm-md">
					<Button type="outline" onClick={() => navigate(-1)}>
						Back to catalog
					</Button>
					<Button type="solid" tag="link" to="/cart/checkout">
						Continue
					</Button>
				</div>
			</div>
		</main>
	);
}
