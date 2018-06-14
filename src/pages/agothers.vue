<template>
  <div class="clearfix">
    <my-header></my-header>
    <div style="height: calc(100vh - 100px)!important;min-height:816px;padding-top:55px;background:url('/static/images/common/ag/abg.jpg') center 55px no-repeat #150103;">
      <div style="width:1260px;margin:0 auto;height:816px;padding-top:55px;background:url('/static/images/common/ag/agbg.jpg') center 0 no-repeat;position:relative;">
        <div class="ag-balance-ly">AG余额：<span>{{ agBalance }}</span></div>             
        <div class="ag-deposit-ly" @click="goPayment('deposit')">AG充值</div>
        <div class="ag-withdraw-ly" @click="goPayment('withdraw')">AG提现</div>
        <div class="ag-transfer-ly" @click="showTransfer">额度转换</div>
        <div class="btn-ag-try-ly" @click="tryPlay"> </div>
        <div class="btn-ag-play-ly" @click="getAgUrl"></div>   
      </div> 

      <div class="overlay" v-if="isShowTransfer" @click="closeDialog"></div>
      <div class="ag-page-transfer" v-if="isShowTransfer">
        <div class="cha el-icon-circle-close-outline" @click="closeDialog"></div>
        <ag-transfer v-on:agSuccess="agSuccess"></ag-transfer>
      </div>    
    </div>
    <my-footer></my-footer>
  </div>

  <!-- <div>
      <div class="ag-page">  
        <my-header></my-header>  
        <div class="ag-content">
          <div class="top clearfix">
            <div class="left-img f-l"></div>
            <div class="right-txt f-l clearfix">
              <div class="ag-balance">AG余额：<span>{{ agBalance }}</span></div>
             
              <div class="ag-deposit" @click="goPayment('deposit')">AG充值</div>
              <div class="ag-withdraw" @click="goPayment('withdraw')">AG提现</div>
              <div class="ag-transfer" @click="showTransfer">额度转换</div>
            </div>       
          </div>          

          <div class="bottom-btn clearfix">
            <div class="btn-ag-try" @click="tryPlay">免费试玩 </div>
            <div class="btn-ag-play" @click="getAgUrl">立即游戏<span></span></div>   
          </div>
        </div>      
      </div> 
      
      <my-footer></my-footer> 
  </div> -->
</template>


<script>
import myHeader from '../components/hgHeader'
import myFooter from '../components/hgFooter'
import agTransfer from './Payment/transfer'
export default {
  data () {
    return {
      isShowTransfer: false,
      agBalance: '请登录',
      gameLink: '',
      demoLink: '',
      agRuleUrl: 'http://gci.abgj888.com:81/agingame/rules/new/zh/index.jsp?stamp=210917_2109103_0&amp;bid=1&amp;bac_db=1&amp;bac_in=1&amp;nn=1&amp;bj=1'
    }
  },
  components: {
    myHeader,
    myFooter,
    agTransfer
  },
  created () {
    this.getAgBalance()
  },
  methods:{
    goAddress (path,type) {
      if(sessionStorage.getItem('im_username') === '游客' && path !== this.agRuleUrl){
        this.$swal({
          text: '请登录会员账号后体验',
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
        .then(function (response) {
        }).catch(e => {
        })
        return
      } else if (!sessionStorage.getItem('im_token')) {
        this.$router.push({
          path: '/home'
        })
      }
      if (type !== 'blank') {
        this.$router.push({
          path: path
        })
      } else {
        setTimeout(()=>{
          window.open(path)
        }, 600)
      }
    },
    showTransfer () {
      if(sessionStorage.getItem('im_username') === '游客' || !sessionStorage.getItem('im_token')){
        this.$swal({
          text: '请登录正式会员账号后体验',
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
        .then(function (response) {
        }).catch(e => {
        })
        return
      }
      this.isShowTransfer = true
    },
    getAgBalance () {
      let params={};
      
      this.$http.post('/aginfo/getAgInfo', JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.agBalance = (res.data.balance.agBalance).toFixed(2)
            this.$store.commit('updatelotteryMoney', res.data.balance.userBalance)
          }          
        }
      })
    },
    tryPlay () {
      let params={};
      
      this.$http.post('/aginfo/getAgGameLink/0', JSON.stringify(params)).then(res => {
       if(res.data.msg == 4001){
          sessionStorage.clear();
          this.$swal({
            text: '请注册或登录会员账号后体验',
            type: "error",
            timer: 1200,
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
          })
          return
        }else if(res.data.msg == 2006){
          setTimeout(()=>{
            window.open(res.data.link)
          }, 600)
        }else if(res.data.msg ==7001){
          this.$swal({
            text: res.data.info,
            type: "info",
            timer: 1200,
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
          })
          return
        }
      })
    },
    getAgUrl () {
      if(sessionStorage.getItem('im_username') === '游客'){
        this.$swal({
          text: '请注册或登录会员账号后体验',
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
        .then(function (response) {
        }).catch(e => {
        })
        return
      }
      let params={};
      
      this.$http.post('/aginfo/getAgGameLink/1', JSON.stringify(params)).then(res => {
       if(res.data.msg == 4001){
          sessionStorage.clear(); 
          this.$router.push({
            path: '/home'
          })
        }else if(res.data.msg == 2006){
          setTimeout(()=>{
            window.open(res.data.link)
          //   var tempwindow=window.open();
          // tempwindow.location=res.data.link;
          }, 600)
        }else if(res.data.msg ==7001){
          this.$swal({
            text: res.data.info,
            type: "info",
            timer: 2000,
            confirmButtonText: "关闭"
          })
          .then(function (response) {
          }).catch(e => {
          })
          return
        }
      })
    },
    closeDialog () {
      this.isShowTransfer = false
    },
    agSuccess (msg) {
      if (msg === "agSuccess") {
        this.getAgBalance()
        this.closeDialog ()
      }
    },
    goPayment (param) {
      if(sessionStorage.getItem('im_username') === '游客' || !sessionStorage.getItem('im_token')){
        this.$swal({
          text: '请登录正式会员账号后体验',
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
        .then(function (response) {
        }).catch(e => {
        })
        return
      }
      if (param === 'deposit') {
        this.$router.push({path: '/Payment/record:deposit', query: {GameName: 'AG'}})
      }
      if (param === 'withdraw') {
        this.$router.push({path: '/Payment/record:withdraw', query: {GameName: 'AG'}})
      }
    }
  }
}
</script>


<style>
.ag-page-transfer {
  z-index: 99; 
  width: 340px;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -170px;
  background-color: #fff;
  border-radius: 6px;
  color: #333;
}
.ag-page-transfer .grid-content .conmit div {
  width: 145px;
  
}
.ag-page-transfer .el-main {
  overflow: hidden;
}
.ag-page-transfer .el-main .el-row {
  margin-top: 15px;
}
.ag-page-transfer .grid-content .conmit {
  border: none;
  padding: 15px 0;
}
.ag-page-transfer .foot,
.ag-page-transfer .huan {
  display: none;
}
.ag-page-transfer .el-col-3 {
  width: auto;
}
.ag-page-transfer .title {
  background-color: #e1e2ee;
  height: 33px;
  line-height: 33px;
  text-align: left;
  padding: 0 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 16px;
  color: #666;
  font-weight: normal;
}
.ag-page-transfer .cha {
  font-size: 30px;
  right: -30px;
  top: -30px;
  height: 30px;
  width: 30px;
}
.ag-page-transfer .grid-content .conmit div {
  height: 30px;
  line-height: 30px;
}
.ag-page-transfer .grid-content input {
  width: 190px;
  border-radius: 4px;
}
</style>

<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/less/variable.less';
.ag-balance-ly,
.ag-deposit-ly,
.ag-withdraw-ly,
.ag-transfer-ly{
  font-size:20px;
  margin-top:10px;
  float:left;
  color:#fff!important;
}

.ag-balance-ly{
  margin-left:620px;cursor:pointer;
}
.ag-deposit-ly{
  margin-left:70px;cursor:pointer;
}
.ag-withdraw-ly{
  margin-left:75px;cursor:pointer;
}
.ag-transfer-ly{
  margin-left:75px;cursor:pointer;
}
.btn-ag-try-ly,.btn-ag-play-ly{
  position: absolute;cursor:pointer;
}
.btn-ag-try-ly:hover{
  box-shadow:0 0 1px #23040C;
}
.btn-ag-play-ly:hover{

}

.btn-ag-try-ly{
  height:120px;
  width:120px;
  border-radius:100%;
  bottom:25px;
  left:570px;
}

.btn-ag-play-ly{
  height:70px;
  width:190px;
  bottom:328px;
  left:270px;
}

.ag-page {
  background:#deedff  url('@{public_img}/images/common/bg-home.jpg') no-repeat;
}
.ag-content .ag-balance {
  background: url('@{public_img}/images/common/btn-bg-left.png') no-repeat;
}
.ag-content .ag-deposit,
.ag-content .ag-withdraw {
  background: url('@{public_img}/images/common/btn-bg-mid.png') no-repeat;
}
.ag-content .ag-transfer {
  background: url('@{public_img}/images/common/btn-bg-right.png') no-repeat;
}
</style>




