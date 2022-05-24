<template>
  <div id="winner-wrap">
    <p id="winner">&#129351;우승작</p>
    <h1>{{ tournament[1].title }}</h1>
    <div id="winner-overview"><p>{{ tournament[1].overview}}</p></div>
    <div id="winner-poster-wrap">
      <img :src="`https://image.tmdb.org/t/p/original/${ tournament[1].poster_path }`" id="winner-poster">
    </div>
    <div class="mt-3">
      <button id="share-btn" class="mb-2" @click="shareCommunity">커뮤니티 공유하기</button> <br>
      <button id="share-btn2">카카오톡 공유하기</button>
    </div>
    <!-- 아래가 꽉차서 빈 디브태그 만들어놓은거에요 -->
    <div id="none-div">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheWinner',
  computed: {
    ...mapGetters(['tournament'])
  },
  data () {
    return {
      num: 1,
      payload: {
        movie : '',
        poster : '',
      }

    }
  },
  methods: {
    shareCommunity: function () {
      console.log(this.payload)
      this.$router.push({ name: 'share', params: { payload: `${this.payload}`}})
    }
  },
  mounted() {
    this.payload.movie = this.tournament[1].title,
    this.payload.poster = this.tournament[1].poster_path
  }
}
</script>

<style scoped>
#winner-overview {
  margin-top: 20px;
  color: rgb(122, 122, 122);
}
#winner {
  padding-top: 30px;
}
#winner-poster-wrap {
  width: 80%;
  height: 100%;
  margin: auto;
}
#winner-poster {
  width: 400px;
}
#share-btn{
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
  font-size: 15px;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .share-btn {
    transition: none;
  }
}
#share-btn:hover {
  border: 1px solid white;
}
#share-btn2{
  z-index: 1000;
  background-color: #ffa600;
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
  font-size: 15px;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .share-btn2 {
    transition: none;
  }
}
#share-btn2:hover {
  border: 1px solid white;
}
#none-div {
  width: 100px;
  height: 100px;
}
</style>