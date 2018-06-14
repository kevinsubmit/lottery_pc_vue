<template> 
<div class="content notices-page"> 
  <div class="notices">
    <div class="noticesBox">
      <promo01></promo01>
    </div>
  </div>
</div>
</template>

<script>
import promo01 from './promo01'
export default {
  components: {
    promo01
  }
}
</script> 

<style>
  .notices .btn-promo {
    background-color: #e03f5e;
    border-color: #e03f5e;
    box-shadow: 2px 2px 5px #e03f5e;
  }
</style>
