import "./PageProduct.css";

export default function PageProduct({ obj }) {
	const { id, title, description, imgSrc, bondPrice, bondPercent } = obj;
	return (
		<main>
			<div className="container" id="wrapper-info">
				<div id="wrapper-info__left">
					<img src={imgSrc} />
				</div>
				<div id="wrapper-info__right">
					<h1 className="heading-primary">{title}</h1>
					<p className="paragraph">{description}</p>
				</div>
			</div>
		</main>
	);
}
