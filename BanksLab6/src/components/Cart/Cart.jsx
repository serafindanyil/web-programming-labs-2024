import PRODUCTS from "../../../data/data";
import ItemBar from "../ItemBar/ItemBar";
import Button from "../Button/Button";
import "./Cart.css";

export default function Cart() {
	const objects = [
		{
			id: 3242,
			title: "MonoBank",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis laboriosam recusandae maxime assumenda ipsa deleniti necessitatibus officiis expedita dicta, voluptates dolores sint unde tenetur quidem? Excepturi cumque assumenda eius maxime!",
			imgSrc: "/bankImg/monobank.png",
			bondPrice: 10000,
			bondPercent: [1.5, 2.5, 5],
			charArray: ["good percentage"],
		},
		{
			id: 1231,
			title: "PrivatBank",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis laboriosam recusandae maxime assumenda ipsa deleniti necessitatibus officiis expedita dicta, voluptates dolores sint unde tenetur quidem? Excepturi cumque assumenda eius maxime!",
			imgSrc: "/bankImg/privat.png",
			bondPrice: 1000,
			bondPercent: [2.5, 5],
			charArray: ["good reliability", "best price"],
		},
	];
	return (
		<main>
			<div className="container">
				<h2
					className="heading-secondary margin-top-md margin-btm-md"
					id="cart__heading">
					Shopping Cart
				</h2>
				<div id="cart__item-wrapper">
					{objects.map((item) => {
						return <ItemBar className="margin-btm-sm" obj={item}></ItemBar>;
					})}
				</div>
				<div id="cart__total-amout" className="margin-btm-bg">
					<span id="cart__text">Total amout:</span>
					<span id="cart__total-price">$225</span>
				</div>
				<div id="cart__button-wrapper" className="margin-btm-md">
					<Button type="outline">Back to catalog</Button>
					<Button type="solid">Continue</Button>
				</div>
			</div>
		</main>
	);
}
