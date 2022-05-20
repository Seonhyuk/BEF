import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export default {

  state: {
		token: localStorage.getItem('token') || '',
		currentUser: {},
		profile: {},
		authError: null,
	},

	getters: {
		isLoggedIn: state => !!state.token,
		currentUser: state => state.currentUser,
		profile: state => state.profile,
		authError: state => state.authError,
		authHeader: state => ({ Authorization: `Token ${state.token}`})
	},

	mutations: {
		SET_TOKEN: (state, token) => state.token = token,
		SET_CURRENT_USER: (state, user) => state.currentUser = user,
		SET_PROFILE: (state, profile) => state.profile = profile,
		SET_AUTH_ERROR: (state, error) => state.authError = error
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
					console.error(err.response.data)
					commit('SET_AUTH_ERROR', err.response.data)
				})
		},
		signup({ commit, dispatch }, credentials) {
			console.log(credentials)
			axios({
				url: drf.accounts.signup(),
				method: 'post',
				data: credentials
			})
				.then(res => {
					const token = res.data.key
					dispatch('saveToken', token)
					dispatch('fetchCurrentUser')
					// router 경로 장르 선택 창으로 수정해야됨
					router.push({ name: 'home' })
				})
				.catch(err => {
					console.error(err)
					commit('SET_AUTH_ERROR', err.response.data)
				})
		},
		logout({ getters, dispatch }) {
			axios({
				url: drf.accounts.logout(),
				method: 'post',
				headers: getters.authHeader,
			})
				.then(() => {
					dispatch('removeToken')
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
					.then(res => commit('SET_CURRENT_USER', res.data))
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