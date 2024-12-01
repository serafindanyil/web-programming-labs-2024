import "./Filter.css";

export default function Filter({ title, children, ...props }) {
	return (
		<div>
			{title && (
				<h4 className="heading-quaternary margin-btm-smaller">{title}</h4>
			)}
			<select id="filter" {...props}>
				{children}
			</select>
		</div>
	);
}
