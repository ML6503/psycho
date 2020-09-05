import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvMoKHbVc6tj34NOspHJvR0zKlu7Qr7cM",
    authDomain: "psycho-c324a.firebaseapp.com",
    databaseURL: "https://psycho-c324a.firebaseio.com",
    projectId: "psycho-c324a",
    storageBucket: "psycho-c324a.appspot.com",
    messagingSenderId: "735136999492",
    appId: "1:735136999492:web:e4ee582ac6277a233eb411",
    measurementId: "G-H8B407355Y",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
