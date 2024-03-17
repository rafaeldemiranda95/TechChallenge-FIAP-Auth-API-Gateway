import * as firebase from 'firebase-admin';

export function initializeFirebase() {
    var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}