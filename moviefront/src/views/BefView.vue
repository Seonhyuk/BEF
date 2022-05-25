<template>
<v-container>
  <div id="root-wrap">
    <div id="wrap1">
      <img src="@/assets/12.jpg" alt="" id="img1">
      <section class="container">
        <h1>
          <span class="title">I'M</span>
          <span class="title">YOUR</span>
          <span class="title">BESTFRIEND!</span>
        </h1>     
        <div class="button">restart</div>
      </section>
      <div id="btn-wrap" >
        <img id="down-img1" src="@/assets/down.png" alt="" @click="move1">
      </div>
    </div>
    <div id="wrap2">
      <img src="@/assets/9.jpg" alt="" id="img2">
      <div id="btn-wrap2" >
        <img id="down-img2" src="@/assets/down.png" alt="" @click="move2">
      </div>
    </div>
    <div id="wrap3">
      <img src="@/assets/1.jpg" alt="" id="img3">
      <div id="btn-wrap3" >
        <img id="down-img3" src="@/assets/down.png" alt="" @click="move3">
      </div>
    </div>
    <div id="wrap4">
      <img src="@/assets/6.jpg" alt="" id="img3">
        <div id="btn-wrap4" >
        <img id="down-img4" src="@/assets/upupup.png" alt="" @click="move4">
      </div>
    </div>
  </div>
</v-container>
</template>

<script>

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

<style>
#root-wrap {
  width: 100%;
  height: 100vh;
  border: 1px solid red;
}
#wrap1 {
  width: 100%;
  height: 100vh;
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
#btn-wrap {
  z-index: 1px;
  position: relative;
  bottom: 18%;
}
#btn-wrap2 {
  z-index: 1px;
  position: relative;
  bottom: 10%;
}
#btn-wrap3 {
  z-index: 1px;
  position: relative;
  bottom: 10%;
}
#btn-wrap4 {
  z-index: 1px;
  position: relative;
  bottom: 10%;
}
#down-img1 {
  width: 40px;
  height: 40px;
}
#down-img2 {
  width: 40px;
  height: 40px;
}
#down-img3 {
  width: 40px;
  height: 40px;
}
#down-img4 {
  width: 40px;
  height: 40px;
}

@import url(https://fonts.googleapis.com/css?family=Fjalla+One);
html {
  height: 100%;
}

body {
  font-family: "Fjalla One", sans-serif;
  background: linear-gradient(to bottom, #405166 0%, #656f6f 100%);
}

.container {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: block;
  position: absolute;
  max-width: 225px;
}

.button {
  float: left;
  position: relative;
  bottom: -65px;
  left: 50%;
  transform: translateX(-50%) rotate(-10deg);
  color: #e55643;
  text-transform: uppercase;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
}
.button span {
  transform: skew(-10deg);
  display: block;
  float: left;
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px;
}

h1 {
  color: #fff;
  text-transform: uppercase;
  font-size: 42px;
  margin: 0;
  line-height: 47px;
  letter-spacing: 2px;
}

.title {
  transform: translateX(-50%) rotate(-10deg);
  display: block;
  float: left;
  left: 50%;
  position: relative;
}
.title span {
  transform: skew(-10deg);
  display: block;
  float: left;
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  min-width: 10px;
  min-height: 10px;
  position: relative;
}

.title:nth-child(1) {
  color: #e55643;
}
.title:nth-child(2) {
  color: #2b9f5e;
}
.title:nth-child(3) {
  color: #f1c83c;
}

</style>