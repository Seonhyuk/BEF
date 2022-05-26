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
              class="upload-box">
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
    <div class="d-flex justify-content-between" v-if="currentUser.username === profile.username">
      <h1 class="playing-title ms-4">{{ profile.name }}님의 포토카드</h1>
    </div>
    <h1 class="playing-title ms-4" v-else>{{ profile.name }}님의 무비카드</h1>
    <div class="movies d-flex" v-if="cardsLength">
        <MovieCardVue
          v-for="card in profile.cards"
          :key="card.id"
          :card="card"
        />
    </div>
    <div v-else>
      <div class="empty-box">
        <h2 class="empty-text">{{ profile.name }}님의 포토카드가 없습니다!</h2>
      </div>
    </div>
    <div>
      <div class="pb-2" id="make-card-btn-wrap">
        <router-link :to="{ name: 'customCard' }">
          <button id="make-card-btn">My카드 만들기</button>
        </router-link>
      </div>
      <div id="make-card-btn-wrap">
        <button id="share-card-btn" @click="kakaoLink" class="kakao">카카오톡 공유하기</button>
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
    <div v-if="articlesLength" id="profile-table">
      <table class="table table-dark table-striped table-hover">
        <thead id="table-head">
          <tr>
            <th scope="col">제목</th>
            <th scope="col">내용</th>
            <th scope="col">좋아요</th>
          </tr>
        </thead>
        <tbody v-for="article in profile.articles" :key="article.pk">
          <tr>
            <td scope="row"><router-link :to="{ name: 'article', params: {articlePk: article.id} }" id="td-text">{{ article.title }}</router-link></td>
            <td><router-link :to="{ name: 'article', params: {articlePk: article.id} }" id="td-text">{{ article.content }}</router-link></td>
            <th>{{ article.like_users.length }}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="empty-box">
        <h2 class="empty-text">{{ profile.name }}님이 작성한 게시글이 없습니다!</h2>
      </div>
    </div>

    <hr>

    <button 
      v-if="isLoggedIn && currentUser.username === profile.username" 
      id="delete-count-btn"
      @click="onDeleteButton"
    >회원탈퇴</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SmallMovieVue from '@/components/SmallMovie.vue'
import MovieCardVue from '@/components/MovieCard.vue'
import swal from 'sweetalert'

export default {
  name:"profileView",
  data () {
    return {
      img: this.profile?.profile_image,
    }
  },
  components: {
    SmallMovieVue,
    MovieCardVue,
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
    cardsLength () {
      return this.profile.cards?.length
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
    ...mapActions(['fetchProfile', 'followYou', 'changeProfileImage', 'deleteUser',]),
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
    },
    onDeleteButton () {
      swal({
        title: '회원탈퇴',
        text: '정말 탈퇴하시겠습니까?',
        icon: 'warning',
        buttons: ['아니오', '네'],
      })
        .then(result => {
          if (result) {
            swal({
              text: "'회원탈퇴' 를 입력해주세요",
              content: {
                element: 'input',
                attributes: {
                  placeholder: '회원탈퇴',
                },
              },
              buttons: ['취소', '확인']
            })
              .then(result => {
                if (result === '회원탈퇴') {
                  this.deleteUser(this.currentUser.username)
                }
              })
          }
        })
    },
    kakaoLink() {
      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: 'BEF 나만의 무비카드 공유하기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        },
        serverCallbackArgs: {
          key: 'value'
        }
      })
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
  align-content: center;
}

.follow-button {
  width: 30%;
  height: 30px;
  margin: 15px auto 15px auto;
}

.following {
  background-color: rgba(2,126,251,1);
  border: 0px;
  border-radius: 10px;
  color: white;
}

.unfollowing {
  background-color:#F82F62;
  color: snow;

  border: 0px;
  border-radius: 10px;
}

.following:hover {
  border: 1px solid white;
}

.unfollowing:hover {
  border: 1px solid white;
}

.change-button {
  width: 50%;
  height: 30px;
  margin: 15px auto 15px auto;
  background-color: #F82F62;
  color: white;
  border: 0px;
  border-radius: 10px;
}

.nickname-button {
  width: 100px;
  height: 30px;
  margin: auto;
  background-color:  #494949;
  color: white;
  font-size: 16px;
  border: 0px;
  border-radius: 5px;
}

.nickname-button:hover {
  border: 2px solid #fff;
}


.back-button {
  width: 24%;
  height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  background-color: #f187a2;
  color: white;
  margin-right: 1%;
  border: 0px;
  border-radius: 10px;
}

.back-button:hover {
  background-color: #F82F62;
}

.confirm-button {
  width: 24%;
  height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: 1%;
  background-color: #f187a2;
  color: white;
  border: 0px;
  border-radius: 10px;
}

.confirm-button:hover {
  background-color: #F82F62;
}

.change-button:hover {
  background-color: #F82F62;
}

.change-button2 {
  z-index: 0;
  display: inline-block;
  width: 50%;
  background: rgba(2,126,251,1);
  cursor: pointer;
  padding: auto;
  margin: auto;
  height: 34px;
  color: white;
  border: 0px;
  border-radius: 10px;
  line-height: 28px;
  text-align: center;
  font-size: 1rem;
}

.change-button2:hover {
  border: 2px solid #FFF;
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
  background: #F82F62;
  cursor: pointer;
  padding: auto;
  margin: auto;
  height: 34px;
  font-weight: bold;
  color: white;
  border: 0px;
  border-radius: 10px;
  line-height: 28px;
}

.button-wrapper span.label:hover {
  border: 2px solid #fff;
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

#td-text {
  text-decoration-line: none;
  color: white;
}
#delete-count-btn{
  z-index: 1000;
  background-color: #494949;
  color: white;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  font-size: 15px;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .delete-count-btn {
    transition: none;
  }
}
#delete-count-btn:hover {
  border: 1px solid white;
}
#movie-card-btn {
  position: relative;
  left: 40%;
  display: inline;
  padding: 12px;
}
#movie-card-btn {
  width: 120px;
  margin: auto;
  background-color:  #494949;
  color: white;
  font-size: 16px;
  border: 0px;
  border-radius: 5px;
}

#movie-card-btn:hover {
  border: 2px solid #fff;
}

#movie-card-text {
  text-decoration: none;
  color: white;
}
.table-dark {
  --bs-table-bg:  #111111;
  --bs-table-striped-bg:  #111111;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #373b3e;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #323539;
  --bs-table-hover-color: #fff;
  color: rgb(214, 214, 214);
  border-color: #373b3e;
}
#profile-table {
  width: 90%;
  margin: auto;
}
#share-card-btn{
  z-index: 1000;
  background-color: #ffa600;
  color: white;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  font-size: 15px;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .share-card-btn {
    transition: none;
  }
}
#share-card-btn:hover {
  border: 1px solid white;
}
#make-card-btn{
  z-index: 1000;
  background-color: #F82F62;
  color: white;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  font-size: 15px;
  border-radius: 0.25rem;
  padding: 0.5rem 1.6rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .make-card-btn {
    transition: none;
  }
}
#make-card-btn:hover {
  border: 1px solid white;
}
#make-card-btn-wrap {
  width: 95%;
  display: flex;
  justify-content: flex-end;
}
</style>