<template>
  <div class="main-box py-5">
    <h1>{{ profile.name }} 님의 프로필</h1>
    

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

.main-box {
  min-width: 600px;
  width: 60%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
}

</style>