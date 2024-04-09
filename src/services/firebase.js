import {
	collection,
	query,
	where,
	getDocs,
	limit,
	updateDoc,
	arrayRemove,
	arrayUnion,
	doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const q = query(collection(db, "users"), where("username", "==", username));

	const result = await getDocs(q);

	return !result.empty;
}

export async function getUserByUserId(userId) {
	const q = query(collection(db, "users"), where("userId", "==", userId));

	const result = await getDocs(q);

	const user = result.docs.map((doc) => ({
		...doc.data(),
		docId: doc.id,
	}));
	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const q = query(collection(db, "users"), limit(10));

	const result = await getDocs(q);

	return result.docs
		.map((user) => ({
			...user.data(),
			docId: user.id,
		}))
		.filter(
			(profile) =>
				profile.userId != userId && !following.includes(profile.userId)
		);
}

export async function updateLoggedInUserFollowing(
	loggedInUserDocId,
	profileId,
	isFollowingProfile
) {
	const userDocRef = doc(db, "users", loggedInUserDocId);
	return updateDoc(userDocRef, {
		following: isFollowingProfile
			? arrayRemove(profileId)
			: arrayUnion(profileId),
	});
}

export async function updateFollowedUserFollowers(
	profileDocId,
	userId,
	isFollowingProfile
) {
	const userDocRef = doc(db, "users", profileDocId);
	return updateDoc(userDocRef, {
		followers: isFollowingProfile ? arrayRemove(userId) : arrayUnion(userId),
	});
}

export async function getPhotos(userId, following) {
	const q = query(collection(db, "photos"), where("userId", "in", following));

	const result = await getDocs(q);

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}
			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];
			return { username, ...photo, userLikedPhoto };
		})
	);
	return photosWithUserDetails;
}

export async function getUserByUsername(username) {
	const q = query(collection(db, "users"), where("username", "==", username));

	const result = await getDocs(q);

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
	return user;
}

export async function getUserPhotosByUsername(username) {
	const [user] = await getUserByUsername(username);
	const q = query(collection(db, "photos"), where("userId", "==", user.userId));

	const result = await getDocs(q);

	const photos = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return photos;
}

export async function isUserFollowingProfile(
	loggedInUserUsername,
	profileUserId
) {
	const q = query(
		collection(db, "users"),
		where("username", "==", loggedInUserUsername),
		where("following", "array-contains", profileUserId)
	);

	const result = await getDocs(q);

	const [response = {}] = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return response.userId;
}

export async function toggleFollow(
	isFollowingProfile,
	activeUserDocId,
	profileDocId,
	profileUserId,
	followingUserId
) {
	await updateLoggedInUserFollowing(
		activeUserDocId,
		profileUserId,
		isFollowingProfile
	);
	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}
