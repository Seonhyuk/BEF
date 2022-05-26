<template>
  <form @submit.prevent="onSubmit">
    <h5 v-if="newArticle.shared_poster" class="mt-5">&#x1F389;우승작 공유하기!&#x1F389;</h5>
    <img v-if="newArticle.shared_poster" :src="`https://image.tmdb.org/t/p/original/${newArticle.shared_poster}`" alt="" class="poster mb-5">
    <div class="mb-3">
      <input v-model="newArticle.title" type="text" id="article-title" class="form-control" placeholder="제목"/>
    </div>
    <div>
      <textarea v-model="newArticle.content" type="text" id="article-content" class="form-control" placeholder="내용"></textarea>
    </div>
    <div class="mt-3 d-flex justify-content-end">
      <router-link :to="{ name:'articles'}"><button id="create-article-btn">목록으로</button></router-link>
      <button id="create-article-btn" class="mx-3">{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ArticleForm',
    props: {
      article: Object,
      action: String,
    },
    data() {
      return {
        newArticle: {
          title: this.article.title,
          content: this.article.content,
          shared_poster: '',
        }
      }
    },
    computed: {
      ...mapGetters(['sharedPoster', 'sharedTitle',]),
    },
    methods: {
      ...mapActions(['createArticle', 'updateArticle']),
      onSubmit() {
        if (this.action === 'create') {
          this.createArticle(this.newArticle)
        } else if (this.action === 'update') {
          const payload = {
            pk: this.article.pk,
            ...this.newArticle,
          }
          this.updateArticle(payload)
        }
      },
    },

    created () {
      if (this.sharedPoster) {
        this.newArticle.shared_poster = this.sharedPoster
        this.newArticle.title = this.sharedTitle
      }
    }

  }
</script>

<style scoped>

.poster {
  height: 400px;
  width: 300px;
}


#article-content {
  height: 300px;
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
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .create-article-btn {
    transition: none;
  }
}
#create-article-btn:hover {
  border: 1px solid white;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  background-clip: padding-box;
  border: 1px solid rgb(49, 48, 48);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control:focus {
  color: #ffffff;
  background-color: rgb(49, 48, 48);
  border-color: #ffffff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
