<template>
  <div>
    <SmallMovieVue
      v-for="movie in nyearMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SmallMovieVue from '@/components/SmallMovie.vue'

export default {
  name: "NyearView",
  components: {
    SmallMovieVue
  },
  computed: {
    ...mapGetters(['nyearMovies'])
  },
  methods: {
    ...mapActions(['setNyearMovies'])
  },
  created () {
    this.setNyearMovies(2022)
  }
}
</script>

<style>

</style>