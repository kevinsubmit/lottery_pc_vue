<template>
  <div class="content history-page history-page-1" ref='kuan' style="padding-top:0;margin-left:0">
    <div class="history common-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="未结明细" name="weijie">
          <el-table :data="weijie" stripe style="width: 100%">

            <el-table-column label="游戏彩种" prop="game_name">
            </el-table-column>

            <el-table-column label="订单号" prop="no">
            </el-table-column>

            <el-table-column label="期数" width="200" prop="round">
            </el-table-column>

            <el-table-column label="下注时间" prop="time" sortable width="180">
            </el-table-column>

            <el-table-column label="下注号码/赔率" prop="detail" sortable width="220">
            </el-table-column>

            <!-- <el-table-column
          label="赔率"
          prop="rate">
          </el-table-column> -->

            <el-table-column label="下注金额" prop="money">
            </el-table-column>

            <!--     <el-table-column
            label="下注次数"
            prop="count">
            </el-table-column> -->

          </el-table>

          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangeWeijie" :current-page="currentPage" :page-sizes="[16, 32, 64]" :page-size="16" layout="total, prev, pager, next, jumper" :total="allnumb">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="今日已结" name="yijie">
          <el-table :data="yijie" stripe style="width: 100%">

            <el-table-column label="游戏彩种" prop="game_name">
            </el-table-column>

            <el-table-column label="订单号" prop="no">
            </el-table-column>

            <el-table-column label="期数" width="130" prop="round">
            </el-table-column>

            <el-table-column label="下注时间" sortable prop="time" width="160">
            </el-table-column>

            <el-table-column label="下注号码/赔率" prop="detail" width="220">
            </el-table-column>

            <!--  <el-table-column
         label="赔率"
         prop="rate">
         </el-table-column> -->

            <el-table-column label="下注金额" prop="money">
            </el-table-column>

            <el-table-column label="退水金额" prop="retreat" width="130">
            </el-table-column>

            <!--    <el-table-column
          label="下注次数"
          prop="count">
          </el-table-column> -->

            <el-table-column label="输赢结果" prop="win_money">
            </el-table-column>
          </el-table>

          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangeYijie" :current-page="currentPage2" :page-sizes="[16, 32, 64]" :page-size="16" layout="total, prev, pager, next, jumper" :total="allnumb2">
            </el-pagination>
          </div>

        </el-tab-pane>

        <el-tab-pane label="历史汇总" name="all" v-if="!isDemo">

          <h5 class="hasClosedTitle">
            <span>ALL</span>全部游戏&nbsp;未结</h5>
          <el-table @row-click="redirectWeijie" :data="allUnSettlement" stripe style="width: 100%" class='hui'>

            <el-table-column label="交易日期" prop="dateTime">
            </el-table-column>

            <el-table-column label="注单笔数" prop="allNum" @click='dianji'>
            </el-table-column>

            <el-table-column label="下注金额" prop="allMoney">
            </el-table-column>

            <el-table-column label="可赢金额" prop="allWinMoney">
            </el-table-column>

            <el-table-column label="退水金额" prop="allCut">
            </el-table-column>
            <tr>
              <td>总计</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </el-table>

          <h5>
            <span>ALL</span>全部游戏&nbsp;已结</h5>
          <el-table @row-click="redirectYijie" :data="allHasClose" stripe style="width: 100%;" class='hui'>

            <el-table-column label="交易日期" prop="dateTime">
            </el-table-column>

            <el-table-column label="注单笔数" prop="allNum">
            </el-table-column>

            <el-table-column label="下注金额" prop="allTotal">
            </el-table-column>

            <el-table-column label="输赢金额" prop="allWinMoney">
            </el-table-column>

            <el-table-column label="退水金额" prop="allCut">
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isDemo: false,
      title: "下注记录",
      activeName: "weijie",
      loading: true,
      allnumb: 0, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      numb: 30, // 每页的数量
      allnumb2: 0, // 当前彩种所有开奖结果历史条数
      currentPage2: 1, // 当前页码
      numb2: 30, // 每页的数量
      allHasClose: [],
      allUnSettlement: [],
      weijie: [],
      yijie: [],
      histroywj: []
    };
  },
  created() {
    if (sessionStorage.getItem("im_username") === "游客") {
      this.isDemo = true;
      this.activeName = "weijie";
      this.getWeijie(1, 16);
    } else {
      // this.getTotalData();
      this.getWeijie(1, 16);
    }
  },
  methods: {
    dianji() {
      // alert(111)
    },
    redirectYijie(data) {
      let newDate = data.dateTime;
      newDate = newDate.split("-")[0];
      let queryDate = new Date(newDate).getTime();
      // console.log( new Date(data.dateTime).getTime())
      this.activeName = "yijie";
      this.getYijie(1, 16, queryDate);
      this.$router.replace({
        name: "HistoryXZ",
        query: { pages: 1, time: queryDate / 1000 }
      });
    },
    redirectWeijie(data) {
      let newDate = data.dateTime;
      newDate = newDate.split("-")[0];
      // console.log( new Date(data.dateTime).getTime())
      this.activeName = "weijie";
      this.getWeijie(1, 16, new Date(newDate).getTime());
      this.$router.replace({
        name: "HistoryXZ",
        query: { pages: 1, time: new Date(newDate).getTime() / 1000 }
      });
    },
    getTotalData() {
      let params = {};


      this.$http
        .post("/getinfo/getSummaryBet", JSON.stringify(params))
        .then(res => {
          if (res.data.msg === 4001) {
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
          } else if (res.data.msg === 2006) {
            var arys1 = new Array();
            // arys1=riqi.split('-');     //日期为输入日期，格式为 2013-3-10
            // var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
            // ssdate.getDay()  //就是你要的星期几
            this.allHasClose = res.data.summary.hasClose;
            this.allUnSettlement = res.data.summary.unSettlement;

            // console.log(this.histroywj)
            this.allHasClose.map(item => {
              item.dateTime = item.dateTime.replace(/-/g, "/");
              this.histroywj = new Date(item.dateTime).getTime();
              if (new Date(new Date(item.dateTime).getTime()).getDay() == 1) {
                item.dateTime = item.dateTime + "--星期一";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 2
              ) {
                item.dateTime = item.dateTime + "--星期二";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 3
              ) {
                item.dateTime = item.dateTime + "--星期三";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 4
              ) {
                item.dateTime = item.dateTime + "--星期四";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 5
              ) {
                item.dateTime = item.dateTime + "--星期五";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 6
              ) {
                item.dateTime = item.dateTime + "--星期六";
              } else if (
                new Date(new Date(item.dateTime).getTime()).getDay() == 0
              ) {
                item.dateTime = item.dateTime + "--星期天";
              }
            });
            // console.log(this.allUnSettlement)

            this.allUnSettlement.map(item => {
              item.dateTime = item.dateTime.replace(/-/g, "/");
              // console.log(new Date(item.dateTime).getTime())
              if (new Date(item.dateTime).getDay() == 1) {
                item.dateTime = item.dateTime + "--星期一";
              } else if (new Date(item.dateTime).getDay() == 2) {
                item.dateTime = item.dateTime + "--星期二";
              } else if (new Date(item.dateTime).getDay() == 3) {
                item.dateTime = item.dateTime + "--星期三";
              } else if (new Date(item.dateTime).getDay() == 4) {
                item.dateTime = item.dateTime + "--星期四";
              } else if (new Date(item.dateTime).getDay() == 5) {
                item.dateTime = item.dateTime + "--星期五";
              } else if (new Date(item.dateTime).getDay() == 6) {
                item.dateTime = item.dateTime + "--星期六";
              } else if (new Date(item.dateTime).getDay() == 0) {
                item.dateTime = item.dateTime + "--星期天";
              }
            });

            this.allUnSettlement = res.data.summary.unSettlement;
          } else {
            this.$swal({
              text: "获取数据失败，请重试！",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
          }
          this.loading = false;
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },

    getWeijie(page, number, date) {
      let today = new Date().getTime();
      let params = {};


      params.page = page;
      params.number = number;
      // params.time=date/1000
      date ? (params.time = date / 1000) : (params.time = null);

      params.type = 0; // 0 未结
      this.$http
        .post("/getinfo/getMissedOrHasClosedBet", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
            this.$router.push({
              path: "/home"
            });
          }
          if (res.status === 200) {
            this.weijie = res.data.res;
            this.allnumb = parseInt(res.data.page.allnmb);
            this.currentPage = parseInt(res.data.page.page);
            this.numb = parseInt(res.data.page.number);
          }
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },
    getYijie(page, number, date) {
      // console.log(date)
      let today = Date.parse(new Date());
      let params = {};


      params.page = page;
      params.number = number;
      // params.time=date/1000
      // date ? params.time=date/1000 : params.time=today/1000;
      if (this.$route.query.time) {
        params.time = this.$route.query.time;
      } else {
        date ? (params.time = date / 1000) : (params.time = today / 1000);
      }
      // console.log(params.time)
      params.type = 1; // 1 已结
      this.$http
        .post("/getinfo/getMissedOrHasClosedBet", JSON.stringify(params))
        .then(res => {
					if (sessionStorage.getItem("im_username") === "游客") return
          if (res.data.msg === 4001) {
            this.$router.push({
              path: "/home"
            });
          }
          if (res.status === 200) {
            this.yijie = res.data.res;
            this.allnumb2 = parseInt(res.data.page.allnmb);
            this.currentPage2 = parseInt(res.data.page.page);
            this.numb2 = parseInt(res.data.page.number);
          }
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },
    handleClick(tab) {
      if (this.$route.query.time) {
        this.$router.replace({ name: "HistoryXZ", query: { pages: 1 } });
      }
      if (tab.name === "weijie") {
        this.getWeijie(1, 16);
      } else if (tab.name === "yijie") {
        this.getYijie(1, 16);
      } else if (tab.name === "all") {
        this.getTotalData();
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getWeijie(1, val);
      this.getYijie(1, val);
    },
    handleCurrentChangeWeijie(val) {
      if (this.$route.query.time) {
        this.$router.replace({
          name: "HistoryXZ",
          query: { page: val, time: this.$route.query.time }
        });
      } else {
        this.$router.replace({ name: "HistoryXZ", query: { page: val } });
      }
    },
    handleCurrentChangeYijie(val) {
      // console.log(`当前页: ${val}`);
      if (this.$route.query.time) {
        this.$router.replace({
          name: "HistoryXZ",
          query: { pages: val, time: this.$route.query.time }
        });
      } else {
        this.$router.replace({ name: "HistoryXZ", query: { pages: val } });
      }
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        if (this.$route.query.pages) {
          this.getYijie(this.$route.query.pages, 16, this.$route.query.time);
        } else {
          this.getWeijie(this.$route.query.page, 16);
        }
      }, 600);
    }
  }
};
</script>
<style>
.el-table__body-wrapper {
  border: 1px solid #ddd;
}
.hui tbody .el-table__row {
  cursor: pointer;
}
.history-page .page {
  padding: 0px 0 60px 0;
}
.history-page .el-table th {
  text-align: center !important;
}
.history-page h5 {
  color: #453880;
  font-size: 16px;
  text-align: left;
  margin: 10px 0;
}
.history-page h5 span {
  height: 30px;
  width: 30px;
  background-color: #f39700;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 2px 2px 5px #f39700;
  display: inline-block;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  display: none;
}
.history-page h5.hasClosedTitle {
  color: #f39700;
}
.history-page h5.hasClosedTitle span {
  background-color: #453880;
  box-shadow: 2px 2px 5px #453880;
}
.common-content .el-table__body {
  border: none;
}
.el-table .cell {
  padding: 0 !important;
}
.el-tabs__header {
  margin: 0 0 5px;
}
.common-content {
  padding: 5px 20px 20px 20px;
}
</style>
