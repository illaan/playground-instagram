import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function AddComment({ docId, comments, setComments, commentInput }) {
	const [comment, setComment] = useState("");
	const { db } = useContext(FirebaseContext);
	const {
		user: { displayName },
	} = useContext(UserContext);

	const handleSubmitComment = (e) => {
		e.preventDefault();
		setComments([{ displayName, comment }, ...comments]);
		setComment("");
		return updateDoc(doc(db, "photos", docId), {
			comments: arrayUnion({ displayName, comment }),
		});
	};

	return (
		<div className="border-t border-gray-primary">
			<form
				className="flex justify-between pl-0 pr-5"
				method="POST"
				onSubmit={(e) =>
					comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
				}
			>
				<input
					type="text"
					aria-label="Add a comment"
					autoComplete="off"
					name="add-comment"
					placeholder="Add a comment..."
					className="text-sm text-gray-base w-full mr-3 py-5 px-4"
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					ref={commentInput}
				/>
				<button
					className={`text-sm font-bold text-blue-medium ${
						!comment && "opacity-25"
					}`}
					type="button"
					disabled={comment.length < 1}
					onClick={handleSubmitComment}
				>
					Post
				</button>
			</form>
		</div>
	);
}

export default AddComment;

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,

	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object,
};
