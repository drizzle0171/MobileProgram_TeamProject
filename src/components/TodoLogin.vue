<template>
    <div>
      <div class="logo">
        <span class="subtitle">세상에서 제일 <br></span>
        <img src="../assets/todofordays.png" width="120px">
        <span class="subtitle"> <br >완벽한 TODO <br></span>
      </div>
      <div class="login">
      <div>
        <i class="idIcon fas fa-envelope"></i> <input class='id' v-model="email" type="text" placeholder="example@gmail.com">
      </div>
      <div>
        <i class="passwordIcon fas fa-lock"></i>
      <input class='password' v-model="password" type="password" placeholder="Password" @keyup.enter="addUser">
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
        <img src="../assets/googleLogo.png" width=10px>
           &nbsp; Sign In using Google</span>
      </div>
    <span class="yongseul">made by yongseul</span>
    </div>
</template>

<script>
import Modal from './common/AlertModal.vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider,
} from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      auth: getAuth(),
      password: "",
      email: "",
      pleaseSignUp: false,
      }
  },
  methods: {
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          this.$router.push({path: "todo"});
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
          this.$router.push({path: "todo"});
          // ...
        })
        .catch((error) => {
          this.pleaseSignUp=true;
          console.log(error);
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
          this.$router.push({path: "todo"});
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
    },

  },
    beforecreated() {
      onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // this.showLogin = false;
        this.name = user.email;
        this.show = true;
        console.log(user.email);
        this.$router.push({path: "todo"});
        // ...
      } else {
        console.log('not logged in');
      }
    });
    window.onSignIn = this.onSignIn;
  },
  components: {
    Modal: Modal,
  }
}
</script>

<style>
.logo{
  margin-top:220px;
}
.subtitle{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #7ca3bb;
  letter-spacing: 5px;

}
.yongseul{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: black;
    opacity: 0.4;
    bottom: 35px;
    left: 140px;
    position:fixed;
  }
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
  font-size: 16px;
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
  font-size: 16px;
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
    margin-top: 10px;
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
