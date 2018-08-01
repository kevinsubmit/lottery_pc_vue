
<template>
  <div>
    <hg-Header></hg-Header>
    <div id="mainContainer" ref="main">
      <sidebar v-on:child-say="listenToMyBoy"></sidebar>
      <router-view></router-view>
    </div>
    <notice-footer v-if="isShowNotice"></notice-footer>
    <bigChat/>
    <miniChat/>
    <!-- <miniChat/> -->
    <float-right v-if="$getApiName!='yiteng'"></float-right>
    <verticalSideMenu v-else></verticalSideMenu>
  </div>
</template>

<script>
import hgHeader from "@/components/hgHeader";
import noticeFooter from "@/components/noticeFooter";
import Sidebar from "@/components/sidebar";
import floatRight from "@/components/floatRight";
import miniChat from '@/components/miniChat';
import bigChat from '@/components/bigChat';
import verticalSideMenu from '../components/verticalSideMenu'
export default {
  data() {
    return {
      isShowNotice: true
    };
  },
  created() {
    //弹出提示信息
    this.$route.path.match(/\Games/)&&sessionStorage.getItem("im_username") &&
      sessionStorage.getItem("im_username") != "游客" &&
      !sessionStorage.getItem('hasAlertNotice')&&
      this.$http
        .post(
          "/user/getPicturesAndAnnouncements"
        )
        .then(res => {
          this.infiniteAlert(res.data.alertShow, 0);
        });
    // if(sessionStorage.getItem('im_token') && sessionStorage.getItem('im_username') !== '游客'){
    //   this.isShowNotice = true
    // } else {
    //   this.isShowNotice = false
    // }
  },
  methods: {
    listenToMyBoy: function(i) {
      if (i == "close") {
        this.$refs.main.className = "mainClose";
      } else {
        this.$refs.main.className = "";
      }
    },
    infiniteAlert(arr, index) {
      let _this = this;
      //如果大于一个弹出提示，并且不是最后一个，那么需要自己调用自己
      if (arr.length > 1 && index < arr.length - 1) {
        this.$alert(arr[index], {
          confirmButtonText: "确定",
          callback: action => {
            setTimeout(() => {
              _this.infiniteAlert(arr, index + 1);
            }, 500)
          }
        });
      }
      //如果只有一个或者如果是弹出最后一个，那么就没有回调函数
      if (arr.length == 1 || index == arr.length - 1) {
        this.$alert(arr[index]);
        sessionStorage.setItem('hasAlertNotice',true)
      }
    }
  },
  components: {
    hgHeader,
    noticeFooter,
    Sidebar,
    miniChat,
    bigChat,
    floatRight,
    verticalSideMenu
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../assets/less/variable.less";

.bet-top-placeholder {
  background: url("@{public_img}/images/ct/bg-top.jpg") no-repeat;
  background-size: cover;
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
.main {
  margin: 0 auto;
  height: 35px !important;
}
.bet-main {
  background-color: #eee;
}
#siderLeft {
  margin-top: 75px !important;
}

#main {
  width: 1260px !important;
  margin: 0 auto;
  background-color: #e6e6f0;
  padding-top: 70px;
}

#mainContainer {
  width: 1260px;
  margin: 0 auto 10px !important;
  transition: all ease 0.5s;
  min-height: calc(100vh - 90px);
  position: relative;
  transition: all ease 0.5s;
}
.mainClose .content {
  margin-left: 70px !important;
  transition: all ease 0.5s;
}
#right {
  width: 180px;
  position: fixed;
  right: 0;
  overflow: auto;
}
#mainContainer .content {
  padding-top: 65px;
  height:calc(96vh - 80px);
}
</style>
