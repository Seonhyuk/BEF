<template>
  <div class="container home">
    <p v-if="idx > 127" class="title">128강</p>
    <p v-else-if="idx > 63" class="title">64강</p>
    <p v-else-if="idx > 31" class="title">32강</p>
    <p v-else-if="idx > 15" class="title">16강</p>
    <p v-else-if="idx > 7" class="title">8강</p>
    <p v-else-if="idx > 3" class="title">4강</p>
    <p v-else-if="idx > 1" class="title">2강</p>

    <div v-if="idx > 1" class="d-flex justify-content-center">
      <large-movie
        :i="idx"
      ></large-movie>
    
      <large-movie
        :i="idx-1"
      ></large-movie>
    </div>
    <div v-else>
      <the-winner
      ></the-winner>
    </div>
  </div>
</template>

<script>
import LargeMovie from '@/components/LargeMovie.vue'
import TheWinner from '@/components/TheWinner.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'WorldCup',
  components: {
    LargeMovie, TheWinner
  },
  computed: {
    ...mapGetters(['tournament', 'order', 'idx', 'oIdx'])
  },
  methods: {
    ...mapActions([''])
  }
}
</script>

<style scoped>

.home {
  max-width: 1000px;
  width: 80%;
  height: 95vh;
  background-color: rgba(0, 0, 0, 0.5)
}

.title {
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 0;
}

</style>