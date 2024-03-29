import { Suspense, lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));

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
		</>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
