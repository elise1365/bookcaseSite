"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { collection, query, where, getFirestore, doc, getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let year;
let goal;
let booksRead;
let userID = sessionStorage.getItem("userId");

function initApp(){
    // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBJ2lJaYojtl0Gqi6C2yQyA-X_O-PbIBYU",
    authDomain: "bookcasesite-f9ce9.firebaseapp.com",
    projectId: "bookcasesite-f9ce9",
    storageBucket: "bookcasesite-f9ce9.appspot.com",
    messagingSenderId: "1028674706274",
    appId: "1:1028674706274:web:c9f2f9be0fbaefb94fea3b",
    measurementId: "G-J7K3W3C2PT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};

async function getInfoFromDb(){
    const db = initApp();
    const goalCollection = collection(db, "readingGoals");
    const q = query(goalCollection, where("userID", "==", userID));
    const snapshot = await getDocs(q);

    if(!snapshot.empty){
        snapshot.forEach((doc) => {
            const allData = doc.data();
            year = allData.year;
            goal = allData.goal;
            booksRead = allData.booksRead;
            displayAllInfo()
        })
    }
    else{
        console.log("goal doesnt exist");
        // ToDo: error stuff etc etc
    }
}

function displayAllInfo(){
    // add the title
    let titleElement = document.getElementById("title");
    titleElement.innerHTML = year + " Reading Goal";
}

window.onload = getInfoFromDb();

document.addEventListener("DOMContentLoaded", () => {
    let backBttn = document.getElementById("backBttn");
    if(backBttn){
        backBttn.addEventListener("click", () => {
            window.location.href = "../mainPage/bookcase.html";
        })
    }
});