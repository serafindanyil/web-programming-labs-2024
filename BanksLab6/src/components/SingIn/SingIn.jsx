import "./SingIn.css";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import * as Yup from "yup";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

import { loginAction } from "../../store/authActions";
import { useDispatch } from "react-redux";

export default function SingIn({ singInOnClick }) {
	const [hidePassword, setHidePassword] = useState(true);

	const dispatch = useDispatch();

	const regEx = {
		email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.matches(regEx.email, "Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.matches(regEx.password, "8+ chars, upper, lower, & a digit.")
			.required("Password is required"),
	});

	const handleHidePassword = () => {
		setHidePassword((oldState) => !oldState);
	};

	const handleSubmit = (value) => {
		dispatch(loginAction({ email: value.email, password: value.password }));

		alert("success" + value.email);
	};

	return (
		<div className="signup__container">
			<Formik
				initialValues={{
					userName: "",
					email: "",
					password: "",
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<Form>
					<h2 className="heading-secondary margin-btm-md">
						Submit the form to sign in
					</h2>

					<FormikInput
						label="Email"
						name="email"
						id="email"
						placeholder="exaple@adress.com"
					/>
					<FormikInput
						type={!hidePassword && "password"}
						includeEye="true"
						isHideEye={hidePassword}
						eyeOnClick={handleHidePassword}
						label="Password"
						name="password"
						id="password"
						placeholder="Some password"
					/>

					<div className="singup_action_container margin-btm-md">
						<span className="signup_text">Not a member?</span>
						<a href="#" className="signup_link" onClick={singInOnClick}>
							Sing up
						</a>
					</div>
					<div className="signup__button_wrapper">
						<Button type="solid" isBig="true">
							Login me
						</Button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
