<template>
  <div class="content history-page" ref='kuan'>
    <nav>
      <h3 class="title">{{title}}</h3>
    </nav>
    <div class="tas">
      <div class="tab el-tabs__item" v-if = "!(getApiName=='ly'&&item.tab=='sporthistory')" :class="{act:$index==act}" v-for="(item,$index) in tabs" @click="toggleTab(item.tab,$index)">
        <a>{{item.name}}</a>
      </div>
    </div>
    <history :is="currentTab" keep-alive></history>
  </div>
</template>


<script>
import history from "./history";
import dzyy from "./dzyy";
import realhistory from "./realhistory";
import chesshistory from "./chesshistory";
import fishhistoey from "./fishhistoey";
import sporthistory from "./sporthistory";
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
      histroywj: [],
      currentTab: "history", //currentTab用于表示当前触发的子组件
      act: 0,
      getApiName: getApiName(),
      tabs: [
        { name: "彩票游戏", tab: "history" },
        // { name: "体育游戏", tab: "sporthistory" },        //game_code   4
        // { name: "真人视讯", tab: "realhistory" },         //game_code   1
        // { name: "电子游艺", tab: "dzyy" },                //game_code   7
        // { name: this.$getApiName=='ly'?"捕鱼王":"捕鱼游戏", tab: "fishhistoey" },      //game_code   5
        // { name: "棋牌游戏", tab: "chesshistory" },
      ]
    };
  },
  created() {
    console.log(sessionStorage.getItem("sort"))
    let sort = sessionStorage.getItem("sort")
    if(sort){
      sort = sort.split(',')
      if( this.inArray('1',sort)){
        this.tabs.push({ name: "真人视讯", tab: "realhistory" });
      }
      if( this.inArray('4',sort)){
        this.tabs.push({ name: "体育游戏", tab: "sporthistory" });
      }
      if( this.inArray('5',sort)){
        this.tabs.push({ name: this.$getApiName=='ly'?"捕鱼王":"捕鱼游戏", tab: "fishhistoey" });
      }
      if( this.inArray('7',sort)){
        this.tabs.push({ name: "电子游艺", tab: "dzyy" });
      }
			if( this.inArray('6',sort)){
				this.tabs.push({ name: "棋牌游戏", tab: "chesshistory" });
			}
    }
    // let result = [];
    // if(this.getApiName =='fulicai'){
    //   this.tabs.splice(1,3)
    // }
    // if(this.getApiName!=='agcai'&&this.getApiName!=='yiren'&&this.getApiName!=='ly'&&this.getApiName!=='crown'&&this.getApiName!=='yile'&&this.getApiName!=='fulicai'&&this.getApiName!=='618cp'&&this.getApiName!=='ylh'&&this.getApiName!=='yy'&&this.getApiName!=='yiteng'){
    //   this.tabs.push({ name: "电子游艺", tab: "dzyy" })
    // }
    // if (sessionStorage.getItem("im_realname") == "游客") {
    //   this.tabs.forEach(item => {
    //     if (
    //       this.getApiName == "yiren" ||
    //       (this.getApiName == "agcai" && item.name == "电子游艺")
    //     ) {
    //       return;
    //     }
    //     if (item.name != "棋牌游戏" && item.name != "体育游戏") {
    //       result.push(item);
    //     }
    //   });
    //   this.tabs = result;
    // }
  },
  methods: {
    toggleTab: function(tab, index) {
      this.currentTab = tab; //tab为触发当前标签页的组件名
      this.act = index;
      console.log(tab);
    },
    inArray(str='', arr=[]){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == str){
          return true;
        }
      }
      return false;
    }
  },
  components: {
    history,
    dzyy,
    realhistory,
    chesshistory,
    fishhistoey,
    sporthistory
  }
};
</script>
<style scoped>
.tab a {
  border-right: none;
  top: 0;
}
.tas {
  background: #fff;
  padding: 20px 20px 0 20px;
  text-align: left;
}
.common-content .el-tabs__item {
  border-right: 1px solid #aaa;
}
.tab {
  display: inline-block;
  background: #f1f3f8;
  border-radius: 4px;
  margin-right: 5px;
  font-size: 14px;
  color: #666;
  padding: 0 20px;
}
.tab a {
  display: inline-block;
  font-size: 14px;
  color: #666;
}
.tab.act {
  background: #1c4fa8;
}
.tab.act a {
  color: #fff !important;
}
.el-pagination__jump {
  display: inline-block !important;
}
</style>
