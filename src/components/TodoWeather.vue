<template>
  <div>
    <span @click="openTodo">
      <i class="backTodo fas fa-angle-left"></i>
    </span>
    <div class="head">
      <h1> TodoForDays </h1>
      <h2><u> Weather </u></h2>
    </div>
    
    <div class="todayWeather">
      <div :class="{sunny: description=='오늘은 날씨가 맑네요!', cloud: description=='구름이 있을 예정이에요', lightning: description=='번개가 칠수도!', drizzle: description=='이슬비가 내릴 거에요', umburella: description=='오늘은 우산이 필요할 거에요', snow: description=='눈이 펑펑!', fog: description=='안개가 낄 예정이니 조심!'}"> </div>
      <div class="description"><b>{{description}}</b></div>
        <div class="SummaryWeather1">
          <b>현재 온도</b> {{currentTemp}} °C <br>
          <b>최고 온도</b> {{highestTemp}} °C <br>
          <b>최저 온도</b> {{lowestTemp}} °C <br>
        </div>
        <div class="SummaryWeather2">
          <b>체감 온도</b> {{feelTemp}} °C <br>
          <b>압력</b> {{pressure}} Pa <br>
          <b>습도</b> {{humidity}} % <br>
        </div>
    </div>
    <div class="updatePasswordTitle"> 예 보 </div>
    <div class="updatePassword">
    </div>
    </div>

</template>

<script>
//제공 정보: 현재 온도, 체감 온도, 최고, 최저, 압력, 습도, weather id, 예보
import Modal from './common/AlertModal.vue'
import { mapGetters } from 'vuex';

export default {
  data(){
    return{
      currentTemp:'',
      feelTemp:'',
      highestTemp:'',
      lowestTemp:'',
      description:'',
      pressure:'',
      humidity:''
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
    components: {
    Modal: Modal,
  }
  },
  created(){
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=5dc753fbb35d7e99e7fd80b06a9a18a7'
    // const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=5dc753fbb35d7e99e7fd80b06a9a18a7'  
      this.$http.get(`${BASE_URL}`)
      .then((result) => {
        this.currentTemp = (result.data.main.temp - 273.15).toFixed(1)
        this.feelTemp = (result.data.main.feels_like - 273.15).toFixed(1)
        this.highestTemp = (result.data.main.temp_max - 273.15).toFixed(1)
        this.lowestTemp = (result.data.main.temp_min - 273.15).toFixed(1)
        this.pressure = (result.data.main.pressure)
        this.humidity = (result.data.main.humidity)

        let weather = (result.data.weather[0].id).toString()
        if (weather=='800') {
          this.description = '오늘은 날씨가 맑네요!';
        }
        else if (weather!='800'&&weather[0]=='8') {
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
  }
    

</script>

<style scoped>
  #text{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
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
  .todayWeather{
    border-radius: 10px;
    padding: 20px;
    background-color: #a5c5d8;
    width: 270px;
    position: fixed;
    top: 150px;
    left: 40px;
    height: 140px;
  }
  .SummaryWeather1{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
    line-height: 25px;
    position: fixed;
    top: 230px;
    left: 65px
  }
  .SummaryWeather2{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
    position: fixed;
    line-height: 25px;
    top: 230px;
    left: 210px;
    text-align: left;
  }
  .description{
    width: 100px;
    text-align: right;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 175px;
    left: 215px;
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
    left: 110px;
    z-index: 10;
  }
  .updatePassword{
    border: solid 1.5px #7ca3bb;
    border-radius: 10px;
    padding: 20px;
    width: 270px;
    position: fixed;
    top: 380px;
    left: 40px;
    height: 360px;
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
