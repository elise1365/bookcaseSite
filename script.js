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
        let title = listOfBooks[i];
        if(randNum == 1){
            className = "bookSpine1"
            if(listOfBooks[i].length > 15){
                title = title.slice(0,15);
                title += "...";
            }
        }
        else if(randNum == 2){
            className = "bookSpine2"
            if(listOfBooks[i].length > 30){
                title = title.slice(0,30);
                title += "...";
            }
        }
        else if(randNum == 3){
            className = "bookSpine3"
            if(listOfBooks[i].length > 10){
                title = title.slice(0,10);
                title += "...";
            }
        }
        else{
            className = "bookSpine4"
            if(listOfBooks[i].length > 25){
                title = title.slice(0,25);
                title += "...";
            }
        }

        const bookSpine = document.createElement("div");
        bookSpine.className = className + " bookSpine";

        bookSpine.innerText = title;
        bookShelf.appendChild(bookSpine);
    }
}

window.onload = drawBooks(["The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd"]);