<template>
  <div class="payment">

    <h4>
      <i class="ico ico-my-paymethods"></i>充值方式</h4>

    <div class="pay-methods">
      <el-row :gutter="20">
        <el-col :span="6">
          <div @click="bankPayOnline?payType('bankPayOnline'):bankPayOffline?payType('bankPayOffline'):''" class="grid-content bg-purple" id="unionPay" style="cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-unionpay.png')" class="ico">
            <h5>网银支付</h5>
          </div>
          <div class="btn-unionPay">
            <button @click="payType('bankPayOnline')" v-if="bankPayOnline">网银支付</button>
            <button class="closed" v-else="bankPayOnline">网银支付</button>

            <button @click="payType('bankPayOffline')" v-if="bankPayOffline">银行转账</button>
            <button class="closed" v-else="bankPayOffline">银行转账</button>

          </div>
        </el-col>

        <el-col :span="6">
          <div @click="aliPayOnline?payType('aliPayOnline'):aliPayOffline?payType('aliPayOffline'):''" class="grid-content bg-purple" id="aliPay" style="cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-alipay.png')" class="ico">
            <h5>支付宝支付</h5>
          </div>
          <div class="btn-aliPay">
            <button @click="payType('aliPayOnline')" v-if="aliPayOnline">支付宝支付</button>
            <button class="closed" v-else="aliPayOnline">支付宝支付</button>

            <button @click="payType('aliPayOffline')" v-if="aliPayOffline">支付宝线下</button>
            <button class="closed" v-else="aliPayOffline">支付宝线下</button>
          </div>
        </el-col>

        <el-col :span="6">
          <div @click="wechatPayOnline?payType('wechatPayOnline'):wechatPayOffline?payType('wechatPayOffline'):''" class="grid-content bg-purple" id="wechatPay" style="cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-wechatpay.png')" class="ico">
            <h5>微信支付</h5>
          </div>
          <div class="btn-wechatPay">
            <button @click="payType('wechatPayOnline')" v-if="wechatPayOnline">微信支付</button>
            <button class="closed" v-else="wechatPayOnline">微信支付</button>

            <button @click="payType('wechatPayOffline')" v-if="wechatPayOffline">微信线下</button>
            <button class="closed" v-else="wechatPayOffline">微信线下</button>
          </div>
        </el-col>

        <el-col :span="6">
          <div @click="yunPay?payType('yunPay'):scanPay?payType('scanPay'):''" class="grid-content bg-purple" id="caiPay" style="cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-cai.png')" class="ico">
            <h5>财付通</h5>
          </div>
          <div class="btn-caiPay">
            <button @click="payType('tenPayOnline')" v-if="tenPayOnline">财付通支付</button>
            <button class="closed" v-else="tenPayOnline">财付通支付</button>

            <button @click="payType('tenPayOffline')" v-if="tenPayOffline">财付通线下</button>
            <button class="closed" v-else="tenPayOffline">财付通线下</button>
          </div>
        </el-col>

        <el-col :span="6">
          <div @click="yunPay?payType('yunPay'):scanPay?payType('scanPay'):''" class="grid-content bg-purple" id="yunPay" style="background-color:#DA4765 ;cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-yunpay.png')" class="ico">
            <h5>快捷支付</h5>
          </div>
          <div class="btn-caiPay">
            <button @click="payType('yunPay')" v-if="yunPay">快捷支付</button>
            <button class="closed" v-else="yunPay">快捷支付</button>

            <button @click="payType('scanPay')" v-if="scanPay">扫码支付</button>
            <button class="closed" v-else="scanPay">扫码支付</button>
          </div>
        </el-col>

        <el-col v-show="getApiName == 'agcai'||getApiName == 'yiteng'||getApiName == 'ly'" style="display:block" :span="6">
          <div @click="jdPayOnline?payType('jdPayOnline'):jdPayOffline?payType('jdPayOffline'):''" class="grid-content bg-purple" id="wechatPay" style="background-color:#bd282e ;cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-jdpay.png')" class="ico">
            <h5>京东支付</h5>                        
          </div>
          <div class="btn-wechatPay">
            <button @click="payType('jdPayOnline')"  v-if="jdPayOnline">京东支付</button>
            <button class="closed" v-else="jdPayOnline">京东支付</button>

            <button @click="payType('jdPayOffline')"  v-if="jdPayOffline">京东线下</button>
            <button class="closed" v-else="jdPayOffline">京东线下</button>
          </div>
        </el-col>

        <el-col v-show="getApiName == 'agcai'||getApiName == 'yiteng'||getApiName == 'ly'" style="display:block" :span="6">
          <div @click="unionPayOnline?payType('unionPayOnline'):unionPayOffline?payType('unionPayOffline'):''" class="grid-content bg-purple" id="wechatPay" style="background-color:#3e6798 ;cursor:pointer;">
            <img :src="$getPublicImg('/images/common/icon/withdraw-yinlian.png')" class="ico">
            <h5>银联支付</h5>                        
          </div>
          <div class="btn-wechatPay">
            <button @click="payType('unionPayOnline')"  v-if="unionPayOnline">银联支付</button>
            <button class="closed" v-else="unionPayOnline">银联支付</button>

            <button @click="payType('unionPayOffline')"  v-if="unionPayOffline">银联线下</button>
            <button class="closed" v-else="unionPayOffline">银联线下</button>
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="tips">
      <p class="tips-title">特别提示：</p>
      请客户在进行存款操作前首先确认持有的银行卡是否具有网上支付功能。若未开通或有其他疑问，请按银行"帮助中心"详细了解及处理。<br>
      <p class="tips-title">注意事项：</p>
      1、你所使用的存款银行需要开通网上银行业务。 <br> 2、当你在存款过程中遇到任何问题，请随联系我们在线客服咨询或邮箱。
      <br>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getApiName: getApiName(),
      active: 0,
      bankPayOnline: false,
      bankPayOffline: false,
      aliPayOnline: false,
      aliPayOffline: false,
      wechatPayOnline: false,
      jdPayOnline: false,
      unionPayOnline:false,
      wechatPayOffline: false,
      jdPayOffline: false,
      unionPayOffline: false,
      tenPayOnline: false,
      tenPayOffline: false,
      yunPay: false,
      scanPay: false,
      pay_ps:'',
      pay_off:''
    };
  },
  created() {
    this.getCanUsePay();
  },
  methods: {
    checkCanUsePay() {},
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    goAddress(path) {
      if (!sessionStorage.getItem("im_username")) {
        this.$swal({
          text: "请登录会员账号后体验",
          type: "error",
          timer: 1200
        });
        this.$router.push("/home");
        return;
      }
      this.$router.push({
        path: path
      });
    },
    getCanUsePay() {
      let self = this;
      let params = {};
      let oid_info = sessionStorage.getItem("im_token");
      params.oid = oid_info;

      this.$http.post("/user/newPayin", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$swal({
            text: "账户已下线，请重新登陆",
            type: "error",
            timer: 1200
          })
            .then(function(response) {})
            .catch(e => {});
          this.$router.push({
            path: "/home"
          });
          return;
        }
        let pay_online = res.data.online_pay_limit;
        let pay_onoff = res.data.linedown_pay_limit;
        for (let i = 0; i < pay_online.length; i++) {
          this.pay_ps = pay_online[i].pay_type
          switch (this.pay_ps) {
            //网银
            case '0':
              this.bankPayOnline = true;
              break;
            //支付宝
            case '1':
              this.aliPayOnline = true;
              break;
            //微信
            case '2':
              this.wechatPayOnline = true;
              break;
            //财付通
            case '3':
              this.tenPayOnline = true;
              break;
            //快捷
            case '4':
              this.yunPay = true;
              break;
            //银联
            case '6':
              this.unionPayOnline = true;
              break;
            //京东
            case '7':
              this.jdPayOnline = true;
              break;
            default:
              break;
          }
        }
        //线下
        for (let i = 0; i < pay_onoff.length; i++) {
          this.pay_off = pay_onoff[i].pay_type
          console.log(this.pay_off)
          switch (this.pay_off) {
            //网银
            case '0':
              this.bankPayOffline = true;
              break;
            //支付宝
            case '1':
              this.aliPayOffline = true;
              break;
            //微信
            case '2':
              this.wechatPayOffline = true;
              break;
            //财付通
            case '3':
              this.tenPayOffline = true;
              break;
            //快捷
            case '4':
              this.scanPay = true;
              break;
            //银联
            case '6':
              this.unionPayOffline = true;
              break;
            //京东
            case '7':
              this.jdPayOffline = true;
              break;
            default:
              break;
          }
        }
      });
    },
    payType(payType) {
      let self = this;
      let params = {};
      let oid_info = sessionStorage.getItem("im_token");
      params.oid = oid_info;

      this.$http.post("/user/newPayin", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$router.push({
            path: "/home"
          });
        } else {
          if (!payType) {
            this.$swal({
              text: "暂不支持此种充值方式",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
            return false;
          } else {
            this.$emit("child-payType", payType);
          }
        }
      });
    }
  }
};
</script>

<style>
.steps .el-step__title.is-process {
  font-weight: normal;
  font-size: 14px;
  color: #453880;
}
.steps .el-step__title.is-wait {
  color: #cccccc;
}
.payment h4 {
  color: #453880;
  font-size: 15px;
  text-align: left;
  border-top: 1px solid #e6e6f0;
  border-bottom: 1px solid #e6e6f0;
  height: 35px;
  line-height: 35px;
}
.payment h4 span {
  margin: 0 5px;
  color: #5215e0;
}
.payment .el-col {
  border-radius: 4px;
  margin-top: 10px;
}
.payment .el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.payment .bg-purple {
  background: #d3dce6;
}

.payment .grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 145px;
  padding-top: 5px;
}
.steps {
  background-color: #fff;
  padding: 25px 0;
}
.pay-methods {
  margin-top: 20px;
}
#unionPay {
  background-color: #19746c;
}
#aliPay {
  background-color: #00a7f2;
}
#wechatPay {
  background-color: #23ac38;
}
#qqPay {
  background-color: #726fb1;
}
#caiPay {
  background-color: #ff6600;
}
.payment .el-col button {
  background-color: #fff;
  border: 1px solid #ddd;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666;
  width: 49%;
  cursor: pointer;
  margin-top: 10px;
  outline: none;
}
.payment .el-col button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-right: -5px;
}
.payment .el-col button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.payment .el-col button.active,
.payment .el-col button:hover {
  background-color: #1c4fa8;
  border-color: #1c4fa8;
  color: #fff;
  transition: all ease 0.5s;
}
.payment .el-col button.closed {
  cursor: not-allowed;
  color: #cccccc;
}
.payment .el-col button.closed:hover {
  background-color: #fff;
  border-color: #ddd;
}

.pay-methods .ico {
  font-size: 22px;
  color: #fff;
  display: block;
  height: 80px;
  width: 80px;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
}
.pay-methods h5 {
  font-size: 22px;
  color: #fff;
  margin-top: 8px;
}
.payment .tips {
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 30px;
  margin-top: 30px;
}
.tips-title {
  font-size: 15px;
  color: #333;
}

.el-col-6 {
  width: 20%;
}
</style>
