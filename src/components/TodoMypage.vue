<template>
  <div>
    <span @click="openTodo">
      <i class="backTodo fas fa-angle-left"></i>
    </span>
    <div class="head">
      <h1> TodoForDays </h1>
      <h2><u> MyPage </u></h2>
    </div>
    <div class="userInfoTitle"> 회원정보 </div>
    <div class="userInfo">
      <img class="profile" :src="photo">
      <p class="name"> <b>이름</b><br> {{Name}}</p>
      <p class="email"> <b>이메일</b><br> {{email}}</p>
    </div>
    <div class="updatePasswordTitle"> 비밀번호 재설정 </div>
    <div class="updatePassword">
      <p class="text"> 현재 비밀번호 <br></p>
      <input class="passWord" v-model="currentPassword" type="password" placeholder="Type your password"/> <br>
      <p class="text"> 새 비밀번호 <br></p>
      <input class="passWord" v-model="newPassword" type="password" placeholder="Type your new password"/> <br>
      <p class="text"> 새 비밀번호 확인 <br></p>
      <input class="passWord" v-model="newPasswordAgain" type="password" placeholder="Type your new password again"/>
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
      'todoItems':'getTodos'
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
          //  this.$router.replace({path: "/"});
        }).catch((error) => {
          console.log(error)
        });
      },
      updatepassword(){
        const user = this.auth.currentUser;
        const credential = promptForCredentials();
        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
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
    components: {
    Modal: Modal,
  }
  },
  created(){
    const user = this.auth.currentUser;
      if (user !== null) {
        this.Name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
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
    top: 750px;
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
      top: 750px;
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
  .name{
    color: #ffffff;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 180px;
    left: 180px;
    text-align: left;
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
    height: 280px;
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
    top: 650px;
    left: 165px;
  }
  .text{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 17px;
    margin: 15px 0 3px 0;
    text-align: left;
    color: #7ca3bb;
    margin-left: 25px;
  }
  .passWord{
    height: 30px;
    width: 200px;
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
</style>
