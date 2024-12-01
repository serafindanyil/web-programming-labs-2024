import React from "react";
import "./ButtonSolid.css";

export default function ButtonSolid(props) {
	return (
		<div className="button-wrapper margin-btm-bg">
			<button className="button-solid">{props.children}</button>
		</div>
	);
}
