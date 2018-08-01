<template>
  <div class="payment">
    <h4>
      <i :class="`ico ${(bankName==='快捷支付'||bankName==='扫码支付')?'ico-my-yunpay':bankName==='微信'?'ico-my-wechat': bankName==='支付宝' ? 'ico-my-alipay' : bankName=== '财付通' ? 'ico-my-cai' :bankName=== '网银'?'ico-my-bank':bankName=== '京东'?'ico-my-jd':bankName=== '银联扫码'?'ico-my-union':'' }`"></i>
      <span>{{bankName}}</span>在线支付
      <span style="float:right;cursor: pointer" @click="goAddress('/Payment/record:deposit?a='+Math.random());"> << 返回</span>
    </h4>
    <div style='text-align:left;'>
      <p class="pay-title">选择支付通道</p>
      <el-radio-group v-model="rechargeChannel" class='bankcode'>
        <el-radio-button v-for="(item,index) in online" :key="index" :label="item">{{`${bankName}在线支付${index+1}`}}</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if='subm'>
      <form ref="formPay" method="post" target="_blank" onsubmit="return false">
        <p class="pay-title" v-if="(bankName==='网银'||bankName==='快捷支付'||bankName==='扫码支付')&&isshowbank>=0">请选择银行</p>
        <div style='text-align:left;' v-if="(bankName==='网银'||bankName==='快捷支付'||bankName==='扫码支付')&&isshowbank>=0">
          <el-select class='bankcode' v-model="bankCode" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <p class="pay-title">请输入充值金额</p>
        <el-row class="inputArea">
          <el-col :span="6">
            <div class="inputBox ">
              <span>￥</span>
              <input v-model="shu" @input="chkInput(shu)" type=''>
              <span class='el-icon-error' @click="clearNum"></span>
              <div class="limit-tips">
                单笔下限
                <i>{{moneyMin}}</i>,单笔上限
                <i>{{moneyMax}}</i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style='margin-top:40px;'>
          <el-col :span="3" v-for='(item,index) in list' :key="index">
            <div ref='xuan' class="btn-number" @click="select(item,index)">{{item}}</div>
          </el-col>
        </el-row>
      </form>
      <div class="btn-box">
        <div @click='submitM()' class="btn-pink">提交</div>
        <div @click='reset' class="btn-blue">重置</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rechargeChannel: '',
      options: [
        { value: "CCB", label: "建设银行" },
        { value: "ABC", label: "农业银行" },
        { value: "ICBC", label: "工商银行" },
        { value: "PSBS", label: "邮政储蓄银行" },
        { value: "CMBC", label: "民生银行" },
        { value: "CEB", label: "光大银行" },
        { value: "BOC", label: "中国银行" },
        { value: "HXB", label: "华夏银行" },
        { value: "CMB", label: "招商银行" },
        { value: "SDB", label: "深圳发展银行" },
        { value: "BOCO", label: "交通银行" },
        { value: "SHB", label: "上海银行" },
        { value: "CIB", label: "兴业银行" },
        { value: "CITIC", label: "中信银行" },
        { value: "GDB", label: "广发银行" },
        { value: "SPDB", label: "浦东发展银行" }
      ],
      isshowbank: 0,
      bankCode: "",
      isAgAccount: false,
      moneyMin: 0,
      moneyMax: 0,
      bankName: "",
      radio: "0",
      selec: false,
      subm: true,
      payUrl: "",
      dizhi: null,
      online: null,
      shu: "",
      balance: this.$store.state.lotteryMoney,
      list: [100, 200, 500, 1000, 2000, 3000, 5000]
    };
  },
  props: {
    payType: {
      type: String
    }
  },
  created() {
    this.getPayData();
    if (this.$route.query.GameName) {
      this.isAgAccount = true;
    } else {
      this.isAgAccount = false;
    }
  },
  methods: {
    chkInput(shu) {
      let r = /^\+?[1-9][0-9]*$/; //正整数
      if (!r.test(shu)) {
        this.shu = "";
        return;
      }
      this.$emit("child-step", "step1");
    },
    select(item, index) {
      this.$emit("child-step", "step1");
      this.shu = item;
      // console.log(index)
      this.$refs.xuan.map(item => {
        item.className = "btn-number";
      });
      this.$refs.xuan[index].className = "active1 ";
    },
    reset() {
      this.shu = "";
      this.$refs.xuan.map(item => {
        item.className = "btn-number";
      });
    },
    clearNum() {
      this.shu = "";
    },
    getPayData() {
      let params = {};
      
      
      this.$http.post("/user/payin", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$swal({
            text: "账户已下线，请重新登陆",
            type: "error",
            timer: 1200
          });
          this.$router.push({ path: "/home" });
          return;
        } else {
          let max = "";
          let min = "";
          switch (this.payType) {
            case "scanPay":
              this.payData = res.data.online_unionpayU;
              this.bankName = "扫码支付";
              this.online = res.data.online_unionpayU;
              this.isshowbank = this.online[0].indexOf("isShowBank=1");
              this.moneyMax = parseInt(res.data.moneylimit.quickpaymax);
              this.moneyMin = parseInt(res.data.moneylimit.quickpaymin);
              break;
            case "yunPay":
              this.payData = res.data.bankpay_array;
              this.bankName = "快捷支付";
              this.online = res.data.online_quickpayU;
              this.isshowbank = this.online[0].indexOf("isShowBank=1");
              this.moneyMax = parseInt(res.data.moneylimit.quickpaymax);
              this.moneyMin = parseInt(res.data.moneylimit.quickpaymin);
              break;
            case "bankPayOnline":
              this.payData = res.data.bankpay_array;
              this.bankName = "网银";
              this.online = res.data.online_bankU;
              this.isshowbank = this.online[0].indexOf("isShowBank=1");
              this.moneyMax = parseInt(res.data.moneylimit.bankmax);
              this.moneyMin = parseInt(res.data.moneylimit.bankmin);
              break;
            case "aliPayOnline":
              this.payData = res.data.alipay_array;
              this.bankName = "支付宝";
              this.online = res.data.online_alipayU;
              this.moneyMax = parseInt(res.data.moneylimit.alipaymax);
              this.moneyMin = parseInt(res.data.moneylimit.alipaymin);
              break;
            case "wechatPayOnline":
              this.payData = res.data.wechat_array;
              this.bankName = "微信";
              this.online = res.data.online_wechatU;
              this.moneyMax = parseInt(res.data.moneylimit.wechatmax);
              this.moneyMin = parseInt(res.data.moneylimit.wechatmin);
              break;
            case "tenPayOnline":
              this.payData = res.data.quickpay_array;
              this.bankName = "财付通";
              this.online = res.data.online_cftU;
              this.moneyMax = parseInt(res.data.moneylimit.cftpaymax);
              this.moneyMin = parseInt(res.data.moneylimit.cftpaymin);
              break;
            case "jdPayOnline":
              max = res.data.jdpay_array[0].max
              min = res.data.jdpay_array[0].min
              this.onlineName = res.data.online_jdpay
              if ( ! max && ! min) {
                this.moneyMax = parseInt(res.data.moneylimit.jdpaymax);
                this.moneyMin = parseInt(res.data.moneylimit.jdpaymin);
              } else {
                this.moneyMax = max;
                this.moneyMin = min;
              }
              this.payData = res.data.jdpay_array;
              this.bankName = "京东";
              this.online = res.data.online_jdpayU;
              break;
            case "unionPayOnline":
              max = res.data.unionpay_array[0].max
              min = res.data.unionpay_array[0].min
              this.onlineName = res.data.online_unionpay
              if ( ! max && ! min) {
                this.moneyMax = parseInt(res.data.moneylimit.unionpaymax);
                this.moneyMin = parseInt(res.data.moneylimit.unionpaymin);
              } else {
                this.moneyMax = max;
                this.moneyMin = min;
              }
              this.payData = res.data.unionpay_array;
              this.bankName = "银联扫码";
              this.online = res.data.online_unionpayU;
              break;
          }
        }
        this.rechargeChannel = this.online[0];
      });
    },
    goAddress(path) {
        this.$router.push({
          path: path
        });
    },
    gobank(path) {
      this.$router.push(path);
    },
    submitM() {
      if (this.shu <= 0 || this.shu == "") {
        this.$swal({
          text: "请输入充值金额",
          type: "error",
          timer: 1200
        });
        return;
      } else if (
        parseInt(this.shu) > this.moneyMax ||
        this.shu < this.moneyMin
      ) {
        this.$swal({
          text: "存款金额范围是: " + this.moneyMin + "~" + this.moneyMax + "元",
          type: "error",
          timer: 1200
        });
        return;
      } else {
        this.$emit("child-step", "step");
        let t = this.paramsL;
        if (this.isAgAccount) {
          this.payUrl = `&money=${this.shu}&GameName='AG'`;
        } else {
          this.payUrl = `&money=${this.shu}`;
        }
        if (this.bankName == "网银" || this.bankName == "快捷支付") {
          if (this.isshowbank >= 0) {
            if (this.bankCode) {
              var payUrl = `${this.rechargeChannel}${this.payUrl}&PayID=${this.bankCode}`;
            } else {
              this.$swal({
                text: "请选择充值银行",
                type: "error",
                timer: 1200
              });
              return;
            }
          } else {
            var payUrl = `${this.rechargeChannel}${this.payUrl}`;
          }
        } else {
          var payUrl = `${this.rechargeChannel}${this.payUrl}`;
        }

        window.open(payUrl);
        //   this.$refs.formPay.setAttribute("action", payUrl);
        //   window.open(payUrl)
        //   sessionStorage.setItem('payUrl', payUrl);
        // }else if(this.bankName=='支付宝'){
        //     let payUrl = `${this.online_alipayU[0]}${this.payUrl}`;
        //      this.$refs.formPay.setAttribute("action", payUrl);
        //       sessionStorage.setItem('payUrl', payUrl);
        //       window.open(payUrl)
        // }else if(this.bankName=='微信'){
        //   let payUrl = `${this.online_wechatU[0]}${this.payUrl}`;
        //   this.$refs.formPay.setAttribute("action", payUrl);
        //   sessionStorage.setItem('payUrl', payUrl);
        //   window.open(payUrl)
        // }else if(this.bankName=='财付通'){
        //           let payUrl = `${this.online_cftU[0]}${this.payUrl}`;
        //           this.$refs.formPay.setAttribute("action", payUrl);
        //           sessionStorage.setItem('payUrl', payUrl);
        //           window.open(payUrl)
        // }
      }
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.GameName) {
        this.isAgAccount = true;
      } else {
        this.isAgAccount = false;
      }
    }
  }
};
</script>

 
<style type="text/css" media="screen">
.bankcode {
  margin-left: 0 !important;
}
.bankcode input {
  height: 28px;
}
.bank {
  text-align: left;
}
.tian {
  font-size: 18px;
  width: 238px;
  height: 58px;
  line-height: 58px;
  margin: 0px auto;
  border: 1px solid #e6e7ec;
  border-radius: 5px;
  color: #43387c;
}
.head {
  border-bottom: 1px solid #e6e7ec;
}
.inputBox {
  position: relative;
}
.inputBox span:first-child {
  font-size: 26px;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 8px;
  top: 3px;
  color: #7b72c5;
  z-index: 7;
}
.inputBox input {
  text-align: left;
  border: 1px solid #ddd;
  height: 33px;
  padding: 0;
  font-size: 20px;
  color: #7b72c5;
  outline: none;
  text-align: left !important;
  width: 80%;
  padding-left: 30px;
  font-size: 20px;
  color: #7b72c5;
}

.inputBox span {
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 8px;
  color: #e9e5e5;
  cursor: pointer;
}
.inputBox span:hover {
  color: #b0afaf;
}
.btn-number {
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 5px #ccc;
  height: 40px;
  border: 2px solid #fff;
  font-size: 16px;
  line-height: 40px;
  color: #666666;
  cursor: pointer;
}
.active1,
.btn-number:hover {
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 5px #ccc;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  border: 2px solid #ec6876;
  color: #ec6876;
}
.pay-title {
  text-align: left;
  color: #333;
  font-size: 14px;
  margin-top: 10px;
}
.btn-box {
  margin: 40px 0 20px 0;
}
.btn-box .btn-pink,
.btn-box .btn-blue {
  display: inline-block;
}
.inputArea {
  margin: 20px 0;
}
.inputBox .limit-tips {
  position: absolute;
  right: -210px;
  top: 5px;
}
.inputBox .limit-tips i {
  color: red;
  margin: 0 2px;
  font-style: inherit;
  font-weight: bold;
}
</style>
