<template>
    <form class="post-create">
        <div class="field">
        <textarea   v-model="text"
                    v-auto-expand
                    class="textarea textarea-post"
                    placeholder="Write a post"
                    rows="1"></textarea>
        <button @click.prevent="createPost" :disabled="!text" class="button is-primary m-t-sm">Send</button>
        </div>
    </form>
</template>

<script>
import autoExpand from '../directives/autoExpand'
export default {
    props:{
      threadId:{
        type: String,
        required:true
      }
    },
    directives:{autoExpand},
    data() {
      return {
        text : null  
      }
    },
    methods: {
      createPost(){
        this.$store.dispatch('threads/sendPost',{text:this.text,threadId:this.threadId})
        .then(()=>{
          this.text = null
        })
      }
    },
}
</script>

<style scoped lang="scss">
// Post Create Input START
  .textarea-post {
    padding-bottom: 30px;
  }
  .post-create {
    margin-bottom: 15px;
  }
  // Post Create END
</style>