<template>
  <div class="content moneyManage-page" style="margin-left:0;padding:0">
    <nav>
      <div class="common-content">

        <div class="moneyManage">
          <div class="userSetData">
            <el-table :data="recordData" stripe style="width: 100%" @row-click="showCellData">
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
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 25]" :page-size="numb" layout="total, prev, pager, next, jumper" :total="allnumb">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="access_item_detail" v-show="accessItemDetailShow">
      <div>
        <div class="icon-close el-icon-circle-close-outline" @click="accessItemDetailShow=false"></div>
        <div class="access_item_title">
          交易记录详情
        </div>
        <div>
          <div>
            订单号:
          </div>
          <div>
            {{accessItemDetailData.order_code}}
          </div>
        </div>
        <div>
          <div>
            订单生成日期:
          </div>
          <div>
            {{accessItemDetailData.addtime}}
          </div>
        </div>
        <div>
          <div>
            存储类型:
          </div>
          <div>
            {{accessItemDetailData.type_code}}
          </div>
        </div>
        <div>
          <div>
            交易状态:{{accessItemDetailData.status}}
          </div>
          <div>
            <span :style="{color:accessItemDetailData.status==='处理中'?'#3063ce':accessItemDetailData.status==='失败'?'red':''}">{{accessItemDetailData.status}}</span>
          </div>
        </div>
        <div class="error-area" v-show="accessItemDetailData.status==='处理中'||accessItemDetailData.status==='失败'" v-html="accessItemDetailData.context||'请联系客服'">

        </div>
        <div>
          <div>
            交易金额:
          </div>
          <div>
            {{accessItemDetailData.money}}
          </div>
        </div>
        <div>
          <el-button type="primary" @click="accessItemDetailShow = false" style="width:100%">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { formatDate } from "../../assets/js/date.js";
import Transfer from "./transfer";
import Withdraw from "./withdraw";
import offlinePay from "./pay_offline";
import onlinePay from "./pay_online";
import moment from 'moment'

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
      payType: "",
      accessItemDetailData: {},
      accessItemDetailShow: false
    };
  },
  props: {
    isAgAccount: {
      type: Boolean
    },
    accessType: {
      type: String
    }
  },
  components: {
    Transfer,
    Withdraw,
    offlinePay,
    onlinePay
  },
  created() {
    // this.activeName = this.$route.params.id.split(':')[1];
    this.username = sessionStorage.im_username;
    this.banlance = this.$store.state.lotteryMoney;
    this.getRecodeData(1, this.numb, this.accessType);
  },
  methods: {
    getAccessData(type) {
      this.getRecodeData(1, this.numb, this.accessType);
    },
    showCellData(row, event, column) {
      this.accessItemDetailShow = true;
      this.accessItemDetailData = row;
    },
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
      this.$router.replace({ name: "AccessList", query: { page: val } });
    },
    getRecodeData(page, numb, type) {
      let record = "";
      if (type === "lottery") {
        record = "/getinfo/record";
      }
      if (type === "sport") {
        record = "/getinfo/ty_record";
      }
      if (type === "ag") {
        record = "/getinfo/ag_record";
      }
      if (type === "chess") {
        // record = "/Wh_H5_Api/SearchCreditBill";
        record = "/Wh_APP_Api/SearchCreditBill";
      }
      let params = {};

      params.page = page;
      params.number = 20;
      params.stime = moment().add(-7, 'days').format('YYYY-MM-DD 00:00:00')

      this.$http
        .post(record, JSON.stringify(params))
        .then(res => {
					// 棋牌的字段有的跟其它的不一样，进行名称转换
					if (type === 'chess'){
						res.data.res = res.data.data
						res.data.res.map(item => {
							item.pay_way = item.context
						})
					}

          this.recordData = res.data.res;
          this.allnumb = parseInt(res.data.page.allnmb) || 0;
          this.currentPage = parseInt(res.data.page.page) || 0;
          this.numb = parseInt(res.data.page.number) || 0;

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
          this.getRecodeData(
            this.$route.query.page,
            this.numb,
            this.accessType
          );
        }
      }, 600);
    },
    accessType: function(newType, oldType) {
      this.getAccessData(newType);
    }
  }
};
</script>


<style scoped>
.access_item_detail {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 40px;
}

.access_item_detail > div {
  background: white;
  border-radius: 5px;
  width: 400px;
  position: relative;
  padding-bottom: 10px;
}

.access_item_detail > div > div {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
}

.access_item_detail > div > div:first-child {
  border-bottom: none;
}

.access_item_detail > div > div:last-child {
  border: none;
  justify-content: center;
  margin-top: 10px;
}

.icon-close {
  font-size: 30px;
  right: -30px;
  top: -30px;
  height: 30px;
  width: 30px;
  position: absolute;
  color: white;
  cursor: pointer;
}

.error-area {
  background-color: #eee;
  line-height: 20px;
  text-align: left;
  word-break: break-all;
  padding: 10px!important;
}

.access_item_title {
  color: black;
  font-size: 18px;
  justify-content: center !important;
}
</style>
