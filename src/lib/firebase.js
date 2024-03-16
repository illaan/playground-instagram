import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

//here we want to import the seed file
// import { seedDatabase } from "../seed";

//firebase configuration
const config = {
	apiKey: "AIzaSyAtDNqD8hYxjqM7Q9gOZTEBenuVLZj7Gdw",
	authDomain: "instagram-180ce.firebaseapp.com",
	projectId: "instagram-180ce",
	storageBucket: "instagram-180ce.appspot.com",
	messagingSenderId: "431855902301",
	appId: "1:431855902301:web:11fc4615b5c151760b37b4",
};

//Initalize Firebase
const firebase = initializeApp(config);

//Initalize services
const db = getFirestore(firebase);
// const auth = getAuth();

//here we call seed file only ONCE
// seedDatabase(firebase);

export { firebase, FieldValue, db };
