import axios from 'axios'
import drf from '@/api/drf'

const URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY

export default {
  state: {
		nowMovies : [],
		lastMovies : [],
		winMovies : [],
		recommendMovies : [],

		movieDetail: {},
		video: '',

		nyearMovies: [],

		searchedMovies: [],
		searchedMoviesForReview: [],
	},
	getters: {
		nowMovies: state => state.nowMovies,
		lastMovies : state => state.lastMovies,
		winMovies : state => state.winMovies,
		recommendMovies : state => state.recommendMovies,

		movieDetail : state => state.movieDetail,
		video : state => state.video,

		nyearMovies : state => state.nyearMovies,
		searchedMovies : state => state.searchedMovies,
		searchedMoviesForReview : state => state.searchedMoviesForReview,

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
		},
		SET_NYEAR_MOVIES(state, res) {
			state.nyearMovies = res
		},
		SET_SEARCHED_MOVIES(state, res) {
			state.searchedMovies = res
		},
		SET_MOVIE_DETAIL(state, res) {
			state.movieDetail = res
		},
		SET_VIDEO(state, res) {
			state.video = res
		},
		SET_MOVIES_FOR_REVIEW(state, res) {
			state.searchedMoviesForReview = res
		},
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
		},
		setNyearMovies({commit}, year) {
			axios({
				url : drf.movies.nyearMovies(year),
				method: 'GET',
			})
				.then(res => commit('SET_NYEAR_MOVIES', res.data))
		},
		setSearchedMovies({commit}, query) {
			query.trim()
			if (query) {
				axios({
					url : drf.movies.searchMovie(query),
					method: 'GET',
				})
				.then(res => commit('SET_SEARCHED_MOVIES', res.data))
			} else {
				alert('검색어를 입력해주세요')
			}
		},
		setMovieDetail({commit}, moviePk) {
			axios({
				url : drf.movies.movie(moviePk),
				method: 'GET',
			})
				.then(res => {
					commit('SET_MOVIE_DETAIL', res.data)
					axios.get(URL, {
						params: {
							key: API_KEY,
							type: 'video',
							part: 'snippet',
							q: res.data.title + '예고편'
						}
					})
					.then(response => {
						commit('SET_VIDEO', response.data.items[0].id.videoId)
					})
				})
		},
		searchMovieReview({commit}, query) {
			query.trim()
			if (query) {
				axios({
					url : drf.movies.searchMovieReview(query),
					method: 'GET',
				})
				.then(res => commit('SET_MOVIES_FOR_REVIEW', res.data))
			} else {
				alert('검색어를 입력해주세요')
			}
		},
	}
}