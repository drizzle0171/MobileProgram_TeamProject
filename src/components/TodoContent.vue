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
import { mapGetters } from 'vuex';

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
  
  computed:{
  ...mapGetters({
      'Dates':'getDate',
      'total':'getTotal'
    })
  },
  methods: {
  },
    created() {
      if (this.Dates.length==0) {
      console.log('yes')
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      let date = [year, month, day];
      this.$store.commit('changeDate', date)
      }
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
