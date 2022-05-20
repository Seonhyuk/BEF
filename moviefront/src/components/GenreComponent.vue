<template>
  <div>
    <div @click="likeGenre(genre)">
      <p v-if="isIn(genre.id)" class="like">{{ genre.name }}</p>
      <p v-else>{{ genre.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GenreComponent',
  props: {
    genre: Object
  },
  computed: {
    ...mapGetters(['genres', 'currentUser'])
  },
  methods: {
    ...mapActions(['likeGenre']),
    isIn (g) {
      for (let ge of this.currentUser.liked_genre) {
        if (g === ge.id) {
          return true
        }
      }
      return false
    }
  },
}
</script>

<style scoped>
.like {
  text-decoration: line-through;
}

</style>