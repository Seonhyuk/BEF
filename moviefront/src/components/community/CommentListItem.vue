<template>
  <div id="comment-wrap">
    <hr>
    <ul class="comment-list-item">
      <div class="d-flex justify-content-start">
        <router-link id="comment-user" :to="{ name: 'profile', params: { username: comment.user.username } }">
          {{ comment.user.username }}
        </router-link> 
      </div>
        <p id="comment-created">{{ comment.created_at }}</p>
        <p id="comment-content" v-if="!isEditing"><br>{{ payload.content }}</p>

      <div id="edit-delete-btn">
        <span v-if="isEditing">
          <input type="text" v-model="payload.content" class="form-control" id="edit-comment-form">
          <button @click="onUpdate" id="comment-edit-btn" class="mx-2">완료</button>
          <button @click="switchIsEditing" id="comment-delete-btn">취소</button>
        </span>

      
        <span v-if="currentUser.username === comment.user.username && !isEditing">
          <button id="comment-edit-btn" @click="switchIsEditing" class="mx-2">수정</button>
          <button id="comment-delete-btn" @click="deleteComment(payload)">삭제</button>
        </span>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListItem',
  props: { comment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        articlePk: this.comment.article,
        commentPk: this.comment.pk,
        content: this.comment.content
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateComment(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style scoped>
#comment-user {
  text-decoration: none;
  text-align: left;
  color: rgb(173, 173, 173);
  display: inline;
}
#comment-content {
  text-align: start;
  font-size: 17px;
  line-height: 1px;
  margin: 0px;
}
#comment-created {
  text-align: start;
  font-size: 13px;
  line-height: 10px;
  color: rgb(173, 173, 173);
}
#edit-delete-btn {
  position: relative;
  top: 10px;
  left: 570px;
}
#comment-edit-btn {
  background: none;
  border: none;
  color: rgb(173, 173, 173);
}
#comment-edit-btn:hover{
  color: #ec1266;
}
#comment-delete-btn {
  background: none;
  border: none;
  color: rgb(173, 173, 173);
}
#comment-delete-btn:hover {
  color: #ec1266;
}
#edit-comment-form {
  width: 1100px;
  position: absolute;
  right: 700px;
  bottom: 4px;
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