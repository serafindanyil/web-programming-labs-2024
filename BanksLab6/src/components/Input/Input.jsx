import "./Input.css";

export default function Input({
	title = null,
	type = "simple",
	img = null,
	...props
}) {
	let style;

	switch (type) {
		case "simple":
			style = "input-element__input input-element__input-simple";
			break;
		case "image":
			style = "input-element__input input-element__input-image";
			break;
	}
	return (
		<div id="input-element">
			{title && (
				<h4 className="heading-quaternary margin-btm-smaller">{title}</h4>
			)}
			{img && <img src={img} id="input-element__img" />}
			<input {...props} className={style} />
		</div>
	);
}
