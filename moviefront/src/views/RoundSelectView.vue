<template>
  <div>
    <button @click="onSelect(5)">32강</button>
    <button @click="onSelect(6)">64강</button>
    <button @click="onSelect(7)">128강</button>
    <button @click="onSelect(8)">256강</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RoundSelect',
  computed: {
    ...mapGetters(['exponent'])
  },
  methods:{
    ...mapActions(['setExponent', 'getMatchUp', 'getWorldCup']),
    onSelect(exponent) {
      this.setExponent(exponent)
      this.getMatchUp(this.exponent)
      this.getWorldCup(this.exponent)
      this.$router.push({name: 'worldcup'})
    }
  }
}
</script>

<style>

</style>