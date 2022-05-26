<template>
  <v-container id="main">
    <form @submit.prevent="onSubmit()">
      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">{{ currentUser.name }}님의 리뷰를 남겨주세요	&#128064;</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="exampleModalBody">
            <input type="text" id="content" v-model="newReview.content" class="form-control" placeholder="리뷰를 입력하세요.." @submit.prevent>             
            </div>
            <div class="modal-footer">
              <button data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" id="modal-submit-btn" type="button">다음</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel2">전반적인 영화는 어땠나요?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="exampleModalBody2">
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
            </div>
            <div class="modal-footer">
              <button id="comment-btn" data-bs-dismiss="modal">제출</button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- <div v-scroll:#main="handelScroll"> -->
      <div class="detail-wrap">
        <div id="back-drop-wrap">
          <div>
            <img :src="`https://image.tmdb.org/t/p/original/${ movieDetail.backdrop_path }`" alt=""  id="detail-poster1">
              <div id="div-inner">
                <h1>{{ movieDetail.title }}</h1> <br>
                <h4 id="avg-text" v-if="avg5">&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</h4>
                <h4 id="avg-text" v-if="avg4">&#x2B50;&#x2B50;&#x2B50;&#x2B50;</h4>
                <h4 id="avg-text" v-if="avg3">&#x2B50;&#x2B50;&#x2B50;</h4>
                <h4 id="avg-text" v-if="avg2">&#x2B50;&#x2B50;</h4>
                <h4 id="avg-text" v-if="avg1">&#x2B50;</h4>
                <h4 v-if="avghigh" id="avghigh">&#x2728;BEF가 뽑은 인생영화!&#x2728;</h4>
                <h6 id="avg-text">평점 {{ movieDetail.vote_average }} 점</h6>
                <div id="down-img1-wrap">
                  <img id="down-img1" src="@/assets/down.png" alt="" @click="move1">
                </div>
              </div>
          </div>

        </div>
    



        <div class="video-wrap" id="videoWrap">
          <iframe
            :src="`https://www.youtube.com/embed/${video}?autoplay=1&mute=0`" 
            frameborder="0"
            autoplay
          ></iframe>
          <div id="down-img2-wrap">
            <img id="down-img2" src="@/assets/down.png" alt="" @click="move2">
          </div>
        </div>

        <div id="back-drop-wrap2">
          <img :src="`https://image.tmdb.org/t/p/original/${setBackImg}`" alt=""  id="detail-poster2">
            <div id="review-wrap1">
              <a id="review-btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">리뷰남기기</a>
            </div>
            <div id="down-img3-wrap">
            <img id="down-img3" src="@/assets/down.png" alt="" @click="move3">
          </div>
        </div>


        <div id="review-list-wrap">
          <div id="review-wrap">
            <h2 class="mt-5 text-start mx-5 mb-5" id="review-h2">BEF들의 후기	&#128172; <br><p><span id="review-text-cnt"> 총 {{ reviews.length }}개의 리뷰가 있어요!</span></p></h2>
            <div id="review-overview">
              <div id="emo-wrap">
                <h3 class="pt-3" v-if="percentLike > 90 && percentLike <= 100">&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</h3>
                <h3 class="pt-3" v-if="percentLike > 70 && percentLike <= 90">&#x2B50;&#x2B50;&#x2B50;&#x2B50;</h3>
                <h3 class="pt-3" v-if="percentLike > 60 && percentLike <= 70">&#x2B50;&#x2B50;&#x2B50;</h3>
                <h3 class="pt-3" v-if="percentLike > 50 && percentLike <= 60">&#x2B50;&#x2B50;</h3>
                <h3 class="pt-3" v-if="percentLike <= 50 && percentLike > 0">&#x2B50;</h3>
                <h2 v-if="percentLike">{{ percentLike }}%</h2>
                
                <h3 class="pt-3" v-if="!percentLike">&#x2B50;</h3>
                <h2 v-if="!percentLike">0%</h2>
              </div>
            </div>
            <div class="text-start mx-5 mb-3" v-for="review in reviews" :key="review.id" :review="review" id="review-item">
              <img v-if="review.user.profile_image" :src="review.user.profile_image" alt="" class="profile-image" id="profile-image-true">
              <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" class="profile-image">
              <router-link id="comment-user" :to="{ name: 'profile', params: { username: review.user.username } }">
                {{ review.user.username }}
              </router-link><br>
              <span id="like-status" v-if="review.like">[좋아요😍]</span>
              <span id="like-status" v-if="!review.like">[별로예요😥]</span>
              <span id="review-content"> {{ review.content }}</span>
              <button v-if="review.user.id === currentUser.pk" @click="onClick(review.id)" class="delete-button">삭제</button>
              <hr>
            </div>
            <div v-if="noReviews" class="mt-5" id="no-reviews">
              <h2>아직 작성된 리뷰가 없어요...😅</h2>
              <p>첫번째 리뷰를 남겨보세요!</p>
              <div id="no-rivews-form">
                <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id="review-modal-btn2">리뷰남기기</a>
              </div>
            </div>
            
            <div id="up-img-wrap">
              <img id="up-img1" src="@/assets/upupup.png" alt="" @click="moveUp">
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert'

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
      return this.backDropImage.backdrops[this.num]?.file_path
    },
    avg5() {
      return this.movieDetail.vote_average >= 7 && this.movieDetail.vote_average <= 7.9
    },
    avg4() {
      return this.movieDetail.vote_average >= 6 && this.movieDetail.vote_average <= 6.9
    },
    avg3() {
      return this.movieDetail.vote_average >= 5 && this.movieDetail.vote_average <= 5.9
    },
    avg2() {
      return this.movieDetail.vote_average >= 4 && this.movieDetail.vote_average <= 4.9
    },
    avg1() {
      return this.movieDetail.vote_average >= 2 && this.movieDetail.vote_average <= 3.9
    },
    avghigh() {
      return this.movieDetail.vote_average >= 8.0
    },
    noReviews() {
      return !this.reviews.length
    },
    percentLike() {
      let likes = 0
      for(let i=0; i<this.reviews.length; i++) {
        if(this.reviews[i].like === true) {
          likes += 1
        }
      }
      return Math.round(likes/this.reviews.length * 100)
    },
  },
  methods: {
    ...mapActions(['setMovieDetail', 'setReviews', 'createReview', 'getMovieBackDropImage', 'deleteReview']),
    onSubmit() {
      const payload = {
        moviePk: this.$route.params.moviePk,
        username: this.currentUser.username,
        ...this.newReview,
      }
      this.createReview(payload)
      this.newReview.content = ''
    },
    onClick(pk) {
      swal({
        text: '삭제하시겠습니까?',
        icon: 'warning',
        buttons: ['아니오', '예']
      })
        .then(result => {
          if (result) {
            this.deleteReview(pk)
          }
        })
    },
    move1() {
      const videoLocation = document.querySelector('#videoWrap').offsetTop
      window.scrollTo({left:0, top:videoLocation+200, behavior:"smooth"})
    },
    move2() {
      const backDropLocation = document.querySelector('#detail-poster2').offsetTop
      window.scrollTo({left:0, top:backDropLocation+50, behavior:"smooth"})
    },
    move3() {
      const reviewLocation = document.querySelector('#review-h2').offsetTop
      window.scrollTo({left:0, top:reviewLocation, behavior:"smooth"})
    },
    moveUp() {
      window.scrollTo({left:0, top:0, behavior:"smooth"})
    }
  },
  created() {
    this.setMovieDetail(this.$route.params.moviePk)
    this.setReviews(this.$route.params.moviePk)
    this.getMovieBackDropImage(this.$route.params.moviePk)
  },
  mounted() {
    setInterval(() => {
      this.num = (this.num + 1) % this.backDropImage?.backdrops.length
    }, 5000);
  },
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100vh;
}


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
  color: #000000;
  background-color: rgb(255, 255, 255);
  background-clip: padding-box;
  border: 1px solid rgb(78, 167, 240);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 200px;
}
.form-control:focus {
  color: #030303;
  background-color: rgb(255, 255, 255);
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
  padding: 10px 15px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 17px;
}

.text_obj input[type="radio"]:checked + span {
  background-color: #F82F62;
  border: 1px solid #F82F62;
  color: #ffffff;
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
  position: relative;
}

#detail-poster2 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}

#movie-title-img {
  position: absolute;
  top: 250px;
  left: 690px;
  color: #dbdada;
  font-family: sans-serif;
}
#avghigh {
  color: #ffffff;
}
.video-wrap {
  position: relative;
  padding-bottom: 56.25%;
  height: 0px;
  overflow: hidden;
}
.video-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#movie-still-img {
  position: absolute;
  top: 77.5%;
  left: 45%;
  color: #d3d3d3;
  font-family: sans-serif;
}

#go-comment-page-btn{
  z-index: 1000;
  margin: 5px;
  background-color: #F82F62;
  color: white;
  display: inline-block;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 1.5rem 3.0rem;
  font-size: 1.3rem;
  border-radius: 2rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .go-comment-page-btn {
    transition: none;
  }
}
#go-comment-page-btn:hover {
  border: 1px solid white;
}
#staticBackdrop {
  position: absolute;
  top: 80%;
  left: 45%;
}
#exampleModalToggleLabel {
  color: black;
}
#exampleModalBody {
  color: black
}
#exampleModalToggleLabel2 {
  color: black;
}
#exampleModalBody2 {
  color: black
}
#modal-submit-btn{
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
  .modal-submit-btn {
    transition: none;
  }
}
#modal-submit-btn:hover {
  border: 1px solid white;
}
#review-modal-btn{
  position: relative;
  bottom: 600px;
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
  padding: 1.3rem 4.5rem;
  font-size: 1rem;
  border-radius: 0.8rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .review-modal-btn {
    transition: none;
  }
}
#review-modal-btn:hover {
  border: 1px solid white;
}
#avg-text {
  color: rgb(179, 180, 180);
}
#movie-img-text {
  position: absolute;
  top: 500px;
}
#div-outer {

}
#div-inner {
  position: absolute;
  top: 10%;
  left: 50%;
  margin:0 auto;
  transform: translate(-50%, -50%);

}

#review-wrap {
  width: 80%;
  height: 830px;
  display: inline-block;
}
.profile-image {
  width: 25px;
  height: 25px;
  overflow: hidden;
  object-fit: cover;
  float: left;
}
#review-item {
  margin-top: 0;
}
#review-item img {
  position: relative;
}

#comment-user {
  text-decoration: none;
  color: #d3d3d3;
  margin: 2px;
}

#profile-image-true {
  border-radius: 50%;
}
#no-reviews {
  width: 200x;
  height: 300px;
  text-align: right;
  display:table-cell;
  vertical-align:middle;
  display: inline-block;
}
#no-reviews p{
  text-align: center;
}

#review-modal-btn2{
  display: flex;
  justify-content: center;
  align-items : center;
  z-index: 1000;
  justify-items: center;
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
  padding: 1.3rem 4.5rem;
  font-size: 1rem;
  border-radius: 0.8rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .review-modal-btn2 {
    transition: none;
  }
}
#review-modal-btn2:hover {
  border: 1px solid white;
}
#no-rivews-form {
  text-align: center;
}
#youtube-p-text {
  position: absolute;
  z-index: 1000;
}
#down-img1-wrap {
  z-index: 1px;
  position: absolute;
  top: 280%;
  width: 100%;
}
#down-img1 {
  z-index: 1000;
  width: 40px;
  height: 40px;
}
#down-img2-wrap {
  position: relative;
  z-index: 1000;
  height: 50px;
  margin-top: 50%;
}
#down-img2 {
  width: 40px;
  height: 40px;
  top: 980px;
  left: 920px;
  z-index: 2000;
}
#down-img3 {
  width: 40px;
  height: 40px;
  bottom: 1100px;
  left: 49%;
  position: absolute;
}
#up-img-wrap {
  height: 100px;
}
#up-img1 {
  width: 40px;
  height: 40px;
  left: 920px;
  bottom: 10px;
}

#like-status {
  color: rgb(179, 180, 180);
}
#emo-wrap {
  width: 200px;
  height: 100px;
  margin-top: 20px;
  position: absolute;
  right: 15%;
  bottom: 710px;
}
#emo {
  width: 70px;
  height: 70px;
}
#review-text-cnt {
  font-size: 20px;
}

.delete-button {
  background-color: gray;
  color: white;
  border: 0px;
  margin-left: 30px;
  border-radius: 10px;
}

.delete-button:hover {
  box-shadow: -1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF
}

#detail-poster1 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}

#review-wrap1 {
  z-index: 1px;
  position: absolute;
  top: 63%;
  width: 100%;
}

#review-btn{
  z-index: 1000;
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
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  #review-btn {
    transition: none;
  }
}
#review-btn:hover {
  border: 1px solid white;
}
#down-img3-wrap {
  z-index: 1px;
  position: absolute;
  top: 104%;
  width: 100%;
}
</style>