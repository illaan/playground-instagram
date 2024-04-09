import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { useEffect, useReducer } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import "react-loading-skeleton/dist/skeleton.css";

function UserProfile({ user }) {
	const reducer = (state, newstate) => ({ ...state, ...newstate });
	const initialState = {
		profile: {},
		photosCollection: null,
		followerCount: 0,
	};
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			console.log(user);

			const photos = await getUserPhotosByUsername(user.username);
			console.log(photos);
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length,
			});
		}
		getProfileInfoAndPhotos();
		console.log(photosCollection);
	}, [user.username]);
	return (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>
			<Photos photos={photosCollection} />
		</>
	);
}

export default UserProfile;

UserProfile.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired,
		emailAddress: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		following: PropTypes.array.isRequired,
		followers: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
};
