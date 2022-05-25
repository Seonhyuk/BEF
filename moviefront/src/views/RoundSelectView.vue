<template>
  <div class="container home mt-0">
    <div>
      <h1 class="pt-5">총 라운드를 선택하세요.</h1>
    </div>

    <div class="mt-5 pt-5">
      <ul class="flip-cards">
        <li>
          <div class="large button card-front d-flex justify-content-center">
            <a href="#" class="m-auto">32강</a>
          </div>

          <div class="panel card-back d-flex justify-content-center">
            <a href="#" class="m-auto" @click="onSelect(5)">Go!</a>
          </div>
        </li>

        <li>
          <div class="large button card-front d-flex justify-content-center">
            <a href="#" class="m-auto">64강</a>
          </div>

          <div class="panel card-back d-flex justify-content-center">
            <a href="#" class="m-auto" @click="onSelect(6)">Go!</a>
          </div>
        </li>

        <li>
          <div class="large button card-front d-flex justify-content-center">
            <a href="#" class="m-auto">128강</a>
          </div>

          <div class="panel card-back d-flex justify-content-center">
            <a href="#" class="m-auto" @click="onSelect(7)">Go!</a>
          </div>
        </li>

        <li>
          <div class="large button card-front d-flex justify-content-center">
            <a href="#" class="m-auto">256강</a>
          </div>

          <div class="panel card-back d-flex justify-content-center">
            <a href="#" class="m-auto" @click="onSelect(8)">Go!</a>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RoundSelect',
  computed: {
    ...mapGetters(['exponent'])
  },
  methods:{
    ...mapActions(['setExponent', 'getMatchUp', 'getWorldCup']),
    onSelect(exponent) {
      this.setExponent(exponent)
      this.getMatchUp(exponent)
      this.getWorldCup(exponent)
      this.$router.push({name: 'worldcup'})
    }
  }
}
</script>

<style scoped>

.home {
  max-width: 1000px;
  width: 80%;
  height: 1500px;
  background-color: rgba(0, 0, 0, 0.5)
}

a:hover {
  text-decoration: underline;
}

.button.large {
  margin: 0;
  padding: auto;
  
}

.button.large a {
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-size: 30px;
  font-weight: bold;
  margin-top: auto;
}

.flip-cards {
  display: block;
  width: 80%;
  height: 100%;
  margin: auto;
}

.flip-cards li {
  float: left;
  width: 50%;
  height: 200px;
  position: relative;
  padding: 0;
  list-style: none;
  
}

.flip-cards li:hover .card-front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform: perspective(1000) rotateY(180deg);
  -moz-transform: perspective(1000) rotateY(180deg);
  -ms-transform: perspective(1000) rotateY(180deg);
  -o-transform: perspective(1000) rotateY(180deg);
  transform: perspective(1000) rotateY(180deg);
}

.flip-cards li:hover .card-back {
  z-index: 950;
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform: perspective(1000) rotateY(0deg);
  -moz-transform: perspective(1000) rotateY(0deg);
  -ms-transform: perspective(1000) rotateY(0deg);
  -o-transform: perspective(1000) rotateY(0deg);
  transform: perspective(1000) rotateY(0deg);
}

.flip-cards .card-front,
.flip-cards .card-back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: -webkit-transform 0.6s;
  -moz-transition: -moz-transform 0.6s;
  -o-transition: -o-transform 0.6s;
  transition: transform 0.6s;
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
}

.flip-cards .card-front {
  -webkit-transform: perspective(1000) rotateY(0);
  -moz-transform: perspective(1000) rotateY(0);
  -ms-transform: perspective(1000) rotateY(0);
  -o-transform: perspective(1000) rotateY(0);
  transform: perspective(1000) rotateY(0);
  z-index: 900;
}

.flip-cards .card-back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  z-index: 800;
}

.flip-cards .panel {
  border: none;
}

.flip-cards .panel p,
.flip-cards .panel a {
  font-size: 100px;
  color: white;
}

.flip-cards li:first-child > .button {
  background-image: url(https://movie-phinf.pstatic.net/20220404_148/1649048410501XacUw_JPEG/movie_image.jpg?type=m427_320_2);
  background-size: cover;
}
.flip-cards li:first-child > .panel {
  background-color: rgba(40, 57, 77, 1);
}

.flip-cards li:nth-child(2) > .button {
  background-image: url(https://movie-phinf.pstatic.net/20171130_105/1512005787670e7N09_JPEG/movie_image.jpg?type=m427_320_2);
  background-size: cover;
}
.flip-cards li:nth-child(2) > .panel {
  background-color: rgba(109, 193, 202, 1);
}

.flip-cards li:nth-child(3) > .button {
  background-image: url(https://movie-phinf.pstatic.net/20140715_23/1405387607296Q9zbQ_JPEG/movie_image.jpg?type=m427_320_2);
  background-size: cover;
}
.flip-cards li:nth-child(3) > .panel {
  background-color: rgba(211, 81, 45, 1);
}

.flip-cards li:nth-child(4) > .button {
  background-image: url(https://movie-phinf.pstatic.net/20150203_267/1422954366520nmAor_JPEG/movie_image.jpg?type=m427_320_2);
  background-size: cover;
}
.flip-cards li:nth-child(4) > .panel {
  background-color: rgba(235, 167, 36, 1);
}


</style>