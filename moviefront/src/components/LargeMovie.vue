<template>
  <div>
    <button @click="fillMovie(i)">
      {{ tournament[i].title }}
    </button>
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

<style>

</style>