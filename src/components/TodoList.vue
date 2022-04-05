<template>
  <div>
    <div>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"></i>
            <div class="todo-item-text">
              <span class="todo-item">{{ todoItem }}</span> <p class="todo-memo"> {{memoList[todoItem]}} </p>
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
          <div class = "memobox">
            <input v-if="showModiHead" v-model="newHead" type = "text" placeholder="Type your goal" style="text-align: left">
          </div> 
          <span @click="modifyHead" >
            <h3 style="text-align: left"> {{ item }} <hr> </h3>
            </span>
          <p style="text-align: left"><b>D-day</b> <input type="date" style="width:150px"></p>
          <p style="text-align: left"> <b>카테고리</b> 학교</p>
          <p style="text-align: left"> <b>중요도</b> 매우 중요</p>
          <div class = "memobox">

            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button" @keyup.enter="modify()">
                <i class="fas fa-pencil-alt"></i>
              </span>
                <br> <input type="text" v-model="memoList[todoItem]" placeholder="Memo..." v-on:keyup.enter="modify(todoItem)">
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInfo: false,
      showModiHead: false,
      todoItem: "",
      index: "",
      memo: "",
      memoList: {},
      newHead: ""
    };
  },
  props: ["propsdata"],
  methods: {
    removeTodo(todoItem, index) {
      console.log(todoItem, index)
      this.$emit("removeTodo", todoItem, index);
      this.showInfo = false;
    },
    moreInfo(todoItem, index) {
      this.showInfo = true;
      this.todoItem = todoItem;
      this.index = index;

    },
    modifyHead(todoItem) {
      localStorage.removeItem(todoItem);
      this.item = "";
      this.showModiHead=true;
      todoItem = this.newHead
    },
    modify() {
      console.log(this.memo);
      localStorage.setItem(this.todoItem, this.memoList[this.todoItem]);
      this.memo=localStorage.getItem(this.todoItem)
      console.log(this.memoList);
    },
    clearInput() {
      this.memo = '';
    }
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
  margin: 10px;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  align-items: center;
}


.todo-item-text {
  margin: 15px;
  margin-right: 20px;
  word-break: break-all;
  display: inline-block;
  align-items: center;
  overflow: hidden;
  background-color: antiquewhite;
  width:200px;
}

.todo-memo {
  margin: 0px 2px;
  font-size: 12px;
  color: gray;
}
 
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: black;
  font-size: 13px;
}
.moreinfoBtn {
  display: table-cell;
  margin-left: 230px;
  margin-right: 10px;
  color: black;
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
input:focus {
  outline: none;
}
/* .memobox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
} */
.memobox {
  border-style: none;
  font-size: 0.9rem;
}

</style>
