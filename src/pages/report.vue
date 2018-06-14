<template> 
<div class="content rules-page"> 
  <nav class="top-nav"> 
    <h3 class="title">{{title}}</h3>
  </nav> 
</div>
</template>


<script> 
export default {

  data() {
    return {
      title: '报表查询'
    }
  }
}
</script>
<style scoped>
.rules-page {
    background-color: #fff;
    min-height: 700px;
}
h3.title {
    font-size: 16px;
    text-align: left;
    color: #fff;
    height: 40px;
    line-height: 40px;
    /*background-color: #eee;*/
    /*border-bottom: 1px solid #ddd;*/
    text-indent: 15px;
}  

 
</style>
