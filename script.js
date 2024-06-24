"use strict"

let numOfShelves = 5;

function drawLines(){
    let lineContainer = document.getElementById("lineContainer");
    for(let i=0;i<numOfShelves-1;i++){
        const line = document.createElement("div");
        line.className = "line";
        lineContainer.appendChild(line);
    }
}

window.onload = drawLines;