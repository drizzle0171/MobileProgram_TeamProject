import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      todoItems: [],
      Dates: [],
    },
    getters: {
        getTodos: state => {
            return state.todoItems;
        },
        getDate: state => {
          return state.Dates;
        }
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
        },
          //나중
        changeHead(state, value) {
            let newHead = value[0]
            let index = value[1]
            state.todoItems[index].Head = newHead;
          },
          //나중
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
          }
    }
  });