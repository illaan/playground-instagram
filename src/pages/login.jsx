import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from "../constants/routes";

function LogIn() {
	const navigate = useNavigate();
	const { auth } = useContext(FirebaseContext);

	const [emailAddress, setEmailAdress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const isInvalid = password == "" || emailAddress == "";

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, emailAddress, password);
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			console.log(error);
			setEmailAdress("");
			setPassword("");
			setError(error.message);
		}
	};

	return (
		<div className="container flex mx-auto max-w-screen-md items-center h-screen">
			<div className="flex w-3/5">
				<img
					src="/images/iphone-with-profile.jpg"
					alt="iPhone with Instagram profile"
					className="h-96 mx-auto"
				/>
			</div>
			<div className="flex flex-col w-2/5 mr-2">
				<div className="flex flex-col rounded items-center bg-white p-4 border border-gray-primary mb-4">
					<h1 className="flex justify-center w-full">
						<img
							src="/images/logo.png"
							alt="Instagram"
							className="mt-2 w-6/12"
						/>
					</h1>
					{error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
					<form onSubmit={handleLogin} method="POST">
						<input
							aria-label="Enter your email addres"
							type="text"
							placeholder="Email Adress"
							value={emailAddress}
							className="text-sm text-gray-base w-full mt-1 mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setEmailAdress(e.target.value)}
						/>
						<input
							aria-label="Enter your password"
							type="password"
							placeholder="Password"
							value={password}
							className="text-sm text-gray-base w-full mt-1 mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
								isInvalid && "opacity-50"
							}`}
						>
							Log in
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col rounded w-full bg-white p-4 border border-gray-primary">
					<p>
						Don't have an account?{` `}
						<Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default LogIn;
