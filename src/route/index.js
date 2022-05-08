import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin'
import TodoContent from '../components/TodoContent'



const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: TodoLogin},
        {path:'/todo', component: TodoContent},
        {path: '*', component: TodoLogin}
    ]
})

export default router