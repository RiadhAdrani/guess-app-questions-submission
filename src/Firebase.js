import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
     apiKey: "AIzaSyCdvmEo6JXbPtdnTMCHc_lBCMNiivKZUO8",
     authDomain: "questions-submission.firebaseapp.com",
     projectId: "questions-submission",
     storageBucket: "questions-submission.appspot.com",
     messagingSenderId: "902604205688",
     appId: "1:902604205688:web:ff1ddadcb6637ea1f5878d",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.settings({
     timestampsInSnapshots: true,
});

export default db;
