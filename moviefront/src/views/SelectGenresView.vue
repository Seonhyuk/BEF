<template>
  <div>
		<GenreComponent
			v-for="genre in genres"
			:key="genre.id"
			:genre="genre"
		/>
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
		...mapGetters(['genres'])
	},
	methods: {
		...mapActions(['getGenres'])
	},
	created() {
		this.getGenres()
	}
}
</script>

<style>

</style>