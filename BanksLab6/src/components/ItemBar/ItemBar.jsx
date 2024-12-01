import Button from "../Button/Button";
import "./ItemBar.css";

export default function ItemBar({ obj, countPeace, ...props }) {
	return (
		<div id="item-bar" {...props}>
			<img src={obj.imgSrc} id="item-bar__img" />
			<h3 className="heading-tertiary" id="item-bar__heading">
				{obj.title}
			</h3>
			<div id="item-bar__wrapper">
				<Button type="outline" isSmall="true">
					-
				</Button>
				<span id="item-bar__count-peace">{countPeace ?? 2}</span>
				<Button type="outline" isSmall="true">
					+
				</Button>
			</div>
			<span id="item-bar__price">{obj.bondPrice}</span>
		</div>
	);
}
