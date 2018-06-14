<template>
  <div class="games">
    <div class="big_div">
      <div class="all" v-for="item in cur_data">
        <div class="small_div">
          <img :src="`${imgsrc}${item.img}`" alt="">
        </div>
        <div class="tex">
          <a href="javascript:void(0)" class="real btn" @click="real(item.flash)" type="button" target="_blank">真钱模式</a>
          <a href="javascript:void(0)" class="sw btn" @click="sw(item.flash)" type="button" target="_blank">试玩模式</a>
        </div>
        <div class="text">{{item.cname}}</div>
      </div>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" :total="allnumb">
      </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      imgsrc: "/static/images/common/mg/",
      currentPage: 1, // 当前页码
      allnumb: 0,
      rel: "",
      formID: "formID_",
      submit_btn: "submit_btn_",
      cur_data: [],
      listA: [
        {
          name: "Break Away",
          cname: "冰球突破",
          img: "BTN_BreakAway1.png",
          flash: 60467
        },
        {
          name: "Reel Gems",
          cname: "宝石迷阵",
          img: "BTN_ReelGems1.png",
          flash: 68778
        },
        {
          name: "Immortal Romance",
          cname: "不朽情缘",
          img: "BTN_ImmortalRomance1.png",
          flash: 68624
        },
        {
          name: "Carnaval",
          cname: "狂欢节",
          img: "BTN_Carnaval2.png",
          flash: 26641
        },
        {
          name: "Ladies Nite",
          cname: "女仕之夜",
          img: "BTN_LadiesNite5.png",
          flash: 26619
        },
        {
          name: "Break da Bank Again",
          cname: "银行爆破",
          img: "BTN_BreakDaBankAgain1.png",
          flash: 26635
        },
        {
          name: "Lucky Twins",
          cname: "幸运双星",
          img: "BTN_luckyTwins_ZH.png",
          flash: 70221
        },
        {
          name: "Spring Break",
          cname: "春假",
          img: "BTN_SpringBreak2.png",
          flash: 26621
        },
        {
          name: "The Twisted Circus",
          cname: "反转马戏团",
          img: "BTN_TwistedCircus.png",
          flash: 26667
        },
        {
          name: "Dragon Dance",
          cname: "舞龙",
          img: "BTN_DragonDance.png",
          flash: 46704
        },
        {
          name: "Burning Desire",
          cname: "燃烧的欲望",
          img: "BTN_BurningDesire1.png",
          flash: 26625
        },
        {
          name: "Big Top",
          cname: "马戏篷",
          img: "BTN_BigTop1.png",
          flash: 26647
        },
        {
          name: "Playboy",
          cname: "花花公子",
          img: "BTN_Playboy.png",
          flash: 70878
        },
        {
          name: "Wild Orient",
          cname: "东方珍兽",
          img: "BTN_WildOrient_Button.png",
          flash: 50192
        },
        {
          name: "Bust The Bank",
          cname: "抢劫银行",
          img: "BTN_BustTheBank1.png",
          flash: 71476
        },
        {
          name: "Bush Telegraph",
          cname: "丛林摇摆",
          img: "BTN_BushTelegraph1.png",
          flash: 26724
        },
        {
          name: "Tally Ho",
          cname: "泰利嗬",
          img: "BTN_TallyHo1.png",
          flash: 26631
        },
        {
          name: "5 Reel Drive",
          cname: "5卷的驱动器",
          img: "BTN_5ReelDrive1.png",
          flash: 26685
        },
        {
          name: "Thunderstruck II",
          cname: "雷神2",
          img: "BTN_ThunderstruckTwo1.png",
          flash: 26659
        },
        {
          name: "Mermaids Millions",
          cname: "海底世界",
          img: "BTN_MermaidsMillions1.png",
          flash: 26611
        },
        {
          name: "Basketball Star",
          cname: "篮球巨星",
          img: "BTN_BasketballStar_ZH.png",
          flash: 45539
        },
        {
          name: "Emperor of the Sea",
          cname: "青龙出海",
          img: "BTN_EmperorOfTheSea_ZH.png",
          flash: 69660
        },
        {
          name: "Eagle's Wings",
          cname: "老鹰的翅膀",
          img: "BTN_EaglesWings1.png",
          flash: 26677
        },
        {
          name: "Age of Discovery",
          cname: "史地大发现",
          img: "BTN_AgeofDiscovery3.png",
          flash: 28692
        },
        {
          name: "Football Star",
          cname: "足球明星",
          img: "BTN_footballstar1.png",
          flash: 28806
        },
        {
          name: "What a Hoot",
          cname: "猫头鹰乐园",
          img: "BTN_WhataHoot3.png",
          flash: 26657
        },
        {
          name: "Bikini Party",
          cname: "比基尼派对",
          img: "BTN_BikiniParty_ZH.png",
          flash: 46810
        },
        {
          name: "Retro Reels - Diamond Glitz",
          cname: "复古卷轴钻石耀眼",
          img: "BTN_RetroReels1.png",
          flash: 70848
        },
        {
          name: "Starlight Kiss",
          cname: "星梦之吻",
          img: "BTN_StarlightKiss.png",
          flash: 26669
        },
        {
          name: "Break da Bank",
          cname: "抢银行",
          img: "BTN_BreakDaBank1.png",
          flash: 26649
        },
        {
          name: "Thunderstruck",
          cname: "雷神",
          img: "BTN_Thunderstruck1.png",
          flash: 26613
        },
        {
          name: "Fish Party",
          cname: "派对鱼",
          img: "BTN_FishParty.png",
          flash: 42249
        },
        {
          name: "Lucky Koi",
          cname: "幸运的锦鲤",
          img: "BTN_LuckyKoi.png",
          flash: 45611
        },
        {
          name: "Alaskan Fishing",
          cname: "阿拉斯加捕捞",
          img: "BTN_AlaskanFishing1.png",
          flash: 26637
        },
        {
          name: "Pure Platinum",
          cname: "纯铂",
          img: "BTN_PurePlatinum1.png",
          flash: 26651
        },
        {
          name: "108 Heroes",
          cname: "108好汉",
          img: "BTN_108Heroes._ZH.jpg.png",
          flash: 70715
        }
      ]
    };
  },
  methods: {
    //切换每页显示的数据
    handleSizeChange(val) {
      this.getData(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(this.currentPage);
    },
    //请求页数的接口方法
    getData(page) {
      let per_page = 20;
      let start =
        this.currentPage == 1 || !page ? 0 : (this.currentPage - 1) * per_page;
      let end = start + per_page;
      this.cur_data = [];
      for (let i = start; i < end; i++) {
        if (typeof this.listA[i] == "undefined") {
          break;
        }
        this.cur_data.push(this.listA[i]);
      }
    },
    real(flash) {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200
        });
        return;
      }
      let params = {};
      if (sessionStorage.getItem("im_username") === "游客") {
        this.$swal({
          text: "请注册或登录正式会员账户后体验",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        this.$router.replace({
          // path: '/home'
        });
        return false;
      } else {
        let winHandler = window.open("", "_blank");
        (params.free = 0), (params.gameName = "mgswallet");
        params.gamecode = flash;
        this.$http
          .post("/externalGame/loading", JSON.stringify(params))
          .then(res => {
            if (res.data.msg == 4001) {
              this.$router.push({
                path: "/home"
              });
            }

            if (res.data.code === 0) {
              winHandler.location.href = res.data.info;
            } else {
              winHandler.close();
            }
          });
      }
    },
    sw(flash) {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录会员账号后体验！",
          type: "error",
          timer: 1200
        });
        return;
      }
      let params = {};
      if (this.$store.state.token == null) {
        this.$swal({
          text: "请登录正式账号操作",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return false;
      } else {
        let winHandler = window.open("", "_blank");
        (params.free = 1), (params.gameName = "mgswallet");
        params.gamecode = flash;
        this.$http
          .post("/externalGame/loading", JSON.stringify(params))
          .then(res => {
            if (res.data.msg == 4001) {
              this.$router.push({
                path: "/home"
              });
            }
            if (res.data.code === 0) {
              winHandler.location.href = res.data.info;
            } else {
              winHandler.close();
            }
          });
      }
    }
  },
  created() {
    this.allnumb = this.listA.length;
    this.getData(1);
  }
};
</script>
<style>
body {
  min-width: 1300px;
}
.games {
  position: relative;
  top: 45px;
}
.btn {
  border: 0px;
}
.tab {
  background: none;
}
.el-pager li {
  min-width: 25px !important;
  height: 25px;
  line-height: 25px;
  background: #cccccc;
  border-radius: 50%;
  color: #fff;
  margin-left: 5px;
}
.el-pagination {
  margin: 0 0 120px 0;
}
.el-pager li.active {
  background: #409eff;
  color: #fff;
}
.el-pager li:hover {
  background: #409eff;
  color: #fff;
}
.big_div {
  width: 1300px;
  margin: 0 auto;
  text-align: left;
}
.small_div {
  width: 250px;
  height: 180px;
  background: #f2f2f2;
  position: relative;
}
.text,
.tex {
  width: 250px;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  font-family: "SimHei";
  text-align: center;
}
.all:hover .tex {
  display: block;
}
.all:hover {
  box-shadow: 0 0 10px -2px #999;
}
.tex {
  position: absolute;
  background: #f2f2f2;
  display: none;
}
.all {
  display: inline-block;
  width: 250px;
  margin-left: 10px;
  margin-top: 10px;
}
.real,
.sw {
  height: 30px;
  width: 100px;
  line-height: 30px;
  border-radius: 3px;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-family: "SimHei";
}
.sw {
  background: #bbbbbb;
}
.real {
  background: #174fb7;
}
.real:hover {
  background: #124496;
}
.sw:hover {
  background: #aaa;
}
.el-pagination__jump {
  display: none !important;
}
.el-pager li {
  width: 20px;
  background: #ccc;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  min-width: 20px;
  margin-left: 10px;
  position: relative;
  top: 3px;
  color: #fff;
}
.el-pager li.active {
  background: #174fb7;
  color: #fff;
}
.el-pager li {
  min-width: 20px !important;
}
.el-pagination .btn-next {
  padding: 0;
  margin-left: 10px;
}
.el-pagination .btn-prev {
  padding: 0;
}
.page {
  margin: 0;
}
.el-pagination__rightwrapper {
  display: none;
}
</style>
