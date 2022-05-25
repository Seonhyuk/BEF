<template>
  <div class="home2 container">
		<h1>나만의 무비카드 만들기</h1>
		<hr>
		<div class="d-flex justify-content-evenly">
			<div class="custom-card custom-color animated m-5" :style="{ '--custom-color1': color[cardData.leftColor], '--custom-color2': color[cardData.rightColor] }">
				<img v-if="cardData.img" class="inner-image" :src="cardData.img" alt="">
				<div class="inner-box">
					<p class="inner-text first-text">{{ cardData.title }}</p>
					<p v-if="cardData.date" class="inner-text">{{ computedDate }}</p>
					<p v-if="cardData.withPerson" class="inner-text">👨‍👦 {{ cardData.withPerson }}</p>
					<p v-if="cardData.liked" class="inner-text">👍🏻 좋았어요</p>
					<p v-else class="inner-text">👎🏻 별로였어요</p>
					<p v-if="cardData.description" class="inner-text">{{ cardData.description }}</p>
				</div>
			</div>
			<custom class="hover"></custom>

			<div>
				<div>
					<form @submit.prevent="onClick" class="form login">

						<div class="button-wrapper">
							<span class="label">
								사진을 선택해주세요.
							</span>
							<input 
								id="upload"
								type="file" 
								accept="image/*" 
								@change="onInputImage" 
								ref="image"
								class="upload-box"
								required
							>
						</div>

						<div class="form__field">
							<label for="movie_title"><svg class="icon">
								<use xlink:href="#icon-arrow-right"></use>
							</svg><span class="hidden"></span></label>
							<input type="text" name="movie_title" id="movie_title"  class="form__input" placeholder="영화 제목을 적어주세요" v-model="cardData.title" required />
						</div>

						<input type="date" v-model="cardData.date" style="color: black;">

						<div class="form__field">
							<label for="with_person"><svg class="icon">
								<use xlink:href="#icon-user"></use>
							</svg><span class="hidden"></span></label>
							<input type="text" name="with_person" id="with_person"  class="form__input" placeholder="누구와 같이 봤나요?" v-model="cardData.withPerson" />
						</div>

						<!-- css 필요 -->
						<div>
							<label for="radio1" class="text_obj">
								<input 
									type="radio" 
									name="like" 
									id="radio1"
									:value="true"
									v-model="cardData.liked"
								><span>좋았어요😍</span>
							</label> vs 
			
							<label for="radio2" class="text_obj">
								<input 
									type="radio" 
									name="like" 
									id="radio2" 
									:value="false"
									v-model="cardData.liked"
								><span>별로에요😥</span>
							</label>
						</div>

						<div class="form__field">
						<label for="description"><svg class="icon">
								<use xlink:href="#icon-arrow-right"></use>
							</svg><span class="hidden"></span></label>
						<input id="description" type="text" name="description" class="form__input" placeholder="내용을 입력해주세요" v-model="cardData.description">
						</div>

						<div class="form__field">
							<input type="submit" value="만들기!">
						</div>
					</form>

					<svg xmlns="http://www.w3.org/2000/svg" class="icons">
						<symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
							<path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
						</symbol>
						<symbol id="icon-user" viewBox="0 0 1792 1792">
							<path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
						</symbol>
					</svg>
				</div>


			</div>
		</div>

		<div class="radio-box">
			<label for="lcolor1" class="label-box1"></label>
			<input id="lcolor1" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="0" class="radio-none">
			<label for="lcolor2" class="label-box2"></label>
			<input id="lcolor2" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="1" class="radio-none">
			<label for="lcolor3" class="label-box3"></label>
			<input id="lcolor3" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="2" class="radio-none">
			<label for="lcolor4" class="label-box4"></label>
			<input id="lcolor4" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="3" class="radio-none">
			<label for="lcolor5" class="label-box5"></label>
			<input id="lcolor5" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="4" class="radio-none">
			<label for="lcolor6" class="label-box6"></label>
			<input id="lcolor6" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="5" class="radio-none">
			<label for="lcolor7" class="label-box7"></label>
			<input id="lcolor7" type="radio" name="leftcolor" v-model="cardData.leftColor" :value="6" class="radio-none">
		</div>
		<div class="radio-box">
			<label for="rcolor1" class="label-box1"></label>
			<input id="rcolor1" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="0" class="radio-none">
			<label for="rcolor2" class="label-box2"></label>
			<input id="rcolor2" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="1" class="radio-none">
			<label for="rcolor3" class="label-box3"></label>
			<input id="rcolor3" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="2" class="radio-none">
			<label for="rcolor4" class="label-box4"></label>
			<input id="rcolor4" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="3" class="radio-none">
			<label for="rcolor5" class="label-box5"></label>
			<input id="rcolor5" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="4" class="radio-none">
			<label for="rcolor6" class="label-box6"></label>
			<input id="rcolor6" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="5" class="radio-none">
			<label for="rcolor7" class="label-box7"></label>
			<input id="rcolor7" type="radio" name="rightcolor" v-model="cardData.rightColor" :value="6" class="radio-none">
		</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import $ from 'jquery'

export default {
	name: 'CustomCard',
	data () {
		return {
			color: [
				'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple',
			],
			cardData: {
				img: null,
				title: '',
				date: '',
				withPerson: '',
				liked: true,
				description: '',
				leftColor: 0,
				rightColor: 6,
			}
		}
	},

	computed: {
		...mapGetters(['isLoggedIn']),
		computedDate () {
			const t = new Date(this.cardData.date)
			return `${t.getFullYear()}년 ${t.getMonth() + 1}월 ${t.getDate()}일`
		}
	},

	methods: {
		...mapActions(['makeCard']),
		encodeBase64ImageFile (image) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(image[0])
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.onerror = (error) => {
          reject(error)
        }
      })
    },

    onInputImage() {
      this.encodeBase64ImageFile(this.$refs.image.files)
        .then(data => {
          this.cardData.img = data
        })
    },

		onClick() {
			this.makeCard(this.cardData)
		}
	},
	created() {
		if (!this.isLoggedIn){
			this.$router.push({ name: 'login' })
		}
	},
	mounted() {
		var x
		var $cards = $(".card")
		var $style = $(".hover")

		$cards
			.on("mousemove touchmove", function(e) { 
				var pos = [e.offsetX,e.offsetY]
				e.preventDefault()
				if ( e.type === "touchmove" ) {
					pos = [ e.touches[0].clientX, e.touches[0].clientY ]
				}
				var $card = $(this)
				var l = pos[0]
				var t = pos[1]
				var h = $card.height()
				var w = $card.width()
				var px = Math.abs(Math.floor(100 / w * l)-100)
				var py = Math.abs(Math.floor(100 / h * t)-100)
				var pa = (50-px)+(50-py)
				var lp = (50+(px - 50)/1.5)
				var tp = (50+(py - 50)/1.5)
				var px_spark = (50+(px - 50)/7)
				var py_spark = (50+(py - 50)/7)
				var p_opc = 20+(Math.abs(pa)*1.5)
				var ty = ((tp - 50)/2) * -1
				var tx = ((lp - 50)/1.5) * .5
				var grad_pos = `background-position: ${lp}% ${tp}%;`
				var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
				var opc = `opacity: ${p_opc/100};`
				var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
				var style = `
					.card:hover:before { ${grad_pos} }  /* gradient */
					.card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
				`
				document.getElementById($cards).removeClass("active")
				document.getElementById($card).removeClass("animated")
				document.getElementById($card).attr( "style", tf )
				document.getElementById($style).html(style)
				if ( e.type === "touchmove" ) {
					return false
				}
				clearTimeout(x)
			}).on("mouseout touchend touchcancel", function() {
				var $card = $(this)
				$style.html("")
				$card.removeAttr("style")
				x = setTimeout(function() {
					$card.addClass("animated")
				},2500)
		})
	}
}
</script>

<style scoped>
.home2 {
  max-width: 1000px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0;
	height: 92.5vh;
}

:root {
    --color1: rgb(0, 231, 255);
    --color2: rgb(255, 0, 231);
    --back: url(https://cdn2.bulbagarden.net/upload/1/17/Cardback.jpg);
    --custom-color1: #fac;
    --custom-color2: red;
  }
  
  .custom-card {
    width: 71.5vw;
    height: 100vw;
    position: relative;
    overflow: hidden;
    margin: 20px;
    overflow: hidden;
    z-index: 10;
    touch-action: none;
    border-radius: 5%/3.5%;
    box-shadow: -5px -5px 5px -5px var(--color1), 5px 5px 5px -5px var(--color2), -7px -7px 10px -5px transparent, 7px 7px 10px -5px transparent, 0 0 5px 0px rgba(255, 255, 255, 0), 0 55px 35px -20px rgba(0, 0, 0, 0.5);
    transition: transform 0.5s ease, box-shadow 0.2s ease;
    will-change: transform, filter;
    background-color: #040712;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    transform-origin: center;
  }
  @media screen and (min-width: 600px) {
    .custom-card {
      width: 300px;
      height: 400px;
    }
  }
  
  .custom-card:hover {
    box-shadow: -20px -20px 30px -25px var(--color1), 20px 20px 30px -25px var(--color2), -7px -7px 10px -5px var(--color1), 7px 7px 10px -5px var(--color2), 0 0 13px 4px rgba(255, 255, 255, 0.3), 0 55px 35px -20px rgba(0, 0, 0, 0.5);
  }
  
  .custom-card.custom-color {
    --color1: var(--custom-color1);
    --color2: var(--custom-color2);
  }
  
  .custom-card:before,
  .custom-card:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    opacity: 0.5;
    mix-blend-mode: color-dodge;
    transition: all 0.33s ease;
  }
  
  .custom-card:before {
    background-position: 50% 50%;
    background-size: 300% 300%;
    background-image: linear-gradient(115deg, transparent 0%, var(--color1) 25%, transparent 47%, transparent 53%, var(--color2) 75%, transparent 100%);
    opacity: 0.5;
    filter: brightness(0.5) contrast(1);
    z-index: 1;
  }
  
  .custom-card:after {
    opacity: 1;
    background-image: url("https://assets.codepen.io/13471/sparkles.gif"), url(https://assets.codepen.io/13471/holo.png), linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
    background-position: 50% 50%;
    background-size: 160%;
    background-blend-mode: overlay;
    z-index: 2;
    filter: brightness(1) contrast(1);
    transition: all 0.33s ease;
    mix-blend-mode: color-dodge;
    opacity: 0.75;
  }
  
  .custom-card.active:after,
  .custom-card:hover:after {
    filter: brightness(1) contrast(1);
    opacity: 1;
  }
  
  .custom-card.active,
  .custom-card:hover {
    -webkit-animation: none;
            animation: none;
    transition: box-shadow 0.1s ease-out;
  }
  
  .custom-card.active:before,
  .custom-card:hover:before {
    -webkit-animation: none;
            animation: none;
    background-image: linear-gradient(110deg, transparent 25%, var(--color1) 48%, var(--color2) 52%, transparent 75%);
    background-position: 50% 50%;
    background-size: 250% 250%;
    opacity: 0.88;
    filter: brightness(0.66) contrast(1.33);
    transition: none;
  }
  
  .custom-card.active:before,
  .custom-card:hover:before,
  .custom-card.active:after,
  .custom-card:hover:after {
    -webkit-animation: none;
            animation: none;
    transition: none;
  }
  
  .custom-card.animated {
    transition: none;
    -webkit-animation: holoCard 12s ease 0s 1;
            animation: holoCard 12s ease 0s 1;
  }
  .custom-card.animated:before {
    transition: none;
    -webkit-animation: holoGradient 12s ease 0s 1;
            animation: holoGradient 12s ease 0s 1;
  }
  .custom-card.animated:after {
    transition: none;
    -webkit-animation: holoSparkle 12s ease 0s 1;
            animation: holoSparkle 12s ease 0s 1;
  }
  
  @-webkit-keyframes holoSparkle {
    0%, 100% {
      opacity: 0.75;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(1.25);
    }
    5%, 8% {
      opacity: 1;
      background-position: 40% 40%;
      filter: brightness(0.8) contrast(1.2);
    }
    13%, 16% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(0.8);
    }
    35%, 38% {
      opacity: 1;
      background-position: 60% 60%;
      filter: brightness(1) contrast(1);
    }
    55% {
      opacity: 0.33;
      background-position: 45% 45%;
      filter: brightness(1.2) contrast(1.25);
    }
  }
  
  @keyframes holoSparkle {
    0%, 100% {
      opacity: 0.75;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(1.25);
    }
    5%, 8% {
      opacity: 1;
      background-position: 40% 40%;
      filter: brightness(0.8) contrast(1.2);
    }
    13%, 16% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(0.8);
    }
    35%, 38% {
      opacity: 1;
      background-position: 60% 60%;
      filter: brightness(1) contrast(1);
    }
    55% {
      opacity: 0.33;
      background-position: 45% 45%;
      filter: brightness(1.2) contrast(1.25);
    }
  }
  @-webkit-keyframes holoGradient {
    0%, 100% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(0.5) contrast(1);
    }
    5%, 9% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
    13%, 17% {
      background-position: 0% 0%;
      opacity: 0.88;
    }
    35%, 39% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.5) contrast(1);
    }
    55% {
      background-position: 0% 0%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
  }
  @keyframes holoGradient {
    0%, 100% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(0.5) contrast(1);
    }
    5%, 9% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
    13%, 17% {
      background-position: 0% 0%;
      opacity: 0.88;
    }
    35%, 39% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.5) contrast(1);
    }
    55% {
      background-position: 0% 0%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
  }
  @-webkit-keyframes holoCard {
    0%, 100% {
      transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }
    5%, 8% {
      transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
    }
    13%, 16% {
      transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
    }
    35%, 38% {
      transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
    }
    55% {
      transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
    }
  }
  @keyframes holoCard {
    0%, 100% {
      transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }
    5%, 8% {
      transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
    }
    13%, 16% {
      transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
    }
    35%, 38% {
      transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
    }
    55% {
      transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
    }
  }
  

  .custom-card:nth-child(2), .custom-card:nth-child(2):before, .custom-card:nth-child(2):after {
    -webkit-animation-delay: 0.25s;
            animation-delay: 0.25s;
  }
  .custom-card:nth-child(3), .custom-card:nth-child(3):before, .custom-card:nth-child(3):after {
    -webkit-animation-delay: 0.5s;
            animation-delay: 0.5s;
  }
  .custom-card:nth-child(4), .custom-card:nth-child(4):before, .custom-card:nth-child(4):after {
    -webkit-animation-delay: 0.75s;
            animation-delay: 0.75s;
  }

  .inner-image {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
  }

  .inner-text {
    color: white;
    text-align: end;
    margin-right: 10px;
		margin-left: 10px;
    margin-bottom: 3px;
    margin-top: 8px;
    font-size: 16px;
		font-weight: bold;
  }

  .first-text {
    margin-top: 150px;
  }

  .inner-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

.button-wrapper {
  position: relative;
  width: 300px;
  text-align: center;

  margin: 30px auto;
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

.form__field {
  display: flex;
}

.form__input {
  flex: 1;
}

.text_obj input[type="radio"] {
  display: none;
}


.text_obj input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 17px;
}

.text_obj input[type="radio"]:checked + span {
  background-color: #F82F62;
  border: 1px solid #F82F62;
  color: #ffffff;
}

.radio-box {
	margin-top: 10px;
	width: 50%;
}

.label-box1 {
	width: 25px;
	height: 25px;
	background-color: red;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box2 {
	width: 25px;
	height: 25px;
	background-color: orange;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box3 {
	width: 25px;
	height: 25px;
	background-color: yellow;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box4 {
	width: 25px;
	height: 25px;
	background-color: green;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box5 {
	width: 25px;
	height: 25px;
	background-color: blue;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box6 {
	width: 25px;
	height: 25px;
	background-color: navy;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.label-box7 {
	width: 25px;
	height: 25px;
	background-color: purple;
	border-radius: 5px;
	border: 1px white solid;
	margin: 5px;
}
.radio-none {
	display: none;
}

.label-box1:hover,
.label-box2:hover,
.label-box3:hover,
.label-box4:hover,
.label-box5:hover,
.label-box6:hover,
.label-box7:hover {
	opacity: 0.5;
}

</style>