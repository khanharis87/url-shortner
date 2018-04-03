import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'

import state from './state'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/home/:username', name: 'home', meta: { private: true}, component: Home }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if(to.meta.private && !state.user) {
        next({name: 'login'})
        return
    }
    next()
})
export default router