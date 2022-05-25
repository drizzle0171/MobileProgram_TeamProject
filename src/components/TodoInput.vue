<template>
  <div class="inputBox">
  <div class="Today">
      <span class="Today-text">
      {{Dates[0]}}년 {{Dates[1]}}월 {{Dates[2]}}일
      </span>
    <span class="add" type="button" @click="add()">
      <i class="addBtn fas fa-plus"></i>
    </span>
    </div>
    <div class="info-mask" v-if="addtodo==true">
      <div class="info-wrapper">
        <div class="info-container">
          <span class="close" type="button" @click="addtodo = false">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
          <input class="Head" v-if="typeHead" v-model="Head" type = "text" placeholder="Type your goal" style="text-align: left" @change="storeHead()">
          <span v-if="showHead"><h3 style="text-align: left"> {{Head}} <hr style="border: 1px solid #7ca3bb;"></h3></span>
          <div>
          <input type = "date" v-model="date" style="text-align: left" @change="storeDate()">
          <p class="subTitle" style="text-align: left"><b>날짜</b></p>           
          <input class = "selectTime" type = "time" v-model="time" style="text-align: left" @change="storeTime()">
          <p class="subTitle" style="text-align: left"><b>시간</b></p>          
          </div>
          <form>
          <p class="subTitle" style="text-align: left"><b>카테고리</b>
          <select class="category" @change="storeCategory($event)">
              <option value="선택"> 선택 </option>
              <option value="학교"> 학교 </option>
              <option value="동아리"> 동아리 </option>
              <option value="과제"> 과제 </option>
              <option value="운동"> 운동 </option>
              <option value="약속"> 약속 </option>
              <option value="기타"> 기타 </option>
            </select>
          </p>
          </form>
          <form>
          <p class="subTitle" style="text-align: left"><b>중요도</b>
          <select class="important" @change="storeImportant($event)">
              <option value="선택"> 선택 </option>
              <option value="매우 중요"> 매우 중요 </option>
              <option value="중요"> 중요 </option>
              <option value="보통"> 보통 </option>
            </select>
          </p>
          </form>          
            <div class = "memobox">
            <p class="subTitle" style="text-align: left"> <b>메모</b> 
                <br> <input class="Memo" type="text" v-model="Memo" placeholder="Memo..." @change="storeMemo()">
            </p>
            <span class="addbtn" type="button" @click="addTodo()">
              저장하기
            </span>
          </div>
        </div>
      </div>
    </div>

    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
import Modal from './common/AlertModal.vue'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      today_year:'',
      today_month:'',
      today_day:'',
      newTodoItem: '',
      showModal: false,
      addtodo: false,
      showHead:false,
      information: {
        done:false, 
        Head:"",
        memo:"",
        category:"",
        important:"",
        date:"",
        time:"",
        addDate:""
      },
      Head:"",
      Memo:"",
      typeHead:true,
      Done: false,
      date:"",
      time:"",
      category:"",
      addDate:""
    }
  },
  computed:{
    ...mapGetters({
      'Dates':'getDate'
    })
  },
  methods: {
    add(){
      this.addtodo=true;
      this.storeAddDate();
    },
    storeAddDate(){
      this.addDate = [this.Dates[0], this.Dates[1], this.Dates[2]]
      this.information.addDate = this.addDate
    },
    storeHead(){
      this.information.Head = this.Head.trim();
      this.typeHead=false;
      this.showHead=true;
    },
    storeMemo(){
      this.information.memo = this.Memo.trim();
    },
    storeDate(){
      this.information.date = `${this.date.slice(0,4)}년 ${this.date.slice(5,7)}월 ${this.date.slice(8,10)}일`
    },
    storeTime(){
      this.information.time = `${this.date.slice(0,4)}년 ${this.date.slice(5,7)}월 ${this.date.slice(8,10)}일`
      if (Number(this.time.slice(0,2))>12){
        this.information.time = `오후 ${Number(this.time.slice(0,2))-12}시 ${this.time.slice(3,5)}분`
      }
      else{
        this.information.time = `오전 ${this.time.slice(0,2)}시 ${this.time.slice(3,5)}분`
      }
    },
    storeCategory(event){
      if (event.target.value == "선택") {
        this.information.category = "선택 안함"
      }
      else{ 
        this.information.category = `${event.target.value}`
      }
    },
    storeImportant(event){
      if (event.target.value == "선택") {
        this.information.important = "선택 안함"
      }
      else{
        this.information.important = `${event.target.value}`

      }
    },
    addTodo() {
      if (this.Head !== "") {
        let information = JSON.stringify(this.information);
        this.$store.commit('addTodo', information);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.Head = "";
      this.addtodo = false;
      this.showHead = false;
      this.information =  {
        done:false, 
        Head:"",
        memo:"",
        category:"",
        date:"",
        time:"",
        addDate:""
      },
      this.Head = "",
      this.Memo = "",
      this.typeHead = true
    }
  },
  created(){
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
input[type="date"] { 
 background: white; 
 color: #7ca3bb;;
 float: right;
 border: 0px;
 height: 15px;
 }

input[type="time"] { 
 background: white; 
 color: #7ca3bb;;
 float: right;
 border: 0px;
 height: 15px;

 }
.Today{
  background-color: #ffffff;
  left: 15px;
  margin: 10px 0px 0px 0px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
  letter-spacing: 5px;
  border-radius: 7px;
  width: 358px;
  box-shadow: none;
  position: fixed;
  top: 370px;
  left: 13px;
}
.Today-text{
  margin-left: 20px;
}
.add{
  float: right;
  margin-right: 20px;
  color: #7ca3bb;
  vertical-align: middle;
  font-size: 17px;
}
.Head{
  font-size: 16px;
  width: 100%;
  margin-right: 20px;
  background-color: #fff;
  border-top:none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #7ca3bb;
  height: 30px;
}
Head::placeholder{
  height: 30px;
  line-height: 30px;
}
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.info-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px 70px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.info-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.info-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
ul {
  list-style-type: none;
  padding: 0px;
  margin: 0;
  text-align: left;
}

li {
  display: flex;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  align-items: center;
}

.todo-item-text {
  padding: 15px;
  word-break: break-all;
  align-items: center;
}

.todo-memo {
  margin: 0px 2px;
  font-size: 12px;
  color: gray;
}

.checkBtn {
  line-height: 45px;
  color: #c9c9c9;
  margin-right: 5px;
}

.checkBtn_done {
  line-height: 45px;
  color: #209e76;
  margin-right: 5px;
}
.removeBtn {
  margin-left: 10px;
  color: #209e76;
  font-size: 13px;
}
.moreinfoBtn {
  display: table-cell;
  margin-left: auto;
  color: #209e76;
  vertical-align: middle;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.close {
  margin-left: auto;
  color: #de4343;
  float: right;
}
.modified {
  margin-left: auto;
  color: #000000;
  float: right;
}
.subTitle{
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 16px;
}
.important{
  float: right;
}
.category{
  float: right;
}
.Memo{
  font-size: 16px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #7ca3bb;
  border-radius: 5px;
  height: 30px;
  margin-top: 5px;
}
.addbtn{
  float: right;
  padding: 3px;
  border-radius: 5px;
  background-color: #7ca3bb;
  color: white;
  margin-top: 10px;
}
.selectTime{
  padding-top:10px
}

</style>