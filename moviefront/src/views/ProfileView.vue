<template>
  <div class="main-box py-5">
    <h1>{{ profile.name }} 님의 프로필</h1>

    <img v-if="currentUser.profile_image" :src="currentUser.profile_image" alt="" class="profile-image">
    <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" class="profile-image">
  
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

<style scoped>

.main-box {
  min-width: 600px;
  width: 60%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  object-fit: cover;
}

</style>