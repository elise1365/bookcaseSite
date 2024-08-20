"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
  const auth = getAuth(app);
  return auth;
};

let auth = initApp();

async function logIn() {
  try{
      // get email and password entered
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      // log user in
      const user = await signInWithEmailAndPassword(auth, email, password);
      // pass user id to homepage so books previously logged by user ca be accessed
      const userId = user.user.uid;
      sessionStorage.setItem("userId", userId);
      window.location.href = '../mainPage/bookcase.html';

  } catch (error) {
    let errorMessage = error.code;
    errorMessage = errorMessage.substring(5);
    showErrorMessage(errorMessage);
  }
};

async function signUp() {
  try {
    // auth = initApp();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log("User created:", userCredential.user);
  } catch (error) {
    let errorMessage = error.code;
    errorMessage = errorMessage.substring(5);
    showErrorMessage(errorMessage);
  }
};

function showErrorMessage(errorText){
  let errorBanner = document.getElementById("errorBanner");
  let errorMessageText = document.getElementById("errorText");
  let closeButton = document.getElementById("closeButton");

  errorMessageText.textContent = errorText;
  errorBanner.classList.remove("hidden");

  closeButton.addEventListener('click', () => {
    errorBanner.classList.add('hidden');
    errorMessageText.textContent = "";
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById("loginBttn");
  if (loginButton) {
      loginButton.addEventListener("click", logIn);
  }

  const signUpButton = document.getElementById("signUpBttn");
  if (signUpButton) {
      signUpButton.addEventListener("click", signUp);
  }
});