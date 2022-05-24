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
		reviews: [],

		exponent: 0,
		tournament: [],
		order: [],
		idx: 0,
		oIdx: 0,

		genres:[],

		nyearMovies: [],

		searchedMovies: [],
		searchedMoviesForReview: [],
		backDropImage: [],

		sharedPoster: '',
		sharedTitle: '',
	},
	getters: {
		nowMovies: state => state.nowMovies,
		lastMovies : state => state.lastMovies,
		winMovies : state => state.winMovies,
		recommendMovies : state => state.recommendMovies,

		movieDetail : state => state.movieDetail,
		video : state => state.video,
		reviews : state => state.reviews,

		exponent : state => state.exponent,
		tournament : state => state.tournament,
		order : state => state.order,
		idx : state => state.idx,
		oIdx : state => state.oIdx,

		nyearMovies : state => state.nyearMovies,
		searchedMovies : state => state.searchedMovies,
		searchedMoviesForReview : state => state.searchedMoviesForReview,
		
		genres: state => state.genres,
		backDropImage: state => state.backDropImage,

		sharedPoster: state => state.sharedPoster,
		sharedTitle: state => state.sharedTitle,
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
		SET_REVIEWS(state, res) {
			state.reviews = res
		},
		SET_EXPONENT(state, exponent) {
			state.exponent = exponent
			state.idx = 2 ** exponent - 1
		},
		GET_MATCH_UP(state, res) {
			state.order = res.shuffle
		},
		GET_WORLD_CUP(state, res) {
			const len = res.length * 2
			const tree = new Array(len)
			let j = 0
			for (let i = len - 1 ; i > res.length - 1; i--) {
				tree[i] = res[j]
				j += 1
			}
			state.oIdx = 0
			state.idx = len - 1
			state.tournament = tree
		},
		FILL_MOVIE(state, i) {
			state.tournament[state.order[state.oIdx]] = state.tournament[i]
			state.oIdx += 1
			state.idx -= 2
		},
		GET_GENRES (state, res) {
			state.genres = res
		},
		SET_BACK_DROP_IMAGE (state, res) {
			state.backDropImage = res
		},
		CLEAR_RECOMMEND_MOVIES (state) {
			state.recommendMovies = []
		},
		SET_SHARED_POSTER (state, poster_path) {
			state.sharedPoster = poster_path
		},
		SET_SHARED_TITLE (state, title) {
			state.sharedTitle = `[${title}] #월드컵우승 `
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
		setRecommendMovies({commit, getters}, username) {
			axios({
				url : drf.movies.recommendMovies(username),
				method: 'GET',
				authHeader: getters.authHeader
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
							q: res.data.title + '티저 트레일러'
						}
					})
					.then(response => {
						commit('SET_VIDEO', response.data.items[0].id.videoId)
					})
				})
		},
		setReviews({commit}, moviePk) {
			axios({
				url : drf.movies.reviews(moviePk),
				method: 'GET',
			})
				.then(res => commit('SET_REVIEWS', res.data))
		},
		createReview({ dispatch, getters }, { moviePk, username, content, like }) {
			axios({
				url: drf.movies.reviews(moviePk),
				method: 'post',
				data: {
					'username': username,
					'content': content,
					'like': like
				},
				headers: getters.authHeader,
			})
				.then( () => {
					dispatch('setReviews', moviePk)
				})
		},
		setExponent({commit}, exponent) {
			commit('SET_EXPONENT', exponent)
		},
		getMatchUp({commit}, exponent) {
      axios({
				url: drf.movies.roundSelect(exponent)
			})
				.then(res => {
					commit('GET_MATCH_UP', res.data)			
				})
		},
		getWorldCup({commit, getters }, exponent) {
			axios({
				url: drf.movies.worldCup(exponent) + `${getters.currentUser.username}/`
			})
				.then(res => {
					commit('GET_WORLD_CUP', res.data)
				})
		},
		fillMovie ({commit}, i) {
			commit('FILL_MOVIE', i)
		},
		getGenres ({commit}) {
			axios({
				url: drf.movies.genres()
			})
				.then(res => {
					commit('GET_GENRES', res.data)
				})
		},
		likeGenre({ commit, getters }, genre) {
			axios({
				url: drf.movies.like_genre(),
				method: 'post',
				header: getters.authHeader,
				params: {
					'username': getters.currentUser.username,
					'genre': genre.id
				}
			})
				.then(res => {
					commit('SET_CURRENT_USER', res.data)
				})
		},

		selectMovie({ dispatch, getters }, payload) {
			if (!getters.isLoggedIn) {
				alert('로그인한 회원만 선택할 수 있습니다.')
			} else {
				const moviePk = payload.moviePk
				const username = getters.currentUser.username
				const m = payload.m
				axios({
					url: drf.movies.selectMovie(moviePk),
					method: 'post',
					header: getters.authHeader,
					params: {
						'username': username,
						'type': m,
					}
				})
					.then( () => {
						dispatch('fetchCurrentUser')
					}
					)
			}
		},
		getMovieBackDropImage({commit}, payload) {
			axios({
				url:`https://api.themoviedb.org/3/movie/${payload}/images`,
				params : {
					'api_key' : 'e6fcccc78c4a58a99e1758d30d821e54',
					method: 'get',
				}
			})
				.then(res => { commit('SET_BACK_DROP_IMAGE', res.data)})
		},
		clearRecommendMovies({ commit }) {
			commit('CLEAR_RECOMMEND_MOVIES')
		},

		addVote({ getters }, movieId) {
			axios({
				url: drf.movies.addVote(movieId),
				method: 'post',
				header: getters.authHeader
			})
		},
		setSharedPoster({ commit }, poster_path) {
			commit('SET_SHARED_POSTER', poster_path)
		},
		setSharedTitle({ commit }, title) {
			commit('SET_SHARED_TITLE', title)
		}
	}
}