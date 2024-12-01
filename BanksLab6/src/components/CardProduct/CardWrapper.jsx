import React from "react";
import "./CardProduct.css";

export default function CardWrapper(props) {
	return (
		<>
			<div className="grid grid--3-col card-wrapper container margin-btm-md">
				{props.children}
			</div>
		</>
	);
}
