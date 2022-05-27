<template>
  <div>
    <span @click="openTodo">
      <i class="backTodo fas fa-angle-left"></i>
    </span>
    <div class="head">
      <h1> TodoForDays </h1>
      <h2><u> My page </u></h2>
    </div>
    <div class="userInfoTitle"> 회원정보 </div>
    <div class="userInfo">
      <img class="profile" :src="photo">
      <img class="notProfile" v-if="photo==null" :src="picture"/>
      <p class="name" v-if="photo!=null"> <b>이름</b><br> {{Name}}</p>
      <p class="name" v-if="photo==null"> <b>이슬비</b><br> {{name}}!</p>
      <p class="email"> <b>이메일</b><br> {{email}}</p>
    </div>
    <div class="updatePasswordTitle"> 비밀번호 재설정 </div>
    <div class="updatePassword">
      <img src="../assets/padlock.png" class="currentPassword">
      <p class="text"> 현재 비밀번호 <br></p>
      <input class="passWord" v-model="currentPassword" type="password" placeholder="Type your password"/> <br>
      <img src="../assets/reload.png" class="newPassword">
      <p class="text"> 새 비밀번호 <br></p>
      <input class="passWord" v-model="newPassword" type="password" placeholder="Type your new password"/> <br>
      <div v-if="newPassword" class="nothing" :class="{notPerfect: newPassword.length<6}">
        <img width="12px" src="../assets/exclamation.png">  &nbsp; 6자 이상으로 입력해주세요
      </div>
      <div class="nothing" :class="{perfect: newPassword.length>=6}">
        <img width="12px" src="../assets/check.png"> &nbsp; 사용 가능한 비밀번호입니다
      </div>
      <img src="../assets/reload.png" class="newPasswordAgain">
      <p class="text"> 새 비밀번호 확인 <br></p>
      <input class="passWord" v-model="newPasswordAgain" type="password" placeholder="Type your new password again"/>
      <div v-if="newPasswordAgain" class="nothing" :class="{notPerfectAgain: newPassword!=newPasswordAgain}">
        <img width="12px" src="../assets/exclamation.png">  &nbsp; 비밀번호가 일치하지 않습니다
      </div>
      <div v-if="newPasswordAgain" class="nothing" :class="{perfectAgain: newPassword==newPasswordAgain}">
        <img width="12px" src="../assets/check.png"> &nbsp; 비밀번호가 일치합니다
      </div>
      <div class="confirm" @click="updatepassword">확인</div>
    </div>
    <modal v-if="showUpdatePasswordSuccess" @click="showUpdatePasswordSuccess = false">
        <h3 slot="header" @click="showUpdatePasswordSuccess = false"> 비밀번호 변경 성공 </h3>
        <span slot="footer" @click="showUpdatePasswordSuccess = false"> 비밀번호 변경이 완료되었습니다. </span>
          <span slot="footer" @click="showUpdatePasswordSuccess = false">
            <i class="closeModalBtn fas fa-times"></i>
        </span>
    </modal>    
    <button class="logout" @click="logout"> Logout </button>
    <button class="delet" @click="deleteuser"> 회원탈퇴 </button>
    </div>
</template>

<script>
import Modal from './common/AlertModal.vue'
import { mapGetters } from 'vuex';
import {
  getAuth,
  signOut,
  deleteUser,
  updatePassword,
  reauthenticateWithCredential,
  promptForCredentials
} from "firebase/auth";

export default {
  data(){
    return{
      showUpdatePasswordSuccess:false,
      currentPassword:'',
      newPassword:'',
      newPasswordAgain:'',
      showDelete:false,
      Name:'',
      email:'',
      photo:'',
      auth:getAuth(),
    }
  },
  computed:{
    ...mapGetters({
      'checked':'getDone',
      'Dates':'getDate',
      'todoItems':'getTodos',
      'picture':'getImg',
      'name':'getName'

    })
  },
  methods: {
    openTodo(){
      this.$router.replace({path: "/todo"});
    },
    logout(){
        signOut(this.auth)
        .then(() => {
          this.$router.replace({path: "/"});
        }).catch((error) => {
          console.log(error)
        });
    },
      deleteuser(){
        deleteUser(getAuth().currentUser)
          .then(() => {
            this.showDelete = true;
            localStorage.removeItem('img');
            localStorage.removeItem('name');
        }).catch((error) => {
          console.log(error)
        });
      },
      updatepassword(){
        const user = this.auth.currentUser;
        const credential = promptForCredentials();
        reauthenticateWithCredential(user, credential).then(() => {
          }).catch((error) => {
            console.log(error)
          });
        if (this.newPassword==this.newPasswordAgain){
        updatePassword(user, this.newPassword)
          .then(() => {
            this.showUpdatePassword = true;
          })
          .catch((error) => {
            console.log(error)
          })
        }
      },
  },
    components: {
    Modal: Modal,
  },
  created(){
    const user = this.auth.currentUser;
      if (user !== null) {
        this.Name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
      }
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) == 'img') {
          this.$store.commit('userInfo', localStorage.getItem(localStorage.key(i)));
          }
        }
      }
    }
    
  }

</script>

<style scoped>
  .logout{
    font-size: 16px;
    display: inline-block;
    margin-right: 10px;
    width: 90px;
    height:45px;
    padding: 4px;
    background-color: #7ca3bb;
    opacity: 0.8;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    border:none;
    border-radius: 5px;
    position: fixed;
    top: 765px;
    left: 80px;
  }
  /* 패딩 줄여서 양쪽 여백 좀 없애기 */
  .delet{
      font-size: 16px;
      display: inline-block;
      width: 90px;
      height: 45px;
      padding: 4px;
      margin-left: 10px;
      background-color: #7ca3bb;
      opacity: 0.8;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
      border:none;
      border-radius: 5px;
      position: fixed;
      top: 765px;
      left: 220px;

  }
  .head{
    display: block;
    margin: 35px 0 0 70px;
    font-size: 20px;
    color: #7ca3bb;
    font-weight: 900;
    transform: translate(0%, -50%);
    position: fixed;
    top: 42.5px;
    left: 10px;
  }
  h1{
    margin: 0;
  }
  h2{
    margin: 0;
  }
  .backTodo{
    color: #7ca3bb;
    display: block;
    position: fixed;
    top: 45px;
    left: 25px;
    font-size: 30px;
    padding: 7px;
  }
  .userInfoTitle{
    border-radius: 10px;
    font-size: 20px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 40px;
    background-color: #7ca3bb;
    color: #ffffff;
    width: 120px;
    height: 40px;
    position: fixed;
    top: 140px;
    left: 70px;
    z-index: 10;
  }
  .userInfo{
    border-radius: 10px;
    padding: 20px;
    background-color: #a5c5d8;
    width: 270px;
    position: fixed;
    top: 150px;
    left: 40px;
    height: 140px;
  }
  .profile{
    border-radius: 10px;
    position: fixed;
    top: 200px;
    left: 70px;
  }
  .notProfile{
    width: 90px;
    position: fixed;
    top: 200px;
    left: 70px
  }
  .name{
    color: #ffffff;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 180px;
    left: 180px;
    text-align: left;
  }
  .welcome{
    font-size: 25px;
    color: #5f8ba7;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 175px;
    left: 180px;

  }
  .email{
    color: #ffffff;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 230px;
    left: 180px;
    text-align: left;
  }
  .updatePasswordTitle{
    border-radius: 10px;
    font-size: 20px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 40px;
    background-color: #7ca3bb;
    color: #ffffff;
    width: 180px;
    height: 40px;
    position: fixed;
    top: 370px;
    left: 70px;
    z-index: 10;
  }
  .updatePassword{
    border: solid 1.5px #7ca3bb;
    border-radius: 10px;
    padding: 20px;
    width: 270px;
    position: fixed;
    top: 390px;
    left: 40px;
    height: 300px;
  }
  .confirm{
    font-size: 17px;
    width: 60px;
    height: 30px;
    padding: 4px;
    background-color: #7ca3bb;
    opacity: 0.8;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    border:none;
    border-radius: 5px;
    line-height: 35px;
    position: fixed;
    top: 670px;
    left: 165px;
  }
  .text{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 17px;
    margin: 15px 0 3px 0;
    margin-left: 15px;
    padding-left: 20px;
    text-align: left;
    color: #7ca3bb;
    margin-left: 25px;
  }
  .passWord{
    height: 30px;
    width: 200px;
    margin-bottom: 10px;
    padding: 0 10px;
    background-color: #f2f2f2;
    border-top:none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #7ca3bb;
  }
  .passWord::placeholder{
    line-height: 30px;
  }
  .currentPassword{
    width: 17px;
    position: fixed;
    top: 427px;
    left: 85px;
  }
  .newPassword{
    width: 17px;
    position: fixed;
    top: 508px;
    left: 85px;
  }
  .newPasswordAgain{
    width: 17px;
    position: fixed;
    top: 590px;
    left: 85px;
  }
  .nothing{
    display: none;
  }
  .perfect{
    display: flex;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #32BE5A;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position:fixed;
    top: 570px;
    left: 90px;
  }
  .notPerfect{
    display: flex;
    font-family: 'Fsranklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #FF5757;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position:fixed;
    top: 570px;
    left: 90px;
  }
  .perfectAgain{
    display: flex;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #32BE5A;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position:fixed;
    top: 651px;
    left: 90px;
  }
  .notPerfectAgain{
    display: flex;
    font-family: 'Fsranklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #FF5757;
    font-size: 11px;
    line-height: 13px;
    height: 13px;
    position:fixed;
    top: 651px;
    left: 90px;
  }
</style>
