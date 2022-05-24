<template>
  <div class="main-box py-5 container">
    <h1 class="fw-bold">
      {{ profile.name }}({{ profile.username }}) 
      <button 
        v-if="currentUser.username === profile.username"
        class="nickname-button"
        @click="goChangeNickname"
      >닉네임 변경</button>
    </h1>

    
    <hr>

    <div class="d-flex justify-content-between">
      <div class="sub-box d-flex justify-content-center">
        <img v-if="profile.profile_image" :src="img || profile.profile_image" alt="" class="profile-image my-4">
        <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" class="profile-image my-4">
      </div>

      <div class="sub-box right-box">

        <div class="d-flex justify-content-center">
          <div class="my-auto mx-3">
            <p class="hilight-text">팔로워</p>
            <p>{{ followersLength }}</p>
          </div>

          <div class="my-auto mx-3">
            <p class="hilight-text">팔로잉</p>
            <p>{{ followingsLength }}</p>
          </div>
        </div>

        <div v-show="isLoggedIn && profile.username !== currentUser.username">
          <button v-if="!checkFollow" class="follow-button following" @click="followYou(profile.username)">팔로우</button>
          <button v-else class="follow-button unfollowing" @click="followYou(profile.username)">언팔로우</button>
        </div>
        
        <div v-if="isLoggedIn && currentUser.username === profile.username" class="change-box">
          <div class="button-wrapper">
            <span class="label">
              프로필 사진 변경
            </span>
            <input 
              id="upload"
              type="file" 
              accept="image/*" 
              @change="onInputImage" 
              ref="image"
              class="upload-box"
            >
          </div>
        </div>

        <div v-if="isLoggedIn && img && img != currentUser.profile_image && currentUser.username === profile.username" class="">
          <button @click="returnProfileImage" class="back-button">되돌리기</button>
          <button @click="changeProfileImage(img)" class="confirm-button">확인</button>
        </div>

        <button 
          @click="goSelectGenre"
          v-show="isLoggedIn && profile.username === currentUser.username"
          class="change-button2 my-1"
        >선호 장르 선택</button>
      </div>

    </div>
    <hr>
  
    <h1 class="playing-title ms-4">{{ profile.name }}님이 좋아하는 영화</h1>
    <div class="movies" v-if="likedLength">
      <ul class="zero-padding">
        <SmallMovieVue
          v-for="movie in profile.wished_to_movies" 
          :key="movie.title"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>
    <div v-else>
      <div class="empty-box">
        <h2 class="empty-text">{{ profile.name }}님이 좋아하는 영화가 없습니다!</h2>
      </div>
    </div>
    <hr>

    <h1 class="playing-title ms-4">{{ profile.name }}님이 본 영화</h1>
    <div class="movies" v-if="watchedLength">
      <ul class="zero-padding">
        <SmallMovieVue
          v-for="movie in profile.watched_movies" 
          :key="movie.title"
          :movie="movie"
          class="element"
        />
      </ul>
    </div>
    <div v-else>
      <div class="empty-box">
        <h2 class="empty-text">{{ profile.name }}님이 본 영화가 없습니다!</h2>
      </div>
    </div>
    <hr>

    <h1 class="playing-title ms-4">{{ profile.name }}님이 작성한 게시글</h1>
    <div v-if="articlesLength">
      
    </div>
    <div v-else>
      <div class="empty-box">
        <h2 class="empty-text">{{ profile.name }}님이 작성한 게시글이 없습니다!</h2>
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SmallMovieVue from '@/components/SmallMovie.vue'

export default {
  name:"profileView",
  data () {
    return {
      img: this.profile?.profile_image,
    }
  },
  components: {
    SmallMovieVue
  },
  computed: {
    ...mapGetters(['profile', 'currentUser', 'isLoggedIn']),

    followingsLength () {
      return this.profile.followings?.length
    },
    followersLength () {
      return this.profile.followers?.length
    },
    watchedLength () {
      return this.profile.watched_movies?.length
    },
    likedLength () {
      return this.profile.wished_to_movies?.length
    },
    articlesLength () {
      return this.profile.articles?.length
    },
    

    checkFollow () {
      for (let person of this.currentUser?.followings) {
        if (person.username === this.profile?.username) {
          return true
        }
      }
      return false
    },

  },
  methods : {
    ...mapActions(['fetchProfile', 'followYou', 'changeProfileImage', ]),
    goSelectGenre() {
      this.$router.push({ name: 'genres' })
    },
    encodeBase64ImageFile (image) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(image[0])
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.onerror = (error) => {
          reject(error)
        }
      })
    },
    onInputImage() {
      this.encodeBase64ImageFile(this.$refs.image.files)
        .then(data => {
          this.img = data
        })
    },
    returnProfileImage () {
      this.img = this.profile.profile_image
    },
    goChangeNickname () {
      this.$router.push({ name: 'changeNickname'})
    }
  },
  created () {
    if (!this.$route.params.username) {
      alert('잘못된 접근입니다.')
      this.$router.push({ name: 'home' })
    } else {
      this.fetchProfile(this.$route.params.username)
    }

    this.img = this.profile?.profile_image

  },
}
</script>

<style scoped>

hr {
  width: 90%;
  margin: 30px auto;
}

.empty-box {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;

}

.empty-text {
  margin: auto;
  color: gray;
  font-size: 25px;
  font-weight: bold;
}

.main-box {
  min-width: 600px;
  width: 60%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.movies::-webkit-scrollbar{
  width: 0px;
}

.profile-image {
  width: 250px;
  height: 250px;
  border-radius: 70%;
  margin-left: 40px;
  overflow: hidden;
  object-fit: cover;
  box-shadow: -3px 0 white, 0 3px white, 3px 0 #FFF, 0 -3px #FFF;

}

.sub-box {
  width: 50%;
  height: 300px;
}

.hilight-text {
  font-weight: bold;
  font-size: 24px;
}

.right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.follow-button {
  width: 50%;
  height: 30px;
  margin: 15px auto 15px auto;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
}

.following {
  background-color: cadetblue;
  border: 0px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
}

.unfollowing {
  background-color: gray;
  color: snow;
  font-weight: bold;
  border: 0px;
  border-radius: 30px;
}

.following:hover {
  background: transparent;
  background: linear-gradient(0deg, transparent, 0%, rgba(2,126,251,1) 100%);
}

.unfollowing:hover {
  background: transparent;
  background: linear-gradient(0deg, transparent, 0%, rgba(80, 80, 80, 1) 100%);
}

.change-button {
  width: 50%;
  height: 30px;
  margin: 15px auto 15px auto;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
  background-color: rgb(243, 86, 143);
  font-weight: bold;
  color: white;
  border: 0px;
  border-radius: 30px;
}

.nickname-button {
  width: 100px;
  height: 30px;
  margin: auto;
  background-color: rgb(243, 86, 143);
  font-weight: bold;
  color: white;
  font-size: 16px;
  border: 0px;
  border-radius: 30px;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
}

.back-button {
  width: 24%;
  height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
  background-color: rgba(80, 80, 80, 0.5);
  font-weight: bold;
  color: white;
  margin-right: 1%;
  border: 0px;
  border-radius: 30px;
}

.back-button:hover {
  background-color: rgb(60, 60, 60);
}

.confirm-button {
  width: 24%;
  height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: 1%;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
  background-color: hotpink;
  font-weight: bold;
  color: white;
  border: 0px;
  border-radius: 30px;
}

.confirm-button:hover {
  background-color: rgb(243, 86, 143);
}

.change-button:hover {
  background-color: rgb(188, 67, 112);
}

.change-button2 {
  width: 50%;
  height: 30px;
  margin: 15px auto 15px auto;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
  background-color: rgb(91, 199, 209);
  font-weight: bold;
  color: white;
  border: 0px;
  border-radius: 30px;
}

.change-button2:hover {
  background-color: rgb(75, 164, 172);
}

.movies {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  margin: 10 auto;
}

.zero-padding {
  padding: 0px;
}


.movies > ul > .element {
  display: inline-block;
}

.playing-title {
  text-align: start;
  padding: 18px;
  color: white;
  font-size: 30px;
}

.button-wrapper {
  position: relative;
  width: 50%;
  margin: 15px auto 15px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.button-wrapper span.label {
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: rgb(243, 86, 143);
  cursor: pointer;
  padding: auto;
  margin: auto;
  height: 30px;
  font-weight: bold;
  color: white;
  border: 0px;
  border-radius: 30px;
  line-height: 28px;
  box-shadow: -1px 0 white, 0 1px white, 1px 0 #FFF, 0 -1px #FFF;
}

.button-wrapper span.label:hover {
  background-color: rgb(188, 67, 112);
}

#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 30px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.change-box {
  height: 60px;
}
</style>