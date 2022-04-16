<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo" @changeHead = "changeHead" @changeMemo = "changeMemo" @check = "check" @checkagain = "checkagain"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
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
      todoItems: [],
      notdone: true
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, information, memo, done) {
			localStorage.setItem(todoItem, information);
      let todo = [todoItem, memo, done, this.notdone]
			this.todoItems.push(todo);
		},
    changeHead(newHead, index) {
      this.todoItems[index][0] = newHead;
    },
    changeMemo(newMemo, index) {
      this.todoItems[index][1] = newMemo;
    },
    check(done, index) {
      this.todoItems[index][2] = done;
    },
    checkagain(done, index) {
      this.todoItems[index][2] = done;
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    }
  },
  created() {
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
				this.todoItems.push([localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i))).memo, JSON.parse(localStorage.getItem(localStorage.key(i))).done, !JSON.parse(localStorage.getItem(localStorage.key(i))).done]);
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
    background-color: #ffffff;
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
