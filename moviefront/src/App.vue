<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/nyear">Nyear</router-link> |
      <router-link :to="{ name: 'profile', params:{ username:`${currentUser.username}`} }">Profile</router-link> |
      <input type="text" v-model="query">
      <button @click="[setSearchedMovies(query), removeQuery()]">검색</button> |

      <router-link to="/login" v-if="!currentUser.username">Login</router-link> |
      <button @click="logout()" v-if="currentUser.username">Logout</button>
    </nav>
    <router-view/>
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
    ...mapActions(['setSearchedMovies', 'logout']),
    removeQuery () {
      this.query = ''
      router.push({name: 'search'})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
