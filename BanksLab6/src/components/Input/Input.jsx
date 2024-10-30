import "./Input.css";

export default function Input({ type = "simple", img = null, ...props }) {
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
			{img && <img src={img} id="input-element__img" />}
			<input {...props} className={style} />;
		</div>
	);
}
