<template>
  <div class="content moneyManage-page accessListBox">
    <nav>
      <h3 class="title">{{title}}</h3>
      <div class="tad">
        <div class="tab el-tabs__item" v-if="!(getApiName=='ly'&&item.tab=='scAccess')" :class="{act:$index==act}" v-for="(item,$index) in tad" @click="toggleTab(item.tab,$index)">
          <a class="write">{{item.name}}</a>
        </div>
      </div>
      <accessCp :accessType="accessType"></accessCp>
    </nav>
  </div>
</template>
<script>
import { formatDate } from "../../assets/js/date.js";
import accessCp from "./accessCp";
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
      getApiName: getApiName(),
      currentTab: "accessCp", //currentTab用于表示当前触发的子组件
      tad: [{ name: "彩票存取记录", tab: "lottery" }],
      act: 0,
      accessType: "lottery"
    };
  },
  props: {
    isAgAccount: {
      type: Boolean
    }
  },
  components: {
    accessCp
  },
  created() {
    let sort = sessionStorage.getItem("sort");
    if (sort) {
      sort = sort.split(",");
      if (this.inArray("1", sort)) {
        this.tad.push({ name: "AG存取记录", tab: "ag" });
      }
      if (this.inArray("4", sort)) {
        this.tad.push({ name: "体育存取记录", tab: "sport" });
      }
			if (this.inArray("6", sort)) {
				this.tad.push({ name: "棋牌游戏", tab: "chess" });
			}
    }
    // if(this.getApiName == 'fulicai'){
    //   this.tad.splice(1,2)
    // }
    // this.activeName = this.$route.params.id.split(':')[1];
    this.username = sessionStorage.im_username;
    this.banlance = this.$store.state.lotteryMoney;
    this.getRecodeData(1, this.numb);
  },
  mounted() {},
  methods: {
    inArray(str = "", arr = []) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
          return true;
        }
      }
      return false;
    },
    toggleTab: function(tab, index) {
      this.currentTab = tab; //tab为触发当前标签页的组件名
      this.act = index;
      this.accessType = tab;
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
      // console.log(`当前页: ${val}`);
      this.$router.replace({ name: "Access", query: { page: val } });
      // setTimeout(()=>{
      //   this.getRecodeData(val, this.numb)
      // },600)
    },
    getRecodeData(page, numb) {
      // alert(111)
      let params = {};

      params.page = page;
      params.number = numb;

      if (this.isAgAccount) {
        params.GameName = "AG";
      }

      this.$http
        .post("/getinfo/record", JSON.stringify(params))
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
<style>
.tad {
  background: #fff;
  text-align: left;
  padding: 20px 0 10px 20px;
}
.tad .act {
  background: #1c4fa8;
}
.tad .act a {
  color: #fff !important;
}
.tad div {
  background: #f1f3f8;
  margin-left: 5px;
  border-radius: 5px;
  padding-top: 5px;
  line-height: 32px;
}
.write {
  font-size: 14px;
  color: #666;
}
</style>
