import * as firebase from "firebase";
import { v4 } from 'uuid'
const firebaseConfig = {
  apiKey: "AIzaSyAGtC2QUALy4MrH5R0aV2iy8Z4UJRqSC5M",
  authDomain: "workfly-d7e2f.firebaseapp.com",
  databaseURL: "https://workfly-d7e2f.firebaseio.com",
  projectId: "workfly-d7e2f",
  storageBucket: "workfly-d7e2f.appspot.com",
  messagingSenderId: "629751386106",
  appId: "1:629751386106:web:76051b05c1b5ee984f9e43",
  measurementId: "G-GRPBCWE6FW",
};

firebase.initializeApp(firebaseConfig);


export const addToStorage =  (data: any):{firebase:any,uploadTask: firebase.storage.UploadTask} => {
  console.log("data is",typeof data);
  const storage = firebase.storage();
  const storageRef = storage.ref().child(`${v4()}.png`);
  var uploadTask = storageRef.put(data);
  return {firebase, uploadTask}
};
