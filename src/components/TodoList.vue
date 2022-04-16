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
              <i class="fas fa-plus" aria-hidden="true"></i>
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
          <input v-if="showModiHead" v-model="newHead" type = "text" placeholder="Type your goal" style="text-align: left" @keyup.enter="toLocalStorage_Head()">
          <span v-if="oldHead" @click="modifyHead" ><h3 style="text-align: left"> {{ todoItem }} <hr> </h3></span>
          <span v-if="showNewHead" @click="modifyHead"><h3 style="text-align: left">{{todoItem}}<hr></h3></span>
          <p style="text-align: left "><b>날짜</b> {{date}}</p>
          <p style="text-align: left "><b>D-day</b> D-{{result}}</p>
          <p style="text-align: left "><b>시간</b> {{time}}</p>
          <p style="text-align: left"> <b>카테고리</b> {{category}} </p>
          <p style="text-align: left"> <b>중요도</b> {{important}} </p>
          <div class = "memobox">
            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button">
                <i class="fas fa-pencil-alt"></i>
              </span>
                <br> <input type="text" v-model="memo" placeholder="Memo..." @keyup.enter="modifyMemo(memo)">
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
      showInfo: false,
      showModiHead: false,
      todoItem: "",
      index:"",
      memo:"",
      newHead:"",
      newHeadList: [],
      showNewHead: false,
      oldHead: true,
      temp:"",
      newMemo:"",
      oldMemo:"",
      doneList: [false],
      notdoneList: [true],
      date:"",
      time:"",
      category:"",
      important:"",
      result:"",
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
    // checkagain(todoItem, index){
    //   console.log(todoItem)
    //   this.todoItem = todoItem[0];      
    //   this.index = index;
    //   let information = JSON.parse(localStorage.getItem(this.todoItem));
    //   information.done = false;
    //   localStorage.setItem(this.todoItem, JSON.stringify(information));
    //   this.$emit("checkagain", todoItem[2], index);
    //   this.notdoneList[index] = true;
    //   this.doneList[index] = false;
    //   },
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
    modifyMemo(memo) {
      let information = JSON.parse(localStorage.getItem(this.todoItem));
      information.memo = memo;
      this.$emit("changeMemo", this.memo, this.index)
      localStorage.setItem(this.todoItem, JSON.stringify(information));    },
  },
  created() {
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
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.info-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
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

</style>