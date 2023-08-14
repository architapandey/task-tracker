import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  databaseURL: "https://timetracker-beb60-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyC5uZWGUQB9kgzcwbOP1GbUJ-6c5wvNaxs",
  authDomain: "timetracker-beb60.firebaseapp.com",
  projectId: "timetracker-beb60",
  storageBucket: "timetracker-beb60.appspot.com",
  messagingSenderId: "149138924372",
  appId: "1:149138924372:web:b190647a9b7ab4fcae9ec1",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth = getAuth(app);
