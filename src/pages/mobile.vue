<template>

  <div>
      <div  class="jc" v-if='open'>
        <div class="jsc">
          <span class="close" @click='colse'></span>
          <img :src="`/static/images/${getApiName}/iosapp.png`" height="725" width="1043" alt=""  @click='colse'>
        </div>
      </div>
      <div  class="jc" v-if='open1'>
        <div class="jsc">
          <span class="close" @click='colse1'></span>
          <img  :src="`/static/images/${getApiName}/adrid.png`" height="725" width="1043" alt=""  @click='colse1'>
        </div>
      </div>
      <div class="mobile-page">  
        <my-header></my-header>  
        <div class="mobile-content">
          <div class="top clearfix">
            <div class="left-img f-l" :style="`background: url('/static/images/${getApiName}/mobile-left.png') no-repeat;`"></div>
            <div class="right-txt f-l" style='margin-top: 20px;'></div>
            <div class="iosc" @click="iosc">苹果APP教程</div>
            <div class="adridc"  @click="adridc">安卓APP教程</div>

          
          </div>      

          <div class="bottom">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple clearfix">
                    <span class="ico ico-ios f-l"></span>
                    <div class="info f-l">
                      <h2>苹果下载</h2>
                      <h3>完美支持iphonex  8 7s 7 6s 6 5s 等<br>iPhone系列iOS10及以上</h3>
                      <h4> 扫描二维码下载</h4>
                    </div>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="grid-content bg-purple-light clearfix">
                    <span class="ico ico-android f-l"></span>
                    <div class="info f-l">
                      <h2>安卓下载</h2>
                      <h3>完美支持三星 华为 小米 oppo 等<br>系列安卓手机</h3>
                      <h4> 扫描二维码下载</h4>
                    </div>                
                  </div>
                </el-col>

               
              </el-row>
                <div class="grid-content bg-purple wechat-code">
                  <div><img :src="$getPublicImg(`/images/${getApiName}/apk_download.jpg`)" width=212 height=212></div>
                </div>
          </div>
          
        </div>      
      </div>
  </div>
</template>


<script>
import myHeader from '../components/hgHeader'
export default {
  data () {
    return {
      getApiName: getApiName(),
      open:false,
      open1:false
    }
  },
  components: {
    myHeader
  },
  methods:{
      iosc(){
          this.open=true;
      },
       adridc(){
          this.open1=true;
      },
      colse(){
        
        this.open=false;
      },
      colse1(){
        this.open1=false;
      }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/less/variable.less';
  .mobile-page {
    background:#deedff  url('@{public_img}/images/common/bg-home.jpg') no-repeat;
  }
  .mobile-content .ico-android {
    background: url('@{public_img}/images/common/ico-android.jpg') no-repeat;
  }
  .mobile-content .ico-ios {
    background: url('@{public_img}/images/common/ico-ios.jpg') no-repeat;
  }
</style>

<style scoped>
.mobile-page {
  width: 100%; 
}
.jc img{
  margin-top: 10vh;
}
.close{
  position: absolute;
  top: 10vh ;
  right: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
@media screen and (max-width: 1400px) {
  .jsc img {
    width: 900px;
    height:600px!important;
    margin-top: 4vh;
  }
  .close{
    right: 75px;
  }
}
.jc{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20001;
}
.jsc{
  width:1054px;
  position: relative;
  margin: 0 auto;
}
.mobile-content {
  width: 1260px;
  margin: 0 auto;
  padding-top: 100px;
  overflow: hidden;
  min-height: calc(100vh - 100px);
}
.mobile-content .left-img  {
  width: 542px;
  height: 481px;
  animation-duration: 1s;
  animation-name: fadeInLeft;
}
.mobile-content .right-txt {
  background: url('/static/images/common/mobile-right-txt.png') no-repeat;
  width: 701px;
  height: 332px;
  animation-duration: 1s;
  animation-name: fadeInRight;
}
.swal2-modal{
  background: red!important;
}
.mobile-content .bottom {
  /*height: 110px;*/
  /*background-color: #eff6ff;*/
  border-radius: 5px;
  margin-top: 50px;
/*  padding: 30px;
  padding-top: 0;*/
  text-align: left;
  position: relative;
}
.mobile-content .ico {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}
.mobile-content .ico-android {
  animation-duration: .8s;
  animation-name: bounceIn;
}
.mobile-content .ico-ios {
  animation-duration: .8s;
  animation-name: bounceIn;
}
.mobile-content .info {
  margin-left: 10px;
}
.mobile-content .bottom h2 {
  font-size: 24px;
  color: #333;
}
.mobile-content .bottom h3 {
  font-size: 14px;
  color: #666; 
  margin: 10px 0;
  line-height: 20px;
}
.mobile-content .bottom .el-row{
  width: 82%;

   background: #eff6ff;
   padding: 30px;
}
.mobile-content .bottom .grid-content{
 
}
.mobile-content .bottom h4 {
  font-size: 14px;
  color: #999;
} 
.top{
  position: relative;
}
.iosc,.adridc{
  position: absolute;
  left: 560px;
  top: 390px;
  width: 180px;
  height: 50px;
  line-height: 50px;
  font-size: 19px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.adridc{
  left: 760px;
}
.wechat-code {
  position: absolute;
  right: 0px;
  top: -50px;
  background-color: #fff;
  border-radius: 5px;
}
.wechat-code div {
  width: 210px;
  height: 210px;
}
</style>
