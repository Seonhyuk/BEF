<template>
  <div id="new-article-wrap">
    <h1 id="new-article-title" class="mt-5">공유하기</h1>
    <article-form :article="article" action="create"></article-form>
  </div>
</template>

<script>
import ArticleForm from '@/components/community/ArticleForm.vue'
import { mapGetters } from 'vuex'
  
  export default {
    name: 'AritcleNewView',
    components: { ArticleForm },
    data() {
      return {
        article: {
          pk: null,
          title: '',
          content: '',
        }
      }
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    created() {
      if (!this.isLoggedIn) {
      this.$router.push({ name: 'login'})
    }
    },
    props: ['payload']
  }
</script>

<style scoped>
#new-article-title {
  color: #F82F62;
}
#new-article-wrap {
  width: 80%;
  margin: auto;
}
</style>
