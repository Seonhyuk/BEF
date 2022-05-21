<template>
  <div>
    <h1 id="new-article-title" class="mt-5">New Article</h1>
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
    }
  }
</script>

<style>
#new-article-title {
  color: #ec1266;
}

</style>
