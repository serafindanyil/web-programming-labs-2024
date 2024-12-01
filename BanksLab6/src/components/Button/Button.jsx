import React from "react";
import "./Button.css";

export default function Button({
	children,
	type = "solid",
	isBig = false,
	...props
}) {
	let style;
	switch (type) {
		case "solid":
			style = `button button-solid ${isBig && "button-big"}`;
			break;
		case "outline":
			style = `button button-outline ${isBig && "button-big"}`;
			break;
	}
	return (
		<>
			<button className={style} {...props}>
				{children}
			</button>
		</>
	);
}
