<template>
  <div class="container mt-5">
    <div class="row">
      <!-- 랭킹-->
      <div id="ranking-wrap" class="col-12 col-lg-3">
        <h5 id="hot-topic-h6">BEST BEF</h5>
        <div id="most-like" class="col-12 col-lg-6">
          <p id="most-article-text" class="pt-3">좋아요 TOP5🏆</p>
          <hr id="most-article-text">
          <p v-if="mostLikedUsers[0]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[0]} }" id="most-article-text"><p>1등 {{ mostArticle[0]}} 님</p></router-link></p>
          <p v-else id="most-article-text">1등 아직 없어요😅</p>
          <p v-if="mostLikedUsers[1]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[1]} }" id="most-article-text"><p>2등 {{ mostArticle[1]}} 님</p></router-link></p>
          <p v-else id="most-article-text">2등 아직 없어요😅</p>
          <p v-if="mostLikedUsers[2]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[2]} }" id="most-article-text"><p>3등 {{ mostArticle[2]}} 님</p></router-link></p>
          <p v-else id="most-article-text">3등 아직 없어요😅</p>
          <p v-if="mostLikedUsers[3]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[3]} }" id="most-article-text"><p>4등 {{ mostArticle[3]}} 님</p></router-link></p>
          <p v-else id="most-article-text">4등 아직 없어요😅</p>
          <p v-if="mostLikedUsers[4]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[4]} }" id="most-article-text"><p>5등 {{ mostArticle[4]}} 님</p></router-link></p>
          <p v-else id="most-article-text">5등 아직 없어요😅</p>
        </div>
        <div id="most-article" class="col-12 col-lg-6">
          <p id="most-article-text" class="pt-3">게시글 TOP5🏆</p>
          <hr id="most-article-text">
          <p v-if="mostArticle[0]"><router-link :to="{ name: 'profile', params: {username: mostArticle[0]} }" id="most-article-text"><p>1등 {{ mostArticle[0]}} 님</p></router-link></p>
          <p v-else id="most-article-text">1등 아직 없어요😅</p>
          <p v-if="mostArticle[1]"><router-link :to="{ name: 'profile', params: {username: mostArticle[1]} }" id="most-article-text"><p>2등 {{ mostArticle[1]}} 님</p></router-link></p>
          <p v-else id="most-article-text">2등 아직 없어요😅</p>
          <p v-if="mostArticle[2]"><router-link :to="{ name: 'profile', params: {username: mostArticle[2]} }" id="most-article-text"><p>3등 {{ mostArticle[2]}} 님</p></router-link></p>
          <p v-else id="most-article-text">3등 아직 없어요😅</p>
          <p v-if="mostArticle[3]"><router-link :to="{ name: 'profile', params: {username: mostArticle[3]} }" id="most-article-text"><p>4등 {{ mostArticle[3]}} 님</p></router-link></p>
          <p v-else id="most-article-text">4등 아직 없어요😅</p>
          <p v-if="mostArticle[4]"><router-link :to="{ name: 'profile', params: {username: mostArticle[4]} }" id="most-article-text"><p>5등 {{ mostArticle[4]}} 님</p></router-link></p>
          <p v-else id="most-article-text">5등 아직 없어요😅</p>
        </div>
      </div>

      <!-- 게시글들 -->
      <div id="article-wrap" class="col-12 col-lg-9">
      <h5 id="hot-topic-h6">BEF TOPIC</h5>
      <table class="table table-dark table-striped table-hover">
        <thead id="table-head">
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">내용</th>
            <th scope="col">작성자</th>
            <th scope="col">좋아요</th>
            <th scope="col">댓글수</th>
          </tr>
        </thead>
        <tbody v-for="article in articles" :key="article.pk">
          <tr>
            <th scope="row">{{ article.pk }}</th>
            <td><router-link :to="{ name: 'article', params: {articlePk: article.pk} }" id="td-text">{{ article.title }}</router-link></td>
            <td><router-link :to="{ name: 'article', params: {articlePk: article.pk} }" id="td-text">{{ article.content }}</router-link></td>
            <td><router-link :to="{ name: 'profile', params: {username: article.user.username} }" id="td-text">{{ article.user.username }}</router-link></td>
            <th>{{ article.like_count}}</th>
            <th>{{ article.comment_count}}</th>
          </tr>
        </tbody>
      </table>
      
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'articleNew'}"><button class="btn btn-sm" id="create-btn" @click="onClick">글쓰기</button></router-link>
      </div>



      </div>

      <!-- 랭킹 -->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
 

  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters(['articles', 'isLoggedIn', 'mostLikedUsers']),
      articleCnt () {
        return this.articles.length
      },
      mostArticle() {
        let getArticles = []
        for(let article of this.articles) {
          getArticles.push(article.user)
        }
        let users = []
        for(let user of getArticles) {
          users.push(user.username)
        }
        let result = {}
        users.forEach((x) => {
          result[x] = (result[x] || 0)+1 
        })
        console.log(result)
        let mostResult = []
        let rank1 = Object.keys(result)[0]
        mostResult.push(rank1)
        let rank2 = Object.keys(result)[1]
        mostResult.push(rank2)
        let rank3 = Object.keys(result)[2]
        mostResult.push(rank3)
        let rank4 = Object.keys(result)[3]
        mostResult.push(rank4)
        let rank5 = Object.keys(result)[4]
        mostResult.push(rank5)
        console.log(mostResult)
        return mostResult
      },
    },
    methods: {
      ...mapActions(['fetchArticles', 'setSharedPoster', 'setSharedTitle', 'setMostLikedUsers']),
      onClick () {
        this.setSharedPoster('')
        this.setSharedTitle('')
      }
    },
    created() {
      if (!this.isLoggedIn) {
        console.log(this.isLoggedIn)
        this.$router.push({ name: 'login'})
      } else {
        this.fetchArticles()
      }
      this.setMostLikedUsers()
      console.log(this.mostLikedUsers)
    },
  }
</script>

<style scoped>
#hot-topic-h6 {
  color: #F82F62;
}

#one-card {
  float: left;
  width: 300px;
  height: 150px;
}

#create-btn {
  background-color: #F82F62;
  color: white;
}

#td-text {
  text-decoration-line: none;
  color: white;
}

#most-article {
  height: 270px;
  display: inline-block;
  background-color: #111111;
  border-radius: 2px;
  border: 1px solid rgb(43, 43, 43);
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
#most-like {
  height: 270px;
  display: inline-block;
  background-color: #111111;
  border-radius: 2px;
  border: 1px solid rgb(43, 43, 43);
  border-bottom-right-radius: 0;
  border-top-right-radius: 0; 
}
#most-article-text {
  text-decoration: none;
  color: rgb(214, 214, 214);
}
#table {
  color: rgb(214, 214, 214);
}
</style>
