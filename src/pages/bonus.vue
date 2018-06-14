<template>
<div> 
    <div class="bonus-page">
      <my-header :updateMoney="updateMoney"></my-header>  
      <div class="bonus-content">
        <div class="hb-area" v-if="isShowHb">
            <div @click="getRePacket" class="hb hb-01"></div>
            <div @click="getRePacket" class="hb hb-02"></div>
            <div @click="getRePacket" class="hb hb-03"></div>
            <div @click="getRePacket" class="hb hb-04"></div>
            <div @click="getRePacket" class="hb hb-05"></div>
            <div @click="getRePacket" class="hb hb-06"></div>
            <div @click="getRePacket" class="hb hb-07"></div>
            <div @click="getRePacket" class="hb hb-08"></div>
            <div @click="getRePacket" class="hb hb-09"></div>
            <div @click="getRePacket" class="hb hb-10"></div>
            <div @click="getRePacket" class="hb hb-11"></div>
            <div @click="getRePacket" class="hb hb-12"></div>
            <div @click="getRePacket" class="hb hb-13"></div>
        </div>

        <div class="hb-result" v-else="isShowHb">
          <h2 ref="hbInfo">{{ msg }}</h2>
        </div>

        <div class="hb-big01" ref="hbArea"></div>
        <div class="hb-big02"></div>
        
      </div> 
    </div>
</div>
</template>


<script>
import myHeader from '../components/hgHeader'
export default {
  components: {
    myHeader
  },
  data () {
    return {
      getApiName: getApiName(),
      isShowHb: true,
      updateMoney: false,
      msg: '正在认证，稍等...'
    }
  },
  created () {
    setTimeout(()=>{
      this.$nextTick(function () {
        this.$refs.hbArea.style.opacity = 0
      })
    }, 4000)
    if (this.getApiName !== 'uc') {
      this.$router.push({
        path: '/home'
      })
    }
  },
  methods: {
    getRePacket () {
      this.$http.post('/BonusActivity/do_RedMoney').then(res => {
        this.isShowHb = false
        console.log(res.data.msg)
        if (res.data.msg === 4001) {
          this.$router.push({
            path: '/home'
          })
        } else if (res.data.msg === 2006) {
          this.msg='恭喜您抢到1个红包, 共'+ res.data.money +'元'
          this.updateMoney = true
        } else {
          this.msg = res.data.info
        }
      })
    }
  }
}
</script>

<style scoped>
@keyframes fadeOutDown {
  from {
    opacity: 1;
    margin-top: -30%;
    transition: all ease 3s;
  }

  to {
    opacity: 0;
    margin-top: 50%;
    transition: all ease 3s;
  }
}
@keyframes fadeInDown {
  from {
    /*opacity: 0;*/
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.bonus-content {
  padding-top: 60px;
  height: calc(100vh - 60px);
  position: relative;
}
.hb-area {
  position: absolute;
  width: 100%;
  height: 100%;
  animation-duration: 3s;
  animation-name: fadeInDown;
}

  .hb-big01 {
    animation-duration: 4s;
    animation-name: fadeOutDown;
  }
  .hb-big02 {
    animation-duration: 4s;
    animation-name: fadeOutDown;
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/less/variable.less';

  .bonus-page {
    background: url("@{public_img}/images/uc/bonus/bg-bonus.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
  } 
  .hb-big01,
  .hb-big02 {
    width: 1200px;
    height: 900px;
    margin: 0 auto;
    z-index: 5;
  }
  .hb-big01 {
    background: url("@{public_img}/images/uc/bonus/big01.png") no-repeat;
  }
  .hb-big02 {
    background: url("@{public_img}/images/uc/bonus/big01.png") no-repeat;
  }

  .hb {
    cursor: pointer;
    display: inline-block;
    margin: 2% 4% 0 4%;
    position: absolute;
    z-index: 10;
  }
  .hb-01,
  .hb-09,
  .hb-13,
  .hb-05 {
    background: url("@{public_img}/images/uc/bonus/hb1.png?v=342534") no-repeat;
    width: 105px;
    height: 126px;
  }
  .hb-02,
  .hb-10,
  .hb-08 {
    background: url("@{public_img}/images/uc/bonus/hb2.png?v=345324") no-repeat;
    width: 110px;
    height: 148px;
  }
  .hb-03,
  .hb-12,
  .hb-07 {
    background: url("@{public_img}/images/uc/bonus/hb3.png?v=342534") no-repeat;
    width: 118px;
    height: 146px;
  }
  .hb-04,
  .hb-11,
  .hb-06 {
    background: url("@{public_img}/images/uc/bonus/hb4.png?v=345234") no-repeat;
    width: 86px;
    height: 139px;
  }
  .hb-result {
    background: url("@{public_img}/images/uc/bonus/hb-bg.png?v=34534") no-repeat;
    width: 300px;
    height: 170px;    
    margin: 70px auto;
  }
  .hb-result h2 {
    font-size: 20px;
    color: blue;
    font-weight: bold;
    padding-top: 76px;
  }
  .hb-01 {left: 10%;top: 50px;}
  .hb-02 {left: 30%;top: 20px;}
  .hb-03 {right: 32%;top: 70px;}
  .hb-04 { right:10%;top:60px; }
  .hb-05 { left:10%;top:320px; }
  .hb-06 { left:25%;top:270px; }
  .hb-07 { right:35%;top:420px; }
  .hb-08 { right:15%;top:270px; }
  .hb-09 { right:10%;bottom:100px; }
  .hb-10 { left:20%;bottom:50px; }
  .hb-11 { left:45%;top:30%; }
  .hb-12 { left:40%;bottom:60px; }
  .hb-13 { right:25%;bottom:65px; }
</style> 
