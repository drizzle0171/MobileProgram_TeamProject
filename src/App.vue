<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo" @changeHead = "changeHead"></TodoList>
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
      todoItems: []
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, information, memo) {
			localStorage.setItem(todoItem, information);
      let todoItemMemo = [todoItem, memo]
			this.todoItems.push(todoItemMemo);
      // this.todoItems.push(todoItem);
      console.log(this.todoItems);
		},
    changeHead(newHead, index) {
      this.todoItems[index][0] = newHead;
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
      this.todoItems.splice(index, 1)
    }
  },
  created() {
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))).memo)
				this.todoItems.push([localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i))).memo]);
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
