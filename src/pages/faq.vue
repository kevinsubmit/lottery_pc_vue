<template>
  <div>
    <my-header></my-header>
    <div class="about-page" ref='kuan'>
      <div class="gua">
        <div class="tou">
          <p style='font-size:18px;color:#333;padding-left:10px;'>
            <!-- ◉ -->常见问题</p>
        </div>
        <div class="about-content">
          <img :src="$getPublicImg('/images/common/faq.jpg')" height="200" width="1220" alt="">

          <div v-if="getApiName === 'ct'||getApiName === 'letian'||getApiName === 'sd'||getApiName === 'gd'||getApiName === 'ly'||getApiName === 'yiren'||getApiName === 'agcai'||getApiName === 'klc'||getApiName === 'yile'||getApiName === 'fulicai'||getApiName === 'ylh'||getApiName === 'yiteng'">
            <p style='font-size:16px'>◉一般常见问题</p><br>
            <p>1.怎么开户？</p>
            <p>答：在注册开户过程中您必需确认您是否满十八岁并注意您所在国家或地区相关法律规定，登陆我们的官方网站 {{getSrc}} 点击「开户注册」，并按要求填写相关资料就可以自助注册会员帐号、以及设置登陆密码、提款密码、联系方式等。为保证会员的个人资讯安全请保管好您的会员帐号与密码！</p><br>
            <p>2、单注投注额最低是？</p>
            <p>答：我们单注最低投注额为人民币1元。</p><br>
            <p>3、最高投注额有限制吗？</p>
            <p>答：任何一家正规博彩和网络博彩公司对客户的帐户投注都有单注和单注限额，没有限额的公司都基本属于没有任何风险控制的私人或骗子公司，今天的控制是为了明天能保证100%提款给您，这点您可以自行分析。每个项目都有不同的限额设定，详细请登陆会员都在「会员资料」页面查看。</p>
            <br>
            <p>4、如何登入投注页面？</p>
            <p>答：请进入首页在「会员登录」栏正确输入您的帐号、密码，点击「登录」后便可以登入投注页面</p>
            <br>
            <p>5、我帐户里面的帐怎么结算？
              <p>答：请到「账户历史」页面查看，「账户历史」按天显示每天的结算结果。</p>
          </div>

          <div v-if="getApiName === 'uc'||getApiName === 'yy'">
            <p style='font-size:16px'>◉游戏及投注问题</p><br>
            <p>Q1: 如何加入{{getName}}？</p>
            <p>A1: 您可以直接点选“开户注册”，确实填写资料后，可立即登记成为UC彩票会员。</p><br>
            <p>Q2：我可以直接在网络上存款吗？</p>
            <p>A2：可以，{{getName}}提供多种线上存款选择，详情请参照“存款提款”。</p><br>

            <p>Q3：我在那里可以找到游戏的规则？</p>
            <p>A3：请查看“规则说明”页面，清楚告诉您游戏的玩法、规则及派彩方式。</p><br>

            <p>Q4：我的注码的限制是多少？</p>
            <p>A4：从最低注单1元人民币以上即可投注。</p><br>

            <p>Q5：忘记了密码怎么办？</p>
            <p>A5：你可通过24小时线上客服人员协助处理。</p><br>
          </div>

          <div v-if="getApiName === 'ly'||getApiName === '618cp'">
            1、怎么开户？<br> 答：在注册开户过程中您必需确认您是否满十八岁并注意您所在国家或地区相关法律规定，登陆我们的官方网站 {{getSrc}}点击(开户注册)按要求填写相关资料就可以自助注册会员帐号及设置登陆密码、提款密码、联系方式等,为保证会员的个人资讯安全请选择保护好您的会员帐号与密码！
            <br><br> 2、单注投注额最低是？
            <br> 答：我们单注最低投注额为人民币1元。
            <br><br> 3、最高投注额有限制吗？

            <br> 答：任何一家正规博彩和网络博彩公司对客户的帐户投注都有单注和单注限额，没有限额的公司都基本属于没有任何风险控制的私人或骗子公司，今天的控制是为了明天能保证100%提款给您，这点您可以自行分析。每个项目都有不同的限额设定，详细请登陆会员都在「会员资料」页面查看。
            <br><br> 4、如何登入投注页面？
            <br> 答：请进入首页在「会员登录」栏正确输入您的帐号、密码，登入投注页面即可。
            <br><br> 5、我帐户里面的帐怎么结算？

            <br> 答：请到「账户历史」页面查看，「账户历史」按天显示每天的结算结果。
            <br><br> 6、如何加入乐盈彩票网？

            <br> 答：您可以直接点选 "开户注册"，确实填写资料后，可立即登记成为乐盈彩票网会员。<br><br> 7、我可以直接在网络上存款吗？

            <br> 答：可以，乐盈彩票网提供多种线上存款选择，详情请参照“存款提款”。
            <br><br> 8、我在那里可以找到游戏的规则？

            <br> 答：请查看“规则说明”页面，清楚告诉您游戏的玩法、规则及派彩方式。
            <br><br> 8、如果忘记密码怎么办？

            <br> 答：你可以联系24小时线上客服人员咨询协助取回你的帐号密码。
            <br><br> 9、当忘记提款密码时怎么办？

            <br> 答：你可透过24小时线上客服人员协助处理。
          </div>

        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>


<script>
import myHeader from "../components/hgHeader";
export default {
  data() {
    return {
      getApiName: getApiName(),
      getName:'',
      getSrc:''
    };
  },
  components: {
    myHeader
  },
  created() {
    switch (this.getApiName) {
       case 'uc':
        this.getName = 'UC彩票'
        this.getSrc = ''
        break;
      case 'ct':
        this.getName = '彩投'
        this.getSrc = 'http://www.caitou01.com'
        break;
      case 'sd':
        this.getName = '668'
        this.getSrc = 'http://www.2805.com'
        break;
      case 'gd':
        this.getName = '光大'
        this.getSrc = 'https://www.gdcp00.com'
        break;
      case 'ly':
        this.getName = '乐盈'
        this.getSrc = 'http://www.le095.com'
        break;
      case 'yiren':
        this.getName = '亿人彩票'
        this.getSrc = 'http://www.yirem.com'
        break;
      case 'agcai':
        this.getName = 'AG彩'
        this.getSrc = 'https://ag11111.cc'
        break;
      case 'klc':
        this.getName = '万游网'
        this.getSrc = 'http://www.wanyou.com'
        break;
      case 'yile':
        this.getName = 'e乐彩彩票'
        this.getSrc = 'http://yile.lebole5.com'
        break;
      case 'fulicai':
        this.getName = '福利彩彩票'
        this.getSrc = 'http://fulicai.lebole5.com'
        break;
      case 'ylh':
        this.getName = '永利会彩票'
        this.getSrc = 'http://ylh108.com/'
        break;
      case 'yiteng':
        this.getName = '亿腾彩票'
        this.getSrc = 'http://yt556.com/'
        break;
      case '618cp':
        this.getName = '618彩票'
        this.getSrc = 'http://618cpcp.com/'
        break;
      case '618cp':
        this.getName = '618彩票'
        this.getSrc = 'http://618cpcp.com/'
        break;
      case 'yy':
        this.getName = 'yy彩票'
        this.getSrc = 'http://yycpcom2.com'
        break;
      case 'letian':
        this.getName = '乐天彩票'
        this.getSrc = 'http://www.lt268.com'
        break;
      default:
        break;
    }
    this.$nextTick(() => {
      if (sessionStorage.getItem("im_onf")) {
        this.$refs.kuan.style = "padding-left: 20px ;padding-right:20px;";
      }
    });
  }
};
</script>

<style scoped>
p {
  color: #666;
  font-size: 14px;
}
.about-content p {
  line-height: 30px;
}
.gua {
  background: #fff;
  height: 100%;
  padding: 10px 20px;
  overflow-y: auto;
  height: calc(100vh - 136px) !important;
  /*overflow-y: auto;*/
}
.about-content {
  text-align: left;

  /*margin:0 auto;*/
  padding: 20px 0px;
  font-size: 14px;
  line-height: 30px;
  color: #333;
}
.about-page {
  height: 100%;
  /*background: #fff;*/
  /*height: calc(100vh - 100px)!important;*/
}
.tou {
  text-align: left;
  line-height: 40px;
  height: 40px;
  border-bottom: 2px solid #dfe4ed;
}
.daili a {
  display: inline-block;
  width: 150px;
  line-height: 50px;
  color: #fff;
  font-size: 18px;
  height: 50px;
  background: #2866b4;
  border-radius: 5px;
  margin: 0 auto;
}
</style>
