<template>
  <div>
    <p v-if="idx > 127">128강</p>
    <p v-else-if="idx > 63">64강</p>
    <p v-else-if="idx > 31">32강</p>
    <p v-else-if="idx > 15">16강</p>
    <p v-else-if="idx > 7">8강</p>
    <p v-else-if="idx > 3">4강</p>
    <p v-else-if="idx > 1">2강</p>

    <div v-if="idx > 1">
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

<style>

</style>