<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <input v-model="newArticle.title" type="text" id="article-title" class="form-control" placeholder="제목"/>
    </div>
    <div>
      <textarea v-model="newArticle.content" type="text" id="article-content" class="form-control" placeholder="내용"></textarea>
    </div>
    <div class="mt-3 d-flex justify-content-end">
      <button id="create-article-btn">{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

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
        }
      }
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
  }
</script>

<style scoped>

#article-content {
  height: 300px;
}
#create-article-btn{
  z-index: 1000;
  background-color: #ec1266;
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
