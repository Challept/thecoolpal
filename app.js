// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFUjoTYuPxg-7wARDHPWLHvD9sjpVB8sk",
    authDomain: "webbforma1.firebaseapp.com",
    projectId: "webbforma1",
    storageBucket: "webbforma1.firebasestorage.app",
    messagingSenderId: "875335609008",
    appId: "1:875335609008:web:1d3cca6d257937a8526975",
    measurementId: "G-QRXDZ5R2ZH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in:", user.email);
        window.location.href = "order.html"; // Redirect to protected page if logged in
    }
});

// Email login
document.getElementById("login-button").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Logged in successfully.");
            window.location.href = "order.html"; // Redirect after successful login
        })
        .catch((error) => {
            console.error("Login error:", error);
            document.getElementById("login-error").style.display = "block";
        });
});

// Google login
document.getElementById("google-login-button").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            console.log("Logged in with Google.");
            window.location.href = "order.html"; // Redirect after successful login
        })
        .catch((error) => {
            console.error("Google login error:", error);
        });
});
