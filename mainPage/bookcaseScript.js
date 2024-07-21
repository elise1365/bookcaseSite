"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { collection, query, where, getFirestore, doc, getDocs, getDoc, getDocFromCache } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ToDo: add user name to db, sign up and on the __'s bookcase
// ToDo: reading goal for the year

let idsAndTitles = new Map();

// let userId = sessionStorage.getItem("userId");
// setting userId while testing
let userId = "XwgBQfethaWFOd3rodpvh2tunRk1";

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

// creates a map of book ids and titles on a users bookshelf
async function getBookTitlesMap() {
    const db = initApp();
    const bookCasesCollection = collection(db, "bookcases");
    const q = query(bookCasesCollection, where("userID", "==", userId));
    const querySnapshot = await getDocs(q);

    // get list from users collection in db
    if (!querySnapshot.empty){
        querySnapshot.forEach((doc) => {
            const bookcaseData = doc.data();
            const listOfBookIds = bookcaseData.listOfBookIds;

            (async () => {
                for(let i=0; i<listOfBookIds.length;i++){
                    let bookTitle = await getBookTitle(listOfBookIds[i]);
        
                    if(bookTitle == ""){
                        // ToDo: add error stuff here
                    }
                    else{
                        idsAndTitles.set(listOfBookIds[i], bookTitle);
                        console.log("book added to map successfully");
                    }
                }
                drawBooks(Array.from(idsAndTitles.entries()));
            })();
        })
    }
    else{
        // ToDo: add error stuff here
        alert("nuh uh!");
    }
}

// takes a book id and returns title
async function getBookTitle(bookId){
    const db = initApp();
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    // get list from users collection in db
    if (docSnap.exists()){
        const bookData = docSnap.data();
        // alert(bookData.title);
        let bookTitle = await bookData.title;
        return bookTitle;
    }
    else{
        // ToDo: add error stuff here
        // alert("nuh uh!");
        console.log("book doesn't exist");
        return "";
    }
}

// takes a book id and returns all info on it
async function passToFullInfoPage(bookId){
    const db = initApp();
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        sessionStorage.setItem("bookId", bookId);
        sessionStorage.setItem("userID", userId);

        window.location.href = '../mainPage/fullInfoPage.html';
    } else{
        // ToDo: error stuff here!
        console.log("Book doesnt exist :/")
    }
}

function drawBooks(listOfBooks) {
    sessionStorage.getItem("userId");

    let bookShelf = document.getElementById("bookShelf");
    listOfBooks.forEach(([id, title]) => {
                // assign a different spine style randomly
                let randNum = Math.floor(Math.random() * 4) +1;
                let className;
                if(randNum == 1){
                    className = "bookSpine1"
                    if(title.length > 15){
                        title = title.slice(0,15);
                        title += "...";
                    }
                }
                else if(randNum == 2){
                    className = "bookSpine2"
                    if(title.length > 30){
                        title = title.slice(0,30);
                        title += "...";
                    }
                }
                else if(randNum == 3){
                    className = "bookSpine3"
                    if(title.length > 10){
                        title = title.slice(0,10);
                        title += "...";
                    }
                }
                else{
                    className = "bookSpine4"
                    if(title.length > 25){
                        title = title.slice(0,25);
                        title += "...";
                    }
                }
        
                const bookSpine = document.createElement("div");
                bookSpine.className = className + " bookSpine";
                bookSpine.id = id;
                bookSpine.innerText = title;

                bookSpine.addEventListener("click", () => {
                    // add a function to get review and all info, then display it
                    passToFullInfoPage(id);
                });

                bookShelf.appendChild(bookSpine);
    })
};

window.onload = getBookTitlesMap();
// window.onload = drawBooks(["The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd", "The Crow Road", "as i walked out one midsummer morning", "klara and the sun", "dfdfd", "cdsfdssd"]);
