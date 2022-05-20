<template>
  <div>
    <div class="ratio ratio-16x9 video-box">
      <iframe 
        :src="`https://www.youtube.com/embed/${video}`" 
        frameborder="0"
      ></iframe>
    </div>
    {{ movieDetail.title }}
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
    ...mapActions(['setMovieDetail'])
  },
  created() {
    this.setMovieDetail(this.$route.params.moviePk)
  }
}
</script>

<style>
.video-box {
  max-width: 800px;
}
</style>