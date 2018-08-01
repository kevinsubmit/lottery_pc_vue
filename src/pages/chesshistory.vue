<template>
  <div class="content history-page history-page-1" ref='kuan' style="padding-top:0;margin-left:0">
    <div class="history common-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="历史汇总" name="all" v-if="!isDemo">
          <h5><span>ALL</span>全部游戏&nbsp;已结</h5>
          <el-table :data="list" stripe style="width: 100%;" class='hui' @row-click="redirectYijie">

            <!--<el-table-column label="注单号" prop="uid">
            </el-table-column>-->

						<!--<el-table-column label="游戏名称" prop="gname">
						</el-table-column>-->

						<el-table-column label="交易日期" prop="date">
						</el-table-column>

            <el-table-column label="游戏总局数" prop="num">
            </el-table-column>

            <el-table-column label="输赢总额">
							<template slot-scope="scope">
								<span :class="{'red': scope.row.inc_total < 0}">{{ scope.row.total }}</span>
							</template>
            </el-table-column>

            <el-table-column label="总抽税" prop="rev">
            </el-table-column>

          </el-table>

					<div v-if="list.length" class="page">
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="16" layout="total, prev, pager, next, jumper" :total="allnumb">
						</el-pagination>
					</div>
        </el-tab-pane>

        <el-tab-pane label="今日已结" name="yijie">
          <el-table :data="yijie" stripe style="width: 100%">

						<el-table-column label="游戏局数编号" prop="id">
						</el-table-column>

						<el-table-column label="游戏名称" prop="gname">
						</el-table-column>

						<el-table-column label="下注时间" prop="time">
						</el-table-column>

						<!--<el-table-column label="游戏总局数" prop="id">
						</el-table-column>-->

						<el-table-column label="输赢结果" prop="inc">
							<template slot-scope="scope">
								<span :class="{'red': scope.row.inc < 0}">{{ scope.row.inc }}</span>
							</template>
						</el-table-column>

						<el-table-column label="抽税金额" prop="rev">
						</el-table-column>

          </el-table>

          <div v-if="yijie.length" class="page">
            <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangeYijie" :current-page="currentPage2" :page-size="20" layout="total, prev, pager, next, jumper" :total="allnumb2">-->
            <el-pagination @current-change="handleCurrentChangeYijie" :current-page.sync="currentPage2" :page-size="16" layout="total, prev, pager, next, jumper" :total="allnumb2">
            </el-pagination>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>


<script>
import moment from 'moment'

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
      weijie: [],
      yijie: [],
      histroywj: [],
      list: [],
			selectedDate: '',// "历史汇总"跳到"今日已结"所选择的日期
    };
  },
  created() {
    if (sessionStorage.getItem("im_username") === "游客") {
      this.isDemo = true;
      this.activeName = "yijie";
      // this.getYijie(1, 16);
			this.getTotalData()
    } else {
      // this.getYijie(1, 16);
			this.getTotalData()
    }
  },
  methods: {
    dianji() {
      // alert(111)
    },
		// 跳转到对应日期的已结账单
    redirectYijie(data) {
      let newDate = data.date;
      newDate = newDate.split("-")[0];
      // console.log( new Date(data.dateTime).getTime())
      this.activeName = "yijie";
      this.getYijie(1, 16, data.date);
      /*this.$router.replace({
        name: "chesshistory",
        query: { pages: 1}
      });*/
    },
		// 历史汇总
    getTotalData() {
      let params = {};


      params.is_total = 1;
      this.$http
        .post("/Wh_APP_Api/SearchGameRecord", JSON.stringify(params))
        .then(res => {
          if (res.data.msg === 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
            this.$swal({
              text: "账户已下线，请重新登陆",
              type: "error",
              timer: 1200
            })

            this.$router.push({
              path: "/home"
            });
            return;
          } else if (res.data.msg === 2006) {
            var arys1 = new Array();
            // arys1=riqi.split('-');     //日期为输入日期，格式为 2013-3-10
            // var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
            // ssdate.getDay()  //就是你要的星期几
						let records = res.data.data
            this.allHasClose = records;
						// 手动累加计算总局数，输赢金额，抽税金额的值
						records.forEach(item => {
							item.total = _.reduce(item.content, (sum, obj) => sum + obj.inc_total, 0)
							item.rev = _.reduce(item.content, (sum, obj) => sum + obj.inc_rev, 0)
							item.num = _.reduce(item.content, (sum, obj) => sum + obj.nums, 0)
						})
						this.list = records
            /*for (let i in this.allHasClose) {
              this.list = res.data.data;
              console.log(this.list);
            }*/

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
          } else {
            /*this.$swal({
              text: "获取数据失败，请重试！",
              type: "error",
              timer: 1200
            })*/
          }
          this.loading = false;
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },
    getYijie(page = 1, number = 16, date) {
    	this.selectedDate = date// 将选择的日期保存起来，分页获取数据时需要用到
      // console.log(date)
      let today = Date.parse(new Date());
      let params = {};

      params.page = page;
      params.number = number;

			if (date) {
				params.stime = moment(date).format('YYYY-MM-DD 00:00:00')
				params.etime = moment(date).format('YYYY-MM-DD 23:59:59')
			} else {
				params.stime = moment().format('YYYY-MM-DD 00:00:00')
				params.etime = moment().format('YYYY-MM-DD 23:59:59')
			}


      // console.log(params.time)
      // params.type = 1; // 1 已结
			params.is_total = 0
			// params.time = 1530374400
      this.$http
        .post("/Wh_APP_Api/SearchGameRecord", JSON.stringify(params))
        .then(res => {
          console.log(res);
          if (res.data.msg === 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
            this.$router.push({
              path: "/home"
            });
          }
          if (res.data.msg == 2006) {
            this.yijie = res.data.data || [];
            this.allnumb2 = res.data.page.totalcnt;
            this.numb2 = parseInt(res.data.number);
          }
        });
    },
    handleClick(tab) {
      if (this.$route.query.time) {
        this.$router.replace({ name: "chesshistory", query: { pages: 1 } });
      }
      if (tab.name === "yijie") {
      	this.yijie = []// 切换到“今日已结”时先清空列表
        this.getYijie(1, 16);
      } else if (tab.name === "all") {
        this.getTotalData();
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      //   this.getWeijie(1,val);
      this.getYijie(1, val);
    },
		handleCurrentChange(val) {
			this.getCurrentPageData(val, 1);
		},
    handleCurrentChangeYijie(val) {
      // console.log(`当前页: ${val}`);
      /* if (this.$route.query.time) {
        this.$router.replace({
          name: "chesshistory",
          query: { pages: val, time: this.$route.query.time }
        });
      } else {
        this.$router.replace({ name: "chesshistory", query: { pages: val } });
      } */
      this.getCurrentPageData(val, 0);
    },
    formatTableParams({ page, number = 16, is_total = 0 }) {
      let params = {
        page,
        number,
        // time: Date.parse(new Date()) / 1000,
				is_total
      };
      return params;
    },
    getCurrentPageData(pageNum, is_total) {
      let params = this.formatTableParams({ page: pageNum, is_total: is_total });

			if (this.selectedDate) {
				params.stime = moment(this.selectedDate).format('YYYY-MM-DD 00:00:00')
				params.etime = moment(this.selectedDate).format('YYYY-MM-DD 23:59:59')
			} else {
				params.stime = moment().format('YYYY-MM-DD 00:00:00')
				params.etime = moment().format('YYYY-MM-DD 23:59:59')
			}

      this.$http
        .post("/Wh_APP_Api/SearchGameRecord", JSON.stringify(params))
        .then(res => {
          console.log(res);
          if (res.data.msg === 4001) {
						if (sessionStorage.getItem("im_username") === "游客") return
            this.$router.push({
              path: "/home"
            });
          }
          if (res.data.msg == 2006) {
						this.$set(this, 'yijie', res.data.data)
            // this.yijie = res.data.data || [];
            // this.allnumb2 = res.data.data.length;
            // this.numb2 = parseInt(res.data.number);
          }
        });
      // {"oid":"5b9512f0da6bc1501d7c0c80c21c837f","page":1,"number":16,"time":1525269287,"type":1}
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        if (this.$route.query.pages) {
          this.getYijie(this.$route.query.pages, 16, this.$route.query.time);
        }
      }, 600);
    }
  }
};
</script>
<style>
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
.red{
	color: red
}
</style>
