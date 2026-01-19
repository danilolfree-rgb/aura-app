// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/index-pg.vue'
import LoginView from '../views/login.vue'
import dashboardView from '../views/dashboard.vue'

const routes = [
    { path: '/', name: 'index', component: LandingPage, meta: { hideNav: true } },
    { path: '/login', name: 'login', component: LoginView, meta: { hideNav: true } },
    { path: '/dashboard', name: 'dashboard', component: dashboardView },
    { path: '/home', name: 'home', component: () => import('../components/dashboardPg/DashboardHome.vue') },
    { path: '/extract', name: 'extract', component: () => import('../components/dashboardPg/ExtractPg.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router