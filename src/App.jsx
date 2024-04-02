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

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path={ROUTES.LOGIN}
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path={ROUTES.SIGN_UP}
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<SignUp />
					</Suspense>
				}
			/>
			<Route
				path={ROUTES.DASHBOARD}
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<Dashboard />
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
