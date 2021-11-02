import firebase from "firebase";


const firebaseApp = firebase.initializeApp( {
  // Projemize Firebase'i dahil edebilmek için oluşturulan config dosyasını yapıştırıyoruz.

  //apiKey: ,
  //authDomain: ,
  //projectId: ,
  //storageBucket: ,
  //messagingSenderId: ,
  //appId: ,
  //measurementId: ,
})
 
const database = firebaseApp.firestore();

export default database;


