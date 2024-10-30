import "./Filter.css";

export default function Filter({ children, ...props }) {
	return (
		<select id="filter" {...props}>
			{children}
		</select>
	);
}
