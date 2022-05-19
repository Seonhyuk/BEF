<template>
  <div class="home">
    <button @click="logout()">Logout</button>
    <p v-for="movie in nowMovies" :key="movie.id">{{ movie.title }}</p>
    <p v-for="movie in lastMovies" :key="movie.id">{{ movie.title }}</p>
    <p v-for="movie in winMovies" :key="movie.id">{{ movie.title }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  methods: {
    ...mapActions(['logout', 'setNowMovies', 'setLastMovies', 'setWinMovies'])
  },
  created() {
    this.setNowMovies()
    this.setLastMovies()
    this.setWinMovies()
  },
  computed: {
    ...mapGetters(['nowMovies', 'lastMovies','winMovies'])
  }
}
</script>
