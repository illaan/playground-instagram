import PropTypes from "prop-types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
} from "../../services/firebase";

function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	userId,
	loggedInUserDocId,
}) {
	const [followed, setFollowed] = useState(false);
	const [imageError, setImageError] = useState(false);

	const profilePicUrl = `/images/avatars/${username}.jpg`;

	async function handleFollowUser() {
		setFollowed(true);
		await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

		await updateFollowedUserFollowers(profileDocId, userId, false);
	}

	return !followed ? (
		<div className="flex flex-row items-center align-baseline justify-between">
			<div className="flex items-center justify-between">
				{!imageError ? (
					<img
						className="rounded-full w-8 flex"
						src={profilePicUrl}
						alt=""
						onError={() => setImageError(true)}
					/>
				) : (
					<Skeleton circle={true} count={1} height={35} width={35} />
				)}
				<Link to={`/p/${username}`}>
					<p className="font-bold text-sm ml-3">{username}</p>
				</Link>
			</div>
			<button
				className="text-xs font-bold text-blue-medium"
				type="button"
				onClick={handleFollowUser}
			>
				Follow
			</button>
		</div>
	) : null;
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired,
};
