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
      <img src="../assets/sun.png" class="nothing" :class="{sunny: description=='오늘은 날씨가 맑네요!'}">
      <img src="../assets/clouds.png" class="nothing" :class="{clouds: description=='구름이 있을 예정이에요'}">
      <img src="../assets/thunder.png" class="nothing" :class="{lightning: description=='번개가 칠수도!'}">
      <img src="../assets/drizzle.png" class="nothing" :class="{drizzle: description=='이슬비가 내릴 거에요'}">
      <img src="../assets/rain.png" class="nothing" :class="{umburella: description=='오늘은 우산이 필요할 거에요'}">
      <img src="../assets/snowflake.png" class="nothing" :class="{snow: description=='눈이 펑펑!'}">
      <img src="../assets/fog.png" class="nothing" :class="{fog: description=='안개가 낄 예정이니 조심!'}">
      <div class="currentTemp"> {{currentTemp}} °C </div>
      <div class="description"><b>{{description}}</b></div>
      <div class="highestTemp">{{highestTemp}} °C &nbsp;</div>
      <div class="lowestTemp">| &nbsp; {{lowestTemp}} °C</div>
        <div class="SummaryWeather">
          <img src="../assets/humidity.png" class="humidityPic">
          <div class="feel_like"><b>체감 온도</b> <br> {{feelTemp}} °C <br></div>
          <img src="../assets/blood-pressure.png" class="PressurePic">
          <div class="pressure"><b>압력</b> <br> {{pressure}} Pa <br></div>
          <img src="../assets/thermometer.png" class="feel_likePic">
          <div class="huminity"><b>습도</b> <br> {{humidity}} % <br></div>
        </div>
    </div>
    <div class="forecastTitle"> 예 보 </div>
    <div class="forecast">
      <div class="fourDays">향후 4일간의 날씨입니다</div>
        <span class="high">최고</span>
        <span class="low">최저</span>
       <div class="day1"> {{month[0]}}월 {{day[0]}}일 &nbsp; &nbsp; |
          <div class="day1low"> <strong>{{daylow[0]}} °C </strong> </div> 
          <div class="day1high"><strong>{{dayhigh[0]}} °C </strong></div>
      </div>
      <div class="day2"> {{month[1]}}월 {{day[1]}}일 &nbsp; &nbsp; |
          <div class="day2low"> <strong>{{daylow[1]}} °C </strong> </div> 
          <div class="day2high"><strong>{{dayhigh[1]}} °C </strong></div>
      </div>
      <div class="day3"> {{month[2]}}월 {{day[2]}}일 &nbsp; &nbsp; |
          <div class="day3low"> <strong>{{daylow[2]}} °C </strong> </div> 
          <div class="day3high"><strong>{{dayhigh[2]}} °C </strong></div>
      </div>
      <div class="day4"> {{month[3]}}월 {{day[3]}}일 &nbsp; &nbsp; |
          <div class="day4low"> <strong>{{daylow[3]}} °C </strong> </div> 
          <div class="day4high"><strong>{{dayhigh[3]}} °C </strong></div>
      </div>
    </div>
    </div>

</template>

<script>
//제공 정보: 현재 온도, 체감 온도, 최고, 최저, 압력, 습도, weather id, 예보
import { mapGetters } from 'vuex';

export default {
  data(){
    return{
      month:[],
      day:[],
      dayhigh:[],
      daylow:[],
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
  },
  created(){
    //Today Weather
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=5dc753fbb35d7e99e7fd80b06a9a18a7'
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
    const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=5dc753fbb35d7e99e7fd80b06a9a18a7'  
      this.$http.get(`${FORECAST_URL}`)
      .then((forecast) => {
        let list = forecast.data.list
        for(let i in list){
          // console.log(Number(list[i].main.temp-273.15))
          // console.log(Number(list[i].main.temp-273.15).toFixed(1))
          let time = list[i].dt_txt
          if (time.slice(8, 10)!=list[0].dt_txt.slice(8, 10) && time.slice(8, 10)!=list[list.length-1].dt_txt.slice(8, 10))
            {
              if (time.slice(11, 13) == '06'){
              this.month.push(time.slice(5, 7))
              this.day.push(time.slice(8, 10))
              this.dayhigh.push((Number(list[i].main.temp)- 273.15+2).toFixed(1))
            }
            else if (time.slice(11, 13) == '21'){
              this.daylow.push((Number(list[i].main.temp)- 273.15-2).toFixed(1))
            }
          }
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
  .SummaryWeather{
    width: 311px;
    background-color: #f1faff;
    line-height: 25px;
    position: fixed;
    top: 255px;
    left: 40px;
    height: 75px;
  }
  .description{
    font-size: 13px;
    text-align: right;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 225px;
    left: 80px;
  }
  .currentTemp{
    font-size: 28px;
    text-align: right;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 175px;
    left: 240px;
  }
  .highestTemp{
    font-size: 13px;
    text-align: right;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
    position: fixed;
    top: 220px;
    left:230px;    
  }
  .lowestTemp{
    font-size: 13px;
    text-align: right;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
    position: fixed;
    top: 220px;
    left: 275px;  
  }
  .feel_likePic{
    position: fixed;
    top: 277px;
    left: 57px;
  }
  .feel_like{
    text-align: left;
    font-size: 17px;
    color: #4f6979;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 267px;
    left: 83px;
  }
  .PressurePic{
    position: fixed;
    top: 277px;
    left: 163px;
  }
  .pressure{
    text-align: left;
    font-size: 17px;
    color: #4f6979;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 267px;
    left: 193px;
  }
  .humidityPic{
    position: fixed;
    top: 277px;
    left: 260px;

  }
    .huminity{
    text-align: left;
    font-size: 17px;
    color: #4f6979;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 267px;
    left: 290px;
  }
  .nothing{
    display: none;
  }
  .sunny{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;  }
  .clouds{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }
  .lightning{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }
  .drizzle{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }
  .umburella{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }
  .snow{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }
  .fog{
    position: fixed;
    display: flex;
    top: 160px;
    left: 100px;
    width: 60px;
  }

  .forecastTitle{
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
  .forecast{
    border: solid 1.5px #7ca3bb;
    border-radius: 10px;
    padding: 20px;
    width: 270px;
    position: fixed;
    top: 380px;
    left: 40px;
    height: 360px;
  }
  .high{
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 435px;
    left: 205px;
  }
  .low{
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 435px;
    left: 270px;
  }
  .day1{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 480px;
    left: 57px;
    width: 250px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: left;
    padding-left: 30px;
    background-color: #dde7ed;
  }
  .day1low{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 480px;
    left: 265px;
  }
  .day1high{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 480px;
    left: 200px;
  }
  .day2{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 550px;
    left: 57px;
    width: 250px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: left;
    padding-left: 30px;
    background-color: #dde7ed;
  }
  .day2low{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 550px;
    left: 265px;
  }
  .day2high{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 550px;
    left: 200px;
  }
  .day3{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 620px;
    left: 57px;
    width: 250px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: left;
    padding-left: 30px;
    background-color: #dde7ed;
  }
  .day3low{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 620px;
    left: 265px;
  }
  .day3high{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 620px;
    left: 200px;
  }
  .day4{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 690px;
    left: 57px;
    width: 250px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: left;
    padding-left: 30px;
    background-color: #dde7ed;
  }
  .day4low{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 690px;
    left: 265px;
  }
  .day4high{
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #4f6979;
    position: fixed;
    top: 690px;
    left: 200px;
  }
  .fourDays{
    color: #4f6979;
    font-size: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed;
    top: 442px;
    left: 70px;
  }

</style>
