import "./Profile.css";
import { useSelector } from "react-redux";
import Button from "../Button/Button";

export default function Profile() {
	const userName = useSelector((state) => state.auth.user.name);
	const email = useSelector((state) => state.auth.user.email);

	const handleLogOut = () => {};

	return (
		<main className="container margin-top-md">
			<div className="proifile__text_wrapper">
				<h2 className="heading-secondary margin-btm-md">Profile</h2>
				<p className="proifile__text-info margin-btm-sm">{userName}</p>
				<p className="proifile__text-info margin-btm-bg">{email}</p>
				<Button type="solid" onClick={handleLogOut}>
					Log out
				</Button>
			</div>
		</main>
	);
}
