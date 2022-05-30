import Vue from 'vue'
import App from './App.vue'
import router from './route/index.js'
import axios from 'axios'
import './registerServiceWorker'
import { store } from './store/store.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXzSzGbGYTjzC-hj3O1DLZRe5dgbYbRro",
  authDomain: "todofordays.firebaseapp.com",
  projectId: "todofordays",
  storageBucket: "todofordays.appspot.com",
  messagingSenderId: "523310030065",
  appId: "1:523310030065:web:836bf0bdf5d7e727815d50",
  measurementId: "G-Z7SGLL14B4"
};

initializeApp(firebaseConfig);


new Vue({  
  router,
  store,
  render: h => h(App),
}).$mount('#app')