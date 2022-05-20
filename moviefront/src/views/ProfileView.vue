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
  created () {
    if (!this.$route.params.username) {
      alert('잘못된 접근입니다.')
      this.$router.push({ name: 'home' })
    } else {
      this.fetchProfile(this.$route.params.username)
    }
  }
}
</script>

<style>

</style>