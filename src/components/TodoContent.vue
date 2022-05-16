<template>
  <div>
    <div>
      <TodoHeader></TodoHeader>
      <TodoInput></TodoInput>
      <TodoList></TodoList>
      <TodoFooter ></TodoFooter>
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
      cnt:0,
      name: "",
      show: false,
      showLogin:true,
      pleaseSignUp: false,
      }
  },
  methods: {

  },
    created() {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          this.$store.commit('addTodo', localStorage.getItem(localStorage.key(i)));
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
