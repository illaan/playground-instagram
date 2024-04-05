import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
import "react-loading-skeleton/dist/skeleton.css";

function Sidebar() {
	const { user } = useUser();

	// console.log(user, user.docId, user.userId);

	return (
		<div className="p-4">
			<User username={user.username} fullName={user.fullName} />
			<Suggestions
				userId={user.userId}
				following={user.following}
				loggedInUserDocId={user.docId}
			/>
		</div>
	);
}

export default Sidebar;
