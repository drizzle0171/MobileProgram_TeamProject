<template>
  <div id="app">
    <TodoHeader @changeDate="changeDate"></TodoHeader>
    <TodoInput v-bind:propsdata2="date" @changeDate="changeDate" @addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo" @changeHead = "changeHead" @changeMemo = "changeMemo" @check = "check" @checkagain = "checkagain"></TodoList>
    <TodoFooter @removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data() {
    return {
      date: [],
      todoItems: [],
      }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, information) {
			localStorage.setItem(todoItem, information);
      console.log(todoItem)
			this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(todoItem))));
      console.log(this.todoItems)
		},
    changeHead(newHead, index) {
      this.todoItems[index].Head = newHead;
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
