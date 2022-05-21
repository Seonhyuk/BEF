<template>
  <div id="app d-flex">
    <nav class="container-fluid">
      <router-link to="/">
        <a class="navbar-brand">
        <!-- 로고는 일단 보려고 넣어놨습니당  -->
        <img src="@/assets/logo.png" alt="logo" width="214" height="108.75" class="justify-content-start">
        </a>
      </router-link>
      <router-link to="/">Home</router-link>&nbsp;
      <router-link to="/login" v-if="!currentUser.username">Login</router-link>

      <router-link to="/nyear" v-if="currentUser.username">Nyear</router-link>&nbsp;


      <router-link to="/community" v-if="currentUser.username">Community</router-link>&nbsp;
      <router-link to="/roundselect" v-if="currentUser.username">Worldcup</router-link>&nbsp;

      <button id="logout-btn" @click="logout()" v-if="currentUser.username">Logout</button>

      <!-- <router-link 
        :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }"
        v-if="currentUser.username"
      >Profile</router-link> -->

      <!-- 위치조정... -->
      <span class="nav-item dropdown d-flex" v-if="currentUser.username">
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          MY
        </a>
          <ul class="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
            <li><router-link :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }" v-if="currentUser.username" class="dropdown-item text-dark">프로필</router-link></li>
            <li><a class="dropdown-item" href="#">회원정보수정</a></li>
            <li><a class="dropdown-item" href="#">회원탈퇴</a></li>
          </ul>
      </span>


      <input type="text" v-model="query">
      <button  @click="[setSearchedMovies(query), removeQuery()]">검색</button>

    <router-view/>
    </nav>
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

</style>
