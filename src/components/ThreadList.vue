<template>
  <div class="content is-medium">
              <h3 class="title is-3">Threads</h3>
              <div v-for="thread in threads" :key="thread._id" class="box">
                <!-- Thread title -->
                <h4 id="const" class="title is-3">{{ thread.title }}</h4>
                <!-- Create new post, handle later -->
                <PostCreate v-if="canPost" :threadId="thread._id"/>
                <!-- Create new post END, handle later -->
                <!-- Posts START -->
                <article v-for="post in thread.posts" :key="post._id" class="media post-item">
                  <figure class="media-left is-rounded user-image">
                    <p class="image is-32x32">
                      <img class="is-rounded" :src="post.user.avatar">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content is-medium">
                      <div class="post-content">
                        <!-- Post User Name -->
                        <strong class="author">{{ post.user.name }}</strong>
                        {{' '}}
                        <!-- Post Updated at -->
                        <small class="post-time">{{ post.createdAt | fromNow }}</small>
                        <br>
                        <p class="post-content-message">{{ post.text }}</p>
                      </div>
                    </div>
                  </div>
                </article>
                <!-- Posts END -->
              </div>
            </div>
</template>

<script>
import PostCreate from '../components/PostCreate'
export default {
    props:{
        threads:{
            type:Array,
            required:true
        },
        canPost:{
            type:Boolean,
            required : true
        }
    },
    components:{
        PostCreate
    }
}
</script>

<style scoped lang="scss">
// Thread List START
  .content {
    figure {
      margin-bottom: 0;
    }
  }
  .media-content {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px
  }
  .media-left.user-image {
    margin: 0;
    margin-right: 15px;
  }
 
  .media + .media {
    border: none;
    margin-top: 0;
  }
  .post-content {
    margin: 0;
    &-message {
      font-size: 16px;
    }
    .author {
      font-size: 18px;
    }
    .post-time {
      font-size: 16px;
    }
  }
  // Thread List END
</style>