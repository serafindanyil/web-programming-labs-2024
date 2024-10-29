import React from "react";
import "./Header.css";

export default function Header(props) {
	return (
		<>
			<header className="header margin-btm-md">
				<div className="header-wrapper container">
					<img src="../public/bank.svg" alt="logo" width="36px" />
					<ul className="links">{props.children}</ul>
				</div>
			</header>
		</>
	);
}
