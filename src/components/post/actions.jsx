import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { useContext, useState } from "react";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";

function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
	const { user } = useContext(UserContext);
	const { db } = useContext(FirebaseContext);
	const [toggleLiked, setToggleLiked] = useState(likedPhoto);
	const [likes, setLikes] = useState(totalLikes);

	const handleToggleLiked = async () => {
		setToggleLiked((toggleLiked) => !toggleLiked);

		const photoRef = doc(db, "photos", docId);
		await updateDoc(photoRef, {
			likes: toggleLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
		});

		setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
	};

	return (
		<>
			<div className="flex justify-between p-4">
				<div className="flex">
					<svg
						onClick={handleToggleLiked}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={toggleLiked ? 0 : 1.5}
						stroke="currentColor"
						className={`w-7 mr-4 select-none cursor-pointer ${
							toggleLiked ? "fill-red" : "text-black-light"
						}`}
						tabIndex={0}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
					<svg
						onClick={handleFocus}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-7 text-black-light select-none cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
						/>
					</svg>
				</div>
			</div>
			<div className="p-4 py-0">
				<p className="font-bold">
					{likes == 1 ? `${likes} like` : `${likes} likes`}
				</p>
			</div>
		</>
	);
}

export default Actions;

Actions.PropTypes = {
	docId: PropTypes.string.isRequired,
	totalLikes: PropTypes.number.isRequired,
	likedPhoto: PropTypes.bool.isRequired,
	handleFocus: PropTypes.func.isRequired,
};
