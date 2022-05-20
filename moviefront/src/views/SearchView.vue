<template>
  <div>
    <SmallMovieVue 
      v-for="movie in searchedMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import SmallMovieVue from '@/components/SmallMovie.vue'
import { mapGetters } from 'vuex'

export default {
    name: "SearchView",
    components: {
      SmallMovieVue
    },
    computed: {
        ...mapGetters(["searchedMovies"])
    },
}
</script>

<style>

</style>