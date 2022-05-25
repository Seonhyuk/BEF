<template>
  <div>
			<div class="custom-card custom-color animated m-5" :style="{ '--custom-color1': color[card.left_color], '--custom-color2': color[card.right_color] }">
				<img v-if="card.card_img" class="inner-image" :src="card.card_img" alt="">
				<div class="inner-box">
					<p class="inner-text first-text">{{ card.title }}</p>
					<p v-if="card.viewed_date" class="inner-text">{{ computedDate }}</p>
					<p v-if="card.with_person" class="inner-text">👨‍👦 {{ card.with_person }}</p>
					<p v-if="card.like" class="inner-text">👍🏻 좋았어요</p>
					<p v-else class="inner-text">👎🏻 별로였어요</p>
					<p v-if="card.description" class="inner-text">{{ card.description }}</p>
				</div>
			</div>
			<custom class="hover"></custom>
	</div>
</template>

<script>
import $ from 'jquery'

export default {
	name: 'movieCard',
	props: {
		card: Object,
	},
	data () {
		return {
			color: [
				'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple',
			],
		}
	},
	computed: {
		computedDate () {
			const t = new Date(this.card.viewed_date)
			return `${t.getFullYear()}년 ${t.getMonth() + 1}월 ${t.getDate()}일`
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

<style>
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
      width: 220px;
      height: 300px;
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
    font-size: 10px;
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
</style>