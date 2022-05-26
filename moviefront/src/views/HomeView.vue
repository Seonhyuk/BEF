<template>
  <div>
    <div class="home">
      <div id="carouselExampleIndicators" class="carousel slide carousel-fade container" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="@/assets/24z.jpg" class="d-block w-100" alt="..." id="banner-img" @click="go614409">
          </div>
          <div class="carousel-item">
            <img src="@/assets/27z.jpg" class="d-block w-100" alt="..." id="banner-img" @click="go619803">
          </div>
          <div class="carousel-item">
            <a href="https://www.youtube.com/watch?v=mrr6sTpv8z0">
            <img src="@/assets/28z.jpg" class="d-block w-100" alt="..." id="banner-img"></a>
          </div>
          <div class="carousel-item">
            <img src="@/assets/33.jpg" class="d-block w-100" alt="..." id="banner-img" @click="go372058">
          </div>
          <div class="carousel-item">
            <img src="@/assets/30zz.jpg" class="d-block w-100" alt="..." id="banner-img" @click="go670">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
      <h1 class="playing-title ms-4 mt-5 px-4 mb-4">상영중인 영화 🎥</h1>
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

      <div class="button-box">
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

      <h1 class="playing-title ms-4 px-4 mb-4">{{ theMonth + 1 }}월엔 이 영화 🎬</h1>
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

      <h1 class="playing-title ms-4 px-4 mb-4">B.E.F들의 PICK!</h1>
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
        <h1 class="playing-title ms-4 px-4 mb-4">{{ currentUser.name }}님을 위한 추천작 🌹</h1>
        <div class="row movie-boxes">
          <SmallMovieVue 
            class="col-6 col-lg-2 py-2" 
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
    ...mapActions(['setNowMovies', 'setLastMovies', 'setWinMovies', 'setRecommendMovies', 'fetchCurrentUser', 'clearRecommendMovies',]),
    go614409() {
      this.$router.push({ name: 'moviedetail', params: { moviePk: 614409 }})
    },
    go619803() {
      this.$router.push({ name: 'moviedetail', params: { moviePk: 619803 }})
    },
    go670() {
      this.$router.push({ name: 'moviedetail', params: { moviePk: 670 }})
    },
    go372058() {
      this.$router.push({ name: 'moviedetail', params: { moviePk: 372058 }})
    }
  },
  created() {
    this.setNowMovies()
    this.setLastMovies()
    this.setWinMovies()
    if (this.currentUser.username) {
      this.clearRecommendMovies()
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

.movie-boxes {
  width: 100%;
  margin: auto;
}

.home {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0;
}

.movies {
  width: 95%;
  overflow-x: auto;
  white-space: nowrap;
  margin: auto !important;
}

.movies::-webkit-scrollbar{
  width: 3px;
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
  padding-bottom: 0;
  margin-bottom: 0;
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

.button-box {
  height: auto;
}

.go-button {
  width: 250px;
  min-width: 250px;
  height: 40px;
  background-color: rgba(50, 50, 50, 0.5);
  display: inline-block;
  border-radius: 30px;
  margin: 5px 10px;
  font-weight: bold;
}

.logo-img {
  width: 40px;
}
.logo-img2 {
  width: 40px;
  padding: 4px;
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
#banner-wrap{
  height: 670px;
}
#banner-img {
  cursor: pointer;
}
</style>