<template>
<div style='height:100%;position:fixed;text-align:center;width:100%;background:#F7B20D;'>
<my-header></my-header>
    <img src="/static/images/common/activity.jpg" alt="" height='100%'>
</div>
  
</template>

<script>
import myHeader from '../components/hgHeader'
export default {
  data () {
    return {
      getApiName: getApiName(),
      open:false,
      open1:false
    }
  },
  components: {
    myHeader
  }
}
</script>

<style scoped>

</style>
