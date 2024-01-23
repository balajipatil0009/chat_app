// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebase = require('firebase');
// const admin = require("firebase-admin")

// const firebaseConfig = require('./conn.json')

// admin.initializeApp({
//     "credential": admin.credential.cert(firebaseConfig)
//     });

// const db = admin.firestore();

// const User = db.collection('User')
// const Chat = db.collection('Chat')

// module.exports = {User, Chat}

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);






// const {MongoClient} = require('mongodb');
// const url = "mongodb+srv://balajipatil20030:balajipatil20030@cluster0.low4ya7.mongodb.net/?retryWrites=true&w=majority"
// const clint = new MongoClient(url,{},6000000)

//   async function database(){
//     console.log("am here");
//     try{
//         const db = await clint.connect().catch(e=>{
//             console.log(e);
//         })
//         if(db) console.log("connected DB");

//     }catch(e){
//         console.log("mongoo error: "+e);
//     }
// }
 
// module.exports = database


const mongoose = require('mongoose')
const url = "mongodb+srv://balajipatil20030:balajipatil20030@cluster0.low4ya7.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})



