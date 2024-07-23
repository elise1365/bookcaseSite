"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDoc, getFirestore, doc, updateDoc, getDocs, query, collection, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let bookId = sessionStorage.getItem("bookId");
let title;
let dateFinished;
let dateStarted;
let stars;
let review;
let userId = sessionStorage.getItem("userId");

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

async function getBookInfo(){
    const db = initApp();
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
        const bookData = docSnap.data();
        title = await bookData.title;
        review = await bookData.review;
        stars = await bookData.stars;
        dateStarted = await bookData.dateStarted;
        dateFinished = await bookData.dateFinished;

        addTitle();
        addStars();
        addReview();
        addDates();
    }
    else{
        console.log("book doesnt exist");
        // ToDo: error stuff
    }
}

function addTitle() {
    let titleElement = document.getElementById("title");
    titleElement.innerText = title;
}

function addStars() {
    let starsElement = document.getElementById("stars");

    // wipe starsElement clean before adding the stars, useful for edit mode
    starsElement.innerHTML = "";

    for (let i=0;i<5;i++){
        let iconElement = document.createElement("i");

        if(i < stars){
            iconElement.className = 'material-icons filledStar';
            iconElement.innerText = "star";
        }
        else{
            iconElement.className = 'material-icons';
            iconElement.innerText = "star_outline";
        }

        starsElement.appendChild(iconElement);
    }
}

function addReview() {
    let reviewElement = document.getElementById("review");
    reviewElement.innerText = "'" + review + "'";
}

function addDates() {
    let dateStartedElement = document.getElementById("dateStarted");
    dateStartedElement.className = "date";
    let date = convertToDate(dateStarted);
    dateStartedElement.innerText = "Date started: " + date;

    let dateFinishedElement = document.getElementById("dateFinished");
    date = convertToDate(dateFinished);
    dateFinishedElement.className = "dateFinished";
    dateFinishedElement.innerText = "Date finished: " + date;
}

function convertToDate(dateAsNum){
    let date;
        // day
        if (dateAsNum[8] == 0){
            date = dateAsNum[9];
        }
        else {
            date = dateAsNum[8] + dateAsNum[9];
        }
    
        if (dateAsNum[9] == 0 || dateAsNum[9] == 2 || dateAsNum[9] == 3){
            if(dateAsNum[9] == 1){
                date += "st"
            }
            else if(dateAsNum[9] == 2){
                date += "nd"
            }
            else if(dateAsNum[9] == 3){
                date += "rd"
            }
        }
        else {
            date += "th";
        }

    // month
    let month = dateAsNum[5].toString() + dateAsNum[6].toString();
    month = parseInt(month);
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthsList[month-1];

    // year
    let year = dateAsNum[0].toString() + dateAsNum[1].toString() + dateAsNum[2].toString() + dateAsNum[3].toString();

    date += " of ";
    date += monthName;
    date += " ";
    date += year;

    return date;
}

function changeElementToInput(id, inputType){
    let element = document.getElementById(id);
    let newElement = document.createElement("input");
    newElement.id = id;
    newElement.type = inputType;
    if(inputType == "date"){
        if(id == "dateStarted"){
            newElement.value = dateStarted;
        }
        else{
            newElement.value = dateFinished;
        }
    }
    else{
        newElement.value = element.innerHTML;
    }
    element.parentNode.replaceChild(newElement, element);
}

function changeInputToElement(id){
    let input = document.getElementById(id);
    let newElement = document.createElement("p");
    newElement.id = id;
    newElement.innerHTML = input.value;
    input.parentNode.replaceChild(newElement, input);
}

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

async function updateElement(item, value){
    const db = initApp();
    // alert(userId);
    const bookInfo = collection(db, "books");
    const q = query(bookInfo, where("userID", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty){
        querySnapshot.forEach(async (doc) => {
            try {
                await updateDoc(doc.ref, {
                    [item]: value  
                });
                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        });
    } else{
        // ToDo: add error stuff here
        console.log("document not found");
    }
}

function saveChanges(){
    // change the button from edit to save
    let editBttn = document.getElementById("saveBttnIcon")
    editBttn.innerText = "edit";
    editBttn.id = "editBttnIcon";
    editBttn.removeEventListener("click", saveChanges);
    editBttn.addEventListener("click", editMode);

    changeInputToElement("title");
    changeInputToElement("review");
    changeInputToElement("dateFinished");
    changeInputToElement("dateStarted");

    // rewrite each element into the db, regardless of whether its changed
    let titleElement = document.getElementById("title");
    updateElement("title", titleElement.innerText);

    let reviewElement = document.getElementById("review");
    updateElement("review", reviewElement.innerHTML);
    addReview();

    let dateFinishedElement = document.getElementById("dateFinished");
    updateElement("dateFinished", dateFinishedElement.innerHTML);
    let dateStartedElement = document.getElementById("dateStarted");
    updateElement("dateStarted", dateStartedElement.innerHTML);
    dateStarted = dateStartedElement.innerHTML;
    dateFinished = dateFinishedElement.innerHTML;
    addDates();

    updateElement("stars", stars);
    addStars();
}

function editMode(){
    // change the button from edit to save
    let editBttn = document.getElementById("editBttnIcon")
    editBttn.innerText = "check";
    editBttn.id = "saveBttnIcon";
    editBttn.removeEventListener("click", editMode);
    editBttn.addEventListener("click", saveChanges);

    // need to remove the '' from the review
    let reviewElement = document.getElementById("review");
    let reviewText = reviewElement.innerHTML;
    reviewText = reviewText.slice(1,-1);
    reviewElement.innerHTML = reviewText;

    // get each item from the page and convert to an input box for editing
    changeElementToInput("title", "text");
    changeElementToInput("review", "text");
    changeElementToInput("dateFinished", "date");
    changeElementToInput("dateStarted", "date");

    // convert stars into editable
    createEditableStars();
}

// function loading stuff
window.onload = function() {
    getBookInfo();
};

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backBttnIcon");
    if(backButton){
        backButton.addEventListener("click", () => {
            window.location.href = '../mainPage/bookcase.html';
        });
    }

    const editButton = document.getElementById("editBttnIcon");
    if(editButton){
        editButton.addEventListener("click", () => {
            editMode();
        });
    }

    const saveButton = document.getElementById("saveBttnIcon");
    if(saveButton){
        saveButton.addEventListener("click", () => {
            saveChanges();
        });
    }
})