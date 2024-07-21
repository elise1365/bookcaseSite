"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDoc, getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let title = sessionStorage.getItem("title");
let dateFinished = sessionStorage.getItem("dateFinished");
let dateStarted = sessionStorage.getItem("dateStarted");
let stars = sessionStorage.getItem("stars");
let review = sessionStorage.getItem("review");
let userId = sessionStorage.getItem("userId");

function addTitle() {
    let titleElement = document.getElementById("title");
    titleElement.innerText = title;
}

function addStars() {
    let starsElement = document.getElementById("stars");

    for (let i=0;i<=5;i++){
        let iconElement = document.createElement("i");

        if(i <= stars){
            iconElement.className = 'material-icons filledStar ${i}';
            iconElement.innerText = "star";
        }
        else{
            iconElement.className = 'material-icons ${i}';
            iconElement.innerText = "star_outline";
        }

        starsElement.appendChild(iconElement);
    }
}

function addReview() {
    let reviewElement = document.getElementById("review");
    reviewElement.innerText = "'" + review + "'";
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

function editMode(){
    // change the button from edit to save
    let editBttn = document.getElementById("editBttnIcon")
    editBttn.textContent = "check";
    editBttn.id = "saveBttnIcon";
    editBttn.removeEventListener("click", editMode);
    editBttn.addEventListener("click", saveChanges);

    // get each item from the page and convert to an input box for editing
    changeElementToInput("title", "text");
    changeElementToInput("review", "text");
    changeElementToInput("dateFinished", "date");
    changeElementToInput("dateStarted", "date");
}

function changeElementToInput(id, inputType){
    let element = document.getElementById(id);
    let newElement = document.createElement("input");
    newElement.id = id;
    newElement.type = inputType;
    newElement.value = element.innerHTML;
    element.parentNode.replaceChild(newElement, element);
}

function changeInputToElement(id){
    let input = document.getElementById(id);
    let newElement = document.createElement("p");
    newElement.id = id;
    newElement.innerHTML = input.value;
    input.parentNode.replaceChild(newElement, input);
}

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

async function updateElement(item, value){
    const db = initApp();
    console.log(userId);
    const userDocRef = doc(db, "bookcases", userId);
    const docSnap = await getDoc(userDocRef);

    try {
        await updateDoc(userDocRef, {
            [item]: value  
        });
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

function saveChanges(){
    updateElement("title", "the");
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
}

window.onload = function() {
    addTitle();
    addStars();
    addReview();
    addDates();
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