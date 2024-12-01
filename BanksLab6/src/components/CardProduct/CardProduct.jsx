import React from "react";
import "./CardProduct.css";

export default function CardProduct({ heading, description, imgSrc }) {
	return (
		<div className="card">
			<img src={imgSrc} className="card_img margin-btm-sm" />
			<h2 className="heading-secondary margin-btm-sm">{heading}</h2>
			<p className="paragraph">{description}</p>
		</div>
	);
}
