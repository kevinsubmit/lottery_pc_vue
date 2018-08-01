<template>
<div class="main">
    <my-header :updateMoney="updateMoney"></my-header>
    <div class="clic" @click="ljlq"></div>
</div>

</template>

<script>
import myHeader from '../../components/hgHeader'
export default {
   components: {
    myHeader
  },
  methods: {
    ljlq() {
      let params = {};
      
      this.$http
        .post(
          "/DepositActivity/getBonusesYesterday",
          JSON.stringify(params)
        )
        .then(res => {
          if (res.data.msg === 4001) {
            this.$swal({
              text: "请登录正式账号",
              type: "error",
              confirmButtonText: "关闭"
            });
          }
          if (res.data.msg === 2006) {
            this.$swal({
              text: res.data.info,
              type: "success",
              confirmButtonText: "关闭"
            });
          } else if (res.data.msg === 7001) {
            this.$swal({
              text: res.data.info,
              type: "error",
              confirmButtonText: "关闭"
            });
          }
        });
    }
  }
};
</script> 
<style>
.main{
    height: 1734px!important;
    background:url(/images/movable_pc/ly/promo4.jpg) no-repeat;
    background-size:100% 100%;
    position: relative;
    min-width: 1200px;
}
.clic{
    display:inline-block;
    width: 26%;
    height: 70px;
    position: relative;
    border-radius: 1.3rem;
    top:1621px;
    left:11px;
}
</style>

