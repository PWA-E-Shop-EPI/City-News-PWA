import 'firebase/messaging';
import * as firebaseApp from 'firebase/app';
import * as firebase from 'firebase/messaging';

import localforage from 'localforage';
const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token');
    },
    //initializing firebase app
    init: async function () {
        firebaseApp.initializeApp({
            apiKey: "AIzaSyA6OleWmrW_kIVi_z4S8z04HU260U2t53Y",
            authDomain: "my-project-1549821335467.firebaseapp.com",
            projectId: "my-project-1549821335467",
            storageBucket: "my-project-1549821335467.appspot.com",
            messagingSenderId: "165377087584",
            appId: "1:165377087584:web:bc04295659fd33fe968b05"
        });
        try {
            const messaging = firebase;
            const tokenInLocalForage = await this.tokenInlocalforage();
            if (tokenInLocalForage !== null) {
                return tokenInLocalForage;
            }
            //if FCM token is already there just ret
            //requesting notification permission from browser
            const status = await Notification.requestPermission();
            if (status && status === 'granted') {
                //getting token from FCM
                console.log('GET TOKEN');
                const fcm_token = await messaging.getToken({
                    apiKey: "AIzaSyA6OleWmrW_kIVi_z4S8z04HU260U2t53Y",
                    authDomain: "my-project-1549821335467.firebaseapp.com",
                    projectId: "my-project-1549821335467",
                    storageBucket: "my-project-1549821335467.appspot.com",
                    messagingSenderId: "165377087584",
                    appId: "1:165377087584:web:bc04295659fd33fe968b05",
                    vapidKey: "BHzru5_WG5jT42M4MV2D2bifi6Wvwydb3aRz7R9nhrVffWu4KItpTJuJC91IubXcj9mUTDv3jHTvzQpVyUFhLZM"
                });
                if (fcm_token) {
                    //setting FCM token in indexed db using localforage
                    localforage.setItem('fcm_token', token);
                    console.log('fcm token', token);
                    //return the FCM token after saving it
                    return token;
                }
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
export { firebaseCloudMessaging };