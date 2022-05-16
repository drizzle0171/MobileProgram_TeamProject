import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      todoItems: [],
      Dates: [],
      doneCount: [],
    },
    getters: {
        getTodos: state => {
            return state.todoItems;
        },
        getDate: state => {
          return state.Dates;
        },
        getDone: state => {
          return state.doneCount;
        },
    },
    mutations:{
        clearAll(state) {
            localStorage.clear();
            state.todoItems = [];
          },
        addTodo(state, information) {
            let JSONinformation = JSON.parse(information)
            localStorage.setItem(JSONinformation.Head, information);
            state.todoItems.push(JSONinformation);
            state.doneCount.push(0);
        },
        changeHead(state, value) {
            let newHead = value[0]
            let index = value[1]
            state.todoItems[index].Head = newHead;
          },
        changeMemo(state, value) {
            let newMemo = value[0]
            let index = value[1]
            state.todoItems[index].memo = newMemo;
          },
        removeTodo(state, value) {
            let todoItem = value[0];
            let index = value[1];
            localStorage.removeItem(todoItem);
            state.todoItems.splice(index, 1);
          },
        changeDate(state, date){
            state.Dates = [];
            let Year = date[0];
            let Month = date[1];
            let Day = date[2];
            state.Dates.push(Year, Month, Day);
          },
          checkDone(state, value){
            let done = value[0];
            let index = value[1];
            if (done == true){
              state.doneCount[index] = 1
            }
            else {
              state.doneCount[index] = 0
            }
            console.log(state.doneCount);
          },

          
          
    }
  });