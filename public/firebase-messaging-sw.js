importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA6OleWmrW_kIVi_z4S8z04HU260U2t53Y",
        authDomain: "my-project-1549821335467.firebaseapp.com",
        projectId: "my-project-1549821335467",
        storageBucket: "my-project-1549821335467.appspot.com",
        messagingSenderId: "165377087584",
        appId: "1:165377087584:web:bc04295659fd33fe968b05"
    });
    firebase.messaging();
    //background notifications will be received here
    firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));
}