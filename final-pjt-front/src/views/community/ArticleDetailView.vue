<template>
  <div>
    <div class="mt-5" id="article-wrap">
      <div id="article-author">
        <div>
          <h1 class="mb-5 pt-3">{{ article.title }}</h1>
        </div>
        <div>
          <div class="mx-3">
            <img v-if="article.user.profile_image" :src="article.user.profile_image" alt="" class="profile-image" id="profile-image-true">
            <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" class="profile-image">
          </div>
          <router-link :to="{ name: 'profile', params: {username: article.user.username} }" id="article-user-name"><p class="d-flex justify-content-start mx-1">{{ article.user.name }} ({{ article.user.username }})</p></router-link>
          <p id="article-created-text" class="mx-3">{{  articleDate }}</p>
        
        <hr>
        </div>
        <div class="article-content-wrap">
          <h5 v-if="article.shared_poster.length > 10" class="mt-4 mb-4">🏆{{ article.user.name }} 님이 뽑은 인생영화🏆</h5>
          <div id="poster-wrap" v-if="article.shared_poster">
            <img :src="`https://image.tmdb.org/t/p/original/${article.shared_poster}`" alt="" id="poster">
          </div>
          <div id="article-content">
            <p class="mx-3 mt-2">{{ article.content }}</p>
          </div>

        </div>
        <!-- Article Edit/Delete UI -->


      </div>
        <div v-if="isAuthor" class="d-flex justify-content-end" id="author-control">
          <router-link :to="{ name: 'articleEdit', params: { articlePk } }">
            <button id="create-article-btn" class="mx-2">Edit</button>
          </router-link>
          <button id="create-article-btn" @click="deleteArticle(articlePk)">Delete</button>
        </div>
      <!-- Article Like UI -->
      <!-- 자기글에는 좋아요를 누를 수 없음 -->
      <!-- Comment UI -->


    <div class="d-flex justify-content-between">
      <router-link :to="{ name:'articles'}"><button id="create-article-btn44" >목록으로</button></router-link>
      <button id="like" class="tweet-heart" @click="likeArticle(articlePk)">{{ likeCount }}</button>
    </div>

      <div class="mt-5">
        <comment-list :comments="article.comments"></comment-list>
      </div>
    </div>

 
 
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentList from '@/components/community/CommentList.vue'
  




  export default {
    name: 'ArticleDetail',
    components: { CommentList, },
    data() {
      return {
        articlePk: this.$route.params.articlePk,
      }
    },
    computed: {
      ...mapGetters(['isAuthor', 'article', 'isLoggedIn']),
      likeCount() {
        return this.article.like_users?.length
      },
      articleDate() {
        let date = this.article.created_at.substring(0,10)
        return date
      }
    },
    methods: {
      ...mapActions([
        'fetchArticle',
        'likeArticle',
        'deleteArticle',
      ]),
    },
    created() {
      if (!this.isLoggedIn) {
      this.$router.push({ name: 'login'})
    }
      this.fetchArticle(this.articlePk)
    },
    mounted() {
      const $like = document.getElementById('like');
      $like.addEventListener('click', () => {
      $like.classList.toggle('is-liked');
    });
    }
  }
</script>

<style scoped>
#article-user-name {
  text-decoration-line: none;
  color: rgb(201, 198, 198);
  float: left;
}
#article-created-text {
  text-align: end;
  color: rgb(201, 198, 198);
}

#article-content {

  height: 150px;
  text-align: start;
  border-radius: 10px;

}
#create-article-btn{
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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

@media (prefers-reduced-motion: reduce) {
  .create-article-btn {
    transition: none;
  }
}
#create-article-btn:hover {
  border: 1px solid white;
}
#create-article-btn44{
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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  margin-top: 42px;
}

@media (prefers-reduced-motion: reduce) {
  .create-article-btn44 {
    transition: none;
  }
}
#create-article-btn44:hover {
  border: 1px solid white;
}
#app1 {
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.tweet-heart {
  background-color: transparent;
  background-image: url("https://abs.twimg.com/a/1492302959/img/animations/web_heart_animation.png");
  border: none;
  cursor: pointer;
  height: 100px;
  outline: none;
  width: 100px;
  transition: all ease-out 800ms;
  color: white;
}
.tweet-heart.is-liked {
  animation-name: like;
  animation-duration: 1200ms;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}

@keyframes like {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: right;
  }
}
#article-wrap {
  width: 70%;
  height: 50vh;
  margin: auto;
  margin-bottom: 50px;
}

#poster-wrap {
  width: 50%;
  height: 70%;
  margin: auto;
  margin-bottom: 50px;
}
#poster {
  width: 50%;
}
#article-content {
  font-size: 20px;
}
#profile-image-true{
  border-radius: 50%;
}
.profile-image {
  width: 25px;
  height: 25px;
  overflow: hidden;
  object-fit: cover;
  float: left;
}
#author-control {
  margin-top: 2%;
  margin-bottom: 2%;
}
#article-author {
  background-color: rgb(24, 24, 24);
  border-radius: 10px;
}
</style>
