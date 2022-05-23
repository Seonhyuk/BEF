<template>
  <div class="mt-5" id="article-wrap">
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
    <router-link :to="{ name: 'articleNew'}"><button class="btn btn-sm" id="create-btn">글쓰기</button></router-link>
  </div>



  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
 

  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters(['articles', 'isLoggedIn']),
      articleCnt () {
        return this.articles.length
      }
    },
    methods: {
      ...mapActions(['fetchArticles'])
    },
    created() {
    if (!this.isLoggedIn) {
      console.log(this.isLoggedIn)
      this.$router.push({ name: 'login'})
    } else {
      this.fetchArticles()
    }
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
#article-wrap {
  width: 80%;
  margin: auto;
}
</style>
