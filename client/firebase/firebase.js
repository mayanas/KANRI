import * as firebase from 'firebase/compat';


    const firebaseConfig = {
        apiKey: "AIzaSyBmVToXT0gikiPbp0-BXdQKMPC_OEH9oPI",
        authDomain: "kanri-b2dd1.firebaseapp.com",
        projectId: "kanri-b2dd1",
        storageBucket: "kanri-b2dd1.appspot.com",
        messagingSenderId: "3447671332",
        appId: "1:3447671332:android:cf870fbc3248afce5da6b1",
        measurementId: "${config.measurementId}"
      };

      if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
      }
export default firebase;