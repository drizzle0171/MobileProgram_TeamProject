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
      <input class='password' v-model="password" type="password" placeholder="Password">
      </div>

      <modal v-if="pleaseSignUp" @click="pleaseSignUp = false">
        <h3 slot="header" @click="pleaseSignUp = false"> 경고 </h3>
        <span slot="footer" @click="pleaseSignUp = false"> 회원가입 후 로그인 해주세요. </span>
          <span slot="footer" @click="pleaseSignUp = false">
            <i class="closeModalBtn fas fa-times"></i>
        </span>
      </modal>

      <span class = "signUp" @click="signUpModal = true"> Sign Up </span>
    <div class="modal-mask" v-if="signUpModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1 class="head"> TodoForDays </h1>
            <p class="subHead"><b> Sign Up for TodoForDays </b></p>
              <p class="userName"><b>이름</b> <br></p>
                  <input class="inputName" v-model="name" type="text" placeholder="Name"/> 
                    <div v-if="name.length==0" class="notPerfectName">
                      <img width="12px" src="../assets/exclamation.png">  &nbsp; 이름을 입력해주세요
                    </div>
                    <div v-if="name.length>0" class="perfectName">
                      <img width="12px" src="../assets/check.png"> &nbsp; 환영합니다 {{name}}님!
                    </div>
                <br>  
                <p class="userProfile"> 프로필 이미지 <br> </p>
                  <input class="inputImage" @change="onFileChange($event)" type="file"/>
                <br>
                <p class="userEmail"> 이메일 <br></p>
                  <input class='inputEmail' v-model="email" type="text" placeholder="example@gmail.com">
                    <div v-if="email.length==0" class="notPerfectEmail">
                      <img width="12px" src="../assets/exclamation.png">  &nbsp; 이메일을 확인해주세요
                    </div>
                    <div v-if="email.length>0" class="perfectEmail">
                      <img width="12px" src="../assets/check.png"> &nbsp; 이메일 확인이 완료되었습니다
                    </div>
                <p class="userPassword"> 비밀번호 <br> </p>
                  <input class='inputPassword' v-model="password" type="password" placeholder="Password">
                  <div v-if="password.length<6" class="notPerfectPassword">
                      <img width="12px" src="../assets/exclamation.png">  &nbsp; 비밀번호를 6자리 이상으로 입력해주세요
                    </div>
                    <div v-if="password.length>=6" class = "perfectPassword">
                      <img width="12px" src="../assets/check.png"> &nbsp; 사용 가능한 비밀번호입니다
                    </div>
                <span class="signUpinpage" type="button"> <span @click="addUser"> Sign Up </span> </span>
                <span class="back" @click="signUpModal = false"> 이전으로 </span>
        </div>
      </div>
    </div>
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
      messege:'',
      warning: false,
      image:'',
      name:'',
      auth: getAuth(),
      password: "",
      email: "",
      pleaseSignUp: false,
      signUpModal: false,
      }
  },
  methods: {
      set(key){
          localStorage.setItem(key, this.image);
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length){
          return;
        }
        this.createImage(files[0])
      },
      createImage(file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image = e.target.result;
          this.set('img');
        };
        reader.readAsDataURL(file);
      },
      openSignUpPage(){
        this.signUpModal = true;
      },
    addUser() {
      this.signUpModal = true;
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          this.$router.push({path: "todo"});
          this.$store.commit('userInfo', this.image)
          this.$store.commit('userName', this.name)
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log('warning')
          console.log(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          this.email = userCredential.user.email;
          this.$router.push({path: "todo"});
        })
        .catch((error) => {
          this.pleaseSignUp=true;
          console.log(error);
        });
    },
    infoPage(){
      this.signUpModal = true;
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
    beforecreated(){
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
      } 
      else {
        console.log('not logged in');
      }
    });
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
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 280px;
  height: 550px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #7ca3bb;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
  .head{
    color: #7ca3bb;
    margin-bottom: 0;
  }
  .subHead{
    color: #7ca3bb;
    margin-top: 0;
  }
  .userName{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #7ca3bb;
    font-size: 17px;
    position: fixed;
    top: 225px;
    left: 70px;
  }
  .inputName{
    position: fixed;
    top: 270px;
    left: 60px;
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
    border-radius: 12px;
    height: 30px;
  }
  .perfectName{
    display: flex;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #32BE5A;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 305px;
    left: 70px;
  }
  .notPerfectName{
    display: flex;
    font-family: 'Fsranklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #FF5757;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 305px;
    left: 70px;
  }
  .userProfile{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #7ca3bb;
    font-size: 17px;
    position: fixed;
    top: 310px;
    left: 70px;
  }
  .inputImage{
    border-top:none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #7ca3bb;
    background-color: #f2f2f2;
    padding: 5px;
    width: 260px;
    border-radius: 12px;
    position: fixed;
    top: 355px;
    left: 63px;
  }
  .userEmail{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #7ca3bb;
    font-size: 17px;
    position: fixed;
    top: 390px;
    left: 70px;
  }
  .inputEmail{
    position: fixed;
    top: 435px;
    left: 60px;
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
    border-radius: 12px;
    height: 30px;
  }
  .perfectEmail{
    display: flex;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #32BE5A;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 470px;
    left: 70px;
  }
  .notPerfectEmail{
    display: flex;
    font-family: 'Fsranklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #FF5757;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 470px;
    left: 70px;
  }
  .userPassword{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #7ca3bb;
    font-size: 17px;
    position: fixed;
    top: 470px;
    left: 70px;
  }
  .inputPassword{
    position: fixed;
    top: 515px;
    left: 60px;
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
    border-radius: 12px;
    height: 30px;
  }
  .perfectPassword{
    display: flex;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #32BE5A;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 550px;
    left: 70px;
  }
  .notPerfectPassword{
    display: flex;
    font-family: 'Fsranklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #FF5757;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position: fixed;
    top: 550px;
    left: 70px;
  }
  .signUpinpage{
    border-radius: 15px;
    letter-spacing: 3px;
    background-color: #7ca3bb;
    width: 270px;
    height: 40px;
    position: fixed;
    top: 590px;
    left: 65px;
    color: #fff;
    line-height: 40px;
  }
  .back{
    color: black;
    opacity: 0.4;
    position: fixed;
    top: 643px;
    left: 165px;    
  }
</style>