<template>
  <div>
      <input id="sidebarCheck" type="checkbox">
      <label for = "sidebarCheck">
        <span></span>
        <span></span>
        <span></span>        
      </label>
      <div class="sidebar">
          <img src='../assets/todofordays.png' width="100px">
          <h2 style="text-align: center;">안녕하세요<br>{{name}}님!</h2>
          <div class="countBox"> <strong>오늘도 할 일을 해치우자!</strong></div>
          <br>
          <div class="bluebox">
            <div @click="openWeather">
            <h3 id="text">☀︎ 오늘의 날씨</h3>
            <p id="text"><b>현재 온도</b> {{currentTemp}} °C</p>
            <p id="text"><b>최고 온도</b> {{highestTemp}} °C</p>
            <p id="text"><b>최저 온도</b> {{lowestTemp}} °C</p>
            <p id="text"><b>{{description}}</b></p>
          </div>
        </div>
        <span class="yongseul">made by yongseul</span>
      </div>
      <div class="mask">
      </div>
    <div class="head"><h1> TodoForDays </h1></div>
    <span @click="openMypage">
      <i class="mypageBtn fas fa-user"></i>
    </span>
    <VdatePicker   
      trim-weeks
      locale="en"
      title-position="center"
      color="blue"
      is-required
      :attributes='attributes'
      class="vc-weeks"
      v-model="date"
      @dayclick="dayClicked"
      />
    </div>
</template>

<script>
import VdatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapGetters } from 'vuex';
import { getAuth } from "firebase/auth";

export default {
  data(){
    return{
      auth:getAuth(),
      name: '',
      done: 0,
      total: 0,
      currentTemp:'',
      highestTemp:'',
      lowestTemp:'',
      description:'',
      date:"",
      selectedDay:'',
      selectedYear:'',
      selectedMonth:'',
      attributes:[
        {
          key:'today',
          highlight:true,
          content: '',
          dates: new Date(),
          excludeDates: null,
          order: 0
        }
      ]
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
    openWeather(){
      this.$router.replace({path: "/weather"});
    },
    openMypage(){
      this.$router.replace({path: "/mypage"});
    },
    dayClicked(day){
      this.selectedYear = Number(day.id.slice(0, 4));
      this.selectedMonth = Number(day.id.slice(6, 7));
      this.selectedDay = Number(day.id.slice(8, 10));
      let selectedDate = [this.selectedYear, this.selectedMonth, this.selectedDay]
      this.$store.commit('changeDate', selectedDate);
    },
  },
  components: {
    VdatePicker: VdatePicker,
  },
  created(){
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=5dc753fbb35d7e99e7fd80b06a9a18a7'
      this.$http.get(`${BASE_URL}`)
      .then((result) => {
        this.currentTemp = (result.data.main.temp - 273.15).toFixed(1)
        this.highestTemp = (result.data.main.temp_max - 273.15).toFixed(1)
        this.lowestTemp = (result.data.main.temp_min - 273.15).toFixed(1)
        let weather = (result.data.weather[0].id).toString()
        if (weather=='800') {
          this.description = '오늘은 날씨가 맑네요!';
        }
        else if (weather[0]=='8') {
          this.description = '구름이 있을 예정이에요';
        }
        else if (weather[0]=='2') {
          this.description = '번개가 칠수도!';
        }
        else if (weather[0]=='3') {
          this.description = '이슬비가 내릴 거에요';
        }
        else if (weather[0]=='5') {
          this.description = '오늘은 우산이 필요할 거에요';
        }
        else if (weather[0]=='6') {
          this.description = '눈이 펑펑!';
        }
        else if (weather[0]=='701') {
          this.description = '안개가 낄 예정이니 조심!';
        }
      })
    const user = this.auth.currentUser;
      if (user !== null) {
        this.name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
      }
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) == 'name'){
              this.name = localStorage.getItem(localStorage.key(i));
          }
        }
      }
  }
}

</script>

<style scoped>
  h2{
    margin: 10px 0;
  }
  .side-wrapper{
    display: flex; 
    flex-direction: column;
  }
  .bluebox{
    padding: 30px;
    width: 150px;
    height: 70%;
    left: 0px;
    background: #7ca3bb;
    opacity: 0.7;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 15px;
    position: absolute;
  }
  .countBox{
    width: 150px;
    height: 50px;
    line-height: 50px;
    background: #7ca3bb;
    margin-bottom: 10px;
    border-radius: 7px;
    opacity: 0.7;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 13px;
  }
  #text{
    text-align: left;
    color: #fff;
    line-height:10px;
  }
  .yongseul{
    font-size: 16px;
    color: black;
    opacity: 0.5;
    bottom: 50px;
    left: 40px;
    position: absolute;
    z-index: 13;
  }
  .side-mask {
    position: fixed;
    top: -30px;
    left: 180px;
    z-index: 999;
    width: 300px;
    height: 350%;
    background-color: rgba(0, 0, 0, .5);
    flex-direction: column;
    transition: transform 0.4s ease
  }
  #sidebarCheck{
    position: fixed;
    top: 45px;
    left: 27px;
    width: 22px;
    height: 22px;
    z-index: 1;
    opacity: 0;
  }
  input[id="sidebarCheck"] {
    display: none;
  }
  input[id="sidebarCheck"] + label {
    display: block;
    width: 20px;
    height: 18px;
    position: relative;
    transition: all .35s;
    top: 25px;
    left: 21px;
  }
  input[id="sidebarCheck"] + label span {
    display: block;
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 10px;
    background: #7ca3bb;
    transition: all .35s;
    z-index: 10;
  }
  input[id="sidebarCheck"] + label span:nth-child(1){
    top: 0;
  }
  input[id="sidebarCheck"] + label span:nth-child(2){
    top: 50%;
    transform: translateY(-50%);
  }
  input[id="sidebarCheck"] + label span:nth-child(3){
    bottom: 0;
  }
  input[id="sidebarCheck"]:checked + label span:nth-child(1){
    left: 10%;
    width: 20px;    
    height: 5px;
    top: 50%;
    transform: rotate(45deg)
  }
  input[id="sidebarCheck"]:checked + label span:nth-child(2){
    opacity: 0;
  }
  input[id="sidebarCheck"]:checked + label span:nth-child(3){
    left: 10%;
    width: 20px;
    height: 5px;
    top: 50%;
    transform: rotate(-45deg)
  }

  input[id="sidebarUncheck"]:checked + div{
  left: -290px;
  }
  .sidebar{
      width: 150px;
      height: 100%;
      position: fixed;
      top:0;
      padding: 20px 30px 0 30px;
      z-index: 2;
      background-color: #fff;
      font-family: Helvetica, Arial, sans-serif;
      position: fixed;
      top: 0;
      left: -290px;
      z-index: 1;
      transition: all .35s;
    }
  input[id="sidebarCheck"]:checked + label + div{
    left: 0;
  }
  input[id="sidebarCheck"]:checked + label{
    border-radius: 10px;
    top: 10px;
    width: 30px;
    height: 40px;
    background: #fff;
    z-index: 2;
    left: 200px;
  }
  .blackBox{
    width: 205px;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 210px;
    background: #000000;
    opacity: 0.3;
  }
  .head{
    display: block;
    margin: 35px 0 0 70px;
    font-size: 20px;
    color: #7ca3bb;
    font-weight: 900;
    transform: translate(0%, -50%);
    position: fixed;
    top: 25px;
    left: 10px;
    z-index: -10;
  }
  .sidebarBtn{
    position: fixed;
    top: 25px;
    left: 15px;
    float: left;
    font-size: 20px;
    color: #7ca3bb;
    z-index: 0;
    margin: 25px 0 0 18px;
  }
  .hideSidebar{
    display: none;
  }
  .mypageBtn{
    position: fixed;
    top: 25px;
    left: 345px; 
    color: #7ca3bb;
    font-size: 20px;
    float: right;
    margin: 25px 18px 0 0;
  }
  .vc-weeks{
    position: fixed;
    left: 15px;
    top: 105px;
    padding: 5px;
    height: 260px;
    width: 358px;
    opacity: 0.9;
    border: 0;
}
  .background{
    width: 110%;
    margin: -60px -10.5rem -1rem -10rem;
  }

</style>
