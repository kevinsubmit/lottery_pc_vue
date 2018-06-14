<template>
  <!-- 左边栏 -->
  <div v-if='onf' id="siderLeft" :class="`siderLeft_${getApiName}`" ref="sider">
    <div>
      <div :class="{'unfold':activeIndex==1}">
        <div class="game_hot" @click="toggleItem(1)">
          <div>
            <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon1.png`)" alt="">
            <h3>热门彩票</h3>
          </div>
          <i :class="activeIndex==1?'el-icon-remove-outline':'el-icon-circle-plus-outline'" style="color:white"></i>
        </div>
        <div>
          <ul class="second_menu_list" :style="{'max-height':activeIndex==1?unfoldHeight+'px':0}">
            <li v-for="(item,i) in hotLottery" ref='col' :key="i" @click='changecolor(item,i)' :class='{active:item.gamePath==routePath}'>
              <router-link :to="item.gamePath">
                <div class="menu_item_wrap">
                  <img :src="item.icoSrc" style="width:56px">
                  <div class="game_name">
                    <div>{{item.title}}</div>
                    <div>{{item.subtitle}}</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div :class="activeIndex==2?'unfold':''">
        <div class="game_hot" @click="toggleItem(2)">
          <div>
            <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon2.png`)" alt="">
            <h3>经典彩票</h3>
          </div>
          <i :class="activeIndex==2?'el-icon-remove-outline':'el-icon-circle-plus-outline'" style="color:white"></i>
        </div>
        <div>
          <ul class="second_menu_list" :style="{'max-height':activeIndex==2?unfoldHeight+'px':0}">
            <li v-for="(item,i) in classicLottery" ref='col' :key="i" @click='changecolor(item,i)' :class='{active:item.gamePath==routePath}'>
              <router-link :to="item.gamePath">
                <div class="menu_item_wrap">
                  <img :src="item.icoSrc">
                  <div class="game_name">
                    <div>{{item.title}}</div>
                    <div>{{item.subtitle}}</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div  class="game_hot" @click="goToGame('sport')" v-show="getApiName!='fulicai'">
        <div>
          <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon7.png`)" alt="">
          <h3>体育投注</h3>
          <img class="icon-hot" :src="require(`../../static/images/common/hot.png`)" alt="">
        </div>
      </div>
      <div class="game_hot" @click="goToGame('ag')" v-show="getApiName!='fulicai'">
        <div>
          <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon4.png`)" alt="">
          <h3>真人视讯</h3>
        </div>
      </div>
      <!-- <div class="game_hot" @click="goToGame('chesscard')">
        <div>
          <img :src="`../../static/images/common/icon/${iconFolder}sidebar-icon3.png`" alt="">
          <h3>棋牌竞技</h3>
        </div>
      </div> -->
      <div class="game_hot" v-show="isLogin&&getApiName!='fulicai'" @click="goToGame('fish')">
        <div>
          <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon5.png`)" alt="">
          <h3>{{$getApiName=='ly'?'捕鱼王':'捕鱼游戏'}}</h3>
        </div>
      </div>
      <div class="game_hot" @click="goToGame('mg')" v-show="getApiName!='yiren'&&getApiName!='agcai'&&getApiName!='ly'&&getApiName!='tt' && getApiName!='fulicai' && getApiName!='yile' && getApiName!='crown'">
        <div>
          <img :src="require(`../../static/images/common/icon/${iconFolder}sidebar-icon6.png`)" alt="">
          <h3>电子游艺</h3>
        </div>
      </div>
      <!-- <ul class="game_list" :id="`game_${getApiName}`">
                <li class="clearfix" v-for="(item,i) in data" ref='col'  @click='changecolor(item,i)' :class='{active:gameNavs[item].gamePath==routePath}'>                    
                    <router-link :to="gameNavs[item].gamePath">
                        <div class="ico"><img :src="gameNavs[item].icoSrc"></div>
                        <div class="game_name">
                            <div>{{gameNavs[item].title}}</div>
                            <div>{{gameNavs[item].subtitle}}</div>
                        </div>
                    </router-link>
                </li>
            </ul> -->
    </div>
  </div>
</template>

<script>
import { cacheGame } from "@/utils";
import _ from "lodash";
export default {
  data() {
    return {
      sort: null,
      data: [],
      getApiName: getApiName(),
      routePath: null,
      code: 0,
      isOpen: false,
      onf: false,
      isClose: 1,
      showAddIco: false,
      activeIndex: 1,
      hotLottery: [],
      classicLottery: [],
      isLogin: false,
      unfoldHeight: "",
      gameNavs: [
        {
          title: "88赛马",
          code: 260,
          subtitle: "88 RACE",
          gamePath: "/Games/race",
          icoSrc: require("../../static/images/common/icon/ico-nav-race.png")
        },
        {
          title: "极速六合彩",
          code: 270,
          subtitle: "SPEED MARK SIX",
          gamePath: "/Games/jslh",
          icoSrc: require("../../static/images/common/icon/ico-nav-jslh.png")
        },
        {
          title: "极速赛车",
          code: 240,
          subtitle: "SPEED PK10",
          gamePath: "/Games/jssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-jssc.png")
        },
        {
          title: "极速时时彩",
          code: 250,
          subtitle: "SPEED TIMES",
          gamePath: "/Games/jsssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-jsssc.png")
        },
        {
          title: "威尼斯赛艇",
          code: 210,
          subtitle: "VENICE ROWING",
          gamePath: "/Games/veniceRowing",
          icoSrc: require("../../static/images/common/icon/ico-nav-speedShip.png")
        },
        {
          title: "罗马时时彩",
          code: 46,
          subtitle: "ROMA LOTTERY",
          gamePath: "/Games/roma",
          icoSrc: require("../../static/images/common/icon/ico-nav-roma.png")
        },
        {
          title: "北京赛车",
          code: 51,
          subtitle: "BEIJING PK10",
          gamePath: "/Games/pk10",
          icoSrc: require("../../static/images/common/icon/ico-nav-pk10.png")
        },
        {
          title: "重庆时时彩",
          code: 2,
          subtitle: "COLORED TIMES",
          gamePath: "/Games/cqssc",
          icoSrc: require("../../static/images/common/icon/ico-nav-ssc.png")
        },
        {
          title: "香港六合彩",
          code: 69,
          subtitle: "HK MARK SIX",
          gamePath: "/Games/markSix",
          icoSrc: require("../../static/images/common/icon/ico-nav-six.png")
        },
        {
          title: "PC蛋蛋",
          code: 160,
          subtitle: "PC EGG",
          gamePath: "/Games/pcegg",
          icoSrc: require("../../static/images/common/icon/ico-nav-pcegg.png")
        },
        {
          title: "幸运飞艇",
          code: 171,
          subtitle: "AIR SHIP",
          gamePath: "/Games/luckyAirship",
          icoSrc: require("../../static/images/common/icon/ico-nav-luckyship.png")
        },
        {
          title: "广东快乐十分",
          code: 3,
          subtitle: "HAPPY 10",
          gamePath: "/Games/happyTen",
          icoSrc: require("../../static/images/common/icon/ico-nav-ten.png")
        },
        {
          title: "重庆幸运农场",
          code: 47,
          subtitle: "LUCKY FARM",
          gamePath: "/Games/luckFarm",
          icoSrc: require("../../static/images/common/icon/ico-nav-xync.png")
        },
        {
          title: "江苏骰宝(快3)",
          code: 172,
          subtitle: "JS SIC BO",
          gamePath: "/Games/jsks",
          icoSrc: require("../../static/images/common/icon/ico-nav-jsks.png")
        },
        {
          title: "北京快乐8",
          code: 180,
          subtitle: "BEIJING HAPPY8",
          gamePath: "/Games/bjkl8",
          icoSrc: require("../../static/images/common/icon/ico-nav-bjkl8.png")
        },
        {
          title: "吉林快3",
          code: 280,
          subtitle: "JI LIN K3",
          gamePath: "/Games/jlk3",
          icoSrc: require("../../static/images/common/icon/ico-nav-jlk3.png")
        },
        // {
        //   title: "福彩3D",

        //   code: 2201,
        //   subtitle: "FC 3D",
        //   gamePath: "/Games/Fucai3D",
        //   icoSrc: require("../../static/images/common/icon/ico-nav-jsks.png")
        // },
      ]
    };
  },
  computed: {
    iconFolder: function() {
      return getApiName() == "yiren" || getApiName() == "ly" ? "yiren/" : "";
    }
  },
  methods: {
    setUnFoldMaxHeight() {
      if(!document.querySelector("#siderLeft")){
        return
      }
      let siderBarHeight = parseInt(
        window.getComputedStyle(document.querySelector("#siderLeft"), null).height
      );
      let siderBarItemHeight =
        parseInt(
           window.getComputedStyle(document.querySelector(".game_hot"), null).height
        ) + 1;
      let siderBarChildLen = document.querySelector("#siderLeft").children[0]
        .children.length;
      let unfoldHeight = siderBarHeight - siderBarItemHeight * siderBarChildLen;
      this.unfoldHeight = unfoldHeight;
    },
    goToGame(type) {
      if (type == "fish") {
        this.$router.push("/Gamesfish");
      }
      if (type == "ag") {
        // 暂时不上线注释掉
        if(this.getApiName=='ly'){
          this.$router.push("/lyAgGame");
          return
        }
        this.$router.push("/ag");
      }
      if (type == "chesscard") {
        this.$router.push("/Gamescard");
      }
      if (type == "mg") {
        this.$router.push("/mg");
      }
      if (type == "sport") {
        this.$router.push("/Gamessport");
      }
    },
    toggleItem(index) {
      if (this.activeIndex === index) {
        this.activeIndex = undefined;
      } else {
        this.activeIndex = index;
      }
    },
    gamesort() {
      this.$http.post("/systems/game_sort").then(res => {
        if (res.data.msg == 4003) {
          this.$router.push({ name: "maintain" });
        } else {
          let sort = res.data.sort;
          let a = [];
          this.gameNavs.forEach(i => {
            if (
              [260, 270, 51, 2, 240, 69, 250, 3, 46, 47, 180].indexOf(i.code) != -1) {
              this.hotLottery.push(i);
            } else {
              this.classicLottery.push(i);
            }
          });
          //筛选出热门彩票:88赛马、极速六合彩、北京赛车、重庆时时彩、极速赛车、香港六合彩、极速时时彩
          //筛选出经典彩票:威尼斯赛艇、罗马时时彩、PC蛋蛋、广东快乐十分、幸运飞艇、重庆幸运农场、江苏骰宝(快3)
        }
      });
    },
    changecolor(item, i) {
      this.code = i;
      
      // this.color='red'
    },
    changeNav() {
      this.isOpen = !this.isOpen;
      this.showAddIco = !this.showAddIco;
      if (this.isOpen) {
        this.$emit("child-say", "close");
      } else {
        this.$emit("child-say", "open");
      }
    }
  },
  created() {
    if(this.getApiName == "fulicai" || this.getApiName == "crown" || this.getApiName == "yile" ){
      this.gameNavs.splice(-1,1)
    }
    let _this = this;
    let timer = null;
    this.gamesort();
    if (sessionStorage.getItem("im_token")) {
      this.onf = true;
      this.isLogin = true;
    } else {
      this.onf = false;
      sessionStorage.setItem("im_onf", this.onf);
    }
    this.routePath = this.$route.path;
    console.log(window);

    window.onresize = function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        _this.setUnFoldMaxHeight();
      }, 500);

      _.debounce(_this.setUnFoldMaxHeight,150)
    };
  },
  mounted() {
    this.setUnFoldMaxHeight();
  },
  watch: {
    $route(to, from) {
      this.routePath = to.path;
      if (to.path.match(/\/Games/) && !from.path.match(/\/Games/)) {
        this.activeIndex = 1;
      }
      // console.log(to.path);// 对路由变化作出响应...
    }
  }
};
</script>


<style lang="less" rel="stylesheet/less">
@import "../assets/less/variable.less";

.game_list .active {
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #9fc2e6);
  background-size: cover;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.second_menu_list > li.active {
  // background: url("../../static/images/common/siderItemBg.png") right center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #9fc2e6);
}
.siderLeft_gd .game_list .active {
  background: url("@{public_img}/images/gd/bg-nav-li.png") right center !important;
  background-size: cover;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
}

.siderLeft_ly .game_list .active {
  background: url("@{public_img}/images/ly/bg-nav-li.png") right center !important;
  background-size: cover;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
}
.siderLeft_yiren .game_list .active {
  background: url("@{public_img}/images/yiren/bg-nav-li.png") right center !important;
  background-size: cover;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
}
nav.top-nav {
  background: url("@{public_img}/images/ct/bg333.jpg") repeat;
}
.siderLeft_sd,
.siderLeft_uc,
.siderLeft_ct {
  background: #2866b4 url("@{public_img}/images/ct/bg-sidebar.jpg") center
    bottom no-repeat;
}
.siderLeft_gd {
  background: #c62f5f;
}
.siderLeft_ly {
  background: #862a41;
}
</style>

<style scoped>
#siderLeft {
  position: fixed;
  float: left;
  width: 180px;
  transition: all ease 0.5s;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 65px !important;
  height: calc(96vh - 60px) !important;
  overflow-y: hidden;
  background: #2866b4;
  /* url("//jkysxh.cn/img/pc/static/images/ct/bg-sidebar.jpg") bottom no-repeat */
}

/* #siderLeft .unfold {
  flex: 1;
} */

#siderLeft > div {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.game_hot {
  position: relative;
}
.game_hot .icon-hot {
  position: absolute;
  width: 22px;
  height: 24px;
  z-index: 1;
  right: 10px;
  top: 8px;
}
#siderLeft > div .game_hot,
.game_hot > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.game_hot:hover {
  background-image: url("../../static/images/common/siderItemBg.png");
}

.game_hot > div:first-child {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.game_hot h3{
  padding-left: 10px;
}

.second_menu_list {
  overflow-y: auto;
  transition: all cubic-bezier(0.42, 0, 1, 0.04) 0.2s;
}

.second_menu_list a {
  display: block;
}

.second_menu_list > li:hover img,
.second_menu_list > li:hover .game_name,
.second_menu_list > li.active img,
.second_menu_list > li.active .game_name {
  margin-left: 0;
}

.second_menu_list > li.active {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.second_menu_list .active a {
  border-bottom: none;
}

.second_menu_list > li.active .game_name > div {
  opacity: 1;
}

.second_menu_list .menu_item_wrap {
  display: flex;
  align-items: center;
}

.second_menu_list .menu_item_wrap img {
  margin-left: -65px;
  transition: all ease 0.3s;
}

.second_menu_list > li {
  line-height: 56px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}

.second_menu_list > li:hover div {
  color: #fff;
  opacity: 1;
}

.game_hot {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
}
.game_hot h3 {
  font-size: 14px;
  float: left;
  color: #fff;
}
.game_hot i {
  /* float: right;
  margin-top: 6px;
  color: #fff;
  font-style: inherit;
  color: #f0f0f0;
  transform: rotate(90deg); */
}
.game_list .ico {
  width: 45px;
  height: 42px;
  float: left;
  margin-top: 2px;
  border-radius: 5px;
  margin: -13px 0 0 -65px;
  cursor: pointer;
}

.game_name {
  float: left;
  text-align: left;
  opacity: 1;
  transition: all ease 0.3s;
  margin-left: 30px;
  line-height: 15px;
}

.game_name div:nth-child(1) {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  opacity: 0.5;
}
.game_name div:nth-child(2) {
  color: #fff;
  font-size: 10px;
  opacity: 0.3;
}
.game_list li {
  position: relative;
}
.game_list .active div,
.game_list li:hover div {
  color: #fff;
  opacity: 1;
}

.game_list .active .ico,
.game_list li:hover .ico {
  margin-right: 10px;
  margin-left: -10px;
}
.game_list li a {
  padding: 13px 0;
  display: block;
  height: 30px !important;
  margin: 0 12px;
}
.game_list .active a {
  border-bottom: none;
}

.game_list .active span {
  /*background: url(../img/yellowsan.png) no-repeat; */
  background-size: 100% 100%;
}
.game_list li span {
  position: absolute;
  right: 0;
  top: 25px;
  width: 10px;
  height: 20px;
}

.more_game {
  height: 35px;
  background: #4b4b4b;
  color: #fff;
}

.closeNav {
  width: 60px !important;
  transition: all ease 0.5s;
}
.closeNav h3,
.closeNav .game_name {
  margin-left: -150px;
  opacity: 0;
  transition: 0.5s;
}
.closeNav .ico,
.closeNav .active .ico {
  margin-left: -10px;
}
.closeNav .active .ico {
  margin-left: -10px !important;
}
.closeNav li:nth-child(2).active .ico {
  margin-left: 0 !important;
}
.closeNav .game_name {
  display: none;
}
@media screen and (max-height: 600px) {
}
</style>
<style>
.el-tooltip__popper.is-dark {
  background: #383747 !important;
  left: 56px !important;
}
</style>
