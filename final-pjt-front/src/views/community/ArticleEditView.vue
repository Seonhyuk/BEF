<template>
  <div id="edit-wrap">
    <h1 id="edit-article-title" class="mt-5">EDIT</h1>
    <article-form v-if="isArticle" :article="article" action="update">

    </article-form>
  </div>

</template>

<script>
import ArticleForm from '@/components/community/ArticleForm.vue'

import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AritcleEditView',
    components: { ArticleForm },
    computed: {
      ...mapGetters(['article', 'isArticle',])
    },
    methods: {
      ...mapActions(['fetchArticle'])
    },
    created() {
      this.fetchArticle(this.$route.params.articlePk)
    },
  }
</script>

<style scoped>
#edit-article-title {
  color: #F82F62;
}
#edit-wrap {
  width: 80%;
  margin: auto;
}
</style>
