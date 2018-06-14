<template>
  <div>
    <div>
      <hg-Header></hg-Header>
      <div style="height:60px"></div>
    </div>
    <div class="leying-ag-box" :style="{height:windowHeight-60+'px'}">
      <div class="leying-ag-main">
        <div class="leying-ag-main-top">
          <div class="leying-ag-logo">

          </div>
          <div class="leying-ag-top-menu">
            <div class="ag-balance-ly">
              AG余额:{{ agBalance }}
            </div>
            <div class="ag-deposit-ly" @click="goPayment('deposit')">
              AG充值
            </div>
            <div class="ag-withdraw-ly" @click="goPayment('withdraw')">
              AG提现
            </div>
            <div class="ag-transfer-ly" @click="showTransfer">
              额度转换
            </div>
          </div>
        </div>
        <div class="leying-ag-main-bottom">
          <div>
            <div class="leying-ag-play" @click="getAgUrl">

            </div>
            <div class="ly-ag-games-optionlist">
              <div @click="goToRealGame"></div>
              <div @click="goToRealGame"></div>
              <div @click="goToRealGame"></div>
              <div class="leying-ag-try" @click="tryPlay">
                试玩
              </div>
              <div @click="goToFish"></div>
              <div @click="goToRealGame"></div>
              <div @click="goToRealGame"></div>
            </div>
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
import agTransfer from "../Payment/transfer";
import hgHeader from "../../components/hgHeader";
export default {
  components: {
    hgHeader,
    agTransfer
  },
  data() {
    return {
      windowHeight: "",
      agBalance: "0.00",
      isShowTransfer: false
    };
  },
  created() {
    this.getAgBalance();
  },
  mounted() {
    let _this = this;
    _this.windowHeight = this.$window.innerHeight;
    this.$window.onresize = function() {
      _this.windowHeight = _this.$window.innerHeight;
    };
  },
  methods: {
    goToRealGame() {
      // 游客模式下,默认进入试玩
      // 真实账户,默认正式链接
      if (sessionStorage.getItem("im_username") === "游客") {
        this.tryPlay();
        return;
      }
      this.getAgUrl();
    },
    goToFish() {
      let type = 2;
      if (sessionStorage.getItem("im_username") === "游客"){
        type = 1
      }
      if (type == 1) {
        let winHandler = window.open("", "_blank");
        
        let params = {};
        
        //试玩游戏链接
        this.$http
          .post("/aginfo/getAgGameLink/0/6", JSON.stringify(params))
          .then(res => {
            if (res.status === 200) {
              if (res.data.msg === 2006) {
                winHandler.location.href = res.data.link;
                this.tryPlayLink = res.data.link;
              }
              if (res.data.msg === 7001) {
                Message({
                  type: "error",
                  showClose: true,
                  message: res.data.info
                });
                winHandler.close();
              }
            }
          });
      }
      if (type == 2) {
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

        let winHandler = window.open("", "_blank");
        
        let params = {};
        
        //真钱模式游戏链接
        this.$http
          .post("/aginfo/getAgGameLink/1/6", JSON.stringify(params))
          .then(res => {
            if (res.status === 200) {
              if (res.data.msg === 2006) {
                winHandler.location.href = res.data.link;
                this.realPlayLink = res.data.link;
              }
              if (res.data.msg === 7001) {
                Message({
                  type: "error",
                  showClose: true,
                  message: res.data.info
                });
              }
            }
          });
      }
    },
    getAgBalance() {
      
      let params = {};
      
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.agBalance = res.data.balance.agBalance.toFixed(2);
            this.$store.commit("updatelotteryMoney",res.data.balance.userBalance);
          }
        }
      });
    },
    showTransfer() {
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


<style scoped>
.leying-ag-box {
  background-color: black;
  background: url("../../../static/images/common/ag/abg.jpg") no-repeat center
    center;
  background-size: cover;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.leying-ag-main {
  width: 1260px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-width: 1260px;
}
.leying-ag-main-top {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 80px;
  font-size: 20px;
  color: #ffffff;
  position: relative;
  z-index: 1;
}

.leying-ag-main-top > div:not(.leying-ag-logo) {
  height: 60px;
  line-height: 60px;
  margin-top: 52px;
  cursor: pointer;
  padding-bottom: 10px;
}

.leying-ag-logo {
  background: url("../../../static/images/common/ag/logo.png") no-repeat center
    center;
  flex: 1;
  height: 80px;
  animation-name: fadeInLeft;
  animation-duration: 1s;
  cursor: pointer;
}

.leying-ag-top-menu {
  display: flex;
  animation-name: fadeInRight;
  animation-duration: 1s;
}

.leying-ag-top-menu > div:not(.ag-balance-ly) {
  background: url("../../../static/images/common/ag/transfer.png") no-repeat
    center center;
  transition: all linear 0.3s;
}

.leying-ag-top-menu > div:not(.ag-balance-ly):hover {
  background: url("../../../static/images/common/ag/transfer-hover.png")
    no-repeat center center;
}

.leying-ag-main-bottom {
  flex: 6;
  background: url("../../../static/images/common/ag/ly-ag-bottom.png") no-repeat
    center bottom;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
}

.leying-ag-main-bottom > div {
  height: 480px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.ag-balance-ly {
  width: 222px;
  background: url("../../../static/images/common/ag/balance.png") no-repeat
    center center;
  cursor: auto;
}
.ag-deposit-ly,
.ag-withdraw-ly,
.ag-transfer-ly {
  width: 152px;
  margin-left: -8px;
}
.leying-ag-play {
  width: 384px;
  height: 251px;
  margin-left: 115px;
  cursor: pointer;
  background: url("../../../static/images/common/ag/play.png") no-repeat center
    center;
  background-size: cover;
  transition: all linear 0.2s;
}

.leying-ag-play:hover {
  background: url("../../../static/images/common/ag/play-hover.png") no-repeat
    center center;
}

.ly-ag-games-optionlist {
  width: 100%;
  height: 160px;
  display: flex;
  padding: 0 25px;
  box-sizing: border-box;
}
.ly-ag-games-optionlist > div:not(.leying-ag-try) {
  width: 155px;
  cursor: pointer;
}
.leying-ag-try {
  flex: 1;
  cursor: pointer;
  background: url("../../../static/images/common/ag/try.png") no-repeat 64px
    72px;
  display: flex;
  justify-content: center;
  font-size: 40px;
  color: #e2b55a;
  text-indent: -30px;
  line-height: 240px;
  transition: all linear 0.2s;
}

.leying-ag-try:hover {
  background: url("../../../static/images/common/ag/try-hover.png") no-repeat
    64px 72px;
}

@media (min-height: 680px) and (max-height: 756px) {
  .leying-ag-main {
    zoom: 0.9;
  }
}

@media (min-height: 620px) and (max-height: 680px) {
  .leying-ag-main {
    zoom: 0.8;
  }
}

@media (min-height: 550px) and (max-height: 620px) {
  .leying-ag-main {
    zoom: 0.7;
  }
}

@media (max-height: 550px) {
  .leying-ag-main {
    zoom: 0.6;
  }
}
</style>
