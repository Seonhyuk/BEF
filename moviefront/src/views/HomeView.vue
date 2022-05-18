<template>
  <div class="home">
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomeView',
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
