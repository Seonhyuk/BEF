<template>
  <div class="container home p-0">
    <h1 class="playing-title ms-4 fw-bold pt-5">🔍 검색 결과입니다.</h1>
    <hr>

    <div class="movies" v-if="searchedLength">
      <ul>
        <SmallMovieVue 
          v-for="movie in searchedMovies"
          :key="movie.id"
          :movie="movie"
          class="element"
        />
      </ul>
    <hr>
    </div>
		<div v-else>
			<div class="empty-box">
				<h2 class="empty-text">검색 결과가 없습니다😓</h2>
			</div>
			<hr>
		</div>

  </div>
</template>

<script>
import SmallMovieVue from '@/components/SmallMovie.vue'
import { mapGetters } from 'vuex'

export default {
	name: "SearchView",
	components: {
		SmallMovieVue
	},
	computed: {
		...mapGetters(["searchedMovies"]),
		searchedLength () {
			return this.searchedMovies?.length
		}
	},
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  width: 80%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5)
}

.movies {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  margin: 10 auto;
}

.movies::-webkit-scrollbar{
  width: 0px;
}

.movies > ul {
  padding: 0;
}

.movies > ul > .element {
  display: inline-block;
}

.playing-title {
  text-align: start;
  padding: 18px;
  color: white;
  font-size: 30px;
}

hr {
  width: 90%;
  margin: 30px auto;
}

.empty-box {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;

}

.empty-text {
  margin: auto;
  color: gray;
  font-size: 25px;
  font-weight: bold;
}
</style>