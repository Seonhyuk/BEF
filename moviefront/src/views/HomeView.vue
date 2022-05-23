<template>
  <div class="home container p-0">

    <div v-if="nowMovies.length" id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" v-for="idx in [0, 1, 2, 3, 4]" :key="idx">
          <img :src="`https://image.tmdb.org/t/p/original/${nowMovies[idx].backdrop_path}`" class="d-block w-100 border-color" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>


    <h1 class="playing-title mt-4">상영중 영화 🎥</h1>
    <div class="movies">
      <ul>
        <SmallMovieVue
          v-for="(movie, index) in nowMovies" 
          :key="index"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>

    <div class="button-box d-flex justify-content-center">
      <div class="go-button">      
        <a href="https://www.cgv.co.kr/" class="movie-page">
          <img class="logo-img" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1606805205/noticon/tvxwnc0q46bsfbpzokzx.png" alt=""> CGV 바로가기
        </a>
      </div>
      <div class="go-button">      
        <a href="https://www.lottecinema.co.kr/NLCHS" class="movie-page">
          <img class="logo-img2" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1628833346/noticon/icooufnsm31pwr1fc7ei.png" alt=""> 롯데시네마 바로가기
        </a>
      </div>
      <div class="go-button">      
        <a href="https://www.megabox.co.kr/" class="movie-page">
          <img class="logo-img" src="../assets/megabox.png" alt=""> 메가박스 바로가기
        </a>
      </div>
    </div>


    <hr>

    <h1 class="playing-title">{{ theMonth + 1 }}월엔 이 영화 🎬</h1>
    <div class="movies">
      <ul>
        <SmallMovieVue
          v-for="movie in lastMovies" 
          :key="movie.title"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>
    <hr>

    <h1 class="playing-title">B.E.F들의 PICK!</h1>
    <div class="movies">
      <ul>
        <SmallMovieVue
          v-for="movie in winMovies" 
          :key="movie.poster_path"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>

    <div v-if="isLoggedIn">
      <hr>
      <h1 class="playing-title">{{ currentUser.name }}님을 위한 추천 영화 🌹</h1>
      <div class="row">
        <SmallMovieVue 
          class="col-6 col-lg-3" 
          v-for="movie in recommendMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <button 
        @click="setRecommendMovies(currentUser.username)"
        class="add-button"
      >더 보기</button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SmallMovieVue from '@/components/SmallMovie.vue'


export default {
  name: 'HomeView',
  components: {
    SmallMovieVue
  },
  data () {
    return {
      scrollPosition: 0
    }
  },
  methods: {
    ...mapActions(['setNowMovies', 'setLastMovies', 'setWinMovies', 'setRecommendMovies', 'fetchCurrentUser',]),
  },
  created() {
    this.setNowMovies()
    this.setLastMovies()
    this.setWinMovies()
    if (this.currentUser.username) {
      this.setRecommendMovies(this.currentUser.username)
    }
  },
  computed: {
    ...mapGetters(['lastMovies','winMovies', 'nowMovies', 'recommendMovies', 'isLoggedIn', 'currentUser',]),
    theMonth() {
      const today = new Date()
      return today.getMonth()
    },
  },
}
</script>

<style scoped>

.home {
  max-width: 1000px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5)
}

.movies {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  margin: 10 auto;
}

.movies > ul {
  padding: 0;
}

hr {
  width: 90%;
  margin: 30px auto;
}

.movies > ul > .element {
  display: inline-block;
}

.movie-card {
  display: flex;
}


.playing-title {
  text-align: start;
  padding: 18px;
  color: white;
  font-size: 30px;
}

.border-color {
  border: solid 0.5px gray;
}

.movie-page {
  text-decoration: none;
  color: white;
  margin: auto;
}

.go-button {
  width: 250px;
  height: 40px;
  background-color: rgba(50, 50, 50, 0.5);
  display: flex;
  border-radius: 30px;
  margin: 0px 10px;
  font-weight: bold;
}

.logo-img {
  width: 40px;
}
.logo-img2 {
  width: 30px;
}

.add-button {
  width: 250px;
  height: 40px;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 30px;
  margin: 20px 10px;
  font-weight: bold;
  color: white;
}
</style>