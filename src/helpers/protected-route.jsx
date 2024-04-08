import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useContext } from "react";
import UserContext from "../context/user";

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(UserContext);
	if (!user) return <Navigate to={ROUTES.LOGIN} replace={true} />;

	return children;
};

export default ProtectedRoute;
