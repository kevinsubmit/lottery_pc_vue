<template>
  <div>
    <div class="overlay-float" v-if="isShowPannel" @click="closePannel"></div>
    <div :class="`float-left_${getApiName}`" style='cursor:pointer;position:fixed;left:0;bottom:26px;' v-if='show'>
      <div @click.prevent='$router.push({name: "activity"})' style="background:url('/static/images/common/activitysmall.png') no-repeat;width:194px;height:129px;"></div>
      <p @click="isshow()" style='z-index:99999;right:0;top:0;font-size:15px;position:absolute;display:inline-block;color:gray;background:#fff;border-radius:100%;padding:0 2px 1px'>×</p>
    </div>
    <div class="game-right-menu-box" :class="{isshow:Showsmall,'menu-box-active':!!siderMenuActiveIndex}">
      <ul class="game-right-menu-list">
        <li class="cs " @click="openChatRoom(true)" title="聊天室" :class="{'menu-active triangle_top':siderMenuActiveIndex==1}">
          <img src="/static/images/common/icon/ico-right-cs.png" alt="">
          <div v-show="siderMenuActiveIndex==1">
            聊天室
          </div>
        </li>
        <li class="weixin" @click="openCustomerService" title="在线客服" :class="{'menu-active triangle_top':siderMenuActiveIndex==2}">
          <img src="/static/images/common/icon/ico-right-call.png" alt="">
          <div v-show="siderMenuActiveIndex==2">
            客服
          </div>
        </li>
        <li class="weijie" @click="showPannel" title="查看未结记录" :class="{'menu-active triangle_top':siderMenuActiveIndex==3}">
          <img src="/static/images/common/icon/ico-right-weijie.png" alt="">
          <div class="sider-menu-total total" v-show="isShowPannel">
            <div>
              <div>
                {{betNumber}}组
              </div>
              <p style="width:80%;float:left;color:red">￥{{all_money}}</p>
            </div>
            <div>
              <span @click="goAddress('/historyXZ')" style="float:right;cursor:pointer;">更多</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- <transition name="fade"> -->
      <transition name="el-zoom-in-bottom">
        <div class="unsettlement" v-if="isShowPannel">
          <h2>
            <div>
              未结注单
            </div>
            <div @click="closePannel">
              <img src="//www.chatroomtech.com/chat-client/images/chat/minimize.png" alt="">
            </div>
          </h2>
          <div class="box" :style="{height:$store.state.availWinHeight-200+'px'}">
            <div class="list clearfix" style="width:auto;" v-for="item in unsettlementArr">
              <div class="ico f-l" :class="`game_ico_s_${item.game_code}`"></div>
              <div class="detail f-l">
                <h3>{{item.game_name}}&nbsp;{{item.round}}期</h3>
                <h4>时间：{{item.time}}</h4>
                <p>注数：{{item.count}}注</p>
                <p>注额：{{item.money}}</p>
                <p>可赢：{{item.win_money}}</p>
              </div>
            </div>
            <div class="no-data" v-if="unsettlementArr.length<=0">
              暂无未结注单
            </div>
          </div>
        </div>
      </transition>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      getApiName: getApiName(),
      isShowPannel: false,
      isShowbig: false,
      isShowsmall: false,
      Showsmall: false,
      isactivityleft: false,
      isactivityright: false,
      csUrl: "",
      total: 0,
      all_money: 0,
      unsettlementArr: [],
      siderMenuActiveIndex: 0,
      betNumber: 0
    };
  },
  methods: {
    isshow() {
      this.show = false;
    },
    openChatRoom(isClick) {
      try{
        chat.load();
        this.siderMenuActiveIndex = this.siderMenuActiveIndex == 1 ? 0 : 1;
        this.isShowPannel = false;
        if (document.querySelector("#chatObject")) {
          if (this.siderMenuActiveIndex) {
            document.querySelector("#chatObject").style.display = "block";
          } else {
            document.querySelector("#chatObject").style.display = "none";
          }
        }
      }
      catch (err){
        if(isClick){
          alert("敬请期待！");
        }
      }
      /* if (this.getApiName == "uc"||this.getApiName == "618cp") {
        this.siderMenuActiveIndex = this.siderMenuActiveIndex == 1 ? 0 : 1;
        this.isShowPannel = false;
        if (document.querySelector("#chatObject")) {
          if (this.siderMenuActiveIndex) {
            document.querySelector("#chatObject").style.display = "block";
          } else {
            document.querySelector("#chatObject").style.display = "none";
          }
        }
        chat.load();
      } else {
        alert("敬请期待！");
      } */
    },
    openCustomerService() {
      this.siderMenuActiveIndex = 0;
      this.isShowPannel = false;

      if (document.querySelector("#chatObject")) {
        document.querySelector("#chatObject").style.display = "none";
      }
      setTimeout(() => {
        window.open(this.csUrl, "", "width=600,height=510");
      }, 500);
    },
    showPannel() {
      if (document.querySelector("#chatObject")) {
        document.querySelector("#chatObject").style.display = "none";
      }
      this.siderMenuActiveIndex = this.siderMenuActiveIndex == 3 ? 0 : 3;
      this.isShowPannel = !this.isShowPannel;
      ["#chatObject", "#html2canvas", "#cropperJs", "#cropperCss"].forEach(
        function(item) {
          if (document.querySelector(item)) {
            document.querySelector(item).outerHTML = "";
          }
        }
      );
      if (this.isShowPannel) {
        this.getWeijie(1, 10);
      }
    },
    closePannel() {
      this.isShowPannel = false;
      this.siderMenuActiveIndex = 0;
    },
    getWeijie(page, number) {
      let params = {};


      params.page = page;
      params.number = number;
      this.$http
        .post("/getinfo/bet", JSON.stringify(params))
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.unsettlementArr = res.data[i].res;
            this.betNumber = res.data[i].page.allnmb || 0;
            if (res.data[i].res.length != 0) {
              this.total = res.data[i].page.page;
              this.all_money = res.data[i].allBet.all_money;
            } else {
              this.total = 0;
              this.all_money = 0;
            }
          }
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },
    getServiceUrl() {
      this.$http.post("/user/getCustomerService").then(res => {
        this.csUrl = res.data.kefu;
        sessionStorage.setItem("serviceUrl", this.csUrl);
      });
    },
    goAddress(path) {
      event.stopPropagation();
      this.siderMenuActiveIndex = 0;
      this.$router.push({
        path: path
      });
      this.closePannel();
    }
  },
  created() {
    if (getApiName() == "uc"||getApiName() == "618cp") {
      this.openChatRoom()
    }
    if (sessionStorage.getItem("serviceUrl")) {
      this.csUrl = sessionStorage.getItem("serviceUrl");
    } else {
      this.getServiceUrl();
    }
  },
  mounted() {
    window.addEventListener(
      "message",
      event => {
        if (typeof event.data == "string") {
          var objEvent = JSON.parse(event.data);
          // console.log(objEvent);

          switch (objEvent.action) {
            case "bigger-chat":
              this.closePannel();
              break;
            case "minimize-chat":
              this.closePannel();
              break;
          }
        }
      },
      false
    );
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../assets/less/variable.less";
.isshow {
  right: -110px !important;
}
.activityright,
.activityleft {
  line-height: 50px;
}
.game-right-menu-list .cs {
  width: 50px;
}
.game-right-menu-list .weixin {
  width: 50px;
}
.game-right-menu-list .weijie {
  transition: all ease 1s;
}
.sider-menu-total {
  text-align: left;
  padding-left: 15px;
  line-height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}
</style>
<style scoped>
.game-right-menu-box {
  width: 150px;
  position: fixed;
  right: 0;
  bottom: 35px;
  z-index: 9;
  transition: all ease 0.5s;
  height: 50px;
  border-radius: 5px 0 0 5px;
  background-color: #1c4fa8;
}

.game-right-menu-box.menu-box-active {
  width: 320px;
}

.game-right-menu-list {
  display: flex;
  height: 100%;
}

.game-right-menu-list > li {
  width: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}

.game-right-menu-list > li.menu-active {
  width: 215px;
}

.game-right-menu-list > li.menu-active:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #1c4fa8;
  position: absolute;
  left: 15px;
  top: -20px;
}

.game-right-menu-list > li img {
  margin-left: 10px;
}

.game-right-menu-list > li > div {
  padding-left: 10px;
  color: white;
  animation-duration: 0.8s;
  animation-name: bounceInLeft;
}

.float-right {
  background: none !important;
}
.overlay-float {
  background-color: #000;
  opacity: 0.1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 8;
  position: fixed;
}
.float-right {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 9;
  border-radius: 3px;
  transition: all ease 0.5s;
}
.float-right li {
  height: 50px;
  border-right: 1px solid #0e264f;
  cursor: pointer;
}
.float-right li:hover {
  opacity: 1;
}
.float-right .btn-arrow {
  width: 20px;
  line-height: 20px;
  min-width: auto;
}
.float-right .btn-arrow i {
  font-size: 20px;
  color: #fff;
}

.total {
  color: #fff;
  transition: all ease 0.5s;
}
.float-right .total p {
  color: #eb6877;
  line-height: 20px;
}
.unsettlement {
  background-color: #f0f0f6;
  position: fixed;
  right: 0px;
  bottom: 100px;
  width: 320px;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: left;
  transition: all ease 0.5s;
  z-index: 9;
}
.unsettlement .detail {
      width: 174px;
  }
.unsettlement .box {
  /* height: calc(96vh - 160px) !important; */
  overflow-y: auto;
}
.unsettlement h2 {
  height: 35px;
  line-height: 35px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 16px;
  text-align: left;
  padding: 0 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.unsettlement h2 img {
  cursor: pointer;
}
.unsettlement .list {
  padding: 10px 5px;
  border-bottom: 1px solid #e1e2ed !important;
}
.unsettlement .list:last-child {
  border-bottom: none;
}
.unsettlement h3,
.unsettlement h4,
.unsettlement p {
  font-size: 12px;
  line-height: 20px;
}
.unsettlement h5 {
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-top: 1px solid #e1e2ed;
  color: #666;
  cursor: pointer;
}
.unsettlement h3 {
  color: #453880;
  font-size: 13px;
}
.unsettlement h4 {
  color: #453880;
}
.unsettlement .list p {
  color: #666;
}
.unsettlement .no-data {
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  color: #999;
}
.unsettlement .ico {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}
.game_ico_s_2 {
  background-image: url("/static/images/common/icon/ico-cqssc-s.png");
}
.game_ico_s_51 {
  background-image: url("/static/images/common/icon/ico-pk10-s.png");
}
.game_ico_s_69 {
  background-image: url("/static/images/common/icon/ico-six-s.png");
}
.game_ico_s_160 {
  background-image: url("/static/images/common/icon/ico-pcegg-s.png");
}
.game_ico_s_3 {
  background-image: url("/static/images/common/icon/ico-ten-s.png");
}
.game_ico_s_172 {
  background-image: url("/static/images/common/icon/ico-jsks-s.png");
}
.game_ico_s_171 {
  background-image: url("/static/images/common/icon/ico-ship-s.png");
}
.game_ico_s_2 {
  background-image: url("/static/images/common/icon/ico-cqssc-s.png");
}
.game_ico_s_46 {
  background-image: url("/static/images/common/icon/ico-roma-s.png");
}
.game_ico_s_47 {
  background-image: url("/static/images/common/icon/ico-farm-s.png");
}
.game_ico_s_210 {
  background-image: url("/static/images/common/icon/ico-speedship-s.png");
}
.game_ico_s_240 {
  background-image: url("/static/images/common/icon/ico-jssc-s.png");
}
.game_ico_s_250 {
  background-image: url("/static/images/common/icon/ico-jsssc-s.png");
}
.game_ico_s_260 {
  background-image: url("/static/images/common/icon/ico-race-s.png");
}
.game_ico_s_270 {
  background-image: url("/static/images/common/icon/ico-jslh-s.png");
}
.game_ico_s_180 {
  background-image: url("/static/images/common/icon/ico-bjkl8-s.png");
}
.game_ico_s_280 {
  background-image: url("/static/images/common/icon/icon-jlk3-s.png");
}
.game_ico_s_220 {
  background-image: url("/static/images/common/icon/ico-fc3d-s.png");
}
.game_ico_s_320 {
  background-image: url("/static/images/common/icon/ico-six88-s.png");
}
</style>
