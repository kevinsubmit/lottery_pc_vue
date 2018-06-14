<template>
  <div class="maintain-wrap">
    <div>
      <div>
        <div class="maintain_p1">
          <img :src="`../../static/images/${getApiName}/logo.png`" alt="">
        </div>
        <p class="maintain_p2">尊敬的会员，您好:</p>
        <p class="maintain_p3">为改善服务，系统升级维护中。若此期间给您造成不便，敬请谅解。</p>
        <p class="maintain_p4">
          *预期维修时间，会因实际需要而作出适当修改而不会另行通知。如有任何查询，请联系本站24小时
          <a href="javascript:void(0)" @click="openConsult">在线服务</a>
          <a href="在线服务"></a>
        </p>

      </div>
      <div>
        <div style="text-align:center">
          <img src="../../static/images/common/maintain.png" alt="">
        </div>
        <p class="maintain_p5">
          <a href="javascript:void(0)" style="position:relative" @mouseenter="show(true)" @mouseleave="show(false)">
            {{`${getTitle}`}}技术团队
            <!-- <span :class="getApiName=='ly'||getApiName=='yiren'?'lyskypetips':'skypetips'" v-show="isshow">
              <a href="skype:live:lebo.technical?chat" style='color:#fff;'>Skype：lebo.technical</a><br/>
              <a href="https://t.me/wantgaming" style='color:#fff;'>Telegram：wantgaming</a><br/>
              <a href="https://api.whatsapp.com/send?phone=639957788000" style='color:#fff;'>Whatsapp：+63 995-7788-000</a>
            </span> -->
          </a>敬上
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getApiName: getApiName(),
      serviceUrl: "",
      isshow: false,
      getTitle:getTitle()
    };
  },
  created() {
    this.$http.post("/user/getCustomerService").then(data => {
      this.serviceUrl = data.data.kefu && decodeURI(data.data.kefu);
    });
  },
  methods: {
    openConsult() {
      // let serviceUrl = sessionStorage.getItem("serviceUrl");
      this.serviceUrl &&
        window.open(this.serviceUrl, "", "width=600,height=510");
    },
    show(a) {
      this.isshow = !this.isshow;
    }
  }
};
</script>

<style scoped>
@import "../assets/less/variable.less";
.maintain-wrap {
  display: flex;
  align-items: space-between;
  position: absolute;
}
.maintain-wrap > div {
  display: flex;
}

.maintain-wrap > div > div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  height: 400px;
  width: 230px;
}

.tipsa {
  color: #006fe4;
  display: inline-block;
}
.lyskypetips {
  width: 260px;
  line-height: 30px;
  position: absolute;
  bottom: 40px;
  left: -10px;
  border: 1px solid #313154;
  color: #fff;
  background: #313154;
  text-align: left;
  padding-left: 10px;
}

.skypetips {
  width: 180px;
  line-height: 20px;
  position: absolute;
  bottom: 30px;
  left: -10px;
  border: 1px solid #0f316c;
  color: #fff;
  background: #0f316c;
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
}
.lyskypetips:before {
  content: "";
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
  content: "";
  width: 0;
  height: 0;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #0f316c transparent transparent;
  position: absolute;
  bottom: -10px;
  left: 10px;
}

.maintain-wrap > div {
  font-size: 20px;
  animation-duration: 1s;
  animation-name: fadeInRight;
  text-align: left;
}

.maintain-wrap a {
  color: #3a8ee6;
}

.maintain_p1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.maintain_p1 > img:first-child {
  width: 150px;
}

.maintain_p3,
.maintain_p4,
.maintain_p5 {
  color: #666;
}
.maintain_p2 {
  margin-top: 100px;
  font-weight: bold;
  color: #666;
}
.maintain_p3 {
  margin-top: 30px;
  color: #999;
}
.maintain_p4 {
  margin-top: 40px;
  font-size: 16px;
  color: #888;
}
.maintain_p5 {
  margin-top: 40px;
  text-align: right;
}
</style>
<style scoped>
.maintain-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
