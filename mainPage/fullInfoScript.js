"use strict";

let title = sessionStorage.getItem("title");
let dateFinished = sessionStorage.getItem("dateFinished");
let dateStarted = sessionStorage.getItem("dateStarted");
let stars = sessionStorage.getItem("stars");
let review = sessionStorage.getItem("review");

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backBttnIcon");
    if(backButton){
        backButton.addEventListener("click", () => {
            window.location.href = '../mainPage/bookcase.html';
        });
    }
})

function addTitle() {
    let titleElement = document.getElementById("title");
    titleElement.innerText = title;
}

function addStars() {
    let starsElement = document.getElementById("stars");

    for (let i=0;i<=5;i++){
        let iconElement = document.createElement("i");

        if(i <= stars){
            iconElement.className = "material-icons filledStar";
            iconElement.innerText = "star";
        }
        else{
            iconElement.className = "material-icons";
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
    if (dateAsNum[0] == 0){
        date = dateAsNum[1];
    }
    else {
        date = dateAsNum[0] + dateAsNum[1];
    }

    if (dateAsNum[1] == 0 || dateAsNum[1] == 2 || dateAsNum[1] == 3){
        if(dateAsNum[1] == 1){
            date += "st"
        }
        else if(dateAsNum[1] == 2){
            date += "nd"
        }
        else if(dateAsNum[1] == 3){
            date += "rd"
        }
    }
    else {
        date += "th";
    }

    date += " of ";

    // month
    let month = dateAsNum[2].toString() + dateAsNum[3].toString();
    month = parseInt(month);
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date += monthsList[month-1];

    // year
    let year = " 20" + dateAsNum[4].toString() + dateAsNum[5].toString();
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
    dateFinishedElement.innerText = "Date finished: " + date;
}

window.onload = function() {
    addTitle();
    addStars();
    addReview();
    addDates();
};