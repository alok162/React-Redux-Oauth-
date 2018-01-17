import Rebase from 're-base';
import firebase from 'firebase';

// Firebase database configuration
const config = {
  apiKey: "AIzaSyAjvY8OVPoYAFtVKMNq35ttUBm2xsyQQsw",
  authDomain: "grow-fit-project.firebaseapp.com",
  databaseURL: "https://grow-fit-project.firebaseio.com",
  projectId: "grow-fit-project",
  storageBucket: "grow-fit-project.appspot.com",
  messagingSenderId: "862272674337"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export {
  app,
  base,
  facebookProvider
}
