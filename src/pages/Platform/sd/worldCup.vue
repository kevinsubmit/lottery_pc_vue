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
            <div>体育余额:{{ sportBalance }}</div>
            <!--  <div @click="goPayment('deposit')">充值</div>
            <div @click="goPayment('withdraw')">提现</div> -->
            <div @click="showTransfer">额度转换</div>
          </div>
        </div>
        <div>
          <img src="../../../../static/images/sd/game_entry/sport/sport_title.png" alt="">
        </div>
        <div class="sd-ag-btn-box">
          <div class="play-btn" @click="start">开始游戏</div>
        </div>
        <div class="sd-ag-bottom">
          <div>
            <img src="../../../../static/images/sd/game_entry/ag/copyright.png" alt="" />
          </div>
          <div>
            <img src="../../../../static/images/sd/game_entry/sport/word_cup.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="isShowTransfer" @click="closeDialog"></div>
    <div class="ag-page-transfer" v-if="isShowTransfer">
      <div class="cha el-icon-circle-close-outline" @click="closeDialog"></div>
      <transfer v-on:transferSuccess="transferSuccess" transferApi="/user/conversionCash" title="体育"></transfer>
    </div>
  </div>
</template>

<script>
import hgHeader from "../../../components/hgHeader";
import Transfer from "../../Payment/transfer1";
export default {
  data() {
    return {
      windowHeight: "",
      sportBalance: "0.00",
      isShowTransfer: false
    };
  },
  components: {
    hgHeader,
    Transfer
  },
  created() {
    this.getsportBalance();
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
    transferSuccess(msg) {
      this.getsportBalance();
      this.closeDialog();
    },
    start() {
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
      
      this.$http
        .post("/SportFunction/logToSport", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/home"
              });
            }, 1000);
            winHandler.close();
          } else {
            winHandler.location.href = res.data.info;
          }
        });
    },
    getsportBalance() {
      
      let params = {};
      
      //获取体育游戏额度
      this.$http
        .post("/user/getSportsBalance", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 2006) {
            this.sportBalance = (res.data.balance * 1).toFixed(2) || "0.00";
            this.$store.commit("updatelotteryMoney", res.data.userBalance);
          } else {
            this.sportBalance = "0.00";
          }
        });
    },
    showTransfer() {
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
        this.getsportBalance();
        this.closeDialog();
      }
    }
  }
};
</script>



<style scoped>
.sd-ag-box {
  background: url("../../../../static/images/sd/game_entry/sport/bg.png")
    no-repeat center center;
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
  background: url("../../../../static/images/sd/game_entry/sport/logo.png")
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
  display: flex;
  justify-content: center;
}
.sd-ag-btn-box > div {
  border: solid thin white;
  border-radius: 80px;
  height: 80px;
  width: 250px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  justify-content: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}

.sd-ag-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sd-ag-bottom > div:first-child {
  margin-top: 80px;
}
</style>

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
