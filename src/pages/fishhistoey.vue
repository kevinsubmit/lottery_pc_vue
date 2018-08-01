<template>
  <div class="content history-page history-page-1" ref='kuan' style="padding-top:0;margin-left:0">
    <div class="history common-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="今日已结" name="yijie">
          <el-table :data="yijie" stripe style="width: 100%">

            <el-table-column label="注单号" prop="billNo">
            </el-table-column>

            <el-table-column label="当局输赢" prop="netAmount">
            </el-table-column>

            <el-table-column label="游戏时间" prop="betTime">
            </el-table-column>

            <el-table-column label="下注金额" prop="betAmount">
            </el-table-column>

            <el-table-column label="有效下注" prop="validBetAmount">
            </el-table-column>
          </el-table>

          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangeYijie" :current-page="currentPage2" :page-sizes="[16, 32, 64]" :page-size="16" layout="total, prev, pager, next, jumper" :total="allnumb2">
            </el-pagination>
          </div>

        </el-tab-pane>

        <el-tab-pane label="历史汇总" name="all" v-if="!isDemo">

          <h5>
            <span>ALL</span>全部游戏&nbsp;已结</h5>
          <el-table :data="allHasClose" @row-click="redirectYijie" stripe style="width: 100%;" class='hui'>

            <el-table-column label="交易日期" prop="cur_day">
            </el-table-column>

            <el-table-column label="注单笔数" prop="numbers">
            </el-table-column>

            <el-table-column label="总有效金额" prop="allValid">
            </el-table-column>

            <el-table-column label="总投注金额" prop="allWin">
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
      activeName: "all",
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
      this.activeName = "yijie";
      this.getYijie(1, 16);
    } else {
      this.getYijie(1, 16);
    }
  },
  methods: {
    dianji() {},
    redirectYijie(data) {
      console.log(data.cur_day);
      let newDate = data.dateTime;
      let queryDate = new Date(newDate).getTime().toString().substr(0,10);
      this.activeName = "yijie";
      this.getYijie(1, 16, queryDate);
      this.$router.replace({
        name: "HistoryXZ",
        query: { pages: 1, time: newDate }
      });
    },
    getTotalData(page, number, date) {
      let params = {};


      params.page = page;
      params.number = number;
      params.type = 0;
      params.hunter = 1;
      this.$http
        .post("/getinfo/getAGHunterBill", JSON.stringify(params))
        .then(res => {
          if (res.data.msg === 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
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
          } else {
            var arys1 = new Array();
            this.allHasClose = res.data.list;
          }
        });
    },

    getYijie(page, number, date) {
      let today = Date.parse(new Date());
      let params = {};
      params.page = page;
      params.number = number;
      params.type = 1;
      params.time = new Date().getTime().toString().substr(0,10);
      params.type = 1; // 1 已结
      params.hunter = 1;
      this.$http
        .post("/getinfo/getAGHunterBill", JSON.stringify(params))
        .then(res => {
          if (res.data.msg === 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
            this.$router.push({
              path: "/home"
            });
          } else {
            this.yijie = res.data.list;
            console.log(this.yijie)
            this.allnumb2 = parseInt(res.data.count);
            this.currentPage2 = parseInt(res.data.page.page);
            this.numb2 = parseInt(res.data.number);
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
      if (tab.name === "yijie") {
        this.getYijie(1, 16);
      } else if (tab.name === "all") {
        this.getTotalData(1, 16);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getYijie(1, val);
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
          this.getTotalData(this.$route.query.page, 16);
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
