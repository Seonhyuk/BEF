<template>
  <div class="align">
		<div class="grid">
			<h1 id="signup-title">비밀번호 변경</h1>

			<form @submit.prevent="changePassword(credentials)" class="form login">

				<div class="form__field">
        <label for="login__password"><svg class="icon">
            <use xlink:href="#icon-lock"></use>
          </svg><span class="hidden"></span></label>
        <input id="login__password" type="password" name="password" class="form__input" placeholder="현재 비밀번호를 입력해주세요" v-model="credentials.old_password" required>
				</div>

				<div class="form__field">
        <label for="login__password1"><svg class="icon">
            <use xlink:href="#icon-lock"></use>
          </svg><span class="hidden"></span></label>
        <input id="login__password1" type="password" name="password" class="form__input" placeholder="새로운 비밀번호를 입력해주세요" v-model="credentials.new_password1" required>
				</div>

				<div class="form__field">
        <label for="login__password2"><svg class="icon">
            <use xlink:href="#icon-lock"></use>
          </svg><span class="hidden"></span></label>
        <input id="login__password2" type="password" name="password" class="form__input" placeholder="한 번 더 입력해주세요" v-model="credentials.new_password2" required>
				</div>

				<div class="form__field">
					<input type="submit" value="비밀번호 변경">
				</div>
			</form>
      <router-link :to="{ name: 'home' }" class="back-button">돌아가기</router-link>
		</div>

		<svg xmlns="http://www.w3.org/2000/svg" class="icons">
    <symbol id="icon-lock" viewBox="0 0 1792 1792">
      <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
    </symbol>
		</svg>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'PasswordChangeView',
	data () {
		return {
      credentials: {
				old_password: '',
				new_password1: '',
				new_password2: '',
			}
		}
	},
	methods: {
		...mapActions(['changePassword']),
	}
}
</script>

<style scoped>
@use postcss-preset-env {
  stage: 0;
}

.align {
  display: grid;
  place-items: center;
}

.grid {
  inline-size: 90%;
  margin-inline: auto;
  max-inline-size: 20rem;
}

#hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.icons {
  display: none;
}

.icon {
  block-size: 1em;
  display: inline-block;
  fill: #606468;
  inline-size: 1em;
  vertical-align: middle;
}

* {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 100%;
}

body {
  background-color: #2c3338;
  color: #606468;
  font-size: 0.875rem;;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  min-block-size: 100vh;
}

#a {
  color: #eee;;
  outline: 0;
  text-decoration: none;
}

#a:focus,

#a:hover {
  text-decoration: underline;
}

input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: background-color 0.3s;
}

input[type="submit"] {
  cursor: pointer;
}

.form {
  display: grid;
  gap: 0.875rem;
}

.form input[type="password"],
.form input[type="text"],
.form input[type="submit"] {
  inline-size: 100%;
}

.form__field {
  display: flex;
}

.form__input {
  flex: 1;
}

.login {
  color: #eee;
}

.login label,
.login input[type="text"],
.login input[type="password"],
.login input[type="submit"] {
  border-radius: 0.25rem;
  padding: 1rem;
}

.login label {
  background-color: #363b41;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-inline: 1.25rem;
}

.login input[type="password"]{
  background-color: #3b4148;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.login input[type="password"]:focus,
.login input[type="password"]:hover {
  background-color: #434a52;
}

.login input[type="submit"] {
  background-color: #F82F62;
  color: #eee;
  font-weight: 700;
  text-transform: uppercase;
}

.login input[type="submit"]:focus,
.login input[type="submit"]:hover {
  background-color: #F82F62;
}

#p {
  margin-block: 1.5rem;
	color: #414850;
}

.text--center {
  text-align: center;
}

#login-title {
	padding: 5px;
}


.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
  margin: 20% auto;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #00bfff;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  text-transform:uppercase;
  font-size:12px;
}

#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

#signup-title {
	margin: 20px;
	font-size: 30px;
}

.back-button {
  display: block;
  width: 320px;
  height: 53px;
  padding: 16px;
  border-radius: 4px;
  background-color: gray;
  text-decoration: none;
  color: white;
  margin-top: 14px;
}
</style>