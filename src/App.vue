<template>
  <div class="container">
    <div v-if="showLogin" class="login">
      <img src="./assets/todofordays.png" width="120px">
      <div>
        <i class="idIcon fas fa-envelope"></i> <input class='id' v-model="email" type="text" placeholder="example@gmail.com">
      </div>
      <div>
        <i class="passwordIcon fas fa-lock"></i>
      <input class='password' v-model="password" type="password" placeholder="Password">
      </div>

      <modal v-if="pleaseSignUp" @click="pleaseSignUp = false">
      <h3 slot="header" @click="pleaseSignUp = false"> 경고 </h3>
      <span slot="footer" @click="pleaseSignUp = false"> 회원가입 후 로그인 해주세요. </span>
        <span slot="footer" @click="pleaseSignUp = false">
          <i class="closeModalBtn fas fa-times"></i>
      </span>
    </modal>

      <span class = "signUp" @click="addUser"> Sign Up </span> 
      <span class = "signIn" @click="login"> Sign In </span>
      <span class = "googleSignin" @click="googleSignIn">
        <img src="./assets/googleLogo.png" width=10px>
           &nbsp; Sign In using Google</span>
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
import Modal from './components/common/AlertModal.vue'
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
      pleaseSignUp: false,
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
          this.pleaseSignUp=true;
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
    'TodoFooter': TodoFooter,
    Modal: Modal,
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
  .idIcon{
    margin-left:10px ;
    color: #7ca3bb;
  }
  .id {
  width: 250px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  background-color: #f2f2f2;
  border-top:none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #7ca3bb;
  height: 30px;
}
 .id::placeholder{
  height: 30px;
  line-height: 30px;
  padding-bottom: 10px;
}

  .passwordIcon{
    margin-left:40px;
    color: #7ca3bb;
  }
  .password {
  width: 250px;
  margin-right: 30px;
  margin-left: 5px;
  margin-bottom: 20px;
  padding: 0 10px;
  background-color: #f2f2f2;
  border-top:none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #7ca3bb;
  height: 30px;
  
}
 .password::placeholder{
  height: 30px;
  line-height: 30px;
}
  .signUp{
      display: inline-block;
      width: 80px;
      padding: 4px;
      margin-right: 10px;
      margin-left: 70px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #7ca3bb;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
  }
    .signIn{
      display: inline-block;
      width: 80px;
      padding: 4px;
      margin-right: 70px;
      margin-left: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #7ca3bb;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
  }
  .googleSignin{
      display: inline-block;
      width: 190px;
      padding: 4px;
      border-radius: 5px;
      background-color: #7ca3bb;
      color: white;
      margin-top: 10px;
      font-family: Arial, Helvetica, sans-serif;
  }
  .login{
    margin-top: 230px;
  }
  .closeModalBtn{
    margin-top: 10px;
    margin-left: 50px;
    margin-right: 50px;
  }
  .container {
    padding:
      env(safe-area-inset-top)
      env(safe-area-inset-right)
      env(safe-area-inset-bottom)
      env(safe-area-inset-left);
    }
</style>
