import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'
import swal from 'sweetalert'

import _ from 'lodash'



const API_KEY =  process.env.VUE_APP_MOVIE_API_KEY


export default {
  state: {
    articles: [],
    article: {},
    mostLikedUsers: [],
    movies : {},
  },

  getters: {
    articles: state => state.articles,
    article: state => state.article,
    isAuthor: (state, getters) => {
      return state.article.user?.username === getters.currentUser.username
    },
    isArticle: state => !_.isEmpty(state.article),
    mostLikedUsers: state => state.mostLikedUsers,
    dayMovies : state => state.movies
  },

  mutations: {
    SET_ARTICLES: (state, articles) => state.articles = articles,
    SET_ARTICLE: (state, article) => state.article = article,
    SET_ARTICLE_COMMENTS: (state, comments) => (state.article.comments = comments),
    SET_MOST_LIKED_USERS: (state, users) => state.mostLikedUsers = users,
    GET_MOVIE_DATA(state, res) {
      state.movies = res
    }
  },

  actions: {
    fetchArticles({ commit, getters }) {
      axios({
        url: drf.articles.articles(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_ARTICLES', res.data))
        .catch(err => console.error(err.response))
    },

    fetchArticle({ commit, getters }, articlePk) {
      axios({
        url: drf.articles.article(articlePk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_ARTICLE', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    createArticle({ commit, getters }, article) {
      if(article.shared_poster === '') {
        article.shared_poster = 'Nodata'
      }
      axios({
        url: drf.articles.articles(),
        method: 'post',
        data: article,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ARTICLE', res.data)
          router.push({
            name: 'article',
            params: { articlePk: getters.article.pk }
          })
        })
    },

    updateArticle({ commit, getters }, { pk, title, content}) {
      axios({
        url: drf.articles.article(pk),
        method: 'put',
        data: { title, content },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ARTICLE', res.data)
          router.push({
            name: 'article',
            params: { articlePk: getters.article.pk }
          })
        })
    },

    deleteArticle({ commit, getters }, articlePk) {  
      swal({
        text: '정말 삭제하시겠습니까?',
        icon: 'warning',
        buttons: ['아니오', '예']
      })
        .then(result => {
          if (result) {
            axios({
              url: drf.articles.article(articlePk),
              method: 'delete',
              headers: getters.authHeader,
            })
              .then(() => {
                commit('SET_ARTICLE', {})
                router.push({ name: 'articles' })
              })
              .catch(err => console.error(err.response))
          }
        })
    },

    likeArticle({ commit, getters }, articlePk) {
      axios({
        url: drf.articles.likeArticle(articlePk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_ARTICLE', res.data))
        .catch(err => console.error(err.response))
    },

		createComment({ commit, getters }, { articlePk, content }) {
      const comment = { content }

      axios({
        url: drf.articles.comments(articlePk),
        method: 'post',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ARTICLE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updateComment({ commit, getters }, { articlePk, commentPk, content }) {
      const comment = { content }

      axios({
        url: drf.articles.comment(articlePk, commentPk),
        method: 'put',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ARTICLE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteComment({ commit, getters }, { articlePk, commentPk }) {
      swal({
        text: '정말 삭제하시겠습니까?',
        icon: 'warning',
        buttons: ['아니오', '예']
      })
        .then(result => {
          if (result) {
            axios({
              url: drf.articles.comment(articlePk.id, commentPk),
              method: 'delete',
              data: {},
              headers: getters.authHeader,
            })
              .then(res => {
                commit('SET_ARTICLE_COMMENTS', res.data)
              })
              .catch(err => console.error(err.response))
          }
        })
    },
    setMostLikedUsers({ commit }) {
      axios({
        url: drf.accounts.mostLikedUsers(),
        method: 'get'
      })
        .then(res => {
          commit('SET_MOST_LIKED_USERS', res.data.result)
        })
    },
    getMoviedata({commit}) {
      axios({
        url: 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?',
        params: {
          key: API_KEY,
          targetDt : '20220525',
          itemPerPage : '5',
        }
      })
        .then(res => {
          commit('GET_MOVIE_DATA', res.data.boxOfficeResult.dailyBoxOfficeList)
        })
    }
  },
}
