import axios from 'axios'
import drf from '@/api/drf'

export default {
  state: {
		nowMovies : [],
		lastMovies : [],
		winMovies : [],
	},
	getters: {
		nowMovies: state => state.nowMovies,
		lastMovies : state => state.lastMovies,
		winMovies : state => state.winMovies
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
		}
	},
	actions: {
		setNowMovies({commit}) {
			axios({
				url : drf.movies.nowMovies(),
				method : 'GET',
			})
				.then(res => commit('SET_NOW_MOVIES', res))
		},
		setLastMovies({commit}) {
			axios({
				url : drf.movies.lastMovies(),
				method: 'GET',
			})
				.then(res => commit('SET_LAST_MOVIES', res))
		},
		setWinMovies({commit}) {
			axios({
				url : drf.movies.winMovies(),
				method: 'GET',
			})
				.then(res => commit('SET_WIN_MOVIES', res))
		}
	}
}