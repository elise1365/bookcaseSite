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
            displayAllInfo();
        })
    }
    else{
        console.log("goal doesnt exist");
        // ToDo: error stuff etc etc
    }
}

async function displayAllInfo(){
    // add the title
    let titleElement = document.getElementById("title");
    titleElement.innerHTML = year + " Reading Goal";

    // add bookRead/goal
    let goalElement = document.getElementById("goal");
    goalElement.innerHTML = booksRead + " / " + goal + " books read";

    // add stats
    // percentage complete
    let percentageElement = document.getElementById("percentage");
    let percentageCompleted = goal / booksRead;
    percentageCompleted = Math.floor(percentageCompleted);
    percentageElement.innerHTML = "- " + percentageCompleted + "% complete"

    // on track / behind / ahead
    let booksPerMonth = goal / 12;

    // ToDo: what if 2 books r finished on the same day?
    // ToDo: make sure most recent book is from that correct year

    const db = initApp();    
    const goalCollection = collection(db, "books");
    const q = query(goalCollection, where("userID", "==", userID));
    const snapshot = await getDocs(q);

    let mostRecentDate;
    let mostRecentBookID;
    let date;

    if(!snapshot.empty){
        snapshot.forEach((doc) => {
            const bookData = doc.data();
            const bookDate = new Date(bookData.dateFinished);

            if(!mostRecentDate || bookDate > mostRecentDate){
                mostRecentDate = bookDate;
                mostRecentBookID = doc.id;
                date = bookData.dateFinished;

                // get month of most recently read book, x this by booksPerMonth and compare to booksRead
                let month = date[5] + date[6];
                let expected = Math.ceil(month * booksPerMonth);

                let onTrack;

                if(expected >= goal){
                    onTrack = "You are on track to achieve your goal";
                }
                else{
                    onTrack = "You are behind on your reading goal";
                }

                let trackElement = document.getElementById("track");
                trackElement.innerHTML = onTrack;
            }
        }
    );
    } else{
        // ToDo: error stuff!
        console.log("no book found for this user")
        return null;
    }

    // how often user needs to finish a book to achieve goal
    let planElement = document.getElementById("plan");
    planElement.innerHTML = "In order to reach your goal, you need to read " + Math.ceil(booksPerMonth) + " books per month - ";
}

function editMode(){
    // convert edit bttn to save bttn
    let editBttn = document.getElementById("editBttn");
    editBttn.innerHTML = "check";
    editBttn.id = "saveBttn";
    editBttn.removeEventListener("click", editMode);
    editBttn.addEventListener("click", saveChanges);
}

function saveChanges(){
    // convert save bttn back to edit bttn
    let saveBttn = document.getElementById("saveBttn");
    saveBttn.innerHTML = "edit";
    saveBttn.id = "editBttn";
    saveBttn.removeEventListener("click", saveChanges);
    saveBttn.addEventListener("click", editMode);
}

window.onload = getInfoFromDb();

document.addEventListener("DOMContentLoaded", () => {
    let backBttn = document.getElementById("backBttn");
    if(backBttn){
        backBttn.addEventListener("click", () => {
            window.location.href = "../mainPage/bookcase.html";
        })
    }

    let editBttn = document.getElementById("editBttn");
    if(editBttn){
        editBttn.addEventListener("click", () => {
            editMode();
        })
    }
});