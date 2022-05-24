<template>
  <div class="home container">
    <h1 class="playing-title ms-5 pb-0">닉네임 변경하기</h1>
		<hr>


		<div class="form__field">
			<label for="nickname"><svg class="icon">
				<use xlink:href="#icon-user"></use>
			</svg><span class="hidden"></span></label>
			<input autocomplete="nickname" 
				type="text"
				id="nickname"  class="form__input"
				v-model="nickname" 
				placeholder="변경할 닉네임을 입력해주세요" required 
			/>
			<button class="submit-button" @click="changeNickname(nickname)">변경</button>
		</div>

		<svg xmlns="http://www.w3.org/2000/svg" class="icons">
			<symbol id="icon-user" viewBox="0 0 1792 1792">
			<path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
			</symbol>
		</svg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'ChangeNickname',
	data () {
		return {
			nickname: '',
		}
	},
	methods: {
		...mapActions(['changeNickname',])
	},
	computed: {
		...mapGetters([])
	}
}
</script>

<style scoped>

.form__field {
  margin: 15px auto;
}

.home {
	display: flex;
	flex-direction: column;
  max-width: 1000px;
  width: 80%;
	min-height: 92vh;
  background-color: rgba(0, 0, 0, 0.5)
}

.icons {
  display: none;
}

.icon {
  block-size: 1em;
  display: inline-block;
  fill: var(--iconFill);
  inline-size: 1em;
  vertical-align: middle;
}

.input-box {
	color: black;
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

input {
	width: 500px;
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: background-color 0.3s;
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

label {
  background-color: var(--loginLabelBackgroundColor);
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-inline: 1.25rem;
}

label,
input[type="text"] {
  border-radius: var(--loginBorderRadus);
  padding: 1rem;
}

input[type="text"] {
  background-color: var(--loginInputBackgroundColor);
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

input[type="text"]:focus,
input[type="text"]:hover {
  background-color: var(--loginInputHoverBackgroundColor);
}

.submit-button {
	border: 0px;
	border-radius: var(--loginBorderRadus);
	padding: 1rem;
	background-color: var(--loginSubmitBackgroundColor);
  color: var(--loginSubmitColor);
  font-weight: 700;
}

.submit-button:focus,
.submit-button:hover {
  background-color: rgb(218, 67, 112);
}

</style>