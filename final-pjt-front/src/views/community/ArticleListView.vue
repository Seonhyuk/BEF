<template>
  <div>
    <div id="wrap1">
      <div id="wrap2">
        <div id="wrap3">
          <video autoplay muted>
            <source :src="videoList[num]" type="video/mp4">
          </video>
          <strong class="movieSelection_title" id="ctl00_PlaceHolderContent_AD_MOVIE_NM">{{ videoTitle[num] }}</strong>
          <span id="ctl00_PlaceHolderContent_AD_DESCRIPTION_NM">
            {{ videoText[num*2]}} <br> {{ videoText[num*2+1]}}
          </span>
          <div class="movieSelection_video_controller_wrap">
            <a id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL" href="http://www.cgv.co.kr/ticket/?MOVIE_CD=20029650&MOVIE_CD_GROUP=20029650">CGV</a>
          </div>
          <div class="movieSelection_video_controller_wrap1">
            <a id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL1" href="https://www.lottecinema.co.kr/NLCHS/Ticketing?movieCd=18677&movieName=%EA%B7%B8%EB%8C%80%EA%B0%80%20%EC%A1%B0%EA%B5%AD">롯데시네마</a>
          </div>
          <div class="movieSelection_video_controller_wrap2">
            <a id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL2" href="https://www.megabox.co.kr/booking">메가박스</a>
          </div>
        </div>
      </div>

    </div>

    <div class="container mt-5">
      <div class="row">
        <!-- 랭킹-->
        <div id="ranking-wrap" class="col-12 col-lg-3">
          <h5 id="hot-topic-h6">BEST BEF &#128129;</h5>
          <div id="most-like" class="col-12 col-lg-6">
            <p id="most-article-text" class="pt-3">좋아요 TOP5🏆</p>
            <hr id="most-article-text">
            <p v-if="mostLikedUsers[0]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[0]} }" id="most-article-text"><p>1등 {{ mostLikedUsers[0]}} 님</p></router-link></p>
            <p v-else id="most-article-text">1등 아직 없어요😅</p>
            <p v-if="mostLikedUsers[1]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[1]} }" id="most-article-text"><p>2등 {{ mostLikedUsers[1]}} 님</p></router-link></p>
            <p v-else id="most-article-text">2등 아직 없어요😅</p>
            <p v-if="mostLikedUsers[2]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[2]} }" id="most-article-text"><p>3등 {{ mostLikedUsers[2]}} 님</p></router-link></p>
            <p v-else id="most-article-text">3등 아직 없어요😅</p>
            <p v-if="mostLikedUsers[3]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[3]} }" id="most-article-text"><p>4등 {{ mostLikedUsers[3]}} 님</p></router-link></p>
            <p v-else id="most-article-text">4등 아직 없어요😅</p>
            <p v-if="mostLikedUsers[4]"><router-link :to="{ name: 'profile', params: {username: mostLikedUsers[4]} }" id="most-article-text"><p>5등 {{ mostLikedUsers[4]}} 님</p></router-link></p>
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
          <div class="col-12 col-lg-12" id="community-movie-art">
            <h5 id="hot-topic-h6" class="mt-4">DAILY BOX OFFICE &#127916;</h5>
            <div id="insight-article-wrap">
              <h6 class="mt-2">1위 {{ dayMovies[0].movieNm }}</h6>
              <span>개봉일 {{ dayMovies[0].openDt}}</span><br>
              <span>누적관객</span>
              <span class="count">{{ dayMovies[0].audiAcc}}</span>
              <span>명</span>
              <hr>
              <h6 class="mt-2">2위 {{ dayMovies[1].movieNm }}</h6>
              <span>개봉일 {{ dayMovies[1].openDt}}</span><br>
              <span>누적관객</span>
              <span class="count">{{ dayMovies[1].audiAcc}}</span>
              <span>명</span>
              <hr>
              <h6 class="mt-2">3위 {{ dayMovies[2].movieNm }}</h6>
              <span>개봉일 {{ dayMovies[2].openDt}}</span><br>
              <span>누적관객</span>
              <span class="count">{{ dayMovies[2].audiAcc}}</span>
              <span>명</span>
              <hr>
              <h6 class="mt-2">4위 {{ dayMovies[3].movieNm }}</h6>
              <span>개봉일 {{ dayMovies[3].openDt}}</span><br>
              <span>누적관객</span>
              <span class="count">{{ dayMovies[3].audiAcc}}</span>
              <span>명</span>
              <hr>
              <h6 class="mt-2">5위 {{ dayMovies[4].movieNm }}</h6>
              <span>개봉일 {{ dayMovies[4].openDt}}</span><br>
              <span>누적관객</span>
              <span class="count">{{ dayMovies[4].audiAcc}}</span>
              <span>명</span>
            </div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'
import _ from 'lodash'

export default {
  name: 'ArticleList',
  computed: {
    ...mapGetters(['articles', 'isLoggedIn', 'mostLikedUsers', 'dayMovies']),
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
        result[x] = (result[x] || 0) + 1 
      })

      const sub = []

      for (let name of Object.keys(result)) {
        sub.push([name, result[name]])
      }
      
      sub.sort(function(a, b) {
        return b[1] - a[1]
      })

      let mostResult = []
      for (let n of sub) {
        mostResult.push(n[0])
      }

      return mostResult
    },
  },
  methods: {
    ...mapActions(['getMoviedata', 'fetchArticles', 'setSharedPoster', 'setSharedTitle', 'setMostLikedUsers']),
    onClick () {
      this.setSharedPoster('')
      this.setSharedTitle('')
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'login'})
    } else {
      this.fetchArticles()
    }
    this.getMoviedata()
    this.setMostLikedUsers()
    this.num = _.random(this.videoList.length-1)
  },
  mounted() {
    $(".count").each(function () {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text()
          },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          }
        }
      );
    });
  },
  data() {
    return {
      num : 0,
      videoList: ['https://adimg.cgv.co.kr/images/202205/TheRedHerring/0526_TheRedHerring_1080x608.mp4', 'http://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/202205/18632_301_1.mp4', 'http://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/202205/18538_301_1.mp4'],
      videoText: ['지금 여기 이곳에 살고 있는', '이제, 그대가 조국 5.25 대개봉', '"느낌 오지? 이 놈 잡아야 하는 거"', '범죄도시2 5월.18일 대개봉', '지금껏 본 적 없는 마블의 극한 상상력!', '5월, 광기의 멀티버스가 깨어난다!'],
      videoTitle: ['그대가 조국', '범죄도시2', '닥터 스트레인지: 대혼돈의 멀티버스']
    }
  }
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

#community-movie-art {
  margin-top: 10px;
  height: 80%;
}
#insight-article-wrap {
  height: 80%;
  background-color: #111111;
  border-radius: 2px;
  border: 1px solid rgb(43, 43, 43);
}
h6 ~ span {
  font-size: 12px;
  color: rgb(214, 214, 214);
}
#shiva
{
  width: 100px;
	height: 100px;
	background: red;
	-moz-border-radius: 50px;
	-webkit-border-radius: 50px;
	border-radius: 50px;
  float:left;
  margin:5px;
}
.count
{
  color:white;
  font-size:25px;
}
#talkbubble {
   width: 120px;
   height: 80px;
   background: red;
   position: relative;
   -moz-border-radius:    10px;
   -webkit-border-radius: 10px;
   border-radius:         10px;
  float:left;
  margin:20px;
}
#talkbubble:before {
   content:"";
   position: absolute;
   right: 100%;
   top: 26px;
   width: 0;
   height: 0;
   border-top: 13px solid transparent;
   border-right: 26px solid red;
   border-bottom: 13px solid transparent;
}

#wrap1 {
  position: relative;
  height: 498px;
  background-color: #000;
}

#wrap2 {
  width: 980px;
  height: 100%;
  margin: 0 auto;
}

#wrap3 {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

#wrap1 #wrap2 #wrap3 video {
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(1.65);
  z-index: 1;
}

#wrap1 #wrap2 #wrap3:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(to right, #000 0%, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0) 50%,rgba(0, 0, 0, 0.25) 75%, #000 100%);
  z-index: 2;
}

#ctl00_PlaceHolderContent_AD_MOVIE_NM {
    position: absolute;
    top: 170px;
    left: 0;
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    line-height: 1.450em;
    text-shadow: 2px 2px 4px rgb(0 0 0 / 72%);
    z-index: 2;
    /* animation: tt1 1s 3s ease-in forwards; */
    pointer-events: none;
}

#ctl00_PlaceHolderContent_AD_DESCRIPTION_NM {
  display: -webkit-box;
  overflow: hidden;
  position: absolute;
  top: 239px;
  left: 0;
  max-width: 100%;
  font-size: 20px;
  color: #fff;
  line-height: 1.450em;
  text-overflow: ellipsis;
  z-index: 3;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* animation: tt2 1s 3s ease-in forwards; */
  pointer-events: none;
  text-align: start;
}

.movieSelection_video_controller_wrap {
    display: inline-flex;
    position: absolute;
    top: 315px;
    left: 0px;
    z-index: 4;
}

#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL {
  display: block;
  padding: 10px 18px 10px 15px;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.429em;
  border-radius: 15px;
  background-color: #F82F62;
  text-decoration: none;
  text-align: center;
}
#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL:hover {
  border: 1px solid white;
}

.movieSelection_video_controller_wrap1 {
    display: inline-flex;
    position: absolute;
    top: 315px;
    left: 70px;
    z-index: 4;
}

#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL1 {
  display: block;
  padding: 10px 18px 10px 15px;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.429em;
  border-radius: 15px;
  background-color: #F82F62;
  text-decoration: none;
  text-align: center;
}
#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL1:hover {
  border: 1px solid white;
}
.movieSelection_video_controller_wrap2 {
    display: inline-flex;
    position: absolute;
    top: 315px;
    left: 180px;
    z-index: 4;
}

#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL2 {
  display: block;
  padding: 10px 18px 10px 15px;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.429em;
  border-radius: 15px;
  background-color: #F82F62;
  text-decoration: none;
  text-align: center;
}
#ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL2:hover {
  border: 1px solid white;
}
</style>
