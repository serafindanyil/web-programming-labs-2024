import React from "react";
import "./Header.css";

export default function LinkButton(props) {
	return (
		<>
			<li className="links_item">
				<a
					className={
						props.isActive === props.children
							? "links_item_button active"
							: "links_item_button"
					}
					onClick={props.onClick}>
					{props.children}
				</a>
			</li>
		</>
	);
}
