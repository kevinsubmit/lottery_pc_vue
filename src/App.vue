<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import URLParams from './utils/URLParams'
export default {
  name: "app",
  created() {
    // 有一定概率取不到this.$route.query.promotionId，所以需要用到URLParams
    if (
      URLParams.promotionId &&
      !sessionStorage.getItem("promotionId")
    ) {
      sessionStorage.setItem("promotionId", URLParams.promotionId);
    }
  },
  mounted() {
    let _this = this;
    //第一次打开网页的时候，从localStorage里面取出errCode，取不到的话，从utils/errCode.json文件中取。
    if (!localStorage.getItem("errCode")) {
      import("../src/utils/errCode.json").then(data => {
        localStorage.setItem("errCode", JSON.stringify(data));
      });
    }
    this.$store.commit("setAvailWindowHeight", this.$window.innerHeight);
    this.$window.onresize = function() {
      _this.$store.commit("setAvailWindowHeight", _this.$window.innerHeight);
    };

    // if (sessionStorage.getItem('im_token')) {
    // require('../static/js/chat.js')
    // }
  },
  methods: {}
};
</script>

<style>
@import "./assets/css/reset.css?v=1.0";
@import "./assets/css/common.css?v=2.0";
/*@import './assets/css/ct.css?v=2.0';*/
#app {
  font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.fade-enter-active,
.fade-leave-active {
  animation: go 0.5s;
}
/*
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
@keyframes go {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
