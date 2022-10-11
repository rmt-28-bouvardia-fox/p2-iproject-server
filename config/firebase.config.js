const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

let firebaseConfig = {
  apiKey: "AIzaSyCTU-B3RIVL_S7GDRLwlRNaaj-uLSLfmt4",
  authDomain: "yugioh-bidder.firebaseapp.com",
  databaseURL: "https://yugioh-bidder-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yugioh-bidder",
  storageBucket: "yugioh-bidder.appspot.com",
  messagingSenderId: "1014774811420",
  appId: "1:1014774811420:web:dd8d3e306381e2051608d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

module.exports = database;
