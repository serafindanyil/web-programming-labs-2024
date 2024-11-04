import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function LinkButton({ children, ...props }) {
	return (
		<>
			<li className="links_item">
				<Link
					className={
						props.isActive === children
							? "links_item_button active"
							: "links_item_button"
					}
					{...props}
					onClick={props.onClick}>
					{children}
				</Link>
			</li>
		</>
	);
}
