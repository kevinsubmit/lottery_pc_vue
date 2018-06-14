<template>
  <div>
    <hg-Header></hg-Header>
    <div class="sport-game-container">
      <div class="game_gamesport_box" :style="{height:windowHeight+'px'}">
        <div class="soccer" :class="{'soccer-transformed':moveSoccerClass}">
          <img src="../../static/images/common/sportgame/soccer.png" alt="">
        </div>
        <div class="gamesport_main">
          <div class="gamesport_bg">
            <!-- <div class="gamesport_btn_bg">
              <div style="line-height:25px;">
                <div style="word-break: keep-all;">棋牌游戏余额：</div>
                <div v-if="!isTryPlayer&&sportBalance" class="gamesport_money_balance">{{sportBalance}}</div>
                <div v-if="isTryPlayer" style="color:red">请登录</div>
              </div>
              <div class="money_transfer_btn" @click="transferMount">
                额度转换
              </div>
            </div> -->
            <div class="gamesport_logo">
              <img src="../../static/images/common/sportgame/logo.png" alt="">
            </div>
            <div class="betting_amount">
              <!-- <div class="sport_amount">
                体育余额:
                <span style="color:red">40449.00</span>
              </div> -->
              <div class="sport_amount">
                <div class="sport_amount_wrap">
                  <div>
                    <span>体育余额:</span>
                    <span class="gamesport_money_balance">{{sportBalance}}</span>
                  </div>
                </div>
              </div>
              <div class="sport_transfer" @click="transferMount">
                额度转换
              </div>
            </div>
          </div>
          <div style="border-radius:48px;overflow:hidden" class="gamesport_main_bottom">

            <div>
              <div class="gamesport_intro_p4" @click="getPlayUrl(2)">
                <!-- <div class="try-to-play" @click="getPlayUrl(1)">

                  </div> -->
                <div class="start-to-play" @click="start">
                  开始游戏
                </div>
              </div>
            </div>
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
import Transfer from "./Payment/transfer1";
import { Message } from "element-ui";
import HgHeader from "../components/hgHeader";
export default {
  components: {
    Transfer,
    HgHeader
  },
  data() {
    return {
      sportBalance: "",
      isShowTransfer: false,
      windowHeight: "",
      tryPlayLink: "",
      realPlayLink: "",
      isTryPlayer: false,
      moveSoccerClass: "",
      playUrl: ""
    };
  },
  computed: {
    // 'windowHeight':this.$window&&(this.$window.innerHeight+'px')
  },
  mounted() {
    let _this = this;
    _this.windowHeight = this.$window.innerHeight;
    this.$window.onresize = function() {
      _this.windowHeight = _this.$window.innerHeight;
    };
    this.moveSoccer();
  },
  created() {
    if (
      sessionStorage.getItem("im_realname") &&
      sessionStorage.getItem("im_realname") != "游客"
    ) {
      this.getsportBalance();
    } else {
      this.sportBalance = "0.00";
    }
  },
  methods: {
    moveSoccer() {
      let _this = this;
      let imgDom = document.querySelector(".soccer").querySelector("img");
      imgDom.onload = function() {
        _this.moveSoccerClass = "soccer-transformed";
      };
    },
    start() {
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
          } else {
            winHandler.location.href = res.data.info;
          }
        });
    },
    getPlayUrl(type) {
      // if (type == 1) {
      //   
      //   let params = {};
      //   
      //   //试玩游戏链接
      //   /* this.$http
      //     .post("/aginfo/getAgGameLink/0/6", JSON.stringify(params))
      //     .then(res => {
      //       if (res.status === 200) {
      //         if (res.data.msg === 2006) {
      //           window.open(res.data.link);
      //           this.tryPlayLink = res.data.link;
      //         }
      //         if (res.data.msg === 7001) {
      //           Message({
      //             type: "error",
      //             showClose: true,
      //             message: res.data.info
      //           });
      //         }
      //       }
      //     }); */
      // }
      // if (type == 2) {
      //   if (
      //     sessionStorage.getItem("im_username") === "游客" ||
      //     !sessionStorage.getItem("im_token")
      //   ) {
      //     this.$swal({
      //       text: "请登录正式会员账号后体验",
      //       type: "error",
      //       timer: 1200,
      //       confirmButtonText: "关闭"
      //     })
      //       .then(function(response) {})
      //       .catch(e => {});
      //     return;
      //   }
      //   
      //   let params = {};
      //   
      //   //真钱模式游戏链接
      //   this.$http
      //     .post("/SportFunction/logToSport", JSON.stringify(params))
      //     .then(res => {
      //       if (res.status === 200) {
      //         if (res.data.msg === 2006) {
      //           window.open(res.data.link);
      //           this.realPlayLink = res.data.link;
      //         }
      //         if (res.data.msg === 7001) {
      //           Message({
      //             type: "error",
      //             showClose: true,
      //             message: res.data.info
      //           });
      //         }
      //       }
      //     });
      // }
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
            this.sportBalance = 0.0;
            // this.$swal({
            //   text: res.data.info||'无法查询额度',
            //   type: "error",
            //   timer: 1200,
            //   confirmButtonText: "关闭"
            // });
          }
        });
    },
    transferSuccess(msg) {
      this.getsportBalance();
      this.closeDialog();
    },
    closeDialog() {
      this.isShowTransfer = false;
    },
    transferMount() {
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
.sport_amount_wrap {
  display: flex;
  padding-left: 20px;
  justify-content: center;
}

.sport_amount_wrap > div {
  white-space: nowrap;
}

.gamesport_logo {
  animation-name: fadeInLeft;
  animation-duration: 1s;
}
.soccer {
  position: absolute;
  width: 500px;
  left: -300px;
  top: -300px;
  transition: all ease-in 1.5s;
  transform: scale(0.2);
}

.soccer-transformed {
  left: calc(50% - 220px);
  top: calc(50% - 180px);
  transform: scale(1);
}

.soccer > img {
  width: 100%;
}

.betting_amount {
  display: flex;
  color: #3892e6;
  font-style: italic;
  font-size: 18px;
  animation-name: fadeInRight;
  animation-duration: 1s;
}
.sport_amount {
  width: 268px;
  height: 66px;
  line-height: 60px;
  background: url("../../static/images/common/sportgame/balance-bg.png")
    no-repeat;
  padding-left: 50px;
  box-sizing: border-box;
}

.sport_transfer {
  width: 162px;
  height: 66px;
  line-height: 60px;
  background: url("../../static/images/common/sportgame/transfer-bg.png")
    no-repeat;
  margin-left: -2px;
  cursor: pointer;
}

.sport-game-container {
  width: 100%;
  height: 100%;
  /* background-image: url("/static/images/common/gamesport/background1.jpg"); */
  background-color: #deedff;
}

.gamesport_amount_title {
  font-size: 14px;
}
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
.gamesport_billion_money {
  font-size: 50px;
  color: #feef00;
  font-family: "Alfa Slab One";
  font-weight: bold;
}
.gamesport_game_jiangli {
  color: #00fce9;
  font-weight: bold;
}
.gamesport_intro_p1 {
  font-size: 20px;
  margin-top: 36px;
}

.gamesport_intro_p2 {
  font-size: 20px;
}

.gamesport_intro_p3 {
  margin-top: 36px;
  font-weight: bold;
}

.try-to-play {
  width: 230px;
  background: url("/static/images/common/gamesport/try-button.png") no-repeat;
  margin-right: 10px;
  transition: all linear 0.2s;
}

.start-to-play {
  margin-top: 215px;
  width: 280px;
  height: 130px;
  background: url("/static/images/common/sportgame/start-btn-bg.png") no-repeat
    center center;
  transition: transform ease-in-out 0.3s;
  line-height: 175px;
  cursor: pointer;
  text-align: left;
  text-indent: 75px;
}

.gamesport_intro_p4:hover .start-to-play {
  background: url("/static/images/common/sportgame/start-btn-bg-hover.png")
    no-repeat center center;
}

.game_gamesport_box {
  background-color: black;
  background: url("/static/images/common/sportgame/bg.png") no-repeat center
    center;
  display: flex;
  background-size: 1200px;
  align-items: flex-start;
  justify-content: center;
  color: white;
  font-family: "Microsoft Yahei";
  position: relative;
}

.gamesport_main_bottom {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  min-height: 400px;
}

.gamesport_main_bottom > div:last-child {
  font-family: "Microsoft Yahei";
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.gamesport_main {
  position: relative;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.gamesport_main > div {
  width: 100%;
  left: 0;
}

.gamesport_main > div:first-child {
  top: 0;
  z-index: 5;
  display: flex;
}

.game_gamesport_content {
  position: absolute;
  width: 68%;
  height: 32%;
  bottom: 16%;
  left: 16%;
  border: solid thin white;
  color: white;
}
.gamesport_btn_bg {
  width: 384px;
  background-color: #12588f;
  border-radius: 10px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  flex-wrap: nowrap;
}
.gamesport_money_balance {
  color: red;
  font-size: 20px;
  padding-right: 10px;
  font-weight: bold;
}
.money_transfer_btn {
  width: 140px;
  height: 47px;
  background-image: url("/static/images/common/gamesport/transfer-button.png");
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 8px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #56d275;
}
.money_transfer_btn:hover {
  background-image: none;
}

.gamesport_bg {
  position: relative;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
}

.gamesport_bg > div {
  background-repeat: no-repeat;
  background-position: center center;
}

.gamesport-1 {
  background-image: url("/static/images/common/gamesport/gamesport-1.png");
  top: 90px;
  left: 360px;
  width: 202px;
  height: 190px;
}
.gamesport2 {
  background-image: url("/static/images/common/gamesport/gamesport2.png");
  width: 65px;
  height: 74px;
  top: 156px;
  left: 250px;
}
.gold-coins {
  background-image: url("/static/images/common/gamesport/gold-coins.png");
  width: 1368px;
  height: 359px;
  left: -80px;
  top: 140px;
}
.Group-of-gamesport-1 {
  background-image: url("/static/images/common/gamesport/Group-of-gamesport-1.png");
  width: 165px;
  height: 108px;
  top: 204px;
  left: 30px;
}
.Group-of-gamesport-2 {
  background-image: url("/static/images/common/gamesport/Group-of-gamesport-2.png");
  width: 136px;
  height: 89px;
  top: 230px;
  right: -10px;
}
.logo {
  background-image: url("/static/images/common/gamesport/logo.png");
  width: 704px;
  height: 403px;
  left: 48%;
  margin-left: -400px;
  bottom: 20px;
  z-index: 10;
}
.SHARK {
  background-image: url("/static/images/common/gamesport/SHARK.png");
  width: 539px;
  height: 560px;
  top: 40px;
  right: -10px;
  border-radius: 0 0 0 351px;
  overflow: hidden;
}
</style>
