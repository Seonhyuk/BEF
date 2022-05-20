<template>
  <div>
    <div class="ratio ratio-16x9">
      <iframe 
        :src="`https://www.youtube.com/embed/${video}`" 
        frameborder="0"
      ></iframe>
      {{ movieDetail.title }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//
export default {
  name: 'MovieDetailView',
  computed: {
    ...mapGetters(['movieDetail', 'video'])
  },
  methods: {
    ...mapActions(['setMovieDetail', 'setVideo'])
  },
  created() {
    this.setMovieDetail(this.$route.params.moviePk)
    this.setVideo(this.movieDetail.title)
  }
}
</script>

<style>

</style>