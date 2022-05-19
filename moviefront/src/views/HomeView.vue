<template>
  <div class="home">
    <button @click="logout()">Logout</button>
    <SmallMovieVue
      v-for="(movie, index) in nowMovies" 
      :key="index"
      :movie="movie"
    />
    <hr>
    <SmallMovieVue
      v-for="movie in lastMovies" 
      :key="movie.title"
      :movie="movie"
    />
    <hr>
    <SmallMovieVue
      v-for="movie in winMovies" 
      :key="movie.id"
      :movie="movie"
    />


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SmallMovieVue from '@/components/SmallMovie.vue'

export default {
  name: 'HomeView',
  components: {
    SmallMovieVue
  },
  methods: {
    ...mapActions(['logout', 'setNowMovies', 'setLastMovies', 'setWinMovies'])
  },
  created() {
    this.setNowMovies()
    this.setLastMovies()
    this.setWinMovies()
  },
  computed: {
    ...mapGetters(['lastMovies','winMovies', 'nowMovies']),
  }
}
</script>