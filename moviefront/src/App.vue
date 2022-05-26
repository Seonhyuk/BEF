<template>
  <div id="app">
    <nav class="d-flex justify-content-between py-3 sticky-top" style="height: 80px; background-color: rgba(20, 20, 20);">
      <!-- 로고 부분 -->
      <router-link to="/home">
        <a class="navbar-brand mx-3">
          <img src="@/assets/logo.png" alt="logo" width="100">
        </a>
      </router-link>

      <div class="list-inline d-flex ">
        <!-- 네비부분 -->
        <router-link to="/home" class="my-auto mx-2" id="router-link-name">Home</router-link>&nbsp;
        <router-link to="/login" v-if="!currentUser.username" class="my-auto mx-2" id="router-link-name">Login</router-link>
        <router-link to="/community" v-if="currentUser.username" class="my-auto mx-2" id="router-link-name">Community</router-link>&nbsp;
        <router-link to="/roundselect" v-if="currentUser.username" class="my-auto mx-2" id="router-link-name">Worldcup</router-link>&nbsp;

        <p class="nav-item dropdown my-auto mx-2" v-if="currentUser.username">
          <a class="nav-link dropdown-toggle text-white fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            MY
          </a>
          <ul class="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
            <li><router-link :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }" class="dropdown-item text-dark">프로필</router-link></li>
            <li><router-link :to="{ name: 'changepassword' }" class="dropdown-item text-dark">비밀번호변경</router-link></li>
            <li><a class="dropdown-item text-dark" href="#" @click="logout()">로그아웃</a></li>
          </ul>
        </p>

        <div class="mx-2 my-auto d-flex">
          <input type="text" v-model="query" class="search-bar text-white form-control my-auto mx-2">
          <button  @click="[setSearchedMovies(query), removeQuery()]" class="search-button my-auto search-button" id="create-article-btn"><img class="search-image" src="./assets/research.png" alt=""></button>
        </div>
      </div>

    </nav>
    
    <router-view class="slide-in"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['setSearchedMovies', 'logout', 'fetchCurrentUser', 'setNowMovies', 'setLastMovies', 'setWinMovies', 'setRecommendMovies',]),
    removeQuery () {
      this.query = ''
      
    }
  },
  created () {
    this.fetchCurrentUser()
  },
  mounted () {
    this.setNowMovies()
    this.setLastMovies()
    this.setWinMovies()
    if (this.currentUser.username) {
      this.setRecommendMovies(this.currentUser.username)
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin: 0px;
  padding: 0px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #F82F62
}

#logout-btn {
  background-color:transparent;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  font-weight: bold;
}

.search-bar {
  height: 30px;
}

.search-button {
  width: 50px;
  height: 35px;
}

#router-link-name {
  text-decoration: none;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  background-clip: padding-box;
  border: 1px solid rgb(49, 48, 48);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control:focus {
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  border-color: #ffffff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
#create-article-btn{
  z-index: 1000;
  background-color: #F82F62;
  color: white;
  display: inline-block;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 12px;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .create-article-btn {
    transition: none;
  }
}
#create-article-btn:hover {
  border: 1px solid white;
}

.search-button {
  width: 50px;
  height: 35px;
}

.search-image {
  width: 100%
}
</style>
