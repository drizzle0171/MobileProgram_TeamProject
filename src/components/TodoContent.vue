<template>
  <div>
    <div>
      <TodoHeader @changeDate="changeDate"></TodoHeader>
      <TodoInput v-bind:propsdata2 = "date" @changeDate="changeDate" @addTodo="addTodo"></TodoInput>
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

export default {
  name: 'App',
  data() {
    return {
      date: [],
      todoItems: [],
      name: "",
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
    }
    },
    created() {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
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
