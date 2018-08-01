<template>
  <div class="payment">
    <h4>
      <i :class="`ico ${bankName==='微信'?'ico-my-wechat': bankName==='支付宝' ? 'ico-my-alipay': bankName=== 'QQ' ? 'ico-my-qq' :bankName==='京东支付' ? 'ico-my-jd' :bankName==='银联扫码' ? 'ico-my-union' : 'ico-my-bank' }`"></i>
      <span>{{bankName}}</span>线下支付详情
      <span style="float:right;cursor: pointer" @click="goAddress('/Payment/record:deposit?a='+Math.random());"> << 返回</span>
    </h4>
    <div>
        <table class="bank-offline-table">
          <tr>
            <th colspan="2" class="title-table">收款方资料</th>
          </tr>
          <tr>
            <th>银行</th>
            <td>{{ bankAddress }}</td>
          </tr>
          <tr>
            <th>开户名</th>
            <td>{{ bankUser }}</td>
          </tr>
          <tr>
            <th>银行账号</th>
            <td>{{ bankAccount }}</td>
          </tr>
          <tr v-if="codeSrc!= ''">
            <th>二维码</th>
            <td><img :src="codeSrc" class="ercode-pay"></td>
          </tr>
        </table>

        <div class="tips">
          <p class="tips-title">温馨提示：</p>  
          一、请在金额转出之后务必填写网页下方的汇款信息表格，以便我们财务人员能及时为您确认添加金额到您的会员账户。 <br>
          二、本公司最低存款金额为{{bankmin}}元。<br>
          此存款信息只是您汇款详情的提交，并非代表存款，您需要自己通过ATM或网银转帐到本公司提供的账户后，填写提交此信息，待工作人员审核充值！<br>
        </div>

        <table class="bank-offline-table userTable">
          <tr>
            <th colspan="2" class="title-table">付款方信息</th>
          </tr>

          <tr>
            <th v-if="bankName != '银行支付'">存款人姓名</th>
            <th v-else="bankName != '银行支付'">用户姓名</th>
            <td>
              <input type="password" style="display: none;"/>
              <el-input v-model="realname" :minlength="2" :maxlength="6" :placeholder="`请输入您的${bankName}姓名`" v-if="bankName != '银行支付'"></el-input>
              <el-input v-model="realname" :minlength="2" :maxlength="6" :placeholder="`请输入银行卡姓名`" v-else="bankName != '银行支付'"></el-input>
            </td>
          </tr>

          <tr>
            <th>存款金额</th>
            <td>
              <el-input v-model="amount" type="number" :placeholder="`最低输入:${bankmin}元`"></el-input>
            </td>
          </tr>

          <tr>
            <th>汇款日期</th>
            <td class="dateSelect">
              <el-date-picker
                v-model="orderDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-time-select
                v-model="orderTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间">
              </el-time-select>
            </td>
          </tr>

          <tr v-if="isShowOrderNum && bankName != '银行支付'">
            <th v-if="getApiName == 'uc'">交易单号后四位</th>
            <th v-else>商户单号后四位</th>
            <td v-if="getApiName == 'uc'"><el-input v-model="orderNo"   :minlength="4" :maxlength="4" placeholder="交易单号后四位"></el-input></td>
            <td v-else><el-input v-model="orderNo"   :minlength="4" :maxlength="4" placeholder="商户单号后四位"></el-input></td>
          </tr>

          <tr v-if="bankName === '银行支付'">
            <th>备注信息</th>
            <td><el-input v-model="markMsg"></el-input></td>
          </tr>

          <tr>
            <th></th>
            <td class="btnBox"> 
              <button class="btn-pink" @click="submit">提交</button>
              <button class="btn-blue" @click="reset">重置</button> 
            </td> 
          </tr>
        </table>

        <div class="tips">
          <p class="tips-title">汇款信息提交说明：</p>  
          (1).请按表格填写准确的汇款转账信息,确认提交后相关财务人员会即时为您查询入款情况。 <br>
          (2).请您在转账金额后面加个尾数,例如:转账金额 1000.66 或 1000.88 等,以便相关财务人员更快确认您的转账金额并充值。 <br>
          (3).如有任何疑问,您可以联系在线客服,在线客服为您提供365天×24小时不间断的友善和专业客户咨询服务。<br>
        </div>
    </div>
  </div>
</template>


<script>
import formatTime from '../../utils/formatTime';
export default {
  data() {
    return {
      getApiName: getApiName(),
      isShowOrderNum: true,
      isAgAccount: false,
      bankName: '',
      bankAccount: '',
      bankAddress: '',
      bankUser: '',
      bankId: '',
      realname: '',
      amount: '',
      orderNo: '',
      markMsg: '',
      orderDate: '',
      orderTime: '',
      way: '银行',
      codeSrc: '',
      payReason: '',
      bankmax: '49999',
      bankmin: '0',
      payData: [],
      typeName: 'bankpay_array'
    };
  },
  props: {
    payType: {
      type: String
    }
  },
  created () {
    let nowDate = new Date()
    this.orderDate = nowDate // 默认七日
    this.orderTime = nowDate.getHours() + ':' + nowDate.getMinutes() // 默认时间
    this.getOfflinePayData();
    if (this.$route.query.GameName) {
      this.isAgAccount = true
    } else {
      this.isAgAccount = false
    }
  },
  methods: {
    submit () {
       // let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/; 
      if (this.realname === '' || this.realname.length < 2) {
        this.$swal({
          text: "请填写用户姓名", 
          type: "error",
          timer: 1200, 
        })
        .then(function (response) {
        }).catch(e => {
        })
        return false
      }
      if (!this.amount) {
        this.$swal({
          text: "请正确填写存款金额", 
          type: "error",
          timer: 1200, 
        })
        .then(function (response) {
        }).catch(e => {
        })
        return false
      }
      if (parseInt(this.amount) > this.bankmax || this.amount < this.bankmin){
        // alert(111)
        this.$swal({
          text: '存款金额范围是: ' + this.bankmin + '~' +this.bankmax + '元', 
          type: "error",
          timer: 1200, 
        })
        .then(function (response) {
        }).catch(e => {
        })
        return false
      }
      if (!this.orderDate || !this.orderTime) {
        this.$swal({
          text: "请完整填写汇款日期", 
          type: "error",
          timer: 1200, 
        })
        .then(function (response) {
        }).catch(e => {
        })
        return false
      }
      if (this.isShowOrderNum && this.bankName !== '银行支付') {
        let str = /^[A-Za-z0-9]+$/; 
        if (this.orderNo.length != 4){
          this.$swal({
            text: '订单号是4位字符', 
            type: "error",
            timer: 1200, 
          })
          .then(function (response) {
          }).catch(e => {
          })
          return false
        } else if (!str.test(this.orderNo)) {
          this.$swal({
            text: '订单号格式为4位字符', 
            type: "error",
            timer: 1200, 
          })
          .then(function (response) {
          }).catch(e => {
          })
          return false
        }
      } else {
        if (this.markMsg === '') {
          this.$swal({
            text: '请填写备注信息', 
            type: "error",
            timer: 1200, 
          })
          .then(function (response) {
          }).catch(e => {
          })
          return false
        }
        this.orderNo = this.markMsg
      }
      
 
      let params = {}; 
      
      
      //处理时间
      params.realname =  this.realname;
      params.amount   =  this.amount;
      params.orderNo  =  this.orderNo;
      params.bank_id  =  this.bankId;
      params.typeName =  this.typeName;
      params.payReason =  this.payReason;
      params.date =  formatTime(this.orderDate);
      params.bankName =  this.bankName;
      params.way = this.way;

      if (this.bankName === '银行支付') {
        params.orderNo = this.markMsg
      }

      if (this.isAgAccount) {
        params.GameName = 'AG'
      }

      // console.log(params);

      this.$http.post('/user/offline_pay', JSON.stringify(params)).then(res => {
        // console.log(res.data);
        if (res.data.msg == "4001") {
          this.$swal({
            text: "账户已下线，请重新登陆", 
            type: "error",
            timer: 1200, 
          })
          .then(function (response) {
          }).catch(e => {
          })
          this.$router.push({
            path: '/home'
          })
          return
        } else { 
          if (res.data.msg == 5007) {
            this.$swal({
              text: '正在审核中！', 
              type: "info",
              timer: 1200, 
            })
            .then(function (response) {
            }).catch(e => {
            })
          } else if (res.data.msg == 2006) {
            this.$swal({
              text: '订单提交成功！', 
              type: "success",
              timer: 1200, 
            })
            .then(function (response) {
            }).catch(e => {
            })
          } else if (res.data.msg == 5006) {
            this.$swal({
              text: '操作繁忙，请稍后再试！', 
              type: "error",
              timer: 1200, 
            });
          } else if (res.data.msg == 4001) {
            this.$swal({
                text: "账户已下线，请重新登陆", 
                type: "error",
                timer: 1200, 
              })
              .then(function (response) {
              }).catch(e => {
              })
              this.$router.push({
                path: '/home'
              })
              return
          } else if (res.data.msg == 3003) {
            this.$swal({
              text: '缺失必填参数,请重试！', 
              type: "error",
              timer: 1200, 
            })
            .then(function (response) {
            }).catch(e => {
            })
          }
          this.reset ();
        }
      }) 
    },
    reset () {
      this.realname = "";
      this.amount = "";
      this.orderNo = "";
      this.orderTime = "";
      this.orderDate = "";
      this.markMsg = "";
    },
    goAddress(path) {
        this.$router.push({
          path: path
        });
    },
    getOfflinePayData() {
      let params = {}; 
      
      
      this.$http.post('/user/payin', JSON.stringify(params)).then(res => {
        // if (!res.data.wechat_array[0].bank_image_url) {
        //   this.isShowOrderNum = false
        // }

        if (res.data.msg == "4001") {
          this.$swal({
                text: "账户已下线，请重新登陆", 
                type: "error",
                timer: 1200, 
              })
              .then(function (response) {
              }).catch(e => {
              })
              this.$router.push({
                path: '/home'
              })
              return
        } else {
          switch(this.payType){
            case 'bankPayOffline':
              this.payData = res.data.bankpay_array;
              break;
            case 'aliPayOffline':
              this.payData = res.data.alipay_array;
              this.codeSrc = res.data.alipay_array[0].bank_image_url;
              break;
            case 'wechatPayOffline':
              this.payData = res.data.wechat_array;
              this.codeSrc = res.data.wechat_array[0].bank_image_url;
              break;
            case 'tenPayOffline':
              this.payData = res.data.linedown.cft_array;
            break;
            case 'jdPayOffline':
              this.payData = res.data.jdpay_array;
              this.codeSrc = res.data.jdpay_array[0].bank_image_url;
              break;
            case 'unionPayOffline':
              this.payData = res.data.unionpay_array;
              this.codeSrc = res.data.unionpay_array[0].bank_image_url;
              break;
          }
          this.bankAddress = this.payData[0].bank_addres; 
          this.bankAccount = this.payData[0].bank_account; 
          this.bankName = this.payData[0].bank_name; 
          this.bankUser = this.payData[0].bank_user; 
          this.bankId = this.payData[0].id;
          this.bankmax = parseInt(res.data.moneylimit.bankmax);
          this.bankmin = parseInt(res.data.moneylimit.linedownmin);
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.GameName) {
        this.isAgAccount = true
      } else {
        this.isAgAccount = false
      }
    }
  }
}
</script>

<style>
  .payment {
    background-color: #fff;
  } 
  .bank-offline-table { 
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
  }
  .bank-offline-table td,
  .bank-offline-table th {  
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 15px;
  } 
  .bank-offline-table .title-table {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-top: none;
    border-bottom: 1px solid #ddd;
    background-color: #f8f9fb;
    color: #333;
    font-size: 16px;
  }
  .bank-offline-table tr:nth-child(odd) {
    background-color: #f8f9fb;
  }
  .userTable tr:nth-child(odd) {
    background-color: #fff;
  }
  .userTable .el-input__inner {
    width: 260px;
    height: 35px;
  }
  .dateSelect .el-input__inner {
    width: 146px; 
  } 
  .dateSelect .el-date-editor.el-input, 
  .dateSelect .el-date-editor.el-input__inner {
    width: 106px; 
  }
  .dateSelect .el-input__inner,
  .dateSelect .el-date-editor.el-input, 
  .dateSelect .el-date-editor.el-input__inner {
    width: 128px; 
  }
  .dateSelect .el-input--suffix .el-input__inner {
    padding-right: 17px;
  }
  .userTable td,
  .userTable th {
    padding: 3px 15px;
  }
  .bank-offline-table th {
    width: 15%;
    color: #666;
  }
  .btnBox {    
    /*width: 100%;*/
    /*text-align: center!important;*/
    padding: 20px 15px!important;
  }
  .btnBox button {
    border: none;
  }
  .ercode-pay {
    max-width: 420px;
  }
  
</style>
