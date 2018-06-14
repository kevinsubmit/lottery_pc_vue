<template>
  <div class="content moneyManage-page" style="margin-left:0;padding:0">
    <nav>
      <div class="common-content">

        <div class="moneyManage">
          <div class="userSetData">
            <el-table :data="recordData" stripe style="width: 100%">
              <el-table-column prop="order_code" label="订单号" width="240">
              </el-table-column>

              <el-table-column prop="username" label="会员">
              </el-table-column>

              <el-table-column prop="addtime" width="150" label="订单生成日期">
              </el-table-column>

              <el-table-column prop="type_code" label="存储类型">
              </el-table-column>

              <el-table-column prop="pay_way" label="支付方式">
              </el-table-column>

              <el-table-column prop="money" label="交易金额">
              </el-table-column>

              <el-table-column prop="status" label="处理状态">
              </el-table-column>
            </el-table>

            <div class="page">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 25]" :page-size="20" layout="total, prev, pager, next, jumper" :total="allnumb">
              </el-pagination>
            </div>
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
import offlinePay from "./pay_offline";
import onlinePay from "./pay_online";
export default {
  data() {
    return {
      agbalance: "",
      activeNav: "record",
      active: 1, // step
      title: "存取记录",
      username: "试玩账号",
      banlance: "0",
      level: "钻石vip",
      xian: true,
      activeName: "record", // 默认显示
      recordData: [],
      allnumb: 0, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      numb: 16, // 每页的数量
      isShowDeposit: true,
      isShowOfflinePay: false,
      isShowOnlinePay: false,
      payType: ""
    };
  },
  props: {
    isAgAccount: {
      type: Boolean
    }
  },
  components: {
    Deposit,
    Transfer,
    Withdraw,
    offlinePay,
    onlinePay
  },
  created() {
    // this.activeName = this.$route.params.id.split(':')[1];
    this.username = sessionStorage.im_username;
    this.banlance = this.$store.state.lotteryMoney;
    this.getRecodeData(1, this.numb);
  },
  mounted() {
  },
  methods: {
    getAgBalance() {
      
      let params = {};
      
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        // console.log(res.data.balance.agBalance)
        if (res.data.msg === 2006) {
          this.agbalance = res.data.balance.agBalance;
          this.banlance = res.data.balance.userBalance;
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
          // console.log(res)
          this.banlance = res.data.money;
          // console.log(this.banlance)
          this.$store.commit("updatelotteryMoney", res.data.money);
        });
      } else if (i == "change1") {
        this.active = 2;
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      setTimeout(() => {
        this.getRecodeData(1, val);
      }, 600);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$router.replace({ name: "AccessList", query: { page: val } });
      // setTimeout(()=>{
      //   this.getRecodeData(val, this.numb)
      // },600)
    },
    getRecodeData(page, numb) {
      
      let params = {};
      
      params.page = page;
      params.number = numb;

      if (this.isAgAccount) {
        params.GameName = "AG";
      }
      this.$http
        .post("/getinfo/ty_record", JSON.stringify(params))
        .then(res => {
          this.recordData = res.data.res;

          this.allnumb = parseInt(res.data.page.allnmb);
          this.currentPage = parseInt(res.data.page.page);
          this.numb = parseInt(res.data.page.number);

          for (var i = 0; i < this.recordData.length; i++) {
            // 时间转换
            this.recordData[i].addtime = formatDate(
              new Date(this.recordData[i].addtime * 1000),
              "yyyy-MM-dd hh:mm"
            );

            // console.log(this.recordData[i].bank_code);

            // 付款方式（）
            switch (this.recordData[i].pay_way) {
              case "0":
                this.recordData[i].pay_way = "后台操作";
                break;

              case "1":
                this.recordData[i].pay_way = "在线支付";
                break;

              case "2":
                this.recordData[i].pay_way = "线下支付";
                break;

              case "3":
                this.recordData[i].pay_way = "提款";
                break;

              case "4":
                this.recordData[i].pay_way = "BBIN额度转换";
                break;

              case "5":
                this.recordData[i].pay_way = "体育额度转换";
                break;

              case "9":
                this.recordData[i].pay_way = "AG额度转换";
                break;

              case "11":
                this.recordData[i].pay_way = "红包活动一";
                break;

              case "15":
                this.recordData[i].pay_way = "MG额度转换";
                break;

              case "16":
                this.recordData[i].pay_way = "红包活动二";
                break;

              case "17":
                this.recordData[i].pay_way = "聊天室";
                break;

              case "18":
                this.recordData[i].pay_way = "活动三";
                break;
            }

            //0 存入，1 提出
            if (this.recordData[i].type_code == 0) {
              this.recordData[i].type_code = "存入";
            } else if (this.recordData[i].type_code == 1) {
              this.recordData[i].type_code = "提出";
            } else {
              this.recordData[i].type_code = "未知";
            }

            if (this.recordData[i].bank_code == "AG") {
              this.recordData[i].type_code = this.recordData[i].context;
            }

            if (
              this.recordData[i].status == 1 &&
              this.recordData[i].is_clear == 1
            ) {
              // 成功
              this.recordData[i].status = "成功";
            } else if (
              this.recordData[i].status == 1 &&
              this.recordData[i].is_clear == 0
            ) {
              // 失败
              this.recordData[i].status = "失败";
            } else if (status == 0) {
              //  处理中
              this.recordData[i].status = "处理中";
            } else {
              this.recordData[i].status = "未知";
            }

            //处理状态（0 失败，1 成功）
            /*if (this.recordData[i].is_clear == 0) {
              this.recordData[i].is_clear  = "失败"
            } else if (this.recordData[i].is_clear == 1) {
              this.recordData[i].is_clear  = "成功"
            }else {
              this.recordData[i].is_clear  = "未知"
            }

             //状态（0 未处理，1 已处理）
            if (this.recordData[i].status == 0) {
              this.recordData[i].status  = "未处理"
            } else if (this.recordData[i].status == 1) {
              this.recordData[i].status  = "已处理"
            }else {
              this.recordData[i].status  = "未知"
            }*/
          }
        })
        .catch(function() {});
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
    payTypeOrder(type) {
      // console.log(type)
      // this.next();
      this.active = 1;
      this.payType = type;
      if (
        type === "unionPayOffline" ||
        type === "aliPayOffline" ||
        type === "wechatPayOffline"
      ) {
        this.isShowDeposit = false;
        this.isShowOfflinePay = true;
      } else if (
        type === "unionPayOnline" ||
        type === "aliPayOnline" ||
        type === "wechatPayOnline" ||
        type === "tenPayOnline"
      ) {
        this.isShowDeposit = false;
        this.isShowOfflinePay = false;
        this.isShowOnlinePay = true;
      }
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        if (this.$route.query.page) {
          this.getRecodeData(this.$route.query.page, this.numb);
        }
      }, 600);
    }
  }
};
</script>
