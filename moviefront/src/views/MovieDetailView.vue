<template>
  <div class="detail-wrap">
    <div id="back-drop-wrap">
      <div>
        <img :src="`https://image.tmdb.org/t/p/original/${setBackImg}`" alt=""  id="detail-poster">
      </div>

    </div>
    <hr>
    <p v-for="review in reviews" :key="review.id">{{ review.content }}</p> 
 



    <!-- <div>
      <iframe id="movie-youtube"
        :src="`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`" 
        frameborder="0"
        autoplay
      ></iframe>
    </div> -->


    
    <form @submit.prevent="onSubmit()">
        <h4>{{ currentUser.username }}님 영화는 어떠셨나요?</h4>
        <label for="radio1" class="text_obj">
          <input 
            type="radio" 
            name="like" 
            id="radio1"
            :value="true"
            v-model="newReview.like"
          ><span>좋았어요😍</span>
        </label> vs 
 
        <label for="radio2" class="text_obj">
          <input 
            type="radio" 
            name="like" 
            id="radio2" 
            :value="false"
            v-model="newReview.like"
          ><span>별로에요😥</span>
        </label>


      <input type="text" id="content" v-model="newReview.content" class="form-control" placeholder="리뷰를 입력하세요..">

      <button id="comment-btn">등록</button>

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
      },
      num: 0,
    }
  },
  computed: {
    ...mapGetters(['movieDetail', 'video', 'reviews', 'currentUser', 'backDropImage']),
    setBackImg() {
      console.log(this.backDropImage.backdrops[this.num]?.file_path)
      return this.backDropImage.backdrops[this.num]?.file_path
    }
  },
  methods: {
    ...mapActions(['setMovieDetail', 'setReviews', 'createReview', 'getMovieBackDropImage']),
    onSubmit() {
      console.log(this.currentUser.username)
      const payload = {
        moviePk: this.$route.params.moviePk,
        username: this.currentUser.username,
        ...this.newReview,
      }
      this.createReview(payload)
      this.newReview.content = ''
    },
  },
  created() {
    this.setMovieDetail(this.$route.params.moviePk)
    this.setReviews(this.$route.params.moviePk)
    this.getMovieBackDropImage(this.$route.params.moviePk)
  },
  mounted() {
    setInterval(() => {
      this.num = (this.num + 1) % this.backDropImage?.backdrops.length
    }, 1000);
  }
}
</script>

<style scoped>
.video-box {
  max-width: 800px;
}
.form-control {
  display: inline;
  width: 80%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  background-clip: padding-box;
  border: 1px solid rgb(49, 48, 48);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control:focus {
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  border-color: #ffffff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
#comment-btn{
  z-index: 1000;
  margin: 5px;
  background-color: #F82F62;
  color: white;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .comment-btn {
    transition: none;
  }
}
#comment-btn:hover {
  border: 1px solid white;
}

.text_obj input[type="radio"] {
  display: none;
}


.text_obj input[type="radio"] + span {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 17px;
}

.text_obj input[type="radio"]:checked + span {
  background-color: #F82F62;
  border: 1px solid #F82F62;
}


.jb-box {
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin: 0px auto;
  position: relative;
}

#movie-youtube {
  width: 100%;
  height: 400px;
}

.detail-wrap {
  margin: 0px;
  padding: 0px;
  width: 100%;
  max-width: 2000px;
}
#detail-poster {
  width: 100%;
  height: 600px;
  filter: brightness(20%)
}
</style>