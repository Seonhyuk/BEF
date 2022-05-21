<template>
  <div id="app">
    <nav class="d-flex justify-content-between py-3 sticky-top" style="height: 80px; background-color: rgba(20, 20, 20);">
      <!-- 로고 부분 -->
      <router-link to="/">
        <a class="navbar-brand mx-3">
          <img src="@/assets/logo.png" alt="logo" width="100">
        </a>
      </router-link>

      <div class="list-inline d-flex ">
        <!-- 네비부분 -->
        <router-link to="/" class="my-auto mx-2">Home</router-link>&nbsp;
        <router-link to="/login" v-if="!currentUser.username" class="my-auto mx-2">Login</router-link>
        <router-link to="/nyear" v-if="currentUser.username" class="my-auto mx-2">Nyear</router-link>&nbsp;
        <router-link to="/community" v-if="currentUser.username" class="my-auto mx-2">Community</router-link>&nbsp;
        <router-link to="/roundselect" v-if="currentUser.username" class="my-auto mx-2">Worldcup</router-link>&nbsp;

        <div class="my-auto mx-2">
          <button id="logout-btn" @click="logout()" v-if="currentUser.username" >Logout</button>
        </div>

        <!-- <router-link 
          :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }"
          v-if="currentUser.username"
          class="my-auto mx-2"
        >Profile</router-link> -->

        <!-- 위치조정... -->
        <!-- 얘네가 아래로 내려간다 -->
        <p class="nav-item dropdown my-auto mx-2" v-if="currentUser.username">
          <a class="nav-link dropdown-toggle text-white fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            MY
          </a>
          <ul class="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
            <li><router-link :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }" v-if="currentUser.username" class="dropdown-item text-dark">프로필</router-link></li>
            <li><a class="dropdown-item" href="#">회원정보수정</a></li>
            <li><a class="dropdown-item" href="#">회원탈퇴</a></li>
          </ul>
        </p>

        <div class="mx-2 my-auto">
          <input type="text" v-model="query" class="search-bar text-black">
          <button  @click="[setSearchedMovies(query), removeQuery()]" class="search-button my-auto">검색</button>
        </div>
      </div>

    </nav>
    
    <router-view class="container"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from './router'

export default {
  name: "NyearView",
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['setSearchedMovies', 'logout', 'fetchCurrentUser']),
    removeQuery () {
      this.query = ''
      router.push({name: 'search'})
    }
  },
  created () {
    this.fetchCurrentUser()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #ec1266;
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

</style>
