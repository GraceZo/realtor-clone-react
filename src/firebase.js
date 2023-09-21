// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAArrol9TLDB4UDpOZoBEDe2MPpA_0jPYo',
  authDomain: 'realtor-clone-practice-421e7.firebaseapp.com',
  projectId: 'realtor-clone-practice-421e7',
  storageBucket: 'realtor-clone-practice-421e7.appspot.com',
  messagingSenderId: '1028722805527',
  appId: '1:1028722805527:web:8276d75ab5f20f07234552',
  measurementId: 'G-S6YJR6GNG3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore()
