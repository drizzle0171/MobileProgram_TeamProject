import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin'
import TodoContent from '../components/TodoContent'
import TodoMypage from '../components/TodoMypage'
import TodoWeather from '../components/TodoWeather'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: TodoLogin},
        {path:'/todo', component: TodoContent},
        {path: '*', component: TodoLogin},
        {path: '/mypage', component: TodoMypage},
        {path: '/weather', component: TodoWeather},
    ]
})

export default router