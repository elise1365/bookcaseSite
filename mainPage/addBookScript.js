"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let userId = sessionStorage.getItem("userId");
let stars;
let title;
let dateStarted;
let dateFinished;
let review;

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

function createEditableStars(){
    let starsElement = document.getElementById("stars");
    starsElement.innerHTML = "";

    for (let i=0;i<5;i++){
        let iconElement = document.createElement("i");
        iconElement.className = 'material-icons editableStars';
        iconElement.innerText = "star_outline";
        iconElement.addEventListener("click", () => fillStars(i));
        starsElement.appendChild(iconElement);
    }
}

function fillStars(index){
    let starsElement = document.getElementById("stars");
    let allStars = starsElement.getElementsByTagName("i");

    stars = index + 1;

    for(let i=0;i<5;i++){
        if(i<=index){
            allStars[i].classList.add("filledStar");
            allStars[i].innerText = "star";
        }
        else{
            allStars[i].classList.remove("filledStar");
            allStars[i].innerText = "star_outline";
        }
    }
}

async function addBookToDb(){
    // pass the complete page to fullInfoPage
    let titleElement = document.getElementById("title");
    title = titleElement.value;

    let reviewElement = document.getElementById("review");
    review = reviewElement.value;

    let dateStartedElement = document.getElementById("dateStarted");
    dateStarted = dateStartedElement.value;

    let dateFinishedElement = document.getElementById("dateFinished");
    dateFinished = dateFinishedElement.value;

    // creating a documenet in the db for the book
    let db = initApp();

    let docRef = await addDoc(collection(db, "books"), {
        title: title,
        review: review,
        dateStarted: dateStarted,
        dateFinished: dateFinished,
        stars: stars,
        userID: userId
    })

    // now need to update the users bookcase with this new book, first get list of bookIds, then add new book onto the end
    // also get username
    let bookId = docRef.id;

    let listOfBookIds;
    let docId;
    let username;

    const bookCasesCollection = collection(db, "bookcases");
    const q = query(bookCasesCollection, where("userID", "==", userId));
    const querySnapshot = await getDocs(q);

    // get list from users collection in db
    if (!querySnapshot.empty){
        console.log("bookcase exists for user");
        querySnapshot.forEach((doc) => {
            const bookcaseData = doc.data();
            username = bookcaseData.name;
            listOfBookIds = bookcaseData.listOfBookIds;
            docId = doc.id;
        })
    }
    else{
        console.log("no bookcases available");
    }

    listOfBookIds.push(bookId);

    setDoc(doc(db, "bookcases", docId), {
        name: username,
        listOfBookIds: listOfBookIds,
        userID: userId
    })

    window.location.href = '../mainPage/bookcase.html';
}

window.onload = function() {
    createEditableStars();
};

document.addEventListener("DOMContentLoaded", () => {
    const backBttn = document.getElementById("backBttn");
    if(backBttn) {
        backBttn.addEventListener("click", () => {
            window.location.href = '../mainPage/bookcase.html';
        });
    }

    const checkBttn = document.getElementById("checkBttn");
    if(checkBttn){
        checkBttn.addEventListener("click", () => {
            addBookToDb();
        });
    }
});
