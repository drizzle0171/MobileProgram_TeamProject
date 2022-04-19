<template>
  <div>
    <div>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in propsdata" :key = todoItem class="shadow" >
          <i v-if="notdoneList[index]" class="checkBtn fas fa-check" aria-hidden="true" @click="check(todoItem, index)"></i>
          <i v-if="doneList[index]" class="checkBtn_done fas fa-check" aria-hidden="true"></i>
            <div class="todo-item-text">
              <span> {{ todoItem[0] }} </span> <p class="todo-memo"> {{ todoItem[1] }} </p>
            </div>
            <span class="moreinfoBtn" type="button" @click="moreInfo(todoItem, index)">
              <i class="fas fa-bars" aria-hidden="true"></i>
              </span>
            <span class="removeBtn" @click="removeTodo(todoItem, index)">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </span>
        </li>
      </transition-group>
    </div>

    <!-- modal_info -->
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
          <p style="text-align: left "><b>D-day</b> <span class="subValue"> D-{{result}} </span> </p>
          <p style="text-align: left "><b>시간</b> <span class="subValue">{{time}}</span></p>
          <p style="text-align: left"> <b>카테고리</b> <span class="category">{{category}}</span> </p>
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

export default {
  mounted(){
    if (localStorage.length==0){
      this.refreshAll()
    }
    this.doneList.push(false);
    this.notdoneList.push(true);
  },
  props: ['propsdata'],
  data() {
    return {
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
      doneList: [false],
      notdoneList: [true],
      date:"",
      time:"",
      category:"",
      important:"",
      result:"",
      option:'all'
    };
  },

  methods: {
    refreshAll(){
      this.$router.go();
    },
    check(todoItem, index){
      this.todoItem = todoItem[0];      
      this.index = index;
      this.done = todoItem[2]
      let information = JSON.parse(localStorage.getItem(this.todoItem));
      information.done = true;
      localStorage.setItem(this.todoItem, JSON.stringify(information));
      this.notdoneList[index] = false;
      this.doneList[index] = true;
      this.doneList.push(false);
      this.notdoneList.push(true);
      console.log(this.doneList)
      console.log(this.notdoneList)
      },
    removeTodo(todoItem, index) {
      this.doneList.pop(index);
      this.notdoneList.pop(index);
      this.$emit("removeTodo", todoItem[0], index);
      console.log(this.notdoneList);
      console.log(this.doneList);
    },
    calculateDday(){
      let day = new Date();
      let today = new Date(day.getFullYear(), day.getMonth()+1, day.getDate())
      let dday = new Date(Number(this.date.slice(0,4)), Number(this.date.slice(5,8)), Number(this.date.slice(10,12)))
      let gap = dday.getTime() - today.getTime();
      this.result = Math.ceil(gap/(1000*60*60*24))
    },
    moreInfo(todoItem, index) {
      this.showInfo = true;
      this.todoItem = todoItem[0];      
      this.index = index;
      this.memo = todoItem[1];
      let information = JSON.parse(localStorage.getItem(this.todoItem));
      this.date = information.date;
      this.time = information.time;
      this.category = information.category;
      this.important = information.important;
      this.calculateDday()
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
      this.$emit("changeHead", this.newHead, this.index);
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
      this.$emit("changeMemo", this.newMemo, this.index)
      localStorage.setItem(this.todoItem, JSON.stringify(information));   
      this.showModiMemo=false;
      this.oldMemo=false;
      this.showNewMemo=true;
    },
  },

  created() {
    let day = new Date()
    this.today_year = day.getFullYear();
    this.today_month = day.getMonth();
    this.today_day = day.getDate();
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        this.doneList[i]= (JSON.parse(localStorage.getItem(localStorage.key(i))).done);
        this.notdoneList[i]= (!JSON.parse(localStorage.getItem(localStorage.key(i))).done);
      }
      this.doneList.push(false);
      this.notdoneList.push(true);
		}
    if (localStorage.length==0){
      this.refreshAll()
    }
    console.log(this.doneList)
    console.log(this.notdoneList)
  },
};

</script>

<style scoped>
.ModiHead{
  border: 0px;
  float: left;
}
.ModiMemo{
  width: 96%;
  border: 0px;
  float: left;
  border: 1px solid #7ca3bb;
  border-radius: 3px;
  margin: 5px 0;
  padding: 5px;
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
  padding: 20px 30px 50px 30px;
  background-color: #fff;
  border-radius: 2px;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
.subValue{
  float: right;
}

</style>