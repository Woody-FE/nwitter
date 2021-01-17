import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.AUTH_DOMAIN,
// 	projectId: process.env.PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
	apiKey: 'AIzaSyBAXp0KzM-EW8HxTn4qhdXMgwu-DrI27Uc',
	authDomain: 'nwitter-754cc.firebaseapp.com',
	projectId: 'nwitter-754cc',
	storageBucket: 'nwitter-754cc.appspot.com',
	messagingSenderId: '618583351987',
	appId: '1:618583351987:web:b54d5b4dfb74eb05c206c6',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storageService = firebase.storage();
