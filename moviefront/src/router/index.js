import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NyearView from '@/views/NyearView.vue'
import SearchView from '@/views/SearchView.vue'
import MovieDetailView from '@/views/MovieDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/nyear',
    name: 'nyear',
    component: NyearView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/moviedetail/:moviePk',
    name: 'moviedetail',
    component: MovieDetailView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
