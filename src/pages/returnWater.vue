<template>
  <div class="main_fs">
    <my-header :updateMoney="updateMoney"></my-header> 
      <div class="aanniu" @click="applyLastYearDeposit"></div>
      <div class="aanniu" style="margin-left:2.6%" @click="applyhalf"></div>
  </div>
</template>

<script>
import myHeader from '../components/hgHeader'
export default {
   components: {
    myHeader
  },
  computed: {
    setShow() {
      return this.current === 1 ? true : false;
    }
  },
  data() {
    return {
      current: -1
    };
  },
  methods: {
    applyLastYearDeposit() {
      
      let params = {};
      
      this.$http
        .post(
          "/DepositActivity/getTodaySingleDepositCashBack",
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
    },
    applyhalf() {
      this.$swal({
        text: "请您联系客服彩金专员领取",
        type: "success",
        confirmButtonText: "关闭"
      });
    },
    showDeatil(obj) {
      if (this.current === obj) {
        this.current = -1;
      } else {
        this.current = obj;
      }
    }
  }
};
</script> 
<style>
  .main_fs{
    height:1520px;
    min-width:1200px;
    position: relative;
    background:url(/static/images/uc/fanshui.jpg)no-repeat;
    background-size:100% 97%;
    background-position:0 3rem;
  }
  .aanniu{
    display:inline-block;
    width:13%;
    height:69px;
    left:-2.1%;
    top:974px;
    cursor:pointer;
    position: relative;
  }
</style>

