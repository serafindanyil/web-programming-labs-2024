import React from "react";
import "./CardProduct.css";

export default function CardWrapper({ ...props }) {
	return (
		<>
			<div {...props}>{props.children}</div>
		</>
	);
}
