import * as FirebaseModule from 'firebase'
import { config } from '../constants/firebase'

const {
  apiKey, authDomain, databaseURL, storageBucket, messagingSenderId,
} = config

let firebaseInitialized = false

if (apiKey && authDomain && databaseURL && storageBucket && messagingSenderId) {
  FirebaseModule.initializeApp({
    ...config
  })

  firebaseInitialized = true
}

export const FirebaseRef = firebaseInitialized ? FirebaseModule.database().ref() : null
export const Firebase = firebaseInitialized ? FirebaseModule : null
export const FirebaseSotre = firebaseInitialized ? FirebaseModule.firestore() : null
export const myStorage = firebaseInitialized ? FirebaseModule.storage() : null
export const myFirestore = firebaseInitialized ? FirebaseModule.firestore() : null
export const myFirebase = firebaseInitialized ? FirebaseModule : null
export const FirebaseAdmin = null;