import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './modules/accounts'
import movies from './modules/movies'
import articles from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, movies, articles }
})
