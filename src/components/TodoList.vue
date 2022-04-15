<template>
  <div>
    <div>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow" >
          <i v-if="done=false" class="checkBtn fas fa-check" @click="checkDone(index)"></i>
          <i v-if="done=true" class="checkBtn_done fas fa-check"></i>
            <div class="todo-item-text">
              <span>{{ todoItem }} </span> <p class="todo-memo"> {{memoList[todoItem]}} </p>
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
          <span v-if="showNewHead"><h3 style="text-align: left">{{newHeadList[index]}}<hr></h3></span>
          <p style="text-align: left"> <b>D-day</b> 4월 5일</p>
          <p style="text-align: left"> <b>카테고리</b> 학교</p>
          <p style="text-align: left"> <b>중요도</b> 매우 중요</p>
          <div class = "memobox">
            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button">
                <i class="fas fa-pencil-alt"></i>
              </span>
                <br> <input type="text" v-model="memoList[todoItem]" placeholder="Memo...">
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todoItem',
  data() {
    return {
      showInfo: false,
      showModiHead: false,
      todoItem: "",
      memo: "",
      memoList: [],
      newHead:"",
      newHeadList: [],
      showNewHead: false,
      oldHead: true,
      done: JSON.parse(localStorage.getItem(this.todoItem))['done']
    };
  },
  props: ["propsdata"],
  methods: {
    checkDone(index){
      this.notdoneList[index] = false;
      this.doneList[index] = true;
      this.doneList.push(false);
      this.notdoneList.push(true);
    },
    removeTodo(todoItem, index) {
      this.$emit("removeTodo", todoItem, index);
      this.showInfo = false;
    },
    moreInfo(todoItem, index) {
      this.showInfo = true;
      this.todoItem = todoItem;
      this.index = index;
      console.log(JSON.parse(localStorage.getItem(todoItem))['done'])
    },
    modifyHead() {
      this.todoItem = "";
      this.showModiHead=true;
    },
    toLocalStorage_Head(){
      this.newHeadList[this.index] = this.newHead;
      this.showModiHead=false;
      this.oldHead=false;
      this.showNewHead=true;
    },
    modify() {
      console.log(this.memo);
      localStorage.setItem(this.todoItem, this.memoList[this.todoItem]);
      this.memo=localStorage.getItem(this.todoItem);
      console.log(this.memoList);
    },
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