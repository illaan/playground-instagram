import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const q = query(collection(db, "users"), where("username", "==", username));

	const result = await getDocs(q);

	return !result.empty;
}
