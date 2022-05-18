<template>
  <div>
    <h1>SignUp</h1>

		<form @submit.prevent="signup(credentials)">
			<div>
				<label for="id">ID: </label>
				<input type="text" v-model="credentials.username" id="id" required/>
			</div>

			<div>
				<label for="password">비밀번호: </label>
				<input type="password" v-model="credentials.password1" id="password" required/>
			</div>

			<div>
				<label for="password2">비밀번호 확인: </label>
				<input type="password" v-model="credentials.password2" id="password2" required/>
			</div>

			<div>
				<button>Sign Up</button>
			</div>
		</form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'SignupView',
	data () {
		return {
			credentials: {
				username: '',
				password1: '',
				password2: '',
			}
		}
	},
	methods: {
		...mapActions(['signup'])
	}
}
</script>

<style>

</style>