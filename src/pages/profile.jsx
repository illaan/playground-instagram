import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";

function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		async function checkUserExists() {
			const user = await getUserByUsername(username);
			if (user.length > 0) {
				setUser(user[0]);
			} else {
				navigate(ROUTES.NOT_FOUND);
			}
		}

		checkUserExists();
	}, [username, navigate]);
	return user?.username ? (
		<div className="bg-gray-background">
			<Header />
			<div className="mx-auto max-w-screen-lg">
				<UserProfile user={user} />
			</div>
		</div>
	) : null;
}

export default Profile;
