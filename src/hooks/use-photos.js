import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

function usePhotos() {
	const [photos, setPhotos] = useState(null);
	const { user } = useContext(UserContext);

	useEffect(() => {
		console.log(user.uid);

		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(user.uid);
			let followedUserPhotos = [];

			console.log(following);

			if (following.length > 0) {
				followedUserPhotos = await getPhotos(user.uid, following);
			}

			followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
			setPhotos(followedUserPhotos);
		}
		getTimelinePhotos();
	}, [user.uid]);

	return { photos };
}

export default usePhotos;
