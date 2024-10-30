import "./CardProduct.css";
import Button from "../Button/Button";

export default function CardProduct({
	id,
	title,
	description,
	imgSrc,
	bond_price,
	bond_percent,
	type = "simple",
}) {
	let currentCard;

	switch (type) {
		case "simple":
			currentCard = (
				<div className="card card_simple">
					<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
					<h2 className="heading-secondary margin-btm-sm">{title}</h2>
					<p className="paragraph">{description}</p>
				</div>
			);
			break;
		case "full":
			currentCard = (
				<div className="card card-full">
					<div id="card__top">
						<p id="card__top__id">{id}</p>
					</div>
					<div id="card__wrapper">
						<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
						<h2 className="heading-secondary margin-btm-sm">{title}</h2>
						<p className="paragraph margin-btm-sm">{description}</p>
						<div className="card__value margin-btm-sm">
							<h3 className="heading-tertiary">Price:</h3>
							<span className="card__value__price">{bond_price}</span>
						</div>
						<div className="card__value margin-btm-md">
							<h3 className="heading-tertiary">Percent per year:</h3>
							<span className="card__value__percent">{bond_percent}</span>
						</div>
						<Button isBig="true">View more</Button>
					</div>
				</div>
			);
			break;
	}

	return currentCard; // Повертаємо картку без додаткових обгорток
}
