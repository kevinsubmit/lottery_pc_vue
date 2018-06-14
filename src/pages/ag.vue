<template>

  <div>
    <div class="ag-page">
      <my-header></my-header>
      <div class="ag-content">
        <div class="top clearfix">
          <div class="left-img f-l"></div>
          <div class="right-txt f-l clearfix">
            <div class="ag-balance">AG余额：
              <span>{{ agBalance }}</span>
            </div>
            <!-- <div class="ag-withdraw" @click="goAddress(agRuleUrl, 'blank')">游戏规则</div> -->
            <div class="ag-deposit" @click="goPayment('deposit')">AG充值</div>
            <div class="ag-withdraw" @click="goPayment('withdraw')">AG提现</div>
            <div class="ag-transfer" @click="showTransfer">额度转换</div>
          </div>
        </div>

        <div class="bottom-btn clearfix">
          <div class="btn-ag-try" @click="tryPlay">免费试玩 </div>
          <div class="btn-ag-play" @click="getAgUrl">立即游戏
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="isShowTransfer" @click="closeDialog"></div>
    <div class="ag-page-transfer" v-if="isShowTransfer">
      <div class="cha el-icon-circle-close-outline" @click="closeDialog"></div>
      <ag-transfer v-on:agSuccess="agSuccess"></ag-transfer>
    </div>
  </div>
</template>


<script>
import myHeader from "../components/hgHeader";
import agTransfer from "./Payment/transfer";
export default {
  data() {
    return {
      isShowTransfer: false,
      agBalance: "请登录",
      gameLink: "",
      demoLink: "",
      agRuleUrl:
        "http://gci.abgj888.com:81/agingame/rules/new/zh/index.jsp?stamp=210917_2109103_0&amp;bid=1&amp;bac_db=1&amp;bac_in=1&amp;nn=1&amp;bj=1"
    };
  },
  components: {
    myHeader,
    agTransfer
  },
  created() {
    this.getAgBalance();
  },
  methods: {
    goAddress(path, type) {
      if (
        sessionStorage.getItem("im_username") === "游客" &&
        path !== this.agRuleUrl
      ) {
        this.$swal({
          text: "请登录会员账号后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }else if (
        sessionStorage.getItem("im_realname") === "11" ) {
        this.$swal({
          text: "请登录会员账号后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      } else if (!sessionStorage.getItem("im_token")) {
        this.$router.push({
          path: "/home"
        });
      }
      if (type !== "blank") {
        this.$router.push({
          path: path
        });
      } else {
        setTimeout(() => {
          window.open(path);
        }, 600);
      }
    },
    showTransfer() {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200
        });
        return;
      }
      if (
        sessionStorage.getItem("im_username") === "游客" ||
        !sessionStorage.getItem("im_token")
      ) {
        this.$swal({
          text: "请登录正式会员账号后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }
      this.isShowTransfer = true;
    },
    getAgBalance() {
      
      let params = {};
      
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.agBalance = (res.data.balance.agBalance).toFixed(2);
            this.$store.commit('updatelotteryMoney', res.data.balance.userBalance)
          }          
        }
      });
    },
    tryPlay() {
      let winHandler = window.open("", "_blank");
      
      let params = {};
      
      this.$http
        .post("/aginfo/getAgGameLink/0", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.$swal({
              text: "请注册或登录会员账号后体验",
              type: "error",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            winHandler.close();
            return;
          } else if (res.data.msg == 2006) {
            winHandler.location.href = res.data.link;
          } else if (res.data.msg == 7001) {
            this.$swal({
              text: res.data.info,
              type: "info",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            winHandler.close();
            return;
          }
        });
    },
    getAgUrl() {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200
        });
        return;
      }
      if (sessionStorage.getItem("im_username") === "游客") {
        this.$swal({
          text: "请注册或登录会员账号后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }
      let winHandler = window.open("", "_blank");
      
      let params = {};
      
      this.$http
        .post("/aginfo/getAgGameLink/1", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.$router.push({
              path: "/home"
            });
            winHandler.close();
          } else if (res.data.msg == 2006) {
            winHandler.location.href = res.data.link;
          } else if (res.data.msg == 7001) {
            this.$swal({
              text: res.data.info,
              type: "info",
              timer: 2000,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            winHandler.close();
            return;
          }
        });
    },
    closeDialog() {
      this.isShowTransfer = false;
    },
    agSuccess(msg) {
      if (msg === "agSuccess") {
        this.getAgBalance();
        this.closeDialog();
      }
    },
    goPayment(param) {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200
        });
        return;
      }
      if (
        sessionStorage.getItem("im_username") === "游客" ||
        !sessionStorage.getItem("im_token")
      ) {
        this.$swal({
          text: "请登录正式会员账号后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }
      if (param === "deposit") {
        this.$router.push({
          path: "/Payment/record:deposit",
          query: { GameName: "AG" }
        });
      }
      if (param === "withdraw") {
        this.$router.push({
          path: "/Payment/record:withdraw",
          query: { GameName: "AG" }
        });
      }
    }
  }
};
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
@import "../assets/less/variable.less";

.ag-page {
  background: #deedff url("@{public_img}/images/common/bg-home.jpg") no-repeat;
}
.ag-content .ag-balance {
  background: url("@{public_img}/images/common/btn-bg-left.png") no-repeat;
}
.ag-content .ag-deposit,
.ag-content .ag-withdraw {
  background: url("@{public_img}/images/common/btn-bg-mid.png") no-repeat;
}
.ag-content .ag-transfer {
  background: url("@{public_img}/images/common/btn-bg-right.png") no-repeat;
}
</style>



<style>
.ag-page {
  width: 100%;
  /*  height: 468px;
  height: calc(100vh - 29px)!important;
  overflow-y: auto;*/
}
.jc img {
  margin-top: 10vh;
}

@media screen and (max-width: 1400px) {
  .jsc img {
    width: 900px;
    height: 600px !important;
    margin-top: 4vh;
  }
}

.ag-content {
  width: 1260px;
  margin: 0 auto;
  padding-top: 100px;
  overflow: hidden;
  background: url("/static/images/common/bg-ag.png") 0 190px no-repeat;
  width: 1260px;
  height: 700px;
  position: relative;
  min-height: calc(100vh - 100px);
}
.ag-content .left-img {
  background: url("/static/images/common/logo-ag.png") no-repeat;
  width: 440px;
  height: 71px;
  animation-duration: 1s;
  animation-name: fadeInLeft;
}
.ag-content .right-txt {
  float: right;
  animation-duration: 1s;
  animation-name: fadeInRight;
}
.ag-content .ag-deposit,
.ag-content .ag-balance,
.ag-content .ag-transfer,
.ag-content .ag-withdraw {
  float: left;
  line-height: 60px;
  font-style: italic;
  font-size: 18px;
  color: #3892e6;
}
.ag-content .ag-balance span {
  color: red;
}
.ag-content .ag-balance {
  width: 217px;
  height: 68px;
  padding-left: 50px;
}
.ag-content .ag-deposit,
.ag-content .ag-withdraw {
  width: 154px;
  height: 68px;
  cursor: pointer;
}
.ag-content .ag-transfer {
  width: 162px;
  height: 68px;
  cursor: pointer;
}
.ag-content .ag-deposit:hover,
.ag-content .ag-transfer:hover,
.ag-content .ag-withdraw:hover {
  color: #1952b4;
}

.bottom-btn {
  position: absolute;
  bottom: 225px;
  left: 50%;
  margin-left: -180px;
}
.ag-content .bottom .el-row {
  width: 82%;

  background: #eff6ff;
  padding: 30px;
}

.top {
  position: relative;
}
.btn-ag-try,
.btn-ag-play {
  width: 180px;
  height: 50px;
  background: #ff9200;
  line-height: 50px;
  font-size: 19px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  opacity: 0.9;
  transition: all ease 0.5s;
}
.btn-ag-try {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: 0 2px 20px #40a2ff;
  position: relative;
}
.btn-ag-play span {
  background: url("/static/images/common/btn-disc.png") no-repeat;
  width: 86px;
  height: 73px;
  position: absolute;
  right: -40px;
  top: -36px;
  display: block;
}

.btn-ag-play {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 2px 20px #40a2ff;
}
.btn-ag-try:hover,
.btn-ag-play:hover {
  color: #fff;
  background: #ce7e11;
  transition: all ease 0.5s;
}
</style>
