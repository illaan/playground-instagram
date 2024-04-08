import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useContext } from "react";
import UserContext from "../context/user";

const IsLoggedIn = ({ children }) => {
	const { user } = useContext(UserContext);
	if (user) {
		return <Navigate to={ROUTES.DASHBOARD} />;
	}

	return children;
};

export default IsLoggedIn;
