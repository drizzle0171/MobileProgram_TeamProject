import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      todoItems: [],
      todoHeads: [],
      Dates: [],
      doneCount: [],
      totalCount: 0,
      img:'',
      name: ''
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
        getTotal: state =>{
          return state.totalCount;
        },
        getImg: state =>{
          return state.img;
        },
        getName: state =>{
          return state.name;
        }
    },
    mutations:{
        clearAll(state) {
            localStorage.clear();
            state.todoItems = [];
          },
        userInfo(state, value){
          let img = value[0]
          let name = value[1]
          state.img = img;
          state.name = name;
          localStorage.setItem('img', img);
          localStorage.setItem('name', name);
        },
        addTodo(state, information) {
            let JSONinformation = JSON.parse(information)
            localStorage.setItem(JSONinformation.Head, information);
            if (state.todoItems.length < 1) {
              state.todoItems.push(JSONinformation);
              state.todoHeads.push(JSONinformation.Head);
            }
            else {
              if (state.todoHeads.includes(JSONinformation.Head) == false){
                state.todoItems.push(JSONinformation);
                state.todoHeads.push(JSONinformation.Head);
              } 
            }
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
          },
}
  });

  export const store2 = Vue.observable({
    isNavOpen: false
  });

  export const mutations = {
    setIsNavOpen(yesno) {
      store.isNavOpen = yesno;
    },
    toggleNav() {
      store.isNavOpen = !store.isNavOpen;
    }
  };