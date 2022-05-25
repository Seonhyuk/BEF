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
		watchedMovies: state => state.currentUser.watched_movies,

	},

	mutations: {
		SET_TOKEN: (state, token) => state.token = token,
		SET_CURRENT_USER: (state, user) => state.currentUser = user,
		SET_PROFILE: (state, profile) => state.profile = profile,
		SET_AUTH_ERROR: (state, error) => state.authError = error,
		REMOVE_CURRENT_USER : state => state.currentUser = {},

		SET_IS_USED: (state, result) => state.isUsed = result,
		SET_REMOVE_USER: state => state.currentUser = {},
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
												method: 'post',
												headers: getters.authHeader,
												data: {
													'image': credentials.img,
												}
											})
												.then(() => {
													dispatch('fetchCurrentUser')
													router.push({ name: 'genres' })
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
							commit('SET_REMOVE_USER')
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

		followYou({ dispatch, getters }, yourname) {
			axios({
				url: drf.accounts.follow(getters.currentUser.username, yourname),
				method: 'post',
				header: getters.authHeader,
			})
				.then(() => {
					dispatch('fetchCurrentUser')
					dispatch('fetchProfile', yourname)
				})
		},
		changeProfileImage({ dispatch, getters }, img) {
			axios({
				url: drf.accounts.changeProfileImage(getters.currentUser.username),
				method: 'post',
				header: getters.authHeader,
				data : {
					'image': img
				}
			})
				.then(() => {
					dispatch('fetchCurrentUser')
					dispatch('fetchProfile', getters.currentUser.username)
				})
		},
		changeNickname({ getters, dispatch }, newNickname) {
			if (newNickname === getters.currentUser.name) {
				alert('현재 닉네임과 같습니다.')
			} else {
				axios({
					url: drf.accounts.nickname(newNickname),
					method: 'get',
				})
					.then(res => {
						if (res.data.data) {
							alert('이미 사용중인 닉네임입니다.')
						} else {
							axios({
								url: drf.accounts.newNickname(getters.currentUser.username, newNickname),
								method: 'post',
								header: getters.authHeader,
							})
								.then(() => {
									dispatch('fetchCurrentUser')
									router.push({name: 'profile', params: { username: getters.currentUser.username}})
								})
						}
					})
			}
		},
		changePassword({ getters, dispatch }, credentials) {
			axios({
				url: drf.accounts.changePassword(),
				method: 'post',
				headers: getters.authHeader,
				data: credentials,
			})
				.then(() => {
					dispatch('fetchCurrentUser')
					router.push({name: 'home'})
				})
				.catch(err => {
					console.log(err.response.data)
				})
		},
		deleteUser({ getters, dispatch }, username) {
			axios({
				url: drf.accounts.deleteUser(username),
				method: 'delete',
				headers: getters.authHeader
			})
				.then(() => {
					dispatch('fetchCurrentUser')
					alert('회원탈퇴가 완료되었습니다.')
				})
		},
		makeCard({ getters }, cardData) {
			axios({
				url: drf.accounts.makeCard(getters.currentUser.username),
				method: 'post',
				headers: getters.authHeader,
				data: cardData,
			})
				.then(() => {
					router.push({ name: 'profile', params: { username: getters.currentUser.username }})
				})
		}
	}
}