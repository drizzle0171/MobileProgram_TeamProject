<template>
  <div>
      <span @click="openSidebar">
        <i class="sidebarBtn fas fa-bars"></i>
      </span>
      <input class="sidebarCheck" type="checkbox">
      <div class="sidebar">
          <img src='../assets/todofordays.png' width="100px">
          <h2 style="text-align: center;">안녕하세요<br>슬비님!</h2>
          <div class="closeSidebar" @click="openTodo">
          <input class="sidebarUncheck" type="checkbox">
            <i class="closeBtn fas fa-angle-left"></i>
          </div>
          <div class="countBox"> <strong>오늘의 할 일은 <br> {{done}} / {{total}}</strong></div>
          <br>
          <div class="bluebox">
            <div @click="openWeather">
            <h3 id="text">☀︎ 오늘의 날씨</h3>
            <p id="text"><b>현재 온도</b> {{currentTemp}} °C</p>
            <p id="text"><b>최고 온도</b> {{highestTemp}} °C</p>
            <p id="text"><b>최저 온도</b> {{lowestTemp}} °C</p>
            <p id="text"><b>{{description}}</b></p>
          </div>
            <hr>
            <h3 id="text">✌︎ 머리를 식히자!</h3>
          <p id="text"><b>바로가기</b></p>
        </div>
        <span class="yongseul">made by yongseul</span>
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

export default {
  data(){
    return{
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
    openMypage(){
      this.$router.replace({path: "/mypage"});
    },
    openSidebar(){
      this.$router.replace({path: "/sidebar"});
    },
    closeSidebar(){
      this.total=0;
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
    background: #7ca3bb;
    padding-top: 10px;
    margin-bottom: 10px;
    border-radius: 7px;
    opacity: 0.7;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 17px;
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
  .closeSidebar{
    position:absolute;
    z-index: 2;
    width: 55px;
    height: 45px;
    background-color:#fff;
    left: 200px;
    top: 20px;
    border-radius: 9px;
      display: flex; 
    flex-direction: column;
    transition: transform 0.4s ease-in-out
  }
  .closeBtn{
    color:#7ca3bb;
    font-size: 38px;
    margin-top: 3px;
    margin-left: 4px;
    display: flex; 
    flex-direction: column;
    transform: translatex(-5px);
    transition: transform 0.4s ease-in-out;
    z-index: 3;
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
  .sidebarCheck{
    position: fixed;
    top: 45px;
    left: 27px;
    width: 22px;
    height: 22px;
    z-index: 1;
    opacity: 0;
  }
  .sidebarUncheck{
    position: fixed;
    z-index: 4;
    width: 30px;
    height: 30px;
    background-color:#fff;
    left: 210px;
    top: 27px;
    /* opacity: 0; */
  }
  input[class="sidebarUncheck"]:checked + div{
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
    input[class="sidebarCheck"]:checked + div{
      left: 0
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
