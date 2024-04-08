import { Suspense, lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoute from "./helpers/protected-route";
import IsLoggedIn from "./helpers/is-loggedin";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));
const Profile = lazy(() => import("./pages/profile"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path={ROUTES.LOGIN}
				element={
					<IsLoggedIn>
						<Suspense fallback={<div>Loading...</div>}>
							<Login />
						</Suspense>
					</IsLoggedIn>
				}
			/>
			<Route
				path={ROUTES.SIGN_UP}
				element={
					<IsLoggedIn>
						<Suspense fallback={<div>Loading...</div>}>
							<SignUp />
						</Suspense>
					</IsLoggedIn>
				}
			/>
			<Route
				path={ROUTES.DASHBOARD}
				element={
					<ProtectedRoute>
						<Suspense fallback={<div>Loading...</div>}>
							<Dashboard />
						</Suspense>
					</ProtectedRoute>
				}
			/>
			<Route
				path={ROUTES.PROFILE}
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<Profile />
					</Suspense>
				}
			/>
			<Route
				path="*"
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<NotFound />
					</Suspense>
				}
			/>
		</>
	)
);

function App() {
	const { user } = useAuthListener();
	return (
		<UserContext.Provider value={{ user }}>
			<RouterProvider router={router} />
		</UserContext.Provider>
	);
}

export default App;
