"use strict"

let numOfShelves = 1;

function drawLines() {
    let lineContainer = document.getElementById("lineContainer");
    for(let i=0;i<numOfShelves-1;i++){
        const line = document.createElement("div");
        line.className = "line";
        lineContainer.appendChild(line);
    }
}

window.onload = drawLines;

function drawBooks(listOfBooks) {
    let bookShelf = document.getElementById("bookShelf");
    for(let i=0;i<listOfBooks.length;i++){
        // assign a different spine style randomly
        let randNum = Math.floor(Math.random() * 4) +1;
        // alert(randNum);
        let className;
        if(randNum == 1){
            className = "bookSpine1"
        }
        else if(randNum == 2){
            className = "bookSpine2"
        }
        else if(randNum == 3){
            className = "bookSpine3"
        }
        else if(randNum == 4){
            className = "bookSpine4"
        }

        const bookSpine = document.createElement("div");
        bookSpine.className = className + " bookSpine";

        let title = listOfBooks[i];
        if(listOfBooks[i].length > 12){
            title = title.slice(0,12);
        }

        bookSpine.innerText = title;
        bookShelf.appendChild(bookSpine);
    }
}

window.onload = drawBooks(["crow road", "as i walked out one midsummer morning"]);