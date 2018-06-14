<template>
  <div>
    <hg-Header></hg-Header>
    <div class="game_fish_box" :style="{height:windowHeight+'px'}">
      <div class="fish_main" :style="{height:windowHeight-60+'px'}">
        <div class="fish_bg">
          <div class="Fish-1"></div>
          <div class="fish2"></div>
          <div class="gold-coins"></div>
          <div class="Group-of-fish-1"></div>
          <div class="Group-of-fish-2"></div>
          <div class="fish_logo"></div>
          <div class="SHARK"></div>
        </div>
        <div style="border-radius:48px;overflow:hidden" class="fish_main_bottom">
          <div>
            <div class="fish_btn_bg">
              <div style="display:flex;flex-wrap:nowrap;align-items:center">
                <span style="word-break: keep-all;">捕鱼王余额：</span>

              </div>
              <div v-if="!isTryPlayer&&agBalance" class="fish_money_balance">{{agBalance}}</div>
              <div v-if="isTryPlayer" style="color:red">请登录</div>
              <div class="money_transfer_btn" @click="transferMount">
                额度转换
              </div>
            </div>
            <div style="font-family:'Microsoft Yahei';font-weight:bold;font-size:35px">
              <div class="fish_intro_p1">
                海量丰富的
                <span class="fish_game_jiangli">JACKPOT</span>奖励,捕鱼王奖励，派对活动福利免费领。一夜变身高富帅，称霸渔场！
              </div>
              <div class="fish_intro_p2">
                更高级的炮台，跟酷炫的技能，让你炸到酣畅淋漓。
              </div>
              <div class="fish_intro_p3">
                一炮炸出
                <span class="fish_billion_money">50亿</span>,礼包送不停！
              </div>
              <div class="fish_intro_p4">
                <div class="try-to-play" @click="getPlayUrl(1)">

                </div>
                <div class="start-to-play" @click="getPlayUrl(2)">

                </div>
              </div>
            </div>
            <div>
              <div>

              </div>
              <div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="bubble-bottom">

      </div>
    </div>
    <div class="overlay" v-if="isShowTransfer" @click="closeDialog"></div>
    <div class="ag-page-transfer" v-if="isShowTransfer">
      <div class="cha el-icon-circle-close-outline" @click="closeDialog"></div>
      <transfer v-on:transferSuccess="transferSuccess" transferApi="/aginfo/agQuotaConversion" title="捕鱼"></transfer>
    </div>
    <div style="display:none">
      <img src="/static/images/common/fish/freetrial-mouse-over.png" alt="">

      <img src="/static/images/common/fish/startgame-mouse-over.png" alt="">
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
      agBalance: "",
      isShowTransfer: false,
      windowHeight: "",
      tryPlayLink: "",
      realPlayLink: "",
      isTryPlayer: false
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
    this.isTryPlayer = sessionStorage.getItem("im_realname") == "游客";
    if (!this.isTryPlayer) {
      this.getAgBalance();
    }
  },
  methods: {
    getPlayUrl(type) {
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
            }
          });
      }
    },
    getAgBalance() {
      
      let params = {};
      
      //获取捕鱼游戏额度
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.agBalance = res.data.balance.agBalance.toFixed(2) || "0.00";
            this.$store.commit("updatelotteryMoney", res.data.balance.userBalance);
          }
        }
      });
    },
    transferSuccess(msg) {
      this.getAgBalance();
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
.fish_amount_title {
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
.fish_billion_money {
  font-size: 50px;
  color: #feef00;
  font-family: "Alfa Slab One";
  font-weight: bold;
}
.fish_game_jiangli {
  color: #00fce9;
  font-weight: bold;
}
.fish_intro_p1 {
  font-size: 20px;
  margin-top: 36px;
}

.fish_intro_p2 {
  font-size: 20px;
}

.fish_intro_p3 {
  margin-top: 36px;
  font-weight: bold;
}

.fish_intro_p4 {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.fish_intro_p4 > div {
  height: 100px;
  cursor: pointer;
}

.try-to-play {
  width: 230px;
  background: url("/static/images/common/fish/try-button.png") no-repeat;
  margin-right: 10px;
  transition: all linear 0.2s;
}

.try-to-play:hover {
  background-image: url("/static/images/common/fish/freetrial-mouse-over.png");
}

.start-to-play {
  width: 385px;
  background: url("/static/images/common/fish/start-button.png") no-repeat;
}

.start-to-play:hover {
  background-image: url("/static/images/common/fish/startgame-mouse-over.png");
  background-position: 1px 0;
}

.game_fish_box {
  background-color: #50cfd5;
  background: url("/static/images/common/fish/background.jpg") no-repeat center
    center;
  display: flex;
  background-size: cover;
  align-items: flex-start;
  justify-content: center;
  color: white;
  font-family: "Microsoft Yahei";
  position: relative;
  min-height: 900px;
}

.fish_main_bottom {
  padding-top: 160px;
}

@media (max-width: 1280px) {
  .fish_main {
    zoom: 0.8;
  }
  .game_fish_box {
    min-height: 750px;
  }
  .fish_main_bottom {
    padding-top: 160px;
  }
}

@media screen and (min-width: 1366px) and (max-width: 1536px) {
  .fish_main {
    zoom: 0.9;
  }
  .game_fish_box {
    min-height: 850px;
  }
  .fish_main_bottom {
  }
}

@media screen and (min-width: 1536px) and (max-width: 1920px) {
  .fish_main {
    zoom: 1;
  }
  .game_fish_box {
    min-height: 900px;
  }
  .fish_main_bottom {
  }
}

@media screen and (min-width: 1920px) and(max-width: 2560px) {
  .fish_main {
    zoom: 1;
  }
  .game_fish_box {
    min-height: 1000px;
  }
}

.fish_main {
  position: relative;
  width: 1200px;
  min-height: 900px;
}
.fish_main > div {
  position: absolute;
  width: 100%;
  left: 0;
}

.fish_main > div:first-child {
  top: 0;
  z-index: 5;
  height: 58%;
}

.fish_main > div:last-child {
  bottom: 0;
  background: url("/static/images/common/fish/copywriting_background.png")
    no-repeat center center;
  background-size: 100% 100%;
  z-index: 4;
  box-sizing: border-box;
  height: 60%;
}

.game_fish_content {
  position: absolute;
  width: 68%;
  height: 32%;
  bottom: 16%;
  left: 16%;
  border: solid thin white;
  color: white;
}
.fish_btn_bg {
  min-width: 382px;
  background-color: #15515c;
  border-radius: 100px;
  height: 68px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
  padding: 0 15px;
  flex-wrap: nowrap;
}
.fish_money_balance {
  display: inline-block;
  color: #ffe440;
  font-size: 20px;
  padding-right: 10px;
  font-weight: bold;
}
.money_transfer_btn {
  width: 140px;
  height: 47px;
  background-image: url("/static/images/common/fish/transfe-button.png");
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50px;
  transition: all linear 0.2s;
}
.money_transfer_btn:hover {
  background-color: #66fff7;
  color: #277069;
}

.bubble-bottom {
  position: absolute;
  width: 1200px;
  left: 50%;
  margin-left: -600px;
  height: 10%;
  background: url("/static/images/common/fish/bubbles-bottom.png");
  bottom: 0;
  z-index: 1;
}

.fish_bg {
  position: relative;
}

.fish_bg > div {
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
}

.Fish-1 {
  background-image: url("/static/images/common/fish/Fish-1.png");
  top: 90px;
  left: 360px;
  width: 202px;
  height: 190px;
}
.fish2 {
  background-image: url("/static/images/common/fish/fish2.png");
  width: 65px;
  height: 74px;
  top: 156px;
  left: 250px;
}
.gold-coins {
  background-image: url("/static/images/common/fish/gold-coins.png");
  width: 1368px;
  height: 359px;
  left: -80px;
  top: 140px;
}
.Group-of-fish-1 {
  background-image: url("/static/images/common/fish/Group-of-fish-1.png");
  width: 165px;
  height: 108px;
  top: 204px;
  left: 30px;
}
.Group-of-fish-2 {
  background-image: url("/static/images/common/fish/Group-of-fish-2.png");
  width: 136px;
  height: 89px;
  top: 230px;
  right: -10px;
}
.fish_logo {
  background-image: url("/static/images/common/fish/logo.png");
  width: 704px;
  height: 403px;
  left: 48%;
  margin-left: -400px;
  bottom: 20px;
  z-index: 10;
}
.SHARK {
  background-image: url("/static/images/common/fish/SHARK.png");
  width: 539px;
  height: 560px;
  top: 40px;
  right: -10px;
  border-radius: 0 0 0 351px;
  overflow: hidden;
}
</style>
