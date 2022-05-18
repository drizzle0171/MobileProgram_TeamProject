<template>
  <div>
    <div>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in todos" :key = "todoItem.Head" class="shadow" >
          <span class="item" v-if="(todoItem.addDate[0]==Dates[0]) && (todoItem.addDate[1]==Dates[1]) && todoItem.addDate[2]==Dates[2]">
          <i class="checkBtn fas fa-check" :class="{checkBtn_done: todoItem.done}" aria-hidden="true" @click="check(todoItem, index)"></i>
            <div class="todo-item-text">
              <span> {{ todoItem.Head }} </span> <span :class="{category_school: (todoItem.category=='학교'), category_appointment: (todoItem.category=='약속'), category_assignment: (todoItem.category=='과제'), category_club: (todoItem.category=='동아리'), category_exercise: (todoItem.category=='운동'), category_etc: (todoItem.category=='기타')}">{{todoItem.category}}</span> <p class="todo-memo"> {{ todoItem.memo }} </p>
            </div>
            <span>
              <i class="fas fa-circle" :class="{important_red: (todoItem.important=='매우 중요'), important_yellow: (todoItem.important=='중요'), important_green: (todoItem.important=='보통')}"></i>
            </span>
            <span class="moreinfoBtn" type="button" @click="moreInfo(todoItem)">
              <i class="fas fa-bars" aria-hidden="true"></i>
              </span>
            <span class="removeBtn" @click="removeTodo(todoItem, index)">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </span>
            </span>
        </li>
      </transition-group>
    </div>

    <div class="info-mask" v-if="showInfo == true">
      <div class="info-wrapper">
        <div class="info-container">
          <span class="close" type="button" @click="showInfo = false">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
          <input class="ModiHead" v-if="showModiHead" v-model="newHead" type = "text" placeholder="Type your goal" style="text-align: left" @keyup.enter="toLocalStorage_Head()">
          <span v-if="oldHead" @click="modifyHead" ><h3 style="text-align: left"> {{ todoItem }} <hr style="border: 1px solid #7ca3bb;"></h3></span>
          <span v-if="showNewHead" @click="modifyHead"><h3 style="padding:5px; text-align: left">{{todoItem}} <hr style="border: 1px solid #7ca3bb;"></h3></span>
          <p style="text-align: left "><b>날짜</b> <span class="subValue"> {{date}} </span></p>
          <p style="text-align: left "><b>D-day</b> <span class="subValue"> D{{result}} </span> </p>
          <p style="text-align: left "><b>시간</b> <span class="subValue">{{time}}</span></p>
          <p style="text-align: left"> <b>카테고리</b> <span :class="{category_school_moreinfo: (category=='학교'), category_appointment_moreinfo: (category=='약속'), category_assignment_moreinfo: (category=='과제'), category_club_moreinfo: (category=='동아리'), category_exercise_moreinfo: (category=='운동'), category_etc_moreinfo: (category=='기타')}">{{category}}</span> </p>
          <p style="text-align: left"> <b>중요도</b> <span class="subValue"> {{important}} </span></p>
          <div class = "memobox">
            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button" @click="modifyMemo(newMemo)">
                <i class="fas fa-pencil-alt" style="color: #7ca3bb"></i>
              </span>
                <br> <input class="ModiMemo" type="text" v-if="showModiMemo" v-model="newMemo" placeholder="Memo..." @keyup.enter="toLocalStorage_Memo(newMemo)">
                <span v-if="oldMemo" @click="modifyMemo()" ><p style="text-align: left"> {{ memo }}</p></span>
                <span v-if="showNewMemo" @click="modifyMemo()"><p style="margin:0; text-align: left">{{ newMemo }}</p></span>
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      todayCnt:0,
      activeColor:'',
      todoItems:[],
      today_year:'',
      today_month:'',
      today_day:'',
      showInfo: false,
      showModiHead: false,
      showModiMemo: false,
      todoItem: "",
      index:"",
      memo:"",
      newHead:"",
      newMemo:"",
      showNewHead: false,
      showNewMemo: false,
      oldHead: true,
      oldMemo: true,
      temp:"",
      date:"",
      time:"",
      category:"",
      important:"",
      done:{},
      todo_done: false,
      result:''
    };
  },
  computed:{
    ...mapGetters({
      'todos':'getTodos',
      'Dates':'getDate'
    })
  },
  methods: {
    check(todoItem, index){
      todoItem.done = !todoItem.done;
      localStorage.removeItem(todoItem.Head);
      localStorage.setItem(todoItem.Head, JSON.stringify(todoItem));
      let value = [todoItem.done, index];
      this.$store.commit('checkDone', value);
      },
    removeTodo(todoItem, index) {
      let value = [todoItem.Head, index];
      this.$store.commit("removeTodo", value);
      },
    calculateDday(){
      let day = new Date();
      let today = new Date(day.getFullYear(), day.getMonth()+1, day.getDate())
      let dday = new Date(Number(this.date.slice(0,4)), Number(this.date.slice(5,8)), Number(this.date.slice(10,12)))
      let gap = dday.getTime() - today.getTime();
      let ddaynum = Math.ceil(gap/(1000*60*60*24))
      if (ddaynum<0) {
        this.result = `+${Math.abs(ddaynum)+1}`;
      }
      else if (ddaynum==0){
        this.result = ' - day';
      }
      else{
        this.result = `-${Math.abs(ddaynum)}`;
      }
      
    },
    moreInfo(todoItem) {
      this.showInfo = true;
      this.todoItem = todoItem.Head;      
      this.memo = todoItem.memo;
      this.date = todoItem.date;
      this.time = todoItem.time;
      this.category = todoItem.category;
      this.important = todoItem.important;
      this.calculateDday()
      console.log(todoItem)
    },
    modifyHead() {
      console.log(this.todoItem)
      this.temp = this.todoItem;
      this.todoItem = "";
      this.showModiHead=true;
    },
    toLocalStorage_Head(){
      let information = JSON.parse(localStorage.getItem(this.temp));
      information.Head = this.newHead;
      this.todoItem = this.newHead;
      localStorage.setItem(this.todoItem, JSON.stringify(information));
      localStorage.removeItem(this.temp);
      let value = [this.newHead, this.index];
      this.$store.commit("changeHead", value);
      this.showModiHead=false;
      this.oldHead=false;
      this.showNewHead=true;
    },
    modifyMemo() {
      console.log(this.todoItem)
      this.showModiMemo=true;
      this.memo="";
      this.oldMemo=false;
      this.showNewMemo=false;
    },
    toLocalStorage_Memo(newMemo) {
      let information = JSON.parse(localStorage.getItem(this.todoItem));
      information.memo = newMemo;
      this.memo= newMemo;
      let value = [this.newMemo, this.index]
      this.$store.commit("changeMemo", value)
      localStorage.setItem(this.todoItem, JSON.stringify(information));   
      this.showModiMemo=false;
      this.oldMemo=false;
      this.showNewMemo=true;
    }
  },
};

</script>

<style scoped>
.item{
  z-index: -10;
  display: flex;
  margin: 7px;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  align-items: center;
  border-radius: 7px;
  width: 328px;  
}
.memobox{
  width: 240px;
  height: 100px;
}
.ModiHead{
  border: 0px;
  float: left;
}
.ModiMemo{
  width: 225px;
  border: 0px;
  float: left;
  border: 1px solid #7ca3bb;
  border-radius: 3px;
  margin: 5px 0;
  padding: 5px;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;

}
div {
  box-sizing: border-box;
  width: 360px;
  height: 1000px;
  overflow-y: auto;
}
.info-container {
  margin: 0px auto 250px;
  width: 300px;
  padding: 20px 30px 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  height:400px
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
  margin: 0 5px;
  text-align: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: absolute;
  top: 435px;
  left: 0px;
}

.todo-item-text {
  padding: 15px;
  word-break: break-all;
  align-items: center;
  height: 65px;
  overflow-y: hidden;

}

.todo-memo {
  margin: 2px 2px;
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
  color: #7ca3bb;
  margin-right: 5px;
}
.removeBtn {
  margin-left: 10px;
  color: #7ca3bb;
  font-size: 14px;
}
.moreinfoBtn {
  display: table-cell;
  margin-left: auto;
  color: #7ca3bb;
  font-size: 14px;
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

.category{
  border: 1px solid #7ca3bb;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  color: #7ca3bb;
  font-size: 15px;
  float: right;
  text-align: center;
  vertical-align: middle;
}
.category_club{
  border: 1px solid #363D8E;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #363D8E;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_school{
  border: 1px solid #FF4F4F;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #FF4F4F;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_appointment{
  border: 1px solid #7C588E;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #7C588E;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_assignment{
  border: 1px solid #FFBA33;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #FFBA33;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_exercise{
  border: 1px solid #009917;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #009917;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_etc{
  border: 1px solid #606168;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #606168;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
}
.category_club_moreinfo{
  border: 1px solid #363D8E;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #363D8E;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.category_school_moreinfo{
  border: 1px solid #FF4F4F;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #FF4F4F;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.category_appointment_moreinfo{
  border: 1px solid #7C588E;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #7C588E;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.category_assignment_moreinfo{
  border: 1px solid #FFBA33;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #FFBA33;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.category_exercise_moreinfo{
  border: 1px solid #009917;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #009917;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.category_etc_moreinfo{
  border: 1px solid #606168;
  border-radius: 5px;
  padding: 1px 2px 1px 2px;
  margin: 4px 5px 0px 0px;
  color: #606168;
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  float: right;

}
.subValue{
  float: right;
}
.important_red{
  font-size: 13px;
  margin: 9px;
  color:#FF4F4F;
} 
.important_yellow{
  font-size: 13px;
  margin: 9px;
  color: #FFBA33;
}
.important_green{
  font-size: 13px;
  margin: 9px;
  color:#009917;
}
</style>