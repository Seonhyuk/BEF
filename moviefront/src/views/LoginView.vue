<template>
  <div>
    <h1>Login</h1>
		<form @submit.prevent="login(credentials)">
			<div>
				<label for="username">ID: </label>
				<input type="text" id="username" v-model="credentials.username" required />
			</div>

			<div>
				<label for="password">Password: </label>
				<input type="password" id="password" v-model="credentials.password" required/>
			</div>

			<button>Login</button>
		</form>
		
		<router-link :to="{ name: 'signup' }">
			<button>SignUp</button>
		</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'LoginView',
	data() {
		return {
			credentials: {
				username: '',
				password: '',
			}
		}
	},
	methods: {
		...mapActions(['login'])
	}
}
</script>

<style>

</style>