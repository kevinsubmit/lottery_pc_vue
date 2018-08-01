<template>
<div class="content history-page  history-page-1" ref='kuan' style="padding-top:0;margin-left:0">
    <div class="history common-content">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="
            历史汇总" name="weijie" style="background:#fff">
            <el-table

                :data="weijie"
                stripe
                style="width: 100%">

                <el-table-column
                label="游戏名称"
                prop="gamename">
                </el-table-column>

                <el-table-column
                label="下注金额"
                prop="gold">
                </el-table-column>

                <el-table-column
                label="派彩金额"
                width="200"
                prop="payout">
                </el-table-column>

                <el-table-column
                label="输赢结果"
                prop="type"
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
        histroywj:[]
    }
},
created () {
    if(sessionStorage.getItem('im_username') === '游客'){
        this.isDemo = true;
        this.activeName = 'weijie';

    } else {
        this.getWeijie(1,16);
    }
},
methods: {
    redirectWeijie (data) {
        let newDate= data.dateTime
        newDate= newDate.split('-')[0];
        this.activeName='weijie';
        this.getWeijie(1,16,new Date(newDate).getTime());
        this.$router.replace({name: 'dzyy', query: {pages: 1, time: new Date(newDate).getTime()/1000}})
    },
    getWeijie(page,number,date) {
        let today = new Date().getTime()
        let params={};
        params.gameName = "mgswallet";
        params.page = page;
        params.number = number;
        this.$http.post('/externalGame/record', JSON.stringify(params)).then(res => {
            console.log(res)
            if (res.data.msg == 4001) {
							  if (sessionStorage.getItem('im_username') === '游客') return
                this.$router.push({
                    path: '/home'
                })
            }
            if (res.data.msg == 2006) {
                this.weijie = res.data.data||[];
            }
        }).catch(function(){
            console.log('服务端连接异常！');
        })
    },
    handleClick(tab) {
        if(this.$route.query.time) {
        this.$router.replace({name: 'dzyy', query: {pages: 1}})
        }
        if (tab.name === "weijie") {
        this.getWeijie(1,16);
        }
    },
    handleSizeChange(val) {
        this.getWeijie(1,val);
    },
    handleCurrentChangeWeijie(val) {
        if (this.$route.query.time) {
        this.$router.replace({name: 'dzyy', query: {page: val, time: this.$route.query.time}})
        } else {
        this.$router.replace({name: 'dzyy', query: {page: val}})
        }
    },
    handleCurrentChangeYijie(val) {
        if (this.$route.query.time) {
        this.$router.replace({name: 'dzyy', query: {pages: val, time: this.$route.query.time}})
        } else {
        this.$router.replace({name: 'dzyy', query: {pages: val}})
        }
    }
},
watch: {
    $route () {
        setTimeout(()=>{
        if (this.$route.query.pages) {
            this.getWeijie(this.$route.query.page, 16)
        }
        },600)

    }
}
}
</script>
<style>
  .el-table__body-wrapper{
    border: 1px solid #ddd;
  }
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
</style>
