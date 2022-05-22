<template>
  <div class="home mt-4">

    <h1 class="playing-title">상영중인영화</h1>
      <div class="movies">
        <ul>
          <SmallMovieVue
            v-for="(movie, index) in nowMovies" 
            :key="index"
            :movie="movie"
            class="element"
          />
        </ul>
      </div>

    <hr>

    <h1 class="playing-title">작년상영</h1>
    <div class="movies">
      <ul>
        <SmallMovieVue
          v-for="movie in lastMovies" 
          :key="movie.title"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>
    <hr>

    <h1 class="playing-title">B.E.F들의 PICK!</h1>
    <div class="movies">
      <ul>
        <SmallMovieVue
          v-for="movie in winMovies" 
          :key="movie.poster_path"
          :movie="movie"
          class="element"
        />
      </ul>
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

.movies {
  width: 80vw;
  overflow-x: auto;
  white-space: nowrap;
  margin: 10 auto;
}


.movies > ul > .element {
  display: inline-block;
}

.movie-card {
  display: flex;
}


.playing-title {
  text-align: start;
  padding: 18px;
  color: white;
  font-size: 30px;
}



</style>