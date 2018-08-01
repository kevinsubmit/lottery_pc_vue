<template>
  <footer>
    <div class="main clearfix">
      <div id="ff-1" class="f-l" style='text-align:center;width:100%'>版权所有© 2018 {{ getTitle }}，保留所有权利
        <span style="color:#3E6EE7;position:relative;cursor:pointer;margin-left:10px;" @mouseenter="show(true)" @mouseleave="show(false)">
          <a v-show="techShow" class="tipsa" href='http://want-gaming.com' target="_blank">{{ourTech?'万游科技':`${getTitle}`}}提供技术支持
            <!--  <span :class="getApiName=='ly'||getApiName=='yiren'?'lyskypetips':'skypetips'" v-show="isshow">
                <a href="skype:live:lebo.technical?chat" style='color:#fff;'>请联系Skype：lebo.technical</a><br/>
                <a href="https://t.me/wantgaming" style='color:#fff;'>请联系Telegram：wantgaming</a><br/>
                <a href="https://api.whatsapp.com/send?phone=639957788000" style='color:#fff;'>请联系Whatsapp：+63 995-7788-000</a>
              </span> -->
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['ourTech'],
  data() {
    return {
      isshow: false,
      getTitle: getTitle(),
      getApiName: getApiName(),
      techShow: false
    }
  },
  created() {
    ['ct', 'uc', 'sd', 'ly',  'gd'].forEach(item=>{
      if(item===this.getApiName){
        this.techShow = true;
      }
    })
  },
  methods: {
    show(a) {
      this.isshow = !this.isshow
    }
  }
}
</script>

<style scoped>
.tipsa {
  color: blue;
  display: inline-block;
}
.lyskypetips {
  width: 260px;
  line-height: 30px;
  position: absolute;
  bottom: 25px;
  left: -10px;
  border: 1px solid #313154;
  color: #fff;
  background: #313154;
  text-align: left;
  padding-left: 10px;
}

.skypetips {
  width: 260px;
  line-height: 30px;
  position: absolute;
  bottom: 25px;
  left: -10px;
  border: 1px solid #0f316c;
  color: #fff;
  background: #0f316c;
  text-align: left;
  padding-left: 10px;
}
.lyskypetips:before {
  content: '';
  width: 0;
  height: 0;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #313154 transparent transparent;
  position: absolute;
  bottom: -10px;
  left: 10px;
}
.skypetips:before {
  content: '';
  width: 0;
  height: 0;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #0f316c transparent transparent;
  position: absolute;
  bottom: -10px;
  left: 10px;
}

.main {
  width: 1260px;
  background: #fff;
  margin: 0 auto;
}
.f-l {
  float: none;
}

footer {
  line-height: 35px;
  width: 100%;
  background: #fff;
  font-size: 13px;
  width: 100%;
  height: 35px;
  z-index: 99;
  position: relative;
  color: #999;
}
</style>
