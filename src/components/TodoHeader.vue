<template>
  <header>
    <span @click="openSidebar">
      <i class="sidebarBtn fas fa-bars" :class="{hideSidebar: showSidebar==true}"></i>
    </span>
    <div class="side-wrapper" v-if="showSidebar">
      <div class="closeSidebar" @click="openSidebar">
        <i class="closeBtn fas fa-angle-left"></i>
      </div>
      <div class="side-mask" @click="openSidebar"></div>
      <div class="side-container">
        <img src='../assets/todofordays.png' width="100px">
        <h2 style="text-align: center;">안녕하세요<br>슬비님!</h2>
          <button class="logout" @click="logout"> Logout </button>
          <button class="member"> 회원정보 </button>
          <br>
        <div class="side-container-blue">
          <h3 id="text">☀︎ 오늘의 날씨</h3>
          <p id="text"><b>현재 온도</b> {{currentTemp}} °C</p>
          <p id="text"><b>최고 온도</b> {{highestTemp}} °C</p>
          <p id="text"><b>최저 온도</b> {{lowestTemp}} °C</p>
          <p id="text"><b>{{description}}</b></p>
          <hr>
          <h3 id="text">♛ 오늘의 주식</h3>
          <p id="text"><b>카카오</b> KRW 82,000</p>
          <p id="text"><b>삼전</b> KRW 65,000</p>
          <p id="text"><b>네이버</b> KRW 280,000</p>
          <hr>
          <h3 id="text">✌︎ 머리를 식히자!</h3>
          <p id="text"><b>바로가기</b></p>
        </div>
        <span class="yongseul">made by yongseul</span>

      </div>
    </div>

    <div class="head"><h1> TodoForDays! </h1></div>
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
  </header>
</template>

<script>
import VdatePicker from 'v-calendar/lib/components/date-picker.umd'
import {
  getAuth,
  signOut,
  deleteUser,
} from "firebase/auth";

export default {
  data(){
    return{
      currentTemp:'',
      highestTemp:'',
      lowestTemp:'',
      description:'',
      auth:getAuth(),
      showSidebar:false,
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
  methods: {
     searchWeather() {
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
    },
    dayClicked(day){
      this.selectedYear = Number(day.id.slice(0, 4));
      this.selectedMonth = Number(day.id.slice(6, 7));
      this.selectedDay = Number(day.id.slice(8, 10));
      this.$emit('changeDate', this.selectedYear, this.selectedMonth, this.selectedDay);
    },
    openSidebar(){
      this.showSidebar= !this.showSidebar;
      this.searchWeather();
    },

    logout(){
        signOut(this.auth)
        .then(() => {
          this.$router.replace({path: "/"});

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
  },
  components: {
    VdatePicker: VdatePicker,
  }
}

</script>

<style scoped>
  #text{
    text-align: left;
    color: #fff;
    line-height:10px;
  }
  /* #subtext{
    text-align: right;
    color: #fff;
    line-height:10px;
  } */
  .yongseul{
    font-size: 16px;
    color: black;
    opacity: 0.7;
    bottom: 35px;
    left: 40px;
    position:fixed;
    z-index: 13;
  }
  .logout{
      font-size: 16px;
      display: inline-block;
      margin-right: 10px;
      width: 65px;
      height:40px;
      padding: 4px;
      background-color: #7ca3bb;
      opacity: 0.8;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
      border:none;
      border-radius: 5px;
  }
  /* 패딩 줄여서 양쪽 여백 좀 없애기 */
  .member{
      font-size: 16px;
      display: inline-block;
      width: 65px;
      height: 40px;
      padding: 4px;
      margin-left: 10px;
      background-color: #7ca3bb;
      opacity: 0.8;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
      border:none;
      border-radius: 5px;

  }
  .side-container {
    position: fixed;
    top:0;
    right:180px;
    width: 150px;
    height: 100%;
    padding: 20px 30px 0 30px;
    z-index: 999;
    background-color: #fff;
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .closeSidebar{
    position:fixed;
    z-index: 15;
    width: 55px;
    height: 45px;
    background-color:#fff;
    left: 200px;
    top: 20px;
    border-radius: 9px;
  }
  .closeBtn{
    color:#7ca3bb;
    font-size: 38px;
    margin-top: 3px;
    margin-left: 4px;
  }
  .side-container-blue {
    position: fixed;
    bottom:0;
    right:179px;
    width: 151px;
    height: 65%;
    padding: 15px 30px 0 30px;
    z-index: 999;
    background-color: #7ca3bb;
    opacity: 0.7;
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
    .side-mask {
    position: fixed;
    top:0;
    left: 180px;
    z-index: 11;
    width: 220px;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .head{
    display: block;
    margin: 35px 0 0 70px;
    font-size: 20px;
    color: #7ca3bb;
    font-weight: 900;
    transform: translate(0%, -50%);
    position: fixed;
  }
  .sidebarBtn{
    margin: 25px 0 0 20px;
    float: left;
    font-size: 20px;
    color: #7ca3bb;
    z-index: 10;
    position: fixed;
  }
  .hideSidebar{
    display: none;
  }

  .vc-weeks{
    margin-left: 6px;
    left: 0;
    display: absolute;
    top: 80px;
    padding: 5px;
    height: 260px;
    width: 370px;
    opacity: 0.9;
    border: 0;
}
  .background{
    width: 110%;
    margin: -60px -10.5rem -1rem -10rem;
  }

</style>
