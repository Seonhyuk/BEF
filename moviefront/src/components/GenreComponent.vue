<template>
  <div class="inline-box">
    <div 
      v-if="isIn(genre.id)" 
      @click="likeGenre(genre)"
      class="genre-box"
      :style="{backgroundImage: `url(${imageUrl})`}"
    >
    <div class="d-flex selected-genre"><span class="m-auto text-tag">{{ genre.name }}</span></div>
    </div>

    <div 
      v-else 
      @click="likeGenre(genre)"
      class="genre-box"
      :style="{backgroundImage: `url(${imageUrl})`}"
    >
    <div class="genre-box2 d-flex"><span class="m-auto text-tag">{{ genre.name }}</span></div>
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
  data () {
    return {
      imageUrl: require(`@/assets/genres/${this.genre.id}.png`)
    }
  },
  computed: {
    ...mapGetters(['genres', 'currentUser']),
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

.inline-box {
  display: inline-block;
}

.inline-box:hover {
  cursor: pointer;
}

.genre-box {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: solid 2px white;
  background-size: 130px;
  background-color: rgba(50, 50, 50, 0.5);
  margin: 15px;
}

.genre-box2 {
  position:relative;
  top: 0px;
  left: 0px;
  width: 129px;
  height: 129px;
  border-radius: 50%;
  background-color: rgba(50, 50, 50, 0.5);
}

.genre-box2:hover {
  background-color: rgba(252, 217, 223, 0.5);
}

.text-tag {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.selected-genre {
  position:relative;
  top: 0px;
  left: 0px;
  width: 129px;
  height: 129px;
  border-radius: 50%;
  background-color: rgba(252, 217, 223, 0.5);
}
</style>