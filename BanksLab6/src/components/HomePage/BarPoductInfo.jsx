import React from "react";
import "./HomePage.css";

export default function BarProductInfo({ heading, description, imgSrc }) {
	return (
		<>
			<div className="bar-product-info container margin-btm-bg">
				<div className="bar-product-info_image">
					<img src={imgSrc} />
				</div>
				<div className="bar-product-info_description">
					<h1 className="heading-primary margin-btm-sm">{heading}</h1>
					<p className="paragraph">{description}</p>
				</div>
			</div>
		</>
	);
}
