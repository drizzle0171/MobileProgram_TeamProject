<template>
  <div class="inputBox shadow">
    <!-- <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo"> -->
    <!-- <span class="addContainer" @click="addtodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span> -->
    <span type="button" @click="add()">
      <i class="addBtn fas fa-plus"></i>
    </span>

    <div class="info-mask" v-if="addtodo==true">
      <div class="info-wrapper">
        <div class="info-container">
          <span class="close" type="button" @click="addtodo = false">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
          <input v-if="typeHead" v-model="Head" type = "text" placeholder="Type your goal" style="text-align: left" @keyup.enter="storeHead()">
          <span v-if="showHead"><h3 style="text-align: left"> {{Head}} <hr></h3></span>
          <p style="text-align: left"> <b>D-day</b> 4월 5일</p>
          <p style="text-align: left"> <b>카테고리</b> 학교</p>
          <p style="text-align: left"> <b>중요도</b> 매우 중요</p>
          <div class = "memobox">
            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button">
                <i class="fas fa-pencil-alt"></i>
              </span>
                <br> <input type="text" v-model="Memo" placeholder="Memo..." @keyup.enter="storeMemo()">
            </p>
            <span @click="addTodo()">
              <p>저장하기</p>
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

export default {
  data() {
    return {
      newTodoItem: '',
      showModal: false,
      addtodo: false,
      showHead:false,
      information: {
        done:false, 
        oldHead:"",
        newHead:"",
        memo:"",
        category:"학교",
        date:"4월 14일",
        time:"7:00"
      },
      Head:"",
      Memo:"",
      typeHead:true
    }
  },
  methods: {
    add(){
      this.addtodo=true;
    },
    storeHead(){
      this.information['oldHead'] = this.Head;
      this.typeHead=false;
      this.showHead=true;
      console.log(this.information)
    },
    storeMemo(){
      this.information['memo'] = this.Memo;
      console.log(this.information)
    },
    addTodo() {
      if (this.Head !== "") {
        let information = JSON.stringify(this.information);
				this.$emit('addTodo', this.Head, information);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.addtodo = false,
      this.showHead = false,
      this.information =  {
        done:false, 
        oldHead:"",
        newHead:"",
        memo:"",
        category:"학교",
        date:"4월 14일",
        time:"7:00"
      },
      this.Head = "",
      this.Memo = "",
      this.typeHead = true
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
/* input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #209e76, #54cb91);
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}

input::placeholder {
  text-align: right;
} */

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