import axios from 'axios'
import drf from '@/api/drf'

export default {
  state: {
		nowMovies : [],
		lastMovies : [],
		winMovies : [],
		recommendMovies : [],
	},
	getters: {
		nowMovies: state => state.nowMovies,
		lastMovies : state => state.lastMovies,
		winMovies : state => state.winMovies,
		recommendMovies : state => state.recommendMovies
	},
	mutations: {
		SET_NOW_MOVIES(state, res) {
			state.nowMovies = res
		},
		SET_LAST_MOVIES(state, res) {
			state.lastMovies = res
		},
		SET_WIN_MOVIES(state, res) {
			state.winMovies = res
		},
		SET_RECOMMEND_MOVIES(state, res) {
			state.recommendMovies = [...state.recommendMovies, ...res]
		}
	},
	actions: {
		setNowMovies({commit}) {
			axios({
				url : drf.movies.nowMovies(),
				method : 'GET',
			})
				.then(res => commit('SET_NOW_MOVIES', res.data))
		},
		setLastMovies({commit}) {
			axios({
				url : drf.movies.lastMovies(),
				method: 'GET',
			})
				.then(res => commit('SET_LAST_MOVIES', res.data))
		},
		setWinMovies({commit}) {
			axios({
				url : drf.movies.winMovies(),
				method: 'GET',
			})
				.then(res => commit('SET_WIN_MOVIES', res.data))
		},
		setRecommendMovies({commit}, username) {
			axios({
				url : drf.movies.recommendMovies(),
				method: 'GET',
				username: username
			})
				.then(res => commit('SET_RECOMMEND_MOVIES', res.data))
		}
	}
}