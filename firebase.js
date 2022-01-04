import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBT9mmznmGAe8uwMioH1ZT8ZH5Ke2csSqM",
    authDomain: "stomble-login.firebaseapp.com",
    projectId: "stomble-login",
    storageBucket: "stomble-login.appspot.com",
    messagingSenderId: "1042025967401",
    appId: "1:1042025967401:web:9412bf16e9670adc40d138"
  };

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };