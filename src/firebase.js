import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClUiV92Ec2ilmjaYN9yIpuQwho96JFANE",
  authDomain: "daevin-stock.firebaseapp.com",
  projectId: "daevin-stock",
  storageBucket: "daevin-stock.appspot.com",
  messagingSenderId: "10039591387",
  appId: "1:10039591387:web:b98a38c360d3dd4b8567fe",
  measurementId: "G-W9K79HF9TP",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { googleProvider };
export default auth;
