import React from "react";
import "./Header.css";
import Input from "../Input/Input";

export default function Header({ children, isSearch = false, ...props }) {
	return (
		<>
			<header className="header" {...props}>
				<div className="header-wrapper container">
					<img
						src="../public/bank.svg"
						alt="logo"
						width="36px"
						id={isSearch && "header__img"}
					/>
					<ul className="links">{children}</ul>
					{isSearch && <Input type="image" img={"./search.svg"} />}
				</div>
			</header>
		</>
	);
}
