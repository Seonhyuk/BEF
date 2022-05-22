<template>
  <div>
    <button>{{ tournament[i].title }}</button>

    <div class="flip-card-container" style="--hue: 220">
      <div class="flip-card">

        <div class="card-front">
          <figure>
            <img :src="`https://image.tmdb.org/t/p/w500/${tournament[i].poster_path}`" alt="">
          </figure>

          <ul>
            <li>{{ tournament[i].title }}</li>
            <li><img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1609287743/noticon/oyo23yrstcp0rbd4uiqp.png" alt="" style="width: 18px;">  {{ tournament[i].vote_average }}</li>
            <li><span>{{ tournament[i].genres[0].name }} </span></li>
          </ul>
        </div>

        <div class="card-back">
          <figure>
            <div class="img-bg"></div>
            <img :src="`https://image.tmdb.org/t/p/w500/${tournament[i].backdrop_path}`" alt="Brohm Lake">
          </figure>

          <button @click="fillMovie(i)">선택</button>

          <div class="design-container">
            <span class="design design--1"></span>
            <span class="design design--2"></span>
            <span class="design design--3"></span>
            <span class="design design--4"></span>
            <span class="design design--5"></span>
            <span class="design design--6"></span>
            <span class="design design--7"></span>
            <span class="design design--8"></span>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LargeMovie',
  props: {
    i: Number
  },
  computed: {
    ...mapGetters(['tournament'])
  },
  methods: {
    ...mapActions(['fillMovie'])
  }
}
</script>

<style scoped>

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.flip-card-container {
  --hue: 150;
  --primary: hsl(var(--hue), 50%, 50%);
  --white-1: hsl(0, 0%, 90%);
  --white-2: hsl(0, 0%, 80%);
  --dark: hsl(var(--hue), 25%, 10%);
  --grey: hsl(0, 0%, 50%);

  width: 310px;
  height: 500px;
  margin: 40px;

  perspective: 1000px;
}

.flip-card {
  width: inherit;
  height: inherit;

  position: relative;
  transform-style: preserve-3d;
  transition: .6s .1s;
}

.flip-card-container:hover .flip-card {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  border-radius: 24px;

  background: var(--dark);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.card-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
  z-index: 1;
}

figure {
  z-index: -1;
}

figure,
.img-bg {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

img {
  height: 100%;
  border-radius: 24px;
}

.img-bg {
  background: hsla(var(--hue), 25%, 10%, .5);
}

.card-front .img-bg {
  clip-path: polygon(0 20%, 100% 40%, 100% 100%, 0 100%);
}

.card-front .img-bg::before {
  content: "";

  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(18deg);

  width: 100%;
  height: 6px;
  border: 1px solid var(--primary);
  border-left-color: transparent;
  border-right-color: transparent;

  transition: .1s;
}


.flip-card-container:hover .card-front .img-bg::before {
  width: 6px;
  border-left-color: var(--primary);
  border-right-color: var(--primary);
}

ul {
  padding-top: 50%;
  margin: 0 auto;
  width: 70%;
  height: 100%;

  list-style: none;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

li {
  width: 100%;
  margin-top: 12px;
  padding-bottom: 12px;

  font-size: 16px;
  font-weight: bold;
  text-align: center;

  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;

  position: relative;
}

li:not(:last-child)::after {
  content: "";

  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 1px;

  background: currentColor;
  opacity: .2;
}

button {
  font-family: inherit;
  font-weight: bold;
  color: var(--white-1);

  letter-spacing: 2px;

  padding: 9px 20px;
  border: 1px solid var(--grey);
  border-radius: 1000px;
  background: transparent;
}

button:hover {
  color: var(--primary);
  background: hsla(var(--hue), 25%, 10%, .2);
  border-color: currentColor;
}

/* .design-container */
.design-container {
  --tr: 90;
  --op: .5;

  width: 100%;
  height: 100%;

  background: transparent;
  position: absolute;
  top: 0;
  left: 0;

  pointer-events: none;
}

/* .design */
.design {
  display: block;

  background: var(--grey);
  position: absolute;

  opacity: var(--op);
  transition: .3s;
}

.design--1,
.design--2,
.design--3,
.design--4 {
  width: 1px;
  height: 100%;
}

.design--1,
.design--2 {
  top: 0;
  transform: translateY(calc((var(--tr) - (var(--tr) * 2)) * 1%))
}

.design--1 {
  left: 20%;
}

.design--2 {
  left: 80%;
}

.design--3,
.design--4 {
  bottom: 0;
  transform: translateY(calc((var(--tr) + (var(--tr) - var(--tr))) * 1%))
}

.design--3 {
  left: 24%;
}

.design--4 {
  left: 76%;
}

.design--5,
.design--6,
.design--7,
.design--8 {
  width: 100%;
  height: 1px;
}

.design--5,
.design--6 {
  left: 0;
  transform: translateX(calc((var(--tr) - (var(--tr) * 2)) * 1%));
}

.design--5 {
  top: 41%;
}

.design--6 {
  top: 59%;
}

.design--7,
.design--8 {
  right: 0;
  transform: translateX(calc((var(--tr) + (var(--tr) - var(--tr))) * 1%))
}

.design--7 {
  top: 44%;
}

.design--8 {
  top: 56%;
}

/* states */
button:hover+.design-container,
button:active+.design-container,
button:focus+.design-container {
  --tr: 20;
  --op: .7;
}

</style>