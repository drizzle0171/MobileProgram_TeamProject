<template>
  <div>
    <div>
      <input class='id' type="text" placeholder="example@gmail.com" @keyup.enter="toApp">
    </div>
    <div v-if="show">
      <TodoHeader @changeDate="changeDate"></TodoHeader>
      <TodoInput v-bind:propsdata2 = "date" @changeDate="changeDate" @addTodo="addTodo"></TodoInput>
      <TodoList v-bind:propsdata = "todoItems" @removeTodo="removeTodo" @changeHead = "changeHead" @changeMemo = "changeMemo"></TodoList>
      <TodoFooter @removeAll="clearAll"></TodoFooter>
    </div>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      date: [],
      todoItems: [],
      name: "",
      auth: getAuth(),
      show: false,
      password: "",
      email: "",
      }
  },
  methods: {
    toApp(){
      this.show = true;
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, information) {
			localStorage.setItem(todoItem, information);
			this.todoItems.push(JSON.parse(information));
		},
    changeHead(newHead, index) {
      this.todoItems[index].Head = newHead;
      console.log(this.todoItems)
    },
    changeMemo(newMemo, index) {
      this.todoItems[index].memo = newMemo;
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    changeDate(Year, Month, Day){
      this.date = []
      this.date.push(Year, Month, Day)
    },
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential.user);
          this.name = userCredential.user.email;

          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
    created() {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #f2f2f2;
    overflow-x: hidden;

  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>
