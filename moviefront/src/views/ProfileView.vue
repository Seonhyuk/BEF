<template>
  <div>
    <p>{{ profile.username }}님의페이지</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:"profileView",
  computed: {
    ...mapGetters(['profile', 'currentUser', 'isLoggedIn'])
  },
  methods : {
    ...mapActions(['fetchProfile'])
  },
}
</script>

<style>

</style>