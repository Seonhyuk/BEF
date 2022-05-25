<template>
  <div>
    <div class="wrapper">
      <div class="card-cols">
        <div class="card-col" ontouchstart="this.classList.toggle('hover');">
					<div class="card-container">
						<div class="front" v-if="posterPath" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/original/${ posterPath })`}"></div>
						<div class="front" v-else style="background-color: gray;"></div>

            <div class="back" v-if="backdropPath" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/original/${ backdropPath })`}">
              <div class="black">
                <div class="inner">
                  <p @click="goDetail()" class="text-size">{{ movie.title }}</p>
                  <p><img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1609287743/noticon/oyo23yrstcp0rbd4uiqp.png" alt="" style="width: 18px;" @click="goDetail()"> {{ movie.vote_average}}</p>
                  <br>
                  <hr>
                  <br>
                  
                  <div class="">
                    <p @click="onSelect(1)" v-if="isLiked" class="is-liked btn btn-sm">좋아요👍</p>
                    <p class="btn btn-sm button-color" @click="onSelect(1)" v-else>좋아요👍</p><br>

                    <p @click="onSelect(2)" v-if="isDisliked" class="is-disliked btn btn-sm">별로예요👎</p>
                    <p class="btn btn-sm button-color" @click="onSelect(2)" v-else>별로예요👎</p><br>

                    <p @click="onSelect(3)" v-if="isWatched" class="is-watched btn btn-sm">이미 봤어요😎</p>
                    <p class="btn btn-sm button-color" @click="onSelect(3)" v-else>이미 봤어요😎</p><br>
                  </div>
                  <br>
                  <hr>
                  <button class="btn btn-sm mt-4 button-color" @click="goDetail()">더보기</button>

                </div>
              </div>
            </div>

            <div class="back" v-else style="background-color: gray;">
              <div class="black">
                <div class="inner">
                  <p @click="goDetail()">{{ movie.title }}</p>
                  <p><img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1609287743/noticon/oyo23yrstcp0rbd4uiqp.png" alt="" style="width: 18px;" @click="goDetail()"> {{ movie.vote_average}}</p>
                  <br>
                  <hr>
                  <br>
                  
                  <div class="">
                    <p @click="onSelect(1)" v-if="isLiked" class="is-liked btn btn-sm">좋아요👍</p>
                    <p class="btn btn-sm button-color" @click="onSelect(1)" v-else>좋아요👍</p><br>

                    <p @click="onSelect(2)" v-if="isDisliked" class="is-disliked btn btn-sm">별로예요👎</p>
                    <p class="btn btn-sm button-color" @click="onSelect(2)" v-else>별로예요👎</p><br>

                    <p @click="onSelect(3)" v-if="isWatched" class="is-watched btn btn-sm">이미 봤어요😎</p>
                    <p class="btn btn-sm button-color" @click="onSelect(3)" v-else>이미 봤어요😎</p><br>
                  </div>

                  <button class="btn btn-sm mt-4 button-color" @click="goDetail()">더보기</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SmallMovie',
  props: {
    movie: Object,
  }, 
  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn', 'dislikedMovies', 'wishedMovies', 'watchedMovies', ]),
    isLiked () {
      if (this.isLoggedIn && this.wishedMovies?.length) {
        for (let m of this.wishedMovies) {
          if (m.id === this.movie.id) {
            return true
          }
        }
      }
      return false
    },
    isDisliked () {
      if (this.isLoggedIn && this.dislikedMovies?.length) {
        for (let m of this.dislikedMovies) {
          if (m.id === this.movie.id) {
            return true
          }
        }
      }
      return false
    },
    isWatched () {
      if (this.isLoggedIn && this.watchedMovies?.length) {
        for (let m of this.watchedMovies) {
          if (m.id === this.movie.id) {
            return true
          }
        }
      }
      return false
    },
    posterPath () {
      return this.movie?.poster_path
    },
    backdropPath () {
      return this.movie?.backdrop_path
    }
  },
  methods: {
    goDetail () {
      this.$router.push({ name: 'moviedetail', params: { moviePk: `${this.movie.id}` }})
    },

    ...mapActions(['selectMovie']),

    onSelect (n) {
      const payload = {
        moviePk: this.movie.id,
        username: this.currentUser.username,
        m: n,
      }

      this.selectMovie(payload)
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.wrapper{
	width: 90%;
	margin: 0 auto;
	max-width: 250px;
}

.card-cols{
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: wrap;
			flex-wrap: wrap;
  -webkit-box-pack: center;
			-ms-flex-pack: center;
					justify-content: center;
}

.card-col{
	width: 250px;
	margin: 1rem;
	padding: 5px;
	margin: 0px;
	cursor: pointer;
}

.card-container{
	-webkit-transform-style: preserve-3d;
					transform-style: preserve-3d;
	-webkit-perspective: 1000px;
					perspective: 1000px;
}

.front,
.back{
	background-size: cover;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
	border-radius: 10px;
	background-position: center;
	-webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	-o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
	text-align: center;
	min-height: 280px;
	height: auto;
	border-radius: 10px;
	color: #fff;
	font-size: 1;
}

.back > .black {
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.7);
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
}

.front:after{
	position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    opacity: .6;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    border-radius: 10px;
}
.card-container:hover .front,
.card-container:hover .back{
    -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.inner{
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
          transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 55%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 1rem 0rem 3rem 0rem;

  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
          perspective: inherit;
  z-index: 2;
}

.inner > p {
  width: 200px;
  margin: auto;
  word-break: break-all;
}

.text-size {
  font-size: 13px;
}

.card-container .back{
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
}

.card-container .front{
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
}

.card-container:hover .back{
  -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}

.card-container:hover .front{
  -webkit-transform: rotateY(-180deg);
          transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}


.front .inner p:after{
  content: '';
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #C6D4DF;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
	bottom: -.75rem;
}

.overflow {
	padding: 1rem 1rem 1rem 1rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-wrap:break-word; 
	line-height: 30px;
  height: 100px;
}

@media screen and (max-width: 64rem){
  .col{
    width: calc(33.333333% - 2rem);
  }
}

@media screen and (max-width: 48rem){
  .col{
    width: calc(50% - 2rem);
  }
}

@media screen and (max-width: 32rem){
	.col{
		width: 100%;
		margin: 0 0 2rem 0;
	}
}

.is-liked {
  color: #ec1266;
  font-size: 16px;
}

.is-disliked {
  color: skyblue;
  font-size: 16px;
}

.is-watched {
  color: slateblue;
  font-size: 16px;
}

.rating {
  display: inline-block;
  width: 100%;
  margin-top: 40px;
  padding-top: 40px;
  text-align: center;
}

.like,
.dislike {
  display: inline-block;
  cursor: pointer;
  margin: 10px;
}

.dislike:hover,
.like:hover {
  color: #2EBDD1;
  transition: all .2s ease-in-out;
  transform: scale(1.1);
}

.active {
  color: #2EBDD1;
}

.button-color {
  color: white;
  font-size: 16px;
}

</style>