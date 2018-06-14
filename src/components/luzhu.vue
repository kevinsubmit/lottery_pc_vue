<template>
  <div class="luzhu">
    <!-- 北京赛车、幸运飞艇模板 -->
    <div class="luzhu-box" v-if="isShowPk10">
      <!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick"> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="pk10he" label="冠、亚军和"></el-tab-pane>
        <el-tab-pane name="pk10dx" label="冠、亚军大小"></el-tab-pane>
        <el-tab-pane name="pk10ds" label="冠、亚军单双"></el-tab-pane>
        <ul class="clearfix">
          <li v-for="item in luzhuObj">
            <span v-for="i in item" :class="setLuzhuItemClass(i)" class="luzhu-item">{{ i }}</span>
          </li>
        </ul>
      </el-tabs>
    </div>

    <!-- 重庆时时彩模板  -->
    <div class="luzhu-box" v-if="isShowSsc">
      <!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick"> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="ssc1" label="第一球" v-if="game_code!='46'&&game_code!='250'&&game_code!='2'"></el-tab-pane>
        <el-tab-pane name="sscdx" label="大小"></el-tab-pane>
        <el-tab-pane name="sscds" label="单双"></el-tab-pane>
        <el-tab-pane name="ssczhdx" label="总和大小"></el-tab-pane>
        <el-tab-pane name="ssczhds" label="总和单双"></el-tab-pane>
        <el-tab-pane name="ssclhh" label="龙虎和"></el-tab-pane>
        <ul class="clearfix">
          <li v-for="item in luzhuObj">
            <span v-for="i in item" :class="setLuzhuItemClass(i)" class="luzhu-item">{{ i }}</span>
          </li>
        </ul>
      </el-tabs>
    </div>

    <!-- 广东快乐十分、重庆幸运农场模板  -->
    <div class="luzhu-box" v-if="isShowTen">
      <!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick"> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="tendx" label="总和大小"></el-tab-pane>
        <el-tab-pane name="tends" label="总和单双"></el-tab-pane>
        <el-tab-pane name="tenweishu" label="总和尾数大小"></el-tab-pane>
        <el-tab-pane name="tenlh" label="龙虎"></el-tab-pane>
        <ul class="clearfix">
          <li v-for="item in luzhuObj">
            <span v-for="i in item" :class="setLuzhuItemClass(i)" class="luzhu-item">{{ i }}</span>
          </li>
        </ul>
      </el-tabs>
    </div>

    <div class="luzhu-box" v-if="isShowBjkl8">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="totalNum" label="总和数"></el-tab-pane>
        <el-tab-pane name="totalSize" label="总和大小"></el-tab-pane>
        <el-tab-pane name="totalSigleDouble" label="总和单双"></el-tab-pane>
        <el-tab-pane name="fiveProties" label="五行"></el-tab-pane>
        <el-tab-pane name="totalFrontBack" label="前后和"></el-tab-pane>
        <el-tab-pane name="sumSingleDouble" label="单双和"></el-tab-pane>
        <ul class="clearfix">
          <li v-for="item in luzhuObj">
            <span v-for="i in item" :class="setLuzhuItemClass(i)" class="luzhu-item">{{ i }}</span>
          </li>
        </ul>
      </el-tabs>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isShowPk10: true,
      isShowSsc: false,
      isShowTen: false,
      isShowBjkl8: false,
      title: "两面长龙",
      activeName: "pk10he",
      typecode: 0,
      ctype: 8,
      tabName: "",
      luzhuObj: []
    };
  },
  props: {
    game_code: {
      type: Number
    }
  },
  created() {
    this.checkGameCode();
    this.getLuZhuData();
  },
  methods: {
    handleClick(tab, event) {
      this.tabName = tab.name;
      this.checkGameCode();
      this.getLuZhuData();
    },
    getLuZhuData() {
      let params = {};
      params.game_code = this.game_code;
      params.ctype = this.ctype;
      params.typecode = this.typecode;
      this.$http.post("/systems/luzhu", JSON.stringify(params)).then(res => {
        console.log(res);
        // 需要处理返回过来的data数据,把繁体字的单双变成简体字的单双;
        if (res && res.data.length) {
          for (var i = 0; i < res.data.length; i++) {
            for (var k = 0; k < res.data[i].length; k++) {
              if (res.data[i][k] == "單") {
                res.data[i][k] = "单";
              }
              if (res.data[i][k] == "雙") {
                res.data[i][k] = "双";
              }
              if (res.data[i][k] == "龍") {
                res.data[i][k] = "龙";
              }
            }
          }
        }
        this.luzhuObj = (res && res.data) || [];
      });
    },
    checkGameCode() {
      if (
        this.game_code === 51 ||
        this.game_code === 171 ||
        this.game_code === 210 ||
        this.game_code === 240 ||
        this.game_code === 260
      ) {
        this.isShowPk10 = true;
        this.isShowSsc = false;
        switch (this.tabName) {
          case "pk10he":
            this.ctype = 8;
            break;
          case "pk10dx":
            this.ctype = 9;
            break;
          case "pk10ds":
            this.ctype = 10;
            break;
        }
        this.typecode = 0;
        this.activeName = "pk10he";
      } else if (
        this.game_code === 2 ||
        this.game_code === 46 ||
        this.game_code === 250
      ) {
        this.isShowPk10 = false;
        this.isShowSsc = true;
        this.ctype = 1;
        this.typecode = 1;
        this.activeName = "ssc1";
        if (
          this.game_code == "46" ||
          this.game_code == "250" ||
          this.game_code == "2"
        ) {
          this.ctype = 2;
          this.activeName = "sscdx";
        }
        switch (this.tabName) {
          case "ssc1":
            this.ctype = 1;
            break;
          case "sscdx":
            this.ctype = 2;
            break;
          case "sscds":
            this.ctype = 3;
            break;
          case "ssczhdx":
            this.ctype = 4;
            break;
          case "ssczhds":
            this.ctype = 5;
            break;
          case "ssclhh":
            this.ctype = 6;
            break;
        }
        this.typecode = 1;
        this.activeName = "sscdx";
      } else if (this.game_code === 47 || this.game_code === 3) {
        this.isShowPk10 = false;
        this.isShowSsc = false;
        this.isShowTen = true;
        switch (this.tabName) {
          case "tendx":
            this.ctype = 8;
            break;
          case "tends":
            this.ctype = 9;
            break;
          case "tenweishu":
            this.ctype = 10;
            break;
          case "tenlh":
            this.ctype = 11;
            break;
        }
        this.activeName = "tendx";
      } else if(this.game_code === 180) {
        this.isShowPk10 = false;
        this.isShowSsc = false;
        this.isShowTen = false;
        this.isShowBjkl8 = true;
        switch (this.tabName) {
          case "totalNum":
            this.ctype = 1;
            break;
          case "totalSize":
            this.ctype = 2;
            break;
          case "totalSigleDouble":
            this.ctype = 3;
            break;
          case "fiveProties":
            this.ctype = 4;
            break;
          case "totalFrontBack":
            this.ctype = 5;
             break;
          case "sumSingleDouble":
            this.ctype = 6;
             break;
          default :
            this.ctype = 1;
            break;
        }
        this.activeName = "totalNum";
      }
    },
    setLuzhuItemClass(item) {
      if (!isNaN(item * 1)) {
        // 当item为数字，或者数字字符串的时候
        return "";
      }
      if (item == "大" || item == "双") {
        return "luzhu-big";
      }
      if (item == "小" || item == "单") {
        return "luzhu-small";
      }
      if (item == "龙") {
        return "luzhu-long";
      }
      if (item == "虎") {
        return "luzhu-hu";
      }
      if (item == "和") {
        return "luzhu-he";
      }
      if (item == '前') {
        return 'luzhu-front'; 
      }
      if (item == '后') {
        return 'luzhu-back'; 
      }
      if (item == '金') {
        return 'luzhu-gold'; 
      }
      if (item == '木') {
        return 'luzhu-wood'; 
      }
      if (item == '水') {
        return 'luzhu-water'; 
      }
      if (item == '火') {
        return 'luzhu-fire'; 
      }
      if (item == '土') {
        return 'luzhu-soil'; 
      }
    }
  }
};
</script>
<style>
.luzhu .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.luzhu .el-tabs--border-card > .el-tabs__header,
.luzhu .el-tabs__header {
  background-color: #f0f0f6 !important;
  height: 30px;
  line-height: 30px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: 0;
}
.luzhu .el-tabs--border-card {
  border-radius: 6px;
}
.luzhu .el-tabs__item.is-active {
  color: #409eff;
}
.luzhu .el-tabs--top .el-tabs__item:nth-child(2) {
  padding-left: 12px;
}

.luzhu .el-tabs__item {
  height: 30px;
  line-height: 30px;
  font-size: 15px !important;
}

.luzhu-item {
  text-align: center;
  line-height: 16px;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
}

/* 露珠大小，单双，龙虎样式 */
.luzhu-item {
  width: 18px !important;
  height: 18px !important;
  border-radius: 18px !important;
  line-height: 16px !important;
  text-align: center;
}

.luzhu-big,
.luzhu-long,
.luzhu-back,
.luzhu-fire {
  background-color: #fb170f;
  color: white;
}
.luzhu-small,
.luzhu-hu,
.luzhu-front {
  background-color: #2d4bfe;
  color: white;
}
.luzhu-he,
.luzhu-wood {
  background-color: #379b02;
  color: white;
}

.luzhu-gold {
  background-color: #ebc512;
  color: white;
}
.luzhu-water {
  background-color: #44b6eb;
  color: white;
}
.luzhu-soil {
  background-color: #a7784b;
  color: white;
}
</style>
<style scoped>
.luzhu {
  margin-top: 12px;
  border-top: 5px solid #e6e6f0;
  border-bottom: 1px solid #f0f0f6;
}
.luzhu-box {
  background: #f5f5f5;
  /*border-radius: 6px;*/
}
.luzhu-box ul {
  display: flex;
}
.luzhu-box ul li {
  float: left;
  position: relative;
  font-weight: normal;
  font-size: 14px;
  color: #666;
  padding: 10px 0;
  background-color: #fff;
  flex: 1;
}
.luzhu-box ul li:nth-child(odd) {
  background-color: #f9f9fc;
}
.luzhu-box ul li span {
  display: block;
  height: 25px;
  line-height: 25px;
}
.luzhu .el-tabs__content {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.luzhu-box .active {
  color: #000;
}
.luzhu-box li.active:after {
  position: absolute;
  bottom: -1px;
  left: 10px;
  content: "";
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
}
.zoushi {
  background: #fff;
  padding: 7px 12px;
}
.zoushi ul {
  // margin-right:-1px;
}
.zoushi ul li {
  width: 38px;
  float: left;
  border-right: 1px solid #ecedea;
}
.zoushi ul li span {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #878788;
}
.luzhu .el-tabs__content {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
