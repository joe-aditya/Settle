import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdAHrkp-CFTDi6XVJ5NeJwvQiej7VdgZo",
  authDomain: "settle-2e184.firebaseapp.com",
  databaseURL: "https://settle-2e184.firebaseio.com",
  projectId: "settle-2e184",
  storageBucket: "settle-2e184.appspot.com",
  messagingSenderId: "1047239625069",
  appId: "1:1047239625069:web:e2382ea85e14e721cbf264",
};

export const fbServer = firebase.database.ServerValue
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();

export const db = firebaseApp.database();

export const storage = firebaseApp.storage();
