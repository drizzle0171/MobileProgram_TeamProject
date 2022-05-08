<template>
  <div>
    <div>
      <TodoHeader @changeDate="changeDate"></TodoHeader>
      <TodoInput v-bind:propsdata2 = "date" @changeDate="changeDate" @addTodo="addTodo"></TodoInput>
      <button @click="logout"> Logout </button>
      <button @click="deleteuser"> Delete </button>
      <TodoList v-bind:propsdata = "todoItems" @removeTodo="removeTodo" @changeHead = "changeHead" @changeMemo = "changeMemo"></TodoList>
      <TodoFooter @removeAll="clearAll"></TodoFooter>
    </div>
  </div>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
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
      showLogin:true,
      pleaseSignUp: false,
      }
  },
  methods: {
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
     logout(){
        signOut(this.auth)
        .then(() => {
          // this.show = false;
          // this.showLogin = true;
          // Sign-out successful.
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });
    },
      deleteuser(){
        deleteUser(getAuth().currentUser)
          .then(() => {
          // User deleted.
          console.log('success')
        }).catch((error) => {
          console.log(error)
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
        this.show = true;
        // this.showLogin = false;
        // ...
      } else {
        this.$router.replace({path:"/"})
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

</style>
