<template>
<div class="content history-page history-page-1" ref='kuan' style="padding-top:0;margin-left:0">
  <div class="history common-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="未结明细" name="weijie">
        <el-table

          :data="weijie"
          stripe
          style="width: 100%">

          <el-table-column
          label="订单号"
          prop="orderid">
          </el-table-column>

          <el-table-column
          label="下注时间"
          prop="BetTime"
          width="220">
          </el-table-column>

          <el-table-column
          label="球类"
          prop="Gtype">
          </el-table-column>

          <el-table-column
          label="下注金额"
          prop="BetScore">
          </el-table-column>

          <el-table-column
          label="有效投注"
          prop="LineType">
          </el-table-column>

          <!-- <el-table-column
          label="输赢金额"
          width="200"
          prop="M_Result">
          </el-table-column>    -->

          <el-table-column
          label="可赢金额"
          prop="Gwin"
          width="180">
          </el-table-column>

          </el-table>

          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChangeWeijie"
              :current-page="currentPage"
              :page-sizes="[16, 32, 64]"
              :page-size="16"
              layout="total, prev, pager, next, jumper"
              :total="allnumb">
            </el-pagination>
          </div>
        </el-tab-pane>

      <el-tab-pane label="今日已结" name="yijie">
        <el-table

          :data="yijie"
          stripe
          style="width: 100%">

          <el-table-column
          label="订单号"
          prop="orderid">
          </el-table-column>

          <el-table-column
          label="下注时间"
          prop="BetTime"
          width="220">
          </el-table-column>

          <el-table-column
          label="球类"
          prop="Gtype">
          </el-table-column>

          <el-table-column
          label="下注金额"
          prop="BetScore">
          </el-table-column>

          <el-table-column
          label="有效投注"
          prop="LineType">
          </el-table-column>

          <el-table-column
          label="输赢金额"
          width="200"
          prop="M_Result">
          </el-table-column>

        </el-table>

        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeYijie"
            :current-page="currentPage2"
            :page-sizes="[16, 32, 64]"
            :page-size="16"
            layout="total, prev, pager, next, jumper"
            :total="allnumb2">
          </el-pagination>
        </div>

      </el-tab-pane>

      <el-tab-pane label="历史汇总" name="all" v-if="!isDemo">

        <!-- <h5 class="hasClosedTitle" ><span>ALL</span>全部游戏&nbsp;未结</h5> -->
        <h5 class="hasClosedTitle" ><span>ALL</span>全部游戏</h5>
        <el-table
          :data="allUnSettlement"
          stripe
          style="width: 100%"  class='hui'>

           <el-table-column
          label="注单量"
          prop="num">
          </el-table-column>

          <el-table-column
          label="下注金额"
          prop="BetScore">
          </el-table-column>

          <el-table-column
          label="交易日期"
          prop="betDate">
          </el-table-column>

          <el-table-column
          label="输赢结果"
          prop="M_Result"  @click='dianji'>
          </el-table-column>

          <el-table-column
          label="有效投注"
          prop="VGOLD">
          </el-table-column>

          <tr>
            <td>总计</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </el-table>

        <!-- <h5><span>ALL</span>全部游戏&nbsp;已结</h5>
        <el-table
           @row-click="redirectYijie"
          :data="allHasClose"
          stripe
          style="width: 100%;"   class='hui'>

          <el-table-column
          label="交易日期"
          prop="dateTime">
          </el-table-column>

          <el-table-column
          label="注单笔数"
          prop="allNum">
          </el-table-column>

          <el-table-column
          label="下注金额"
          prop="allTotal">
          </el-table-column>

          <el-table-column
          label="输赢金额"
          prop="allWinMoney">
          </el-table-column>

          <el-table-column
          label="退水金额"
          prop="allCut">
          </el-table-column>
        </el-table> -->

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
      title: '下注记录',
      activeName: 'weijie',
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
     histroywj:[],
     his:[],
     total:'',
    }
  },
  created () {
    this.getFormatDate();
    if(sessionStorage.getItem('im_username') === '游客'){
      this.isDemo = true;
      this.activeName = 'weijie';
      this.getWeijie(1,16);
    } else {
      // this.getTotalData();
      this.getWeijie(1,16);
    }
  },
  methods: {
    getFormatDate(timeStr, dateSeparator, timeSeparator) {
        dateSeparator = dateSeparator ? dateSeparator : "-";
        timeSeparator = timeSeparator ? timeSeparator : ":";
        var date = new Date(timeStr),
                year = date.getFullYear(),// 获取完整的年份(4位,1970)
                month = date.getMonth(),// 获取月份(0-11,0代表1月,用的时候记得加上1)
                day = date.getDate(),// 获取日(1-31)
                hour = date.getHours(),// 获取小时数(0-23)
                minute = date.getMinutes(),// 获取分钟数(0-59)
                seconds = date.getSeconds(),// 获取秒数(0-59)
                Y = year + dateSeparator,
                M = ((month + 1) > 9 ? (month + 1) : ('0' + (month + 1))) + dateSeparator,
                D = (day > 9 ? day : ('0' + day)) + ' ',
                h = (hour > 9 ? hour : ('0' + hour)) + timeSeparator,
                m = (minute > 9 ? minute : ('0' + minute)) + timeSeparator,
                s = (seconds > 9 ? seconds : ('0' + seconds)),
                formatDate = Y + M + D + h + m + s;
        return formatDate;
    },
    dianji(){
      // alert(111)
    },
    redirectYijie(data){
      let newDate= data.dateTime
      newDate= newDate.split('-')[0];
      let queryDate = new Date(newDate).getTime()
      // console.log( new Date(data.dateTime).getTime())
      this.activeName='yijie';
      this.getYijie(1, 16, queryDate);
      this.$router.replace({name: 'HistoryXZ', query: {pages: 1, time: queryDate/1000}})
    },
    redirectWeijie (data) {
      let newDate= data.dateTime
      newDate= newDate.split('-')[0];
      // console.log( new Date(data.dateTime).getTime())
      this.activeName='weijie';
      this.getWeijie(1,16,new Date(newDate).getTime());
      this.$router.replace({name: 'HistoryXZ', query: {pages: 1, time: new Date(newDate).getTime()/1000}})
    },
    getTotalData() {
      let params={};


      params.pc = 1;
      params.is_total = 1;
      this.$http.post('/SportFunction/getBetInfo', JSON.stringify(params)).then(res => {
          if (res.data.msg === 4001) {
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
          }if (res.data.msg == 2006) {
            this.his = res.data.data
            for(let i in this.his){
              this.allUnSettlement =  this.his[i].content;
            }

            this.allnumb = parseInt(res.data.total);
            this.currentPage = parseInt(res.data.page);
            this.numb = parseInt(res.data.number);

          }
      })
    },
    getWeijie(page,number,date) {
      let today = new Date().getTime()
      let params={};


      params.page = page;
      params.number = number;
      params.pc = 1;
      params.type = 0;
      params.is_total = 0;
      let stringTime = Date.parse(new Date());
      let strTime = stringTime;
      let betTime = this.getFormatDate(strTime);
		  params.date = betTime;
      this.$http.post('/SportFunction/getBetInfo', JSON.stringify(params)).then(res => {
        console.log(res.data)

				  if (res.data.msg == 4001) {
					  if (sessionStorage.getItem('im_username') === '游客') return// 游客点击“下注记录-体育游戏”不会退出到登录页面

            this.$router.push({
              path: '/home'
            })
          }
          if (res.data.msg == 2006) {
            this.weijie = res.data.data

            this.allnumb = parseInt(res.data.total);
            // this.currentPage = parseInt(res.data.page.page);
            // this.numb = parseInt(res.data.page.number);

          }
        // }).catch(function(){
        //   console.log('服务端连接异常！');
      })
    },
    getYijie(page,number,data) {
      let params={};


      params.pc = 1;
      params.type = 1;
       params.page = page;
      params.number = number;
      params.is_total = 0;
		  let stringTime = Date.parse(new Date());
      let strTime = stringTime;
      let betTime = this.getFormatDate(strTime);
		  params.date = betTime;
      this.$http.post('/SportFunction/getBetInfo', JSON.stringify(params)).then(res => {
         if (res.data.msg === 4001) {
					 if (sessionStorage.getItem('im_username') === '游客') return// 游客点击“下注记录-体育游戏-今日已结”不会退出到登录页面
          this.$router.push({
            path: '/home'
          })
        }
         if (res.data.msg == 2006) {
            this.weijie = res.data.data

            // this.allnumb = parseInt(res.data.total);
            // this.currentPage = parseInt(res.data.page.page);
            // this.numb = parseInt(res.data.page.number);

          }

      }).catch(function(){
        console.log('服务端连接异常！');
      })
    },
    handleClick(tab) {
      if(this.$route.query.time) {
        this.$router.replace({name: 'HistoryXZ', query: {pages: 1}})
      }
      if (tab.name === "weijie") {
        this.getWeijie(1,16);
      } else if (tab.name === "yijie") {
        this.getYijie(1,16);
      } else if (tab.name === "all") {
      this.getTotalData();
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getWeijie(1,val);
      this.getYijie(1,val);
    },
    handleCurrentChangeWeijie(val) {
      if (this.$route.query.time) {
        this.$router.replace({name: 'HistoryXZ', query: {page: val, time: this.$route.query.time}})
      } else {
        this.$router.replace({name: 'HistoryXZ', query: {page: val}})
      }
    },
    handleCurrentChangeYijie(val) {
      // console.log(`当前页: ${val}`);
      if (this.$route.query.time) {
        this.$router.replace({name: 'HistoryXZ', query: {pages: val, time: this.$route.query.time}})
      } else {
        this.$router.replace({name: 'HistoryXZ', query: {pages: val}})
      }
    },
  },
  watch: {
    $route () {
      setTimeout(()=>{
        if (this.$route.query.pages) {
          this.getYijie(this.$route.query.pages, 16, this.$route.query.time)
        } else {
          this.getWeijie(this.$route.query.page, 16)
        }
      },600)

    }
  }
}
</script>
<style>
  .hui tbody .el-table__row {
      cursor: pointer;
  }
  .history-page .page {
      padding: 0px 0 60px 0;
  }
  .history-page .el-table th {
      text-align: center!important;
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
  .common-content .el-table__body{
      border: none
  }
  .el-table .cell{
      padding:0!important;
  }
  .el-tabs__header{
    margin: 0 0 5px;
  }
  .common-content{
    padding:5px 20px 20px 20px ;
  }
</style>
