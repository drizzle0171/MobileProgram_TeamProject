<template>
  <div>
    <div v-if="showLogin" class="login">
      <input class='id' v-model="email" type="text" placeholder="example@gmail.com">
      <input class='password' v-model="password" type="password" placeholder="Password">
      <button class = "signup" @click="addUser">Sign Up</button>
      <button class = "signin" @click="login">Sign In</button>
      <button class = "googleSignin" @click="googleSignIn">Sign In using Google</button>
      <!-- <div class="g-signin2" id="google-signin-btn" data-onsuccess="onSignIn"></div> -->
    </div>
    <div v-if="show">
      <TodoHeader @changeDate="changeDate"></TodoHeader>
      <TodoInput v-bind:propsdata2 = "date" @changeDate="changeDate" @addTodo="addTodo"></TodoInput>
      <button @click="logout"> Logout </button>
      <button @click="deleteuser"> Delete </button>
      <TodoList v-bind:propsdata = "todoItems" @removeTodo="removeTodo" @changeHead = "changeHead" @changeMemo = "changeMemo"></TodoList>
      <TodoFooter @removeAll="clearAll"></TodoFooter>
    </div>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  signInWithPopup, 
  GoogleAuthProvider,
} from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      date: [],
      todoItems: [],
      name: "",
      auth: getAuth(),
      show: false,
      password: "",
      email: "",
      showLogin:true,
      }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, information) {
			localStorage.setItem(todoItem, information);
			this.todoItems.push(JSON.parse(information));
		},
    changeHead(newHead, index) {
      this.todoItems[index].Head = newHead;
      console.log(this.todoItems)
    },
    changeMemo(newMemo, index) {
      this.todoItems[index].memo = newMemo;
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    changeDate(Year, Month, Day){
      this.date = []
      this.date.push(Year, Month, Day)
    },
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.name = userCredential.user.email;
          this.showLogin = false;
          this.show = true;
          console.log(getAuth().currentUser)
          // ...
        })
        .catch((error) => {
          console.log('회원가입')
          console.log(error);
        });
    },
     logout(){
        signOut(this.auth)
        .then(() => {
          this.show = false;
          this.showLogin = true;
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
    },
      deleteuser(){
        deleteUser(getAuth().currentUser)
          .then(() => {
          // User deleted.
          console.log('success')
        }).catch((error) => {
          console.log(error)
        });
      },
    googleSignIn(){
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(token, user)
        // ...
        }).catch((error) => {
        // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
           // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential)
          // ...
  });
    },
    onSignIn(googleUser){
      const profile = googleUser.getBasicProfile();
      console.log('Email: '+profile.getEmail());
    }

  },
    created() {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        this.show = true;
        this.showLogin = false;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    window.onSignIn = this.onSignIn;
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #f2f2f2;
    overflow-x: hidden;

  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
  .id {
  width: 250px;
  margin-right: 20px;
  margin-bottom: ;
  padding: 0 10px;
  background-color: #f2f2f2;
  border-top:none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #7ca3bb;
  height: 30px;
}
 id::placeholder{
  height: 30px;
  line-height: 30px;
}
</style>
