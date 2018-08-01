<template>
  <div class="payment">
    <h4>
      <i :class="`ico ${(bankName==='快捷支付'||bankName==='扫码支付')?'ico-my-yunpay':bankName==='微信'?'ico-my-wechat': bankName==='支付宝' ? 'ico-my-alipay' : bankName=== '财付通' ? 'ico-my-cai' :bankName=== '网银'?'ico-my-bank':bankName=== '京东'?'ico-my-jd':bankName=== '银联扫码'?'ico-my-union':'' }`"></i>
      <span>{{bankName}}</span>在线支付
      <span style="float:right;cursor: pointer" @click="goAddress('/Payment/record:deposit?a='+Math.random());">
        << 返回</span>
    </h4>
    <div style='text-align:left;'>
      <p class="pay-title">选择支付通道</p>
      <el-radio-group v-model="rechargeChannel" v-for="(item,index) in online" class='bankcode' @change="onlineChange(item,index)">
        <el-radio-button :key="index" :label="item">{{`${bankName}在线支付${index+1}`}}</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if='subm'>
      <form ref="formPay" method="post" target="_blank" onsubmit="return false">
        <p class="pay-title" v-if="(bankName==='网银'||bankName==='快捷支付'||bankName==='扫码支付')&&isshowbank>0">请选择银行</p>
        <div style='text-align:left;' v-if="(bankName==='网银'||bankName==='快捷支付'||bankName==='扫码支付')&&isshowbank>0">
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
              <input v-model="rechargeAmount" @input="chkInput(rechargeAmount)" type=''>
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
        { value: 'CCB', label: '建设银行' },
        { value: 'ABC', label: '农业银行' },
        { value: 'ICBC', label: '工商银行' },
        { value: 'PSBS', label: '邮政储蓄银行' },
        { value: 'CMBC', label: '民生银行' },
        { value: 'CEB', label: '光大银行' },
        { value: 'BOC', label: '中国银行' },
        { value: 'HXB', label: '华夏银行' },
        { value: 'CMB', label: '招商银行' },
        { value: 'SDB', label: '深圳发展银行' },
        { value: 'BOCO', label: '交通银行' },
        { value: 'SHB', label: '上海银行' },
        { value: 'CIB', label: '兴业银行' },
        { value: 'CITIC', label: '中信银行' },
        { value: 'GDB', label: '广发银行' },
        { value: 'SPDB', label: '浦东发展银行' }
      ],
      isshowbank: 0,
      bankCode: '',
      isAgAccount: false,
      moneyMin: 0,
      moneyMax: 0,
      bankName: '',
      radio: '0',
      selec: false,
      subm: true,
      payUrl: '',
      payUrls: '',
      dizhi: null,
      online: [],
      rechargeAmount: '',
      balance: this.$store.state.lotteryMoney,
      list: [100, 200, 500, 1000, 2000, 3000, 5000],
      payDatas: '',
      typess: '',
      type_list: {
        0: 'bankPayOnline',
        1: 'aliPayOnline',
        2: 'wechatPayOnline',
        3: 'tenPayOnline',
        4: 'yunPay',
        6: 'unionPayOnline',
        7: 'jdPayOnline'
      },
      moneyM: ''
    }
  },
  props: {
    payType: {
      type: String
    }
  },
  created() {
    this.getPayData()
    if (this.$route.query.GameName) {
      this.isAgAccount = true
    } else {
      this.isAgAccount = false
    }
  },
  methods: {
    onlineChange(item, index) {
      this.moneyMax = item.max
      this.moneyMin = item.min
      this.isshowbank = item.isShowBank
      this.payUrls = item.payUrl
    },
    chkInput(rechargeAmount) {
      let r = /^\+?[1-9][0-9]*$/ //正整数
      if (!r.test(rechargeAmount)) {
        this.rechargeAmount = ''
        return
      }
      this.$emit('child-step', 'step1')
    },
    select(item, index) {
      this.$emit('child-step', 'step1')
      this.rechargeAmount = item
      this.$refs.xuan.map(item => {
        item.className = 'btn-number'
      })
      this.$refs.xuan[index].className = 'active1 '
    },
    reset() {
      this.rechargeAmount = ''
      this.$refs.xuan.map(item => {
        item.className = 'btn-number'
      })
    },
    clearNum() {
      this.rechargeAmount = ''
    },
    getPayData() {
      let params = {}
      this.$http.post('/user/newPayin', JSON.stringify(params)).then(res => {
        if (res.data.msg == '4001') {
          this.$swal({
            text: '账户已下线，请重新登陆',
            type: 'error',
            timer: 1200
          })
          this.$router.push({ path: '/home' })
          return
        } else {
          let max = ''
          let min = ''
          let types = res.data.online_pay_limit
          switch (this.payType) {
            case 'bankPayOnline':
              this.bankName = '网银'
              break
            case 'aliPayOnline':
              this.bankName = '支付宝'
              break
            case 'wechatPayOnline':
              this.bankName = '微信'
              break
            case 'tenPayOnline':
              this.bankName = '财付通'
              break
            case 'yunPay':
              this.bankName = '快捷支付'
              break
            case 'jdPayOnline':
              this.bankName = '京东'
              break
            case 'unionPayOnline':
              this.bankName = '银联扫码'
              break
          }
          for (let i = 0; i < types.length; i++) {
            if (this.payType == this.type_list[types[i].pay_type]) {
              this.online.push(types[i])
              this.payUrls = types[i].payUrl
              this.moneyM = types[i]
            }
          }
        }
        this.rechargeChannel = this.online[0]
        this.moneyMax = this.rechargeChannel.max
        this.moneyMin = this.rechargeChannel.min
        this.isshowbank = this.rechargeChannel.isShowBank
      })
    },
    goAddress(path) {
      this.$router.push({
        path: path
      })
    },
    gobank(path) {
      this.$router.push(path)
    },
    submitM() {
      if (this.rechargeAmount <= 0 || this.rechargeAmount == '') {
        this.$swal({
          text: '请输入充值金额',
          type: 'error',
          timer: 1200
        })
        return
      } else if (
        parseInt(this.rechargeAmount) > this.moneyMax ||
        this.rechargeAmount < this.moneyMin
      ) {
        this.$swal({
          text: '存款金额范围是: ' + this.moneyMin + '~' + this.moneyMax + '元',
          type: 'error',
          timer: 1200
        })
        return
      } else {
        this.$emit('child-step', 'step')
        let t = this.paramsL
        if (this.isAgAccount) {
          this.payUrl = `&money=${this.rechargeAmount}&GameName='AG'`
        } else {
          this.payUrl = `&money=${this.rechargeAmount}`
        }
        for (let k = 0; k < this.options.length; k++) {
          // this.isshowbank = this.options[k].value
        }
        if (this.bankName == '网银' || this.bankName == '快捷支付') {
          if (this.isshowbank > 0) {
            if (this.bankCode) {
              var payUrl = `${this.rechargeChannel}${this.payUrl}&PayID=${
                this.bankCode
              }`
              // alert(this.payUrls + this.payUrl + '&PayID=' + this.bankCode)
              window.open(
                this.payUrls + this.payUrl + '&PayID=' + this.bankCode
              )
            } else {
              this.$swal({
                text: '请选择充值银行',
                type: 'error',
                timer: 1200
              })
              return
            }
          } else {
            // alert(`${this.payUrls}&money=${this.rechargeAmount}`)
            window.open(`${this.payUrls}&money=${this.rechargeAmount}`)
          }
        } else {
          var payUrl = `${this.rechargeChannel}${this.payUrl}`
          // alert(this.payUrls + this.payUrl)
          window.open(this.payUrls + this.payUrl)
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.GameName) {
        this.isAgAccount = true
      } else {
        this.isAgAccount = false
      }
    }
  }
}
</script>

 
<style type="text/css" media="screen">
.bankcode {
  margin-right: 10px;
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
