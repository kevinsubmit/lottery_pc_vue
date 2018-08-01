<template>
  <div>
    <my-header></my-header>
    <div class="about-page content promo-page" ref='kuan'>

      <div class="gua">
        <div class="tou">
          <p style='font-size:18px;color: #333;padding-left:10px;'>
            <!-- ◉ -->关于我们</p>
        </div>
        <div class="about-content">

          <img :src="$getPublicImg('/images/common/about.jpg')" height="200" width="1220" alt="">
          <p>{{ getTitle }}网于
            <span>{{copy}}</span>
            年成立，专业经营各项博彩业务，现与AK平台合作，推出高频彩票现金投注网，开种广东快乐十分、重庆时时彩、PC蛋蛋、北京赛车等项目，完全自助注册开户，现金开户， 现金投注。我们拥有稳定的平台，成熟的玩法，简单的下注流程、以及优质的客户服务。{{ getTitle }}公司为彩票博彩爱好者提供最优惠的赔率和最优质的博彩服务。{{ getTitle }}一直深受会员好评，一直以来以良好的信誉和服务得到许多会员的支持和肯定，接受业界各行业与会员的监督！如您对本公司有所疑惑，欢迎您对本公司的监督。{{ getTitle }}为正派且稳健经营的网站，一直以最优惠的赔率和优质的服务深受会员好评，请放心进行投注，如您之前不了解本公司，欢迎您对本公司进行关注。</p>
          <br>
          <p style='font-size:16px'>【菲律宾执照】</p>
          <p>
            我们提供的所有产品和服务，是由菲律宾政府卡格杨河经济特区 First Cagayan leisure and Resort Corporation. www.firstcagayan.com 所授权和监管。这是一家位于Cagayan特別经济区和自由口岸 (CSEZFP) 的机构，並且是互动游戏的授权者及管理者。</p>
          <br>
          <p style='font-size:16px'>【安全与保密】</p>
          <p>我们采用了目前最好的加密技术（1024位RSA密钥交换和 448位blowfish）和防火墙系统保护你的安全、私隐，并保证你享受公平的 游戏。客户在本平台的所有动态均严格保密，我们不会向第三方包括政府透露客户资料。所有银行交易由国际金融机构在高标准的安全 和机密的网络中进行。进入玩家帐户资料也必须有玩家唯一的登录ID和密码，确保客户的资金安全有保障。 {{ getTitle }}网拥有高素质的客户服务，无论在处理任何事情上，都以简单和快捷享誉全球。如免费开户，即时存款，实时QQ、MSN回复客户的询问以及处理客户的难题等。 {{ getTitle }}网全年24小时运营，全天候处理客户出入款等相关事宜，严格训练的客服团队，以专业、亲切的态度著称，尽速解决您对于网 站、游戏的种种疑难杂症，不但让所有客户皆有宾至如归的感觉，同时我们以业界前所未见的各种优惠方式回馈我们的客户，绝对是您最明智的选择！</p>

          <p v-if="getApiName === 'uc'">
            关于UC彩票的任何操作及相关问题，您可以在（常见问题）中找到答案， 如果您仍然有任何疑惑，请随时咨询我们的24小时在线客服。
          </p><br> 【联系方式】
          <p v-if="getApiName === 'ly'">
            关于乐盈彩票网的任何操作及相关问题，您可以在（常见问题）中找到答案， 如果您仍然有任何疑惑，可以随时洽询我们的24小时在线客服。
            <br> 24小时客服电话：0063-9167502888
            <br> 邮箱： le985.com@gmail.com
          </p>
          <p>TEL：+{{tel}}</p>
          <p>EMAIL：{{email}}</p>
          <div v-if="getApiName =='sd'">
            <p>关于668彩票网的任何操作及相关问题，您可以在（常见问题）中找到答案， 如果您仍然有任何疑惑，可以随时扫描下发二维码关注微信公众号：【live2805a】， 或点击在线7x24小时在线客服咨询 ，信公众号：live2805a 请扫一扫关注!
              <img src="/static/images/sd/weixin.jpg" />
            </p>
            <p>或发送Email至668zhuanyuan@gmail.com， 我们的客服专员将于30分钟内与您联系。</p>
            <p>开户代理专员 联系QQ：899668 &nbsp;&nbsp;&nbsp;&nbsp;582567 </p>
            <p>24小时客服QQ 986684888</p>
            <p>客服：09166251666</p>
            <p>投诉：09951701666</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import myHeader from "../components/hgHeader";
export default {
  data() {
    return {
      getTitle: getTitle(),
      getApiName: getApiName(),
      tel:"",
      email:"",
      copy:""
    };
  },
  components: {
    myHeader
  },
  created() {
    this.$nextTick(() => {
      if (sessionStorage.getItem("im_onf")) {
        this.$refs.kuan.style = "padding-left: 20px ;padding-right:20px;";
      }
    });
    this.$http.post("/Systems/getSiteBasicInfo").then(res => {
      console.log(res);
      this.tel = res.data.tel;
      this.email = res.data.email;
      this.copy = res.data.copyright;
      if (this.copy.length == 4) {
        this.copy = res.data.copyright;
      } else {
        switch(this.getApiName){
          case 'ly': 
            this.copy = '2005';
            break;
          case 'uc': 
            this.copy = '2010';
            break;
          case 'sd': 
          case 'yiren': 
            this.copy = '2016';
            break;
          case 'crown': 
          case 'yile': 
          case 'fulicai':
          case 'agcai': 
            this.copy = '2015';
            break;
          default:
            this.copy = '2015';
            break;
        }
      }
    });
  }
};
</script>

<style scoped>
p {
  color: #666;
  font-size: 14px;
  line-height: 30px;
}
.about-content {
  text-align: left;

  margin: 0 auto;
  padding: 20px 0px;
  font-size: 16px;
  line-height: 36px;
  color: #333;
}
.gua {
  background: #fff;
  height: 100%;
  padding: 10px 20px;
  overflow-y: auto;
  /*height: calc(100vh - 140px)!important;*/
}
.tou {
  text-align: left;
  line-height: 40px;
  height: 40px;
  border-bottom: 2px solid #dfe4ed;
}
</style>
