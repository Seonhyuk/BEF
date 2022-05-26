<template>
  <div class="comment-list">
    <comment-list-item v-for="comment in comments" :comment="comment" :key="comment.pk"></comment-list-item>     


    <comment-list-form></comment-list-form>
  </div>
</template>

<script>
import CommentListItem from '@/components/community/CommentListItem.vue'
import CommentListForm from '@/components/community/CommentListForm.vue'


// import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'CommentList',
  components: { CommentListItem, CommentListForm },
  props: { comments: Array },
}
</script>

<style scoped>
.comment-list {
  border-radius: 10px;
}
</style>