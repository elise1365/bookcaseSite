"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// takes a book id and returns all info on it
// function getBookInfo(){

// }

// async function getBookTitle(){
//     const db = initApp();
//     const docRef = doc(db, "Bookcases");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()){
//         alert(docSnap.data());
//     }
//     else{
//         alert("nuh uh!");
//     }

//     sessionStorage.getItem("userId");
// }

function drawBooks(listOfBooks) {
    sessionStorage.getItem("userId");
    // getBookTitle();

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
//  window.onload(getBookTitle());
window.onload = drawBooks(["The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd"]);
