<template>
  <div>
    <div class="overlay"></div>
    <div class="agreement">
      <h2>通知</h2>
      <div class="agreement-content">
        <div class="agreement-header clearfix">
            <div class="ico"></div>
            <div class="welcome">
              <p>您好，<span>{{ username }}</span>欢迎来到{{ getTitle }}</p>
              <p>祝您游戏愉快！</p>
            </div>
        </div>
        <div class="agreement-center">
          <h3>游戏规则</h3>
          <p>1、使用本公司网站的客户，请留意阁下所在的国家或居住地的相关法律规定，如有疑问应就相关问题，寻求当地法律意见。</p>
          <p>2、若发生遭黑客入侵破坏行为或不可抗拒之灾害导致网站故障或资料损坏、资料丢失等情况，我们将以本公司之后备资料为最后处理依据；为确保各方利益，请各会员投注后打印资料。本公司不会接受没有打印资料的投诉。</p>
          <p>3、为避免纠纷，各会员在投注之后，务必进入下注明细检查及打印资料。若发现任何异常，请立即与代理商联系查证，一切投注将以本公司资料库的资料为准，不得异议。如出现特殊网络情况或线路不稳定导致不能下注或下注失败。本公司概不负责。</p>
          <p>4、开奖结果以官方公布的结果为准。</p>
          <p>5、如遇到官方停止销售或者开奖结果不确定的情况，本公司将对相关注单进行无效处理，并且返还下注本金。</p>
          <p>6、我们将竭力提供准确而可靠的开奖统计等资料，但并不保证资料绝对无误，统计资料只供参考，并非是对客户行为的指引，本公司也不接受关于统计数据产生错误而引起的相关投诉。</p>
          <p>7、本公司拥有一切判决及注消任何涉嫌以非正常方式下注之权利，在进行更深入调查期间将停止发放与其有关之任何彩金。客户有责任确保自己的帐户及密码保密，如果客户怀疑自己的资料被盗用，应立即通知本公司，并须更改其个人详细资料。所有被盗用帐号之损失将由客户自行负责。</p>

          <h4>{{ getTitle }}管理层 敬啟</h4>
        </div>
      </div>
      <div class="agreement-footer" style='border-radius:8px'>
        <div class="agreement-btn clearfix">
          <div class="btn-blue" @click="isAgree('disagree')">不同意</div>
          <div class="btn-pink" @click="isAgree('agree')">同意</div>
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
      getTitle: getTitle(),
      checked: true,
      username: ''
    }
  },
  components: {
    myHeader
  },
  created () {
    if (sessionStorage.getItem('im_username')) {
      this.username = sessionStorage.getItem('im_username');
    } else {
      this.username = '亲爱的玩家'
    }
    this.getData();
  },
  methods: {
     getData() {
     
        this.$http.post('/user/getIndexContent').then(res => {
            // console.log(res.status)
            if (res.status === 200) {
               if (res.data.info === "success") {
                this.promo = res.data.announcements; 
                localStorage.setItem('latestNotice', res.data.announcements[0].content);
                for(let i = 0; i < res.data.announcements.length; i++) {
                  res.data.announcements[i].time = formatDate(new Date(res.data.announcements[i].time * 1000), 'yyyy-MM-dd hh:mm');
                }
               }
            }
          }).catch(function(){
        })
      },
    isAgree (val){
      this.$emit('isAgree', val);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../assets/less/variable.less';
  .agreement-header .ico {
    background: url('@{public_img}/images/common/icon/avatar-defalut-L.png') left center;
  }
</style>
<style scoped>
  .agreement-overlay {
    position: fixed;
    background-color: #000; 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .5;
  }
  .agreement {
    width: 900px;
    margin: 0 auto;
    color: #333;
    position: absolute;
    bottom: -75vh;
    left: 50%;
    margin-left: -450px;
    background-color: #fff;
    z-index: 62;
    border-radius: 8px;
  }
  .agreement-header {
    height: 110px;
    text-align: left;
  }
  .agreement-header .ico {
    width: 70px;
    height: 70px;
    margin: 20px 20px 0 0;
    float: left;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  .agreement-header .welcome {
    color: #666;
    font-size: 16px;
    float: left;
    margin: 23px 0 0 0;
  }
  .agreement-header .welcome span {
    color: #8c3edf;
    margin: 0 3px;    
  }
  .agreement-header .welcome p:last-child {
    color: #333;
    font-size: 18px;
  }
  .agreement-content {
    position: relative;
    z-index: 100;
    padding: 0 20px 0 20px;
  }
  .agreement-center {
    background-color: #f1f3f8;   
    padding: 15px;
    border-radius: 8px;
    height: 450px;
    /*overflow-y: auto;*/
    color: #666;
    /*width: 536px;*/
  }
  .agreement h2 {
    background-color: #e1e2ee;    
    height: 35px;
    line-height: 35px;
    color: #666;
    padding-left: 15px;
    text-align: left;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 16px;
  } 
  .agreement p {
    line-height: 30px;
    text-align: left;
  }
  .agreement-footer {
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    width: 100%;
  }
  .agreement-footer .agreement-btn {
    padding: 20px  0;
     width: 190px;
     margin: 0 auto;
  }
  .agreement-btn .btn-pink {
    margin-right: 3px;
  }
  .agreement h3 {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  .agreement h4 {
    text-align: right;
  }
  .agreement-btn div {
    float: right;

  }
  .agreement-btn .el-checkbox {
    float: left;
    margin: -10px 0 0 20px;
  }
  .overlay {
    z-index: 61;
  }


  @media screen and (max-width: 1400px) {
    .agreement-center {
        height: 280px!important;
        overflow-y: auto;
    }
    .agreement {
      bottom: -80vh;
    }
  }
</style>
