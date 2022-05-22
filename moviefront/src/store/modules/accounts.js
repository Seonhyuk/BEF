import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export default {

  state: {
		token: localStorage.getItem('token') || '',
		currentUser: {},
		profile: {},
		authError: null,

		isUsed: false,
	},

	getters: {
		isLoggedIn: state => !!state.token,
		currentUser: state => state.currentUser,
		profile: state => state.profile,
		authError: state => state.authError,
		authHeader: state => ({ Authorization: `Token ${state.token}`}),

		isUsed: state => state.isUsed,

		dislikedMovies: state => state.currentUser.disliked_movies,
		wishedMovies: state => state.currentUser.wished_to_movies,

	},

	mutations: {
		SET_TOKEN: (state, token) => state.token = token,
		SET_CURRENT_USER: (state, user) => state.currentUser = user,
		SET_PROFILE: (state, profile) => state.profile = profile,
		SET_AUTH_ERROR: (state, error) => state.authError = error,
		REMOVE_CURRENT_USER : state => state.currentUser = {},

		SET_IS_USED: (state, result) => state.isUsed = result
	},

	actions: {
		saveToken({commit}, token) {
			commit('SET_TOKEN', token)
			localStorage.setItem('token', token)
		},

		// 굳이 있어야할까?
		removeToken({ commit }) {
			commit('SET_TOKEN', '')
			localStorage.setItem('token', '')
		},

		login({ commit, dispatch }, credentials) {
			axios({
				url: drf.accounts.login(),
				method: 'post',
				data: credentials
			})
				.then(res => {
					const token = res.data.key
					dispatch('saveToken', token)
					dispatch('fetchCurrentUser')
					router.push({ name: 'home' })
				})
				.catch(err => {
					alert('ID와 비밀번호를 확인하세요.')
					commit('SET_AUTH_ERROR', err.response.data)
				})
		},

		signup({ commit, dispatch, getters }, credentials) {
			const newForm = {
				username: credentials.username,
				password1: credentials.password1,
				password2: credentials.password2,
			}

			if (!credentials.nickname) {
				alert('닉네임을 입력해주세요!')
			}	else {

				axios({
					url: drf.accounts.nickname(credentials.nickname),
					method: 'get'
				})
					.then(res => {
						if (res.data.data) {
							alert('이미 사용중인 닉네임입니다.')
						} else {
		
							axios({
								url: drf.accounts.signup(),
								method: 'post',
								data: newForm,
							})
								.then(res => {
									const token = res.data.key
									dispatch('saveToken', token)
									axios({
										url: drf.accounts.currentUserInfo(),
										method: 'get',
										headers: getters.authHeader,
									})
										.then(res => {
											axios({
												url: drf.accounts.signupPlus(res.data.username, credentials.nickname),
												method: 'post'
											})
												.then(() => {
													dispatch('fetchCurrentUser')
													router.push({ name: 'home' })
												})
										})
								})
								.catch(err => {
									commit('SET_AUTH_ERROR', err.response.data)
									for (let error in getters.authError) {
										alert(getters.authError[error][0])
									}
								})
						}
					})
					
			}
		},

		logout({ getters, dispatch, commit }) {
			axios({
				url: drf.accounts.logout(),
				method: 'post',
				headers: getters.authHeader,
			})
				.then(() => {
					dispatch('removeToken')
					commit('REMOVE_CURRENT_USER')
					alert('로그아웃 되었습니다.')
					router.push({ name: 'home' })
				})
				.catch(err => {
					console.error(err.response)
				})
		},

		fetchCurrentUser({ commit, getters, dispatch }) {
			if (getters.isLoggedIn) {
				axios({
					url: drf.accounts.currentUserInfo(),
					method: 'get',
					headers: getters.authHeader,
				})
					.then(res => 
						axios({
							url: drf.accounts.profile(),
							method: 'get',
							header: getters.authHeader,
							params: {
								username : res.data.username
							}
						})
							.then(res => commit('SET_CURRENT_USER', res.data))
						)
					.catch(err => {
						if (err.response.status === 401) {
							dispatch('removeToken')
							router.push({ name: 'login' })
						}
					})
			}
		},

		fetchProfile({ commit, getters }, username) {
			axios({
				url: drf.accounts.profile(),
				method: 'get',
				header: getters.authHeader,
				params: {
					username : username,
				},
			})
				.then(res => {
					commit('SET_PROFILE', res.data)
				})
		},
	}
}