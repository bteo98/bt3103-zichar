import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBUkgYijs83rW0vgIBDlhRER8-owlAzIZA",
    authDomain: "bt3103-week-6-91e92.firebaseapp.com",
    projectId: "bt3103-week-6-91e92",
    storageBucket: "bt3103-week-6-91e92.appspot.com",
    messagingSenderId: "542127424892",
    appId: "1:542127424892:web:39b7f99a3936592037d0f9",
    measurementId: "G-THZED0P3QY"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;