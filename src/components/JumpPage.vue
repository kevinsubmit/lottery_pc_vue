<template>
  <div>
    跳转链接中....
  </div>
</template>

<script>
export default {
  mounted(){
    window.location.href = this.$route.query.playUrl;
  }
}
</script>

<style>

</style>
