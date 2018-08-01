<template>
  <div class="lotteryVideo">
    <div class="overlay"></div>
    <div class="lottery-video-box">
      <div class="video-main">
        <i class="el-icon-circle-close-outline closeVideo" @click="closeVideo"></i>
        <div class="loading" v-if="isShowVideo">加载中...</div>
        <iframe :src="videoSrc" scrolling="no" frameborder="0" style="width: 750px; height: 475px;" ref="videoIframe" v-else="isShowVideo">暂无开奖视频</iframe>
        <div @click="$router.push(`/result:_${game_code}`)" style="cursor:pointer;position:absolute; z-index:99999999;width:120px;height:180px;right: 20px;top: 100px;"></div>
        <div @click="$router.push(`/result:_${game_code}`)" style="cursor:pointer;position:absolute; z-index:99999999;width:370px;height:175px;left: 0;top: 0;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getApiName: getApiName(),
      kaijiangwang: getKaijiangwang(),
      isShowVideo: true,
      videoSrc: ""
    };
  },
  mounted() {
    let oid = this.$store.state.token;
    switch (this.game_code) {
      case 160:
      case 171:
      case 210:
      case 46:
        this.isShowNoVideo = true;
        this.isShowVideo = false;
        break;

      case 51:
        this.videoSrc =
          "//kj.kai861.com/view/video/PK10/video.html?10001?1682011.cn";
        break;

      case 2:
        this.videoSrc =
          "//kj.kai861.com/view/video/SSC/index.html?10002?1682011.cn";
        break;

      case 69:
        this.videoSrc =
          "//kj.kai861.com/view/video/SixColor_animate/index.html?10048?1682011.cn";
        break;

      case 3: // 广东快乐十分
        this.videoSrc =
          "//kj.kai861.com/view/video/GDklsf/index.html?10005?1682011.cn";
        break;

      case 47: // 幸运农场
        this.videoSrc =
          "//kj.kai861.com/view/video/cqnc/index.html?10009?1680218.com";
        break;

      case 172: // 江苏快三
        this.videoSrc =
          "//kj.kai861.com/view/video/kuai3_video/Kuai3.html?10007?1682011.cn";
        break;
      case 250: // 极速时时彩
        this.videoSrc = "/video/jsssc/?channel=pcv750&oid="+oid;
        break;
      case 260: // 88赛马
        this.videoSrc = "/video/88horse/?oid="+oid;
          // "//88horse.hgb168.com/horse/";
        break;
    }
    this.isShowVideo = false;
  },
  methods: {
    closeVideo() {
      this.$emit("closeVideo", "close");
    }
  },
  props: {
    game_code: {
      type: Number,
      default: 210
    }
  }
};
</script>

<style scoped>
.lottery-video-box {
  position: fixed;
  width: 750px;
  height: 475px;
  z-index: 999;
  left: 50%;
  margin-left: -375px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
}
.video-main {
  position: relative;
}
.closeVideo {
  font-size: 36px;
  float: right;
  cursor: pointer;
  position: absolute;
  right: -50px;
  top: -45px;
  color: #ccc;
}
.closeVideo:hover {
  color: #fff;
}
</style>
 
