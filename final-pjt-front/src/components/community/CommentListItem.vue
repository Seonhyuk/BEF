<template>
  <div id="comment-wrap">
    <hr>
    <div>
      <ul class="comment-list-item">
        <div class="d-flex justify-content-start mt-3">
          <img v-if="comment.user.profile_image" :src="comment.user.profile_image" alt="" class="profile-image" id="profile-image-true">
          <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" class="profile-image">
          <router-link id="comment-user" :to="{ name: 'profile', params: { username: comment.user.username } }" class="mx-2 mt-1">
            {{ comment.user.name }} ({{ comment.user.username }})
          </router-link> 
        </div>
        <div class="mb-2">
          <p id="comment-created-time" class="my-1">{{ commentDate }}</p>
          <p id="comment-content" v-if="!isEditing" class="mt-3 mb-5"><br>{{ payload.content }}</p>


          <div id="editing">
            <span v-if="isEditing">
              <input type="text" v-model="payload.content" class="form-control" id="edit-comment-form">
              <button id="comment-btn" @click="onUpdate" class="mx-2">완료</button>
              <button id="comment-btn" @click="switchIsEditing" >취소</button>
            </span>
          </div>

          <div id="un-editing">
            <span v-if="currentUser.username === comment.user.username && !isEditing">
              <button id="comment-btn" @click="switchIsEditing" class="mx-2">수정</button>
              <button id="comment-btn" @click="deleteComment(payload)">삭제</button>
            </span>
          </div>
        </div>
      </ul>

    </div>
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
    commentDate() {
      let date = this.comment.created_at.substring(0,10)
      return date
    }
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
.comment-list-item{
  margin: 0;
}

#comment-user {
  text-decoration: none;
  text-align: left;
  color: rgb(173, 173, 173);
  display: inline;
}

.form-control {
  display: inline-block;
  width: 80%;
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
#profile-image-true{
  border-radius: 50%;
}
.profile-image {
  width: 25px;
  height: 25px;
  overflow: hidden;
  object-fit: cover;
  float: left;
}
#un-editing {
  width: 30%;
  justify-content: start;
  align-content: flex-start;
}
#comment-created-time {
  text-align: start;
  color: rgb(173, 173, 173);
}
#comment-content {
  text-align: start;
  margin: 0;
  line-height: 1px;
}
#un-editing {
  margin-left: 78%;
}
#editing {
  justify-content: end;
  align-content: flex-end;
  width: 100%;
}
#comment-btn{
  z-index: 1000;
  background-color: #444444;
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
  font-size: 15px;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .comment-btn {
    transition: none;
  }
}
#comment-btn:hover {
  border: 1px solid white;
}

</style>