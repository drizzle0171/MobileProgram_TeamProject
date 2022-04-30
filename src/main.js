import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXzSzGbGYTjzC-hj3O1DLZRe5dgbYbRro",
  authDomain: "todofordays.firebaseapp.com",
  projectId: "todofordays",
  storageBucket: "todofordays.appspot.com",
  messagingSenderId: "523310030065",
  appId: "1:523310030065:web:836bf0bdf5d7e727815d50",
  measurementId: "G-Z7SGLL14B4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

new Vue({
  render: h => h(App),
}).$mount('#app')
