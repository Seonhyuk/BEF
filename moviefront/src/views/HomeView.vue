<template>
  <div class="home">
    <h1>현재 상영 중</h1>
    <div class="movie-card">
      <SmallMovieVue
        v-for="(movie, index) in nowMovies" 
        :key="index"
        :movie="movie"
      />
    </div>
    <hr>
    <h1>1년 전 이맘 때쯤</h1>
    <div class="movie-card">
      <SmallMovieVue
        v-for="movie in lastMovies" 
        :key="movie.title"
        :movie="movie"
      />
    </div>
    <hr>
    
    <h1>유저들이 1위로 뽑은 영화</h1>
    <div class="movie-card">
      <SmallMovieVue
        v-for="movie in winMovies" 
        :key="movie.id"
        :movie="movie"
      />
    </div>


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
    ...mapActions(['setNowMovies', 'setLastMovies', 'setWinMovies'])
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

<style scoped>

.movie-card {
  display: flex;
}

</style>