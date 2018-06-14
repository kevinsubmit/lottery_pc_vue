<template>
<div> 
    <div class="newYear2018">
      <my-header :updateMoney="updateMoney"></my-header>  

      <div :class="`promoContent promoContent_${getApiName}`" v-if="getApiName === 'ct'">
          <div class="main"> 
            <div class="btnsPromo">
              <button class="btn-left" @click="getRePacket('/WinloseActivity/todayLose2018LV1')">立即领取</button>
              <button class="btn-right" @click="getRePacket('/WinloseActivity/todayLose2018LV2')">立即领取</button>     
            </div>
          </div>
      </div>

      <div :class="`promoContent promoContent_${getApiName}`" v-if="getApiName === 'uc'">
          <div class="main"> 
            <div class="btnsPromo">
              <button class="btn-top" @click="doSingleDepositUC2018()">立即领取</button>  
              <button class="btn-bottom" @click="getRePacket('/DepositActivity/oneTimeDeposit2018UC')">立即领取</button>  
            </div>
          </div>
      </div>
    </div>
</div>
</template>


<script>
import { Loading } from 'element-ui';
import myHeader from '../components/hgHeader'
export default {
  components: {
    myHeader
  },
  data () {
    return {
      getApiName: getApiName(),
      isShowHb: true,
      updateMoney: false,
      msg: '正在认证，稍等...'
    }
  },
  created () {
    if (sessionStorage.getItem('im_username') === '游客' || !sessionStorage.getItem('im_token')) {
      this.$router.push({
        path: '/home'
      })
    }else{ 
      this.getApiName=='ct'?'':this.chuangguan("/DepositActivity/getSingleDepositUC2018")
    }
  },
  methods: {
    doSingleDepositUC2018(){
      
      let params = {};
      
      this.$http.post("/DepositActivity/doSingleDepositUC2018", JSON.stringify(params)).then(res => {
        if(res.data.msg === 2006){
           this.$swal({
            text: res.data.info,
            type: "success",
            confirmButtonText: "关闭"
          })
        }else if(res.data.msg === 7001){
           this.$swal({
            text: res.data.info,
            type: "error",
            confirmButtonText: "关闭"
          })
        }
      })
    },
    chuangguan (type) {
      let loadingInstance = Loading.service({background:'rgba(0, 0, 0, 0.5)'});
      
      let params = {};
      let apiUrl = type;
      
      this.$http.post(apiUrl, JSON.stringify(params)).then(res => {
        this.isShowHb = false
        loadingInstance.close();
        if (res.data.code === 4001) {
          this.$router.push({
            path: '/home'
          })
        } else if (res.data.code === 0) {
          this.$swal({
            text: res.data.info,
            type: "success",
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
          })
        }else if (res.data.msg === 7001) {
          this.$swal({
            text: res.data.info,
            type: "error",
            confirmButtonText: "关闭"
          })         
        }else {
          let info = ''
          if (res.data.canGetPrize === 1) {
            info = '您当前是第' + res.data.stage + '关,可以领取' + res.data.prize + '元彩金'
          } else if (res.data.canGetPrize === 0) {
            info = '您当前是第' + res.data.stage + '关，暂未达到领取标准'
          } else {
            info = '网络异常，请重试'
          }
          this.$swal({
            text: info,
            type: "error",
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
            loadingInstance.close();
          })
          this.updateMoney = true
        }
      })
      loadingInstance.close();
    },
    getRePacket (type) {
      let loadingInstance = Loading.service({background:'rgba(0, 0, 0, 0.5)'});
      
      let params = {};
      let apiUrl = type;
      
      this.$http.post(apiUrl, JSON.stringify(params)).then(res => {
        this.isShowHb = false
        loadingInstance.close();
        if (res.data.msg === 4001) {
          this.$router.push({
            path: '/home'
          })
        } else if (res.data.msg === 2006) {
          this.$swal({
            text: res.data.info,
            type: "success",
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
          })
          this.updateMoney = true
        } else {
          this.$swal({
            text: res.data.info,
            type: "error",
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
            loadingInstance.close();
          })
        }
      })
      loadingInstance.close();
    }
  }
}
</script> 
 
<style lang="less" rel="stylesheet/less">
@import '../assets/less/variable.less';

.newYear2018 .promoContent {
  width: 100%;
  margin: 0 auto;
  position: relative;
  top: 60px;
  height: 1560px;
  overflow: hidden;
} 
.newYear2018 .promoContent_ct {
  background: url("/static/images/ct/promo/bgNewYear2018.jpg?v=3453235645") no-repeat;
  background-size: contain;
} 
.newYear2018 .promoContent_uc {
  background: url("@{public_img}/images/uc/bgNewYear2018.jpg?v=3453354645") no-repeat;
  background-size: contain;
} 
.promoContent .main {
  width: 1000px;
  margin: 0 auto;
}  
.promoContent_ct .btnsPromo .btn-left {
    position: absolute;
    top: 53.5%;
    left: 30%;
}
.promoContent_ct .btnsPromo .btn-right {
    position: absolute;
    top: 53.5%;
    left: 61%;
}
.promoContent_ct button {
  background: url("@{public_img}/images/ct/btns-get.png?v=345432545") no-repeat;
  width: 153px;
  height: 55px;
  border: none;
  background-color: none;
  outline: none;
  font-size: 0;
  cursor: pointer;
}
.promoContent_uc button {
  // background: url("@{public_img}/images/uc/btn-get.jpg?v=34543545") no-repeat;
  background: none;
  width: 170px;
  height: 65px;
  border: none;
  background-color: none;
  outline: none;
  font-size: 0;
  cursor: pointer;
}
.promoContent_uc .btn-top,
.promoContent_uc .btn-bottom {  
  position: absolute; 
}
.promoContent_uc .btn-top {  
  top: 73.5%;
  left: 28%;  
}
.promoContent_uc .btn-bottom { 
    top: 88.5%; 
    left: 29%;
}
</style> 

<style rel="stylesheet/less">
  @media screen and (max-width: 1370px) {
  .newYear2018 .promoContent {
      height: 1120px;
    }
  }
  @media screen and (max-width: 1288px) {
    .newYear2018 .promoContent {
      height: 1045px;
    }
  }
</style> 
