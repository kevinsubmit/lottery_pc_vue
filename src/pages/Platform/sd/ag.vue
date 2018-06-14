<template>
  <div>
    <div>
      <hg-Header></hg-Header>
      <div style="height:60px"></div>
    </div>
    <div class="sd-ag-box" :style="{height:windowHeight-60+'px'}">
      <div class="sd-ag-main">
        <div class="sd-ag-top">
          <div class="sd-ag-logo"></div>
          <div class="sd-ag-top-menu">
            <div>AG余额:{{ agBalance }}</div>
            <div @click="goPayment('deposit')">AG充值</div>
            <div @click="goPayment('withdraw')">AG提现</div>
            <div @click="showTransfer">额度转换</div>
          </div>
        </div>
        <div class="sd-ag-btn-box">
          <div>
            <div class="try-btn" @click="tryPlay">免费试玩</div>
            <div class="play-btn" @click="getAgUrl">立即游戏</div>
          </div>
        </div>
        <div class="sd-ag-bottom">
          <div>
            <img src="../../../../static/images/sd/game_entry/ag/copyright.png" alt="" />
          </div>
          <div>
            <img src="../../../../static/images/sd/game_entry/ag/poke.png" alt="" />
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
import hgHeader from "../../../components/hgHeader";
import agTransfer from "../../Payment/transfer";
export default {
  data() {
    return {
      windowHeight: "",
      agBalance: "0.00",
      isShowTransfer: false
    };
  },
  components: {
    hgHeader,
    agTransfer
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
    },
    tryPlay() {
      if (sessionStorage.getItem("im_realname") === "11") {
        this.$swal({
          text: "请登录会员账号后体验",
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
    getAgBalance() {
      
      let params = {};
      
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.agBalance = res.data.balance.agBalance.toFixed(2);
            this.$store.commit("updatelotteryMoney", res.data.balance.userBalance);
          }
        }
      });
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
    closeDialog() {
      this.isShowTransfer = false;
    },
    agSuccess(msg) {
      if (msg === "agSuccess") {
        this.getAgBalance();
        this.closeDialog();
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

<style scoped>
.sd-ag-box {
  background: url("../../../../static/images/sd/game_entry/ag/bg.png") no-repeat
    center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  overflow: hidden;
  color: white;
}
.sd-ag-main {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-width: 1260px;
  justify-content: space-between;
  padding: 30px 0 20px 0;
  box-sizing: border-box;
}
.sd-ag-top {
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
}

.sd-ag-top > div:not(.sd-ag-logo) {
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  font-size: 20px;
}

.sd-ag-logo {
  width: 290px;
  background: url("../../../../static/images/sd/game_entry/ag/logo.png")
    no-repeat center center;
  height: 80px;
  animation-name: fadeInLeft;
  animation-duration: 1s;
  cursor: pointer;
}

.sd-ag-top-menu {
  display: flex;
  animation-name: fadeInRight;
  animation-duration: 1s;
  padding-right: 20px;
}
.sd-ag-top-menu > div {
  margin-left: 20px;
  width: 200px;
}

.sd-ag-top-menu > div:first-child {
  margin-left: 0;
  width: auto;
  min-width: 200px;
}

.play-btn {
  margin-left: 10px;
}

.try-btn,
.play-btn {
  cursor: pointer;
}

.sd-ag-btn-box {
  height: 80px;
  display: flex;
  align-items: flex-start;
  padding-left: 80px;
}
.sd-ag-btn-box > div {
  border: solid thin white;
  border-radius: 80px;
  height: 80px;
  width: 528px;
  display: flex;
  align-items: center;
  font-size: 30px;
  padding: 2px 4px;
  font-weight: 700;
}

.sd-ag-btn-box > div > div {
  flex: 1;
  border: solid thin white;
  height: 75px;
  border-radius: 45px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sd-ag-bottom {
  display: flex;
  justify-content: space-between;
}
</style>
