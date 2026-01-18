// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/index-pg.vue'
import LoginView from '../views/login.vue'
import dashboardView from '../views/dashboard.vue'

const routes = [
    { path: '/', name: 'home', component: LandingPage },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/dashboard', name: 'dashboard', component: dashboardView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router