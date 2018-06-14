<template>
  <div class="content moneyManage-page">
    <nav>
      <h3 class="title">{{title}}</h3>
      <div class="common-content">
        <div class="userSet">
          <div class="avatar">
            <img :src="$getPublicImg('/images/common/icon/avatar-defalut-s.png')" />
          </div>
          <div class="user_info">
            <p>会员账号：
              <span>{{username}}</span>
            </p>
            <!-- <p>账户状态：<span>{{level}}</span>&nbsp;&nbsp;<span style="color:#3e80d4;">已启用</span></p> -->
            <p>彩票余额：
              <span style="color:#eb6877;">￥{{banlance}}</span>
            </p>
            <p v-show="getApiName !== 'klc'&& getApiName != 'fulicai'">AG余额：
              <span style="color:#eb6877;">￥{{agbalance}}</span>
            </p>
            <p v-show="getApiName != 'fulicai'">体育余额：
              <span style="color:#eb6877;">￥{{sportbalance}}</span>
            </p>
            <!-- <p>棋牌余额：<span style="color:#eb6877;">￥{{chessbalance}}</span></p> -->
          </div>
        </div>

        <div class="moneyManage">
          <div class="userSetData">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="labelDeposit" name="deposit">
                <div class="steps" v-if="xian">
                  <el-steps :active="active" finish-status="success">
                    <el-step title="选择充值/转款"></el-step>
                    <el-step title="选择银行/金额"></el-step>
                    <!-- <el-step title="第三方支付"></el-step> -->
                    <el-step title="完成"></el-step>
                  </el-steps>
                  <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </div>
                <deposit v-if="isShowDeposit" v-on:child-payType="payTypeOrder"></deposit>
                <offline-pay v-if="isShowOfflinePay" :payType="payType" v-on:child-step="childStep"></offline-pay>
                <online-pay v-if="isShowOnlinePay" :payType="payType" v-on:child-step="childStep"></online-pay>
              </el-tab-pane>

              <el-tab-pane :label="labelWithdraw" name="withdraw">
                <Withdraw v-on:child-money="money1"></Withdraw>
              </el-tab-pane>
              <el-tab-pane :label="labelTransfer" name="transfer" v-if="!isAgAccount&&getApiName !='fulicai'">
                <div class="tads">
                  <div class="taw" :class="{activ:$index==activ}" v-for="(item,$index) in tabs" @click="toggleTab(item.tab,$index)">
                    <a>{{item.name}}</a>
                  </div>
                </div>
                <Transfer :is="currentTab" keep-alive v-on:child-money="money1" v-on:chessSuccess='chessSuccess' v-on:agSuccess="agSuccess" v-on:sportSuccess="sportSuccess"></Transfer>
              </el-tab-pane>

              <!--  <el-tab-pane label="AG交易记录" name="agRecord" v-if="isAgAccount">
              <div class="ag-record">
                <access :isAgAccount="isAgAccount" v-if="showAgRecord"></access>                
              </div>
            </el-tab-pane> -->

            </el-tabs>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>


<script>
import { formatDate } from "../../assets/js/date.js";
import Deposit from "./deposit";
import Transfer from "./transfer";
import Withdraw from "./withdraw";
import cpTy from "./cpTy";
import cpQp from "./cpQp";
import offlinePay from "./pay_offline";
import onlinePay from "./pay_online";
// import access from './Access';
export default {
  data() {
    return {
      getApiName: getApiName(),
      labelDeposit: "我要充值",
      labelWithdraw: "我要提现",
      labelTransfer: "额度转换",
      showAgRecord: false,
      isAgAccount: false,
      agbalance: 0,
      sportbalance: 0.0,
      chessbalance: 0.0,
      activeNav: "deposit",
      active: 1, // step
      title: "资金管理",
      username: "试玩账号",
      banlance: "0",
      level: "钻石vip",
      xian: true,
      activeName: "deposit", // 默认显示
      recordData: [],
      allnumb: 2000, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      pagesize: 20, // 每页的数量
      currentPage1: 1,
      isShowDeposit: true,
      isShowOfflinePay: false,
      isShowOnlinePay: false,
      payType: "",
      tabs: [
        { name: "彩票,AG互转", tab: "transfer" },
        { name: "彩票,体育互转", tab: "cpTy" }
        // {name:'彩票,棋牌互转',tab:'cpQp'},
      ],
      currentTab: "transfer", //currentTab用于表示当前触发的子组件
      activ: 0
    };
  },
  components: {
    Deposit,
    Transfer,
    Withdraw,
    offlinePay,
    onlinePay,
    cpTy,
    cpQp
  },
  created() {
    if (this.$route.query.GameName) {
      this.isAgAccount = true;
      if (this.$route.query.isFish) {
        this.labelDeposit = "捕鱼充值";
        this.labelWithdraw = "捕鱼提现";
        return;
      }
      this.labelDeposit = "AG充值";
      this.labelWithdraw = "AG提现";
    } else {
      this.isAgAccount = false;
      this.labelDeposit = "我要充值";
      this.labelWithdraw = "我要提现";
    }
    this.activeName = this.$route.params.id.split(":")[1];
    this.username = sessionStorage.im_username;
    this.banlance = this.$store.state.lotteryMoney;
    // this.getRecodeData(1,30);
    this.getAgBalance();
    this.getSportBalance();
    this.getChessBalance();
  },
  mounted() {
  },
  methods: {
    toggleTab: function(tab, index) {
      this.currentTab = tab; //tab为触发当前标签页的组件名
      this.activ = index;
    },
    getAgBalance() {
      
      let params = {};
      
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        console.log(res.data.balance);
        if (res.data.msg === 2006) {
          this.agbalance = res.data.balance.agBalance.toFixed(2);
          this.banlance = res.data.balance.userBalance;
        }
      });
    },
    getSportBalance() {
      
      let params = {};
      
      this.$http
        .post("/user/getSportsBalance", JSON.stringify(params))
        .then(res => {
          this.sportbalance = res.data.balance || "0.00";
          if (res.data.msg === 2006) {
            this.banlance = res.data.balance.userBalance;
            this.sportbalance = res.data.balance || "0.00";
          }
        });
    },
    getChessBalance() {
      
      let params = {};
      
      this.$http
        .post("/Wh_H5_Api/getWhInfo", JSON.stringify(params))
        .then(res => {
          console.log(res);
          this.chessbalance = res.data.balance.whBalance;
          if (res.data.msg === 2006) {
            this.banlance = res.data.balance.userBalance;
            this.chessbalance = res.data.balance.whBalance;
          }
        });
    },
    money1(i) {
      if (i == "change") {
        // console.log(1111);
        this.active = 3;
        
        let params = {};
        
        getApiName() == "hg" ? (params.sports = 1) : "";
        this.$http.post("/getinfo/money", JSON.stringify(params)).then(res => {
          this.banlance = res.data.money;
          this.$store.commit("updatelotteryMoney", res.data.money);
        });
      } else if (i == "change1") {
        this.active = 2;
      }
    },
    handleClick(tab, event) {
      this.xian = true;
      // console.log(tab.label);
      if (tab.name == "deposit") {
        // this.active=0;
        // this.showAgRecord = false
      } else if (tab.name == "withdraw" || tab.name == "transfer") {
        this.active = 1;
        this.showAgRecord = false;
      } else if (tab.name == "record") {
        this.xian = false;
        this.showAgRecord = false;
        // this.getRecodeData(1,30);
      } else if (tab.name == "agRecord") {
        this.showAgRecord = true;
      }
      if (tab.name === "deposit") {
        // this.isShowDeposit = true
        // this.isShowOfflinePay = false
        // this.isShowOnlinePay = false
        //   this.showAgRecord = false
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.getRecodeData(1,val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      setTimeout(() => {
        this.getRecodeData(val, 20);
      }, 600);
    },
    childStep(o) {
      if (o == "step") {
        this.active = 3;
      } else if (o == "step1") {
        this.active = 2;
      }
    },
    agSuccess(msg) {
      if (msg === "agSuccess") {
        this.getAgBalance();
      }
    },
    sportSuccess(msg) {
      if (msg === "sportSuccess") {
        this.getSportBalance();
      }
    },
    chessSuccess(msg) {
      if (msg === "chessSuccess") {
        this.getChessBalance();
      }
    },
    payTypeOrder(type) {
      this.active = 1;
      this.payType = type;
      if (
        type === "unionPayOffline" ||
        type === "aliPayOffline" ||
        type === "wechatPayOffline" ||
        type === "jdPayOffline"
      ) {
        this.isShowDeposit = false;
        this.isShowOfflinePay = true;
      } else if (
        type === "unionPayOnline" ||
        type === "yunPay" ||
        type === "scanPay" ||
        type === "aliPayOnline" ||
        type === "wechatPayOnline" ||
        type === "tenPayOnline" ||
        type === "jdPayOnline"
      ) {
        this.isShowDeposit = false;
        this.isShowOfflinePay = false;
        this.isShowOnlinePay = true;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.isShowDeposit = true;
      this.isShowOfflinePay = false;
      this.isShowOnlinePay = false;
      this.showAgRecord = false;
      this.activeName = to.params.id.split(":")[1]; // 对路由变化作出响应...

      if (this.$route.query.GameName) {
        this.isAgAccount = true;
        if (this.$route.query.isFish) {
          this.labelDeposit = "捕鱼充值";
          this.labelWithdraw = "捕鱼提现";
          return;
        }
        this.labelDeposit = "AG充值";
        this.labelWithdraw = "AG提现";
      } else {
        this.isAgAccount = false;
        this.labelDeposit = "我要充值";
        this.labelWithdraw = "我要提现";
      }
    }
  }
};
</script>
<style scoped>
.tads {
  height: 35px;
  border: 1px solid #e6e6f0;
  text-align: left;
}
.tads div {
  height: 37px !important;
  line-height: 25px !important;
}
.tads div.activ {
  border-bottom: none;
  color: #409eff;
}
.tads div.activ a {
  color: #409eff;
  border-bottom: none;
}

.taw {
  display: inline-block;
  width: 120px;
  position: relative;
  top: -3px;
  cursor: pointer;
}
.taw a {
  display: inline-block;
  width: 100%;
  height: 25px;
  position: relative;
  top: 5px;
  border-right: 1px solid #e6e6f0;
  text-align: center;
}
#tab-transfer {
  padding-right: 20px;
}
.rules-page {
  background-color: #fff;
  min-height: 700px;
}

.userSet {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  display: flex;
}
.userSet .avatar {
  width: 72px;
  height: 72px;
  text-align: center;
  background-color: #2d2d3a;
  border-radius: 50%;
  /* margin-top: 12px; */
}
.userSet .avatar img {
  margin-top: 7px;
  width: 50px;
}
.userSet .user_info p {
  font-size: 14px;
  color: #666;
  line-height: 24px;
  text-align: left;
  margin-left: 10px;
}
.userSet .user_info p span {
  color: #453880;
}
.ag-record .content {
  margin-left: 0 !important;
  padding-top: 0 !important;
}
.ag-record h3.title {
  display: none;
}
.ag-record .common-content {
  padding: 0;
}
#tab-deposit {
  padding-left: 10px !important;
}
</style>

