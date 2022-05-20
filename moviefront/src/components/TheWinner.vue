<template>
  <div>
    <p>우승자는</p>
    <h1>
      {{ tournament[1].title }}
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheWinner',
  computed: {
    ...mapGetters(['tournament'])
  }
}
</script>

<style>

</style>