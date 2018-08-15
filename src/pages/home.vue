<template>
  <div class="home" v-if="shouldLoadPage&&(getApiName!=='ly'&&getApiName!=='hg'&&getApiName!=='yiren'&&getApiName!=='tt'&&getApiName!=='gd'&&getApiName!=='yiteng')">
    <hg-Header :showLoginListen="showLoginListen"></hg-Header>
    <!-- <div class="abs-w" v-show="getApiName=='yiren'"></div> -->
    <div class="home-content">
      <div class="top clearfix">
        <div class="slider f-l">
          <el-carousel trigger="click" style="height:490px !important">
            <el-carousel-item v-for="(item, index) in slider" :key="index">
              <img :src="item" @click="(getApiName == 'sd'&&index==1)?$router.push('/notice:notices'):''">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="bottom">
        <div v-if="getApiName == 'fulicai'" class="nav-lottery">
          <div>
            <div class="ag" @click="goAddress('cqssc')">
              <img src="/static/images/common/cq.jpg" height="118" width="360" alt="" style='margin-bottom:2px'>
            </div>
            <div class="mg" @click="goAddress('pk10')">
              <img src="/static/images/common/kl.jpg" height="118" width="360" alt="">
            </div>
          </div>
          <div>
            <div class="cpgame" @click="goAddress('Games/race')">
              <img src="/static/images/common/bj.jpg" height="240" width="540" alt="">
            </div>
          </div>
          <div>
            <div class="download">
              <img :src='`/static/images/${getApiName}/down.png`' height="190" width="340" alt="" style='border:none'>
              <div class='nsee'>
                <div class='udate'>
                  更新时间：2017-11-12
                </div>
                <div class="ddow">
                  <div class="iosc" @click="iosc">苹果APP教程</div>
                  <div class="adridc" @click="adridc">安卓APP教程</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nav-lottery">
          <div>
            <div class="ag" @click="goAddress('ag')">
              <img src="/static/images/common/AGgame.png" height="118" width="360" alt="" style='margin-bottom:2px'>
            </div>
            <div class="mg" @click="goAddress('mg')">
              <img src="/static/images/common/MGgame.png" height="118" width="360" alt="">
            </div>
          </div>
          <div>
            <div class="cpgame" @click="goAddress('Games/race')">
              <img src="/static/images/common/cpgame.png" height="240" width="540" alt="">
            </div>
          </div>
          <div>
            <div class="download">
              <img :src='`/static/images/${getApiName}/down.png`' height="190" width="340" alt="" style='border:none'>
              <div class='nsee'>
                <div class='udate'>
                  更新时间：2017-11-12
                </div>
                <div class="ddow">
                  <div class="iosc" @click="iosc">苹果APP教程</div>
                  <div class="adridc" @click="adridc">安卓APP教程</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="jc" v-if='open'>
        <div class="jsc ">
          <span class="close" @click='colse'></span>
          <img :src="`/static/images/${getApiName}/iosapp.png`" height="725" width="1043" alt="" @click='colse'>
        </div>
      </div>
      <div class="jc" v-if='open1'>
        <div class="jsc ">
          <span class="close" @click='colse1'></span>
          <img :src="`/static/images/${getApiName}/adrid.png`" height="725" width="1043" alt="" @click='colse1'>
        </div>
      </div>
      <div class="pay-ico">
        <ul>
          <li>
            <img :src="$getPublicImg('/images/common/footer-bank.png')" />
          </li>
        </ul>
      </div>
    </div>
    <hg-footer ourTech="true"></hg-footer>
  </div>
</template>
<script>
import hgHeader from "@/components/hgHeader";
import hgFooter from "@/components/hgFooter";
import Axios from "axios";
import queryString from "querystring";
// import Login from '@/components/Account/login'

export default {
  data() {
    return {
      data: null,
      getApiName: getApiName(),
      latestNotice: "暂无最新公告",
      showLoginListen: false,
      open1: false,
      open: false,
      slider: "",
      shouldLoadPage: false,
      isLogin: false,
      bgc:false,
      gameNavs: {
        260: {
          title: "88赛马",
          code: 260,
          subtitle: "88 RACE",
          gamePath: "/Games/race",
          icoSrc: require("../../static/images/common/icon/ico-nav-race.png")
        },
        270: {
          title: "极速六合彩",
          code: 270,
          subtitle: "SPEED MARK SIX",
          gamePath: "/Games/jslh",
          icoSrc: require("../../static/images/common/icon/ico-nav-jslh.png")
        },
        240: {
          title: "极速赛车",
          code: 240,
          subtitle: "SPEED PK10",
          gamePath: "/Games/jssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-jssc.png")
        },
        250: {
          title: "极速时时彩",
          code: 250,
          subtitle: "SPEED TIMES",
          gamePath: "/Games/jsssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-jsssc.png")
        },
        210: {
          title: "威尼斯赛艇",
          code: 210,
          subtitle: "VENICE ROWING",
          gamePath: "/Games/veniceRowing",
          icoSrc: require("../../static/images/common/icon/ico-nav-speedShip.png")
        },
        46: {
          title: "罗马时时彩",
          code: 46,
          subtitle: "ROMA LOTTERY",
          gamePath: "/Games/roma",
          icoSrc: require("../../static/images/common/icon/ico-nav-roma.png")
        },
        51: {
          title: "北京赛车",
          code: 51,
          subtitle: "BEIJING PK10",
          gamePath: "/Games/pk10",
          icoSrc: require("../../static/images/common/icon/ico-nav-pk10.png")
        },
        2: {
          title: "重庆时时彩",
          code: 2,
          subtitle: "COLORED TIMES",
          gamePath: "/Games/cqssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-ssc.png")
        },
        69: {
          title: "香港六合彩",
          code: 69,
          subtitle: "HK MARK SIX",
          gamePath: "/Games/markSix",
          icoSrc: require("../../static/images/common/icon/ico-nav-six.png")
        },
        160: {
          title: "PC蛋蛋",
          code: 160,
          subtitle: "PC EGG",
          gamePath: "/Games/pcegg",
          icoSrc: require("../../static/images/common/icon/ico-nav-pcegg.png")
        },
        171: {
          title: "幸运飞艇",
          code: 171,
          subtitle: "AIR SHIP",
          gamePath: "/Games/luckyAirship",
          icoSrc: require("../../static/images/common/icon/ico-nav-luckyship.png")
        },
        3: {
          title: "广东快乐十分",
          code: 3,
          subtitle: "HAPPY 10",
          gamePath: "/Games/happyTen",
          icoSrc: require("../../static/images/common/icon/ico-nav-ten.png")
        },
        47: {
          title: "重庆幸运农场",
          code: 47,
          subtitle: "LUCKY FARM",
          gamePath: "/Games/luckFarm",
          icoSrc: require("../../static/images/common/icon/ico-nav-xync.png")
        },
        172: {
          title: "江苏骰宝(快3)",
          code: 172,
          subtitle: "JS SIC BO",
          gamePath: "/Games/jsks",
          icoSrc: require("../../static/images/common/icon/ico-nav-jsks.png")
        },
        180: {
          title: "北京快乐8",
          code: 180,
          subtitle: "BEIJING HAPPY8",
          gamePath: "/Games/bjkl8",
          icoSrc: require("../../static/images/common/icon/ico-nav-bjkl8.png")
        },
        320: {
          title: "88六合彩",
          code: 320,
          subtitle: "88 SIX",
          gamePath: "/Games/six88",
          icoSrc: require("../../static/images/common/icon/ico-nav-bjkl8.png")
        }
      }
    };
  },
  computed: {},
  created() {
    console.log(sessionStorage.getItem("im_token"))
    //获取轮播图（图片地址)
    // 去除地址栏垃圾而复杂的参数
    // 取hash之后的参数
    let { hash } = location;
    let search = location.search.replace("?", "");
    let hashIndex = hash.indexOf("?") + 1;
    let hashStr = hash.substr(hashIndex, hash.length);
    let urlParams = {
      ...(queryString.parse(search) || {}),
      ...(queryString.parse(hashStr) || {})
    };
    console.log(urlParams);

    this.$http.post("/user/getPicturesAndAnnouncements").then(res => {
      this.slider = res.data.pc_rotations;
    });
    if (urlParams.toPC) {
      let params = {};
      if (
        this.getApiName == "ly" ||
        this.getApiName == "yiren" ||
        this.getApiName == "tt" ||
        this.getApiName == "gd"||
        this.getApiName == "yiteng"
      ) {
        params.username = urlParams.username;
        params.oid = urlParams.oid;
      } else {
        params.username = urlParams.username;
        params.oid = urlParams.oid ? urlParams.oid : this.$store.state.token;
      }
      this.$http.post("/user/toPC", JSON.stringify(params)).then(res => {
        if (res.data.msg == "3003") {
          this.shouldLoadPage = true;
          this.$swal({
            text: "请用正式帐号",
            type: "info",
            timer: 1200,
            confirmButtonText: "关闭"
          })
            .then(function(response) {
              location.href = location.host;
            })
            .catch(e => {});
          return false;
        } else if (res.data.code == 0) {
          this.isShowAgreement = true;
          this.listenAgree("agree");
          sessionStorage.setItem("agree", "true");
          sessionStorage.setItem("im_token", res.data.oid);
          this.$store.commit("updatelotteryMoney", res.data.money);
          sessionStorage.setItem("im_username", res.data.username);
          sessionStorage.setItem("im_realname", res.data.realname);
          sessionStorage.setItem("im_telphone", res.data.telphone);
          this.shouldLoadPage = true;
        } else {
          this.shouldLoadPage = true;
        }
      });
    } else {
      this.shouldLoadPage = true;
    }
    if (this.getApiName == "hg") {
      this.$router.push({ name: "docking" });
    }

    if (
      this.getApiName == "ly" ||
      this.getApiName == "yiren" ||
      this.getApiName == "tt" ||
      this.getApiName == "gd" ||
      this.getApiName == "yiteng"
      
    ) {
      if (sessionStorage.getItem("im_token")) {
        this.$http.post("/systems/game_sort").then(res => {
          let sort = res.data.sort;
          this.$router.push(this.gameNavs[sort[0]].gamePath);
        });
      } else {
        location.href = "./";
      }
    }
    this.latestNotice = localStorage.getItem("latestNotice");
  },
  methods: {
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return r[2];
      return null;
    },
    // comingSoon() {
    //   this.$swal({
    //     text: "即将上线！",
    //     type: "info",
    //     timer: 1200,
    //     confirmButtonText: "关闭"
    //   })
    //     .then(function(response) {})
    //     .catch(e => {});
    //   // this.$router.push('/home');
    //   return;
    // },
    iosc() {
      this.open = true;
    },
    adridc() {
      this.open1 = true;
    },
    colse() {
      this.open = false;
    },
    colse1() {
      this.open1 = false;
    },
    goAddress(path) {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$router.push({
          path: path
        });
        return;
      }
      if (!sessionStorage.getItem("im_token")) {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        this.$router.push("/home");
      } else {
        this.$router.push({
          path: path
        });
      }
    },
    listenAgree(msg) {
      if (msg === "agree") {
        this.isShowAgreement = false;
        sessionStorage.getItem("im_username") === "游客"
          ? this.$router.push("/Games/race")
          : this.$router.push({ path: "/Games/race" });
        this.agree = true;
        sessionStorage.setItem("agree", "true");
      } else if (msg === "disagree") {
        this.isLogin = false;
        this.isShowAgreement = false;
        this.agree = false;
        sessionStorage.clear();
      }
    }
  },
  components: {
    hgHeader,
    hgFooter
  }
};
</script>

<style scoped>
.iosc,
.adridc {
  background: #fff;
}
</style>

 
<style>
body {
  height: 100%;
}

#app {
  font-family: "Microsoft Yahei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ccc;
  height: 100%;
  margin: 0 auto;
}
/* .home {
  overflow-y: auto;  
} */
/*.home footer {
  position: fixed!important;
  bottom: 0;
  width: 100%;
}*/
.home .main {
  margin: 0 auto;
  width: 1260px;
}
.bet-main {
  background-color: #eee;
}
.home-content {
  width: 1260px;
  margin: 0 auto;
  padding-top: 66px;
  min-height: calc(100vh - 102px) !important;
}

.jc img {
  margin-top: 10vh;
}
.close {
  position: absolute;
  top: 10vh;
  right: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.jc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20001;
}
.jsc {
  width: 1054px;
  position: relative;
  margin: 0 auto;
}
.home-content .news {
  font-size: 14px;
  color: #333;
  line-height: 22px;
  border-bottom: 1px solid #cdcdd9;
  margin-bottom: 20px;
}
.home-content marquee {
  width: 1125px;
  height: 30px;
  line-height: 30px;
}
.home-content .more-news {
  float: right;
  width: 70px;
  color: #8c8ab2;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
.home-content .news .ico {
  float: left;
}
.mainClose {
  margin: 10px 10px 0 70px !important;
}
.udate {
  height: 27px;
  line-height: 27px;
  background: rgba(0, 0, 0, 0.3);
  text-indent: 20px;
  color: #fff;
  text-align: left;
}
#right {
  width: 180px;
  position: fixed;
  right: 0;
  overflow: auto;
}
.el-carousel {
  overflow-y: hidden;
}
.el-carousel__item {
  background-size: cover !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-card__body a {
  display: block;
}
.ddow div {
  float: left;
  height: 50px;
  line-height: 50px;
}
.home .top {
  /*height: 100px;*/
  margin-bottom: 5px;
  box-shadow: 4px 4px 10px #cbc8c8;
  border-radius: 10px !important;
}
.home .slider,
.el-carousel__container {
  height: 490px !important;
  width: 100%;
}
.el-carousel__arrow {
  font-size: 46px;
  height: 50px;
  width: 50px;
}
.home .el-carousel__button {
  height: 5px;
}

.nav-lottery div {
  cursor: pointer;
}
.nav-lottery .el-col {
  margin: 0 20px 20px 0 !important;
  cursor: pointer;
}
.nav-lottery img {
  border: none;
}
.nav-lottery {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 1260px;
  margin: 0 auto;
}
.nav-lottery p {
  font-size: 16px;
}
.nav-lottery .el-card p:last-child {
  font-size: 12px;
  line-height: 25px;
  color: #b6b5d5;
}
/* .nav-lottery .arrows-left,
.nav-lottery .arrows-right {
  position: absolute;
  top: 40%;
  z-index: 88;
  cursor: pointer;
  transition:  all ease .5s;
}
.nav-lottery i {
  font-size: 30px;
  color: #7b73be;
}
.nav-lottery .arrows-left:hover {
  left: 5px;
}
.nav-lottery .arrows-right:hover {
  right: 5px;
}
.nav-lottery .arrows-left {
  left: 8px;
}
.nav-lottery .arrows-right {
  right: 8px;
} */
.el-card,
.nav-lottery .el-col-4,
.nav-lottery .more-game .el-card {
  width: 140px !important;
  height: 200px;
  overflow: hidden;
}
.nav-lottery .more-game {
}
.nav-lottery .el-col-4:nth-child(8) {
  margin-right: 0 !important;
}
.lotteryIco {
  width: 100px;
  height: 100px;
  margin: 19px 0 0 0;
  animation-duration: 0.8s;
  animation-name: bounceIn;
}
.nav-lottery .el-card {
  box-shadow: none;
  border: none;
}
.nav-lottery .el-card__body span {
  display: block;
}
.nav-lottery .el-card__body span img {
  transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
}

.nav-lottery .el-card__body span:hover > img {
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
}
.nav-lottery .game-title {
  margin-top: 20px;
}
.nav-lottery .more-game .el-card {
  height: 150px;
  line-height: 150px;
  font-size: 18px;
  color: #8c8ab2;
}
.pay-ico {
  border-top: 1px solid #cdcdd9;
  height: 60px;
  line-height: 60px;
  clear: both;
  width: 1260px;
  margin: 40px auto 0;
  /*position: absolute;*/
  /*bottom: 60px;*/
  /*left: 50%;*/
  /*margin-left: -630px;*/
}
.pay-ico li {
  display: inline-block;
  margin: 0 10px;
}
.pay-ico li img {
  /*height: 28px;*/
  margin-top: 18px;
}
.news .ico-my-news {
  width: 50px;
}
.download .ercode {
  position: absolute;
  width: 105px;
  height: 105px;
  top: 50px;
  left: 34px;
}
.download .ercode img {
  width: 105px;
  height: 105px;
}

/*@media screen and (max-width: 1400px) {
  .home .slider, .el-carousel__container {
      height: 300px!important;
  }
}*/

@media screen and (max-width: 1400px) {
  .jsc img {
    width: 900px;
    height: 600px !important;
    margin-top: 10vh;
  }
  .close {
    right: 75px;
  }
}

@media screen and (max-width: 1024px) {
  .header .main,
  .home-content,
  .nav-lottery,
  .main,
  .pay-ico,
  .pay-ico li img {
    width: 100% !important;
  }
  .nav-lottery {
    zoom: 0.8;
  }
  .nav li {
    font-size: 12px !important;
  }
  .adridc {
    width: 45% !important;
  }
  .header h1.logo {
    float: left;
    margin: 8px 0 0 0 !important;
    width: 145px !important;
  }
}
.nsee {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: -2px;
}
.download {
  height: 240px;
  position: relative;
}
.iosc,
.adridc {
  /*position: absolute;*/
  /* left: 560px;
  top: 390px;*/
  /*width: 180px;*/
  height: 50px;
  width: 169px;
  border-right: 1px solid #ccc;
  line-height: 50px;
  font-size: 16px;
  color: #333;
  /*border-radius: 5px;*/
}
.bottom {
  margin-top: 10px;
}
.adridc {
  width: 170px;
  border: none;
  /*margin-left: -1px;*/
  /*left: 760px;*/
}
</style>
