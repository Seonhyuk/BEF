import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NyearView from '@/views/NyearView.vue'
import SearchView from '@/views/SearchView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import RoundSelectView from '@/views/RoundSelectView.vue'
import WorldCupView from '@/views/WorldCupView.vue'
import SelectGenreView from '@/views/SelectGenresView.vue'


import ArticleListView from '@/views/community/ArticleListView.vue'
import ArticleDetailView from '@/views/community/ArticleDetailView.vue'
import ArticleNewView from '@/views/community/ArticleNewView'
import ArticleEditView from '@/views/community/ArticleEditView'



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
  },
  {
    path: '/community', 
    name: 'articles',
    component: ArticleListView
  },
  {
    path: '/articles/new',
    name: 'articleNew',
    component: ArticleNewView
  },
  {
    path: '/articles/:articlePk',
    name: 'article',
    component: ArticleDetailView
  },
  {
    path: '/articles/:articlePk/edit',
    name: 'articleEdit',
    component: ArticleEditView
  },
  {
    path: '/roundselect',
    name: 'roundselect',
    component: RoundSelectView
  },
  {
    path: '/worldcup',
    name: 'worldcup',
    component: WorldCupView
  },
  {
    path: '/genres',
    name: 'genres',
    component: SelectGenreView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
