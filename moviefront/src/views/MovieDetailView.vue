<template>
  <div>
    <div class="ratio ratio-16x9 video-box">
      <iframe 
        :src="`https://www.youtube.com/embed/${video}`" 
        frameborder="0"
      ></iframe>
    </div>
    {{ movieDetail.title }}
    <hr>
    <p v-for="review in reviews" :key="review.id">{{ review.content }}</p>
    <hr>
    <form @submit.prevent="onSubmit()">
      <label for="like">
        <input 
          type="radio" 
          name="like" 
          id="like" 
          :value="true"
          v-model="newReview.like"
        >좋았어요!
      </label>
      <label for="dislike">
        <input 
          type="radio" 
          name="like" 
          id="dislike" 
          :value="false"
          v-model="newReview.like"
        >별로에요!
      </label><br>

      <label for="content">리뷰: </label>
      <input type="text" id="content" v-model="newReview.content">

      <button>제출</button>

    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//
export default {
  name: 'MovieDetailView',
  data () {
    return {
      newReview: {
        content: "",
        like: true,
      }
    }
  },
  computed: {
    ...mapGetters(['movieDetail', 'video', 'reviews', 'currentUser'])
  },
  methods: {
    ...mapActions(['setMovieDetail', 'setReviews', 'createReview']),
    onSubmit() {
      console.log(this.currentUser.username)
      const payload = {
        moviePk: this.$route.params.moviePk,
        username: this.currentUser.username,
        ...this.newReview,
      }
      this.createReview(payload)
    }
  },
  created() {
    this.setMovieDetail(this.$route.params.moviePk)
    this.setReviews(this.$route.params.moviePk)
  }
}
</script>

<style>
.video-box {
  max-width: 800px;
}
</style>