import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Button from "../Button/Button";
import Wrapper from "../Wrapper/Wrapper";

import "./FilterBar.css";

export default function FilterBar({ ...props }) {
	return (
		<section {...props} id="section">
			<div id="section-filter" className=" container">
				<Wrapper>
					<Filter name="first-filter" className="margin-right-md">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
					</Filter>
					<Filter name="first-second" className="margin-right-md">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
					</Filter>
					<Filter name="first-tertiary" className="margin-right-md">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
					</Filter>
				</Wrapper>
				<Button type="outline">Apply</Button>
			</div>
		</section>
	);
}
