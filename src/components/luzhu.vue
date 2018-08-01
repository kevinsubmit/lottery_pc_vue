<template>
  <div class="luzhu">
    <div class="luzhu-box">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane :name="`${index}`" :label="tab.title" v-for="(tab,index) in currentLuzhu.tabs" v-bind:key="index"></el-tab-pane>
        <ul class="clearfix">
          <li v-for="item in luzhuObj" v-bind:key="item.game_code">
            <span v-for="i in item" :class="setLuzhuItemClass(i)" class="luzhu-item" v-bind:key="i">{{ i }}</span>
          </li>
        </ul>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import luzhuData from '../config/luzhu.config.json'
export default {
  data() {
    return {
      activeIndex: 0,
      typecode: 0,
      ctype: 8,
      luzhuObj: [],
      currentLuzhu: {}
    }
  },
  props: ["game_code"],
  created() {
    this.currentLuzhu = this.getCurrentLuzhu(this.game_code,luzhuData)
    this.getLuZhuData(this.activeIndex)
  },
  methods: {
    handleClick() {
      let ctype = this.currentLuzhu.tabs[this.activeIndex]
      this.getLuZhuData()
    },
    getCurrentLuzhu(gameCode, luzhuData) {
      let result = {}
      luzhuData.forEach(item => {
        if (item.game_code == gameCode) {
          result = item
        }
      })
      return result
    },
    getLuZhuData(activeIndex) {
      let params = {}
      params.game_code = this.game_code
      params.ctype = this.currentLuzhu.tabs[this.activeIndex].ctype
      params.typecode = this.currentLuzhu.typecode
      this.$http.post('/systems/luzhu', JSON.stringify(params)).then(res => {
        this.luzhuObj = (res && res.data) || []
      })
    },
    setLuzhuItemClass(item) {
      if (!isNaN(item * 1)) {
        // 当item为数字，或者数字字符串的时候
        return ''
      }
      if (item == '大' || item == '双') {
        return 'luzhu-big'
      }
      if (item == '小' || item == '单') {
        return 'luzhu-small'
      }
      if (item == '龙') {
        return 'luzhu-long'
      }
      if (item == '虎') {
        return 'luzhu-hu'
      }
      if (item == '和') {
        return 'luzhu-he'
      }
      if (item == '前') {
        return 'luzhu-front'
      }
      if (item == '后') {
        return 'luzhu-back'
      }
      if (item == '金') {
        return 'luzhu-gold'
      }
      if (item == '木') {
        return 'luzhu-wood'
      }
      if (item == '水') {
        return 'luzhu-water'
      }
      if (item == '火') {
        return 'luzhu-fire'
      }
      if (item == '土') {
        return 'luzhu-soil'
      }
    }
  }
}
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
  content: '';
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
