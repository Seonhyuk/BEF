<template>
<v-container>
  <div id="root-wrap">
    <div id="wrap1">
      <img src="@/assets/12.jpg" alt="" id="img1">
      <div id="login-btn-wrap">
        <router-link :to="{ name: 'login'}"><button id="login-btn">로그인하기</button></router-link>
      </div>
      <div id="logo-title">
        <h1 id="title1">B.E.F</h1>
        <h1 id="title2">I'M YOUR</h1>
        <h1 id="title3">BEST FRIEND!</h1>
      </div>
      <div id="btn-wrap" >
        <img id="down-img1" src="@/assets/down.png" alt="" @click="move1">
      </div>
    </div>
    <div id="wrap2">
      <img src="@/assets/6.jpg" alt="" id="img2">
      <div id="login-btn-wrap2">
        <router-link :to="{ name: 'login'}"><button id="login-btn">로그인하기</button></router-link>
      </div>
      <div id="logo-title2">
        <h1 id="img2-text1">10,000편 이상의 영화정보를 제공합니다</h1>
        <p id="img2-text2">계정을 만들어 프로필을 꾸며보세요.</p>
        <router-link :to="{ name: 'signup'}"><button id="login-btn2">계정만들기</button></router-link>
      </div>
      <div id="btn-wrap2" >
        <img id="down-img2" src="@/assets/down.png" alt="" @click="move2">
      </div>
    </div>

    <div id="wrap3">
      <img src="@/assets/1.jpg" alt="" id="img3">
      <div id="login-btn-wrap3">
        <router-link :to="{ name: 'login'}"><button id="login-btn">로그인하기</button></router-link>
      </div>
      <div id="logo-title3">
        <h1 id="img3-text1">나만의 영화를 추천받을 수 있습니다</h1>
        <p id="img3-text2">B.E.F만의 사용자 기반 알고리즘으로 새로운 영화를 즐겨보세요.</p>
        <router-link :to="{ name: 'signup'}"><button id="login-btn3">계정만들기</button></router-link>
      </div>
      <div id="btn-wrap3" >
        <img id="down-img3" src="@/assets/down.png" alt="" @click="move3">
      </div>
    </div>

    <div id="wrap4">
      <img src="@/assets/13.jpg" alt="" id="img4">
      <div id="login-btn-wrap4">
        <router-link :to="{ name: 'login'}"><button id="login-btn">로그인하기</button></router-link>
      </div>
      <div id="logo-title4">
        <h1 id="img4-text1">다양한 커뮤니티 서비스가 준비되어 있습니다</h1>
        <p id="img4-text2">My포토카드 만들기 기능을 통해 추억을 간직하세요.</p>
        <router-link :to="{ name: 'signup'}"><button id="login-btn4">계정만들기</button></router-link>
      </div>
      <div id="btn-wrap4" >
        <img id="down-img4" src="@/assets/upupup.png" alt="" @click="move4">
      </div>
    </div>



  </div>
</v-container>
</template>

<script>
import 'animate.css';

export default {
  name: 'BefView',
  methods: {
    move1() {
      const to2 = document.querySelector('#wrap2').offsetTop
      console.log(to2)
      window.scrollTo({left:0, top:to2, behavior:"smooth"})
    },
    move2() {
      const to3 = document.querySelector('#wrap3').offsetTop
      window.scrollTo({left:0, top:to3, behavior:"smooth"})
    },
    move3() {
      const to4 = document.querySelector('#wrap4').offsetTop
      window.scrollTo({left:0, top:to4, behavior:"smooth"})
    },
    move4() {
      window.scrollTo({left:0, top:0, behavior:"smooth"})
    }
  },
}
</script>

<style scoped>
#root-wrap {
  width: 100%;
  height: 100vh;
}
#wrap1 {
  width: 100%;
  height: 100vh;
  text-align:center;
}
#wrap2 {
  width: 100%;
  height: 100vh;
}
#wrap3 {
  width: 100%;
  height: 100vh;
}
#wrap4 {
  width: 100%;
  height: 100vh;
}
#img1 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}
#img2 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}
#img3 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}
#img4 {
  width: 100%;
  height: 100vh;
  filter: brightness(55%);
}
#btn-wrap {
  z-index: 1px;
  position: absolute;
  top: 92%;
  width: 100%;
}
#btn-wrap2 {
  z-index: 1px;
  position: absolute;
  top: 200%;
  width: 100%;
}
#btn-wrap3 {
  z-index: 1px;
  position: absolute;
  top: 300%;
  width: 100%;
}
#btn-wrap4 {
  z-index: 1px;
  position: absolute;
  top: 400%;
  width: 100%;
}

#down-img1 {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
#down-img2 {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
#down-img3 {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
#down-img4 {
  width: 40px;
  height: 40px;
  cursor: pointer;
}



@import url(https://fonts.googleapis.com/css?family=Fjalla+One);

#logo-title {
  position: absolute;
  top: 50%;
  left: 50%;
  margin:0 auto;
  transform: translate(-50%, -50%);
}
#logo-title2 {
  position: absolute;
  top: 150%;
  left: 50%;
  margin:0 auto;
  transform: translate(-50%, -50%);
}
#logo-title3 {
  position: absolute;
  top: 250%;
  left: 50%;
  margin:0 auto;
  transform: translate(-50%, -50%);
}
#logo-title4 {
  position: absolute;
  top: 350%;
  left: 50%;
  margin:0 auto;
  transform: translate(-50%, -50%);
}
#title1{
  font-family: 'Fjalla One', sans-serif;
  font-size: 80px;
  font-weight: bold;
  color: #e45643;
  /* transform: translateX(-50%) rotate(-10deg);
  transform: skew(-10deg); */
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  animation: bounceInUp 2s ease-out;
}

#title2{
  font-family: 'Fjalla One', sans-serif;
  font-size: 80px;
  color: #2b9e5e;
  /* transform: translateX(-50%) rotate(-10deg);
  transform: skew(-10deg); */
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  font-weight: bold;
  animation: bounceInUp 3s ease-out;
}
#title3{
  font-family: 'Fjalla One', sans-serif;
  font-size: 80px;
  color: #f0c73c;
  /* transform: translateX(-50%) rotate(-10deg);
  transform: skew(-10deg); */
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  font-weight: bold;
  animation: bounceInUp 4s ease-out;
}
#login-btn-wrap {
  position: absolute;
  margin:0 auto;
  height: 35px;
  width: 200px;
  top:15%;
  right: 0.5%;
}
#login-btn-wrap2 {
  position: absolute;
  margin:0 auto;
  height: 35px;
  width: 200px;
  top:115%;
  right: 0.5%;
}
#login-btn-wrap3 {
  position: absolute;
  margin:0 auto;
  height: 35px;
  width: 200px;
  top:215%;
  right: 0.5%;
}
#login-btn-wrap4 {
  position: absolute;
  margin:0 auto;
  height: 35px;
  width: 200px;
  top:315%;
  right: 0.5%;
}

#login-btn{
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
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  #login-btn {
    transition: none;
  }
}
#login-btn:hover {
  border: 1px solid white;
}
#login-btn2{
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
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  #login-btn2 {
    transition: none;
  }
}
#login-btn2:hover {
  border: 1px solid white;
}
#login-btn3{
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
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  #login-btn3 {
    transition: none;
  }
}
#login-btn3:hover {
  border: 1px solid white;
}

#login-btn4{
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
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  #login-btn4 {
    transition: none;
  }
}
#login-btn4:hover {
  border: 1px solid white;
}

#img2-text2 {
  color: #cac8c9;
  margin-bottom: 50px;
}
#img3-text2 {
  color: #cac8c9;
  margin-bottom: 50px;
}
#img4-text2 {
  color: #cac8c9;
  margin-bottom: 50px;
}
</style>