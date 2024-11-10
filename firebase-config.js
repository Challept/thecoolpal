// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyCFUjoTYuPxg-7wARDHPWLHvD9sjpVB8sk",
    authDomain: "webbforma1.firebaseapp.com",
    projectId: "webbforma1",
    storageBucket: "webbforma1.firebasestorage.app",
    messagingSenderId: "875335609008",
    appId: "1:875335609008:web:1d3cca6d257937a8526975"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);
