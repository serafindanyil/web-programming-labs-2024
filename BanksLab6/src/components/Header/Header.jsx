import { useContext } from "react";
import "./Header.css";
import Input from "../Input/Input";
import { SearchContext } from "../../context/Context.jsx";

export default function Header({ children, isSearch = false, ...props }) {
	const { useSearch } = useContext(SearchContext);

	function handleSearch(event) {
		const value = event.target.value;
		const validation = value.trim().toLowerCase();
		useSearch(validation);
	}

	return (
		<header className="header" {...props}>
			<div className="header-wrapper container">
				<img src="../public/bank.svg" alt="logo" width="36px" />
				<ul className="links">{children}</ul>
				{isSearch && (
					<Input
						type="image"
						img={"./search.svg"}
						id="search"
						onChange={handleSearch}
					/>
				)}
			</div>
		</header>
	);
}

function isValidate(element) {
	if (isNaN(element) && element.trim() !== "") {
		return element;
	}
	return null;
}
