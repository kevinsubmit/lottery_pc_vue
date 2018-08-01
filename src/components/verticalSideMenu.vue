<template>
  <div>
    <div class="overlay-float" v-if="isShowPannel" @click="closePannel"></div>
    <div :class="`float-left_${getApiName}`" style='cursor:pointer;' v-if='show'>
      <div @click.prevent='$router.push({name: "activity"})' style="background:url('/static/images/common/activitysmall.png') no-repeat;width:194px;height:129px;"></div>
      <p @click="isshow()" style='z-index:99999;right:0;top:0;font-size:15px;position:absolute;display:inline-block;color:gray;background:#fff;border-radius:100%;padding:0 2px 1px'>×</p>
    </div>
    <div class="float-right" :class='{isshow:Showsmall}'>
      <ul class="clearfix">
        <li class="cs clearfix" @click="openService" title="聊天室"></li>
        <li class="weixin clearfix" @click="openServices" title="在线客服"></li>
        <li class="weijie clearfix" @click="showPannel" title="查看未结记录"></li>
      </ul>

      <!-- <transition name="fade"> -->
      <transition name="el-zoom-in-bottom">
        <div class="unsettlement" v-if="isShowPannel">
          <h2>未结注单</h2>
          <div class="box">
            <div class="list clearfix" style="width:auto;" v-for="item in unsettlementArr">
              <div class="ico f-l" :class="`game_ico_s_${item.game_code}`"></div>
              <div class="detail f-l">
                <h3>{{item.game_name}}{{item.round}}期</h3>
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
          <div class="sider-menu-total total" v-if="isShowPannel">
            共：{{total}}组
            <p style="width:80%;float:left;">总额：￥{{all_money}}</p>
            <span @click="goAddress('/historyXZ')" style="float:right;cursor:pointer;">更多</span>
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
      unsettlementArr: []
    };
  },
  methods: {
    isshow() {
      this.show = false;
    },
    openService() {
      if (this.getApiName == "uc") {
        this.isShowPannel = false;
        chat.load();
      } else {
        alert("敬请期待！");
      }
    },
    openServices() {
      setTimeout(() => {
        window.open(this.csUrl, "", "width=600,height=510");
      }, 500);
    },
    showPannel() {
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
    },
    getWeijie(page, number) {
      let params = {};
      let oid_info = sessionStorage.getItem("im_token");
      params.oid = oid_info;
      params.page = page;
      params.number = number;
      this.$http
        .post("/getinfo/bet", JSON.stringify(params))
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.unsettlementArr = res.data[i].res;
            if (res.data[i].res.length != 0) {
              this.total = res.data[i].allBet.unSettlement;
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
      this.$router.push({
        path: path
      });
      this.closePannel();
    }
  },
  created() {
    if (getApiName() == "uc") {
      this.show = true;
    }
    if (sessionStorage.getItem("serviceUrl")) {
      this.csUrl = sessionStorage.getItem("serviceUrl");
    } else {
      this.getServiceUrl();
    }
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
.float-right .cs {
  border-radius: 3px 3px 0 0;
  width: 50px;
  background: url("@{public_img}/images/common/icon/ico-right-cs.png") no-repeat
    center center #1c4fa8;
}
.float-right .weixin {
  border-radius: 0 0 3px 3px;
  width: 50px;
  background: url("@{public_img}/images/common/icon/ico-right-call.png")
    no-repeat center center #1c4fa8;
}
.float-right .weijie {
  margin-top: 3px;
  border-radius: 3px;
  background: url("@{public_img}/images/common/icon/ico-right-weijie.png")
    no-repeat 12px center #1c4fa8;
  padding-right: 10px;
  transition: all ease 1s;
}
.total {
  background: url("@{public_img}/images/common/icon/ico-right-weijie.png")
    no-repeat 12px center #1c4fa8;
}
</style>
<style scoped>
.total,
.float-right {
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
  padding: 5px 10px 5px 45px;
  color: #fff;
  width: 180px;
  overflow: hidden;
  transition: all ease 0.5s;
  border-radius: 0 0 3px 3px;
}
.float-right .total p {
  color: #eb6877;
  line-height: 20px;
}
.unsettlement {
  background-color: #f0f0f6;
  position: fixed;
  right: 53px;
  bottom: 100px;
  width: 235px;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: left;
  transition: all ease 0.5s;
  z-index: 9;
}
.unsettlement .box {
  height: calc(96vh - 295px) !important;
  overflow-y: auto;
}
.unsettlement h2 {
  height: 35px;
  line-height: 35px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 16px;
  text-align: left;
  padding-left: 10px;
  color: #fff;
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
</style>
