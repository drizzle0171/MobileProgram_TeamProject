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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

initializeApp(firebaseConfig);


new Vue({  
  router,
  store,
  render: h => h(App),
}).$mount('#app')