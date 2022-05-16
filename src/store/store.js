import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      todoItems: []
    },
    getters: {
        getTodos: state => {
            return state.todoItems;
        }
    },
    mutations:{
        clearAll(state) {
            localStorage.clear();
            state.todoItems= [];
          },
        addTodo(state, information) {
            let head = information.Head;
            localStorage.setItem(head, information);
            state.todoItems.push(information);
        },
          //나중
        changeHead(newHead, index) {
            this.todoItems[index].Head = newHead;
            console.log(this.todoItems)
          },
          //나중
        changeMemo(newMemo, index) {
            this.todoItems[index].memo = newMemo;
          },
        removeTodo(state, payload) {
            localStorage.removeItem(payload.todoItem);
            state.todoItems.splice(payload.index, 1);
          },
        changeDate(Year, Month, Day){
            this.date = []
            this.date.push(Year, Month, Day)
          }
    }
  });