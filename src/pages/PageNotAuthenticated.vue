<template>
  <div class="container">
    <ErrorView :title="'Ooooops, you are non authenticated to visit this page , please login'"
               :status="'401'"
               :navigateToPage="'PageLogin'"
               :navigateToText="'Navigate to Login page'" />
  </div>
</template>

<script>
  import ErrorView from '@/components/ErrorView'
  export default {
    components: {
      ErrorView
    }
  }
</script>

<style scoped>
</style>