// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_xwWFgxlajMn2FktetVpCUxA-Dp14Yuw",
  authDomain: "my-web-2a215.firebaseapp.com",
  projectId: "my-web-2a215",
  storageBucket: "my-web-2a215.firebasestorage.app",
  messagingSenderId: "796113680557",
  appId: "1:796113680557:web:4f049a5a6d1ec8b741ae24",
  measurementId: "G-SFVYMMZV6N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = app.firestore();
export { db };
