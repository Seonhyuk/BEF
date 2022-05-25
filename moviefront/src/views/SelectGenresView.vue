<template>
  <div class="container home">
		<div class="second-box m-auto">
			<h1 class="playing-title px-5">🎬 선호하는 장르를 선택해주세요</h1>
			<hr>
			<GenreComponent
				v-for="genre in genres"
				:key="genre.id"
				:genre="genre"
			/>
			<hr>
			<router-link :to="{ name: 'profile', params: { username: `${currentUser.username}`}}">
				<button class="confirm-button mb-5">완료</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GenreComponent from '@/components/GenreComponent.vue'

export default {
	name: 'SelectGenre',
	components: {
    GenreComponent
},
	computed: {
		...mapGetters(['genres', 'currentUser',])
	},
	methods: {
		...mapActions(['getGenres'])
	},
	created() {
		this.getGenres()
	}
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5);
	min-height: 91.7vh;
}

.second-box {
	min-width: 400px;
	width: 90%;
}

.confirm-button {
	min-width: 80px;
	height: 50px;
	border-radius: 10px;
	color: white;
	font-size: 14px;
	background-color: #F82F62;
}

.confirm-button:hover {
	border: solid 1px rgb(255, 255, 255)
}

hr {
  width: 90%;
  margin: 20px auto;
}

.playing-title {
  text-align: start;
  padding: 18px;
  color: white;
  font-size: 30px;
}
</style>