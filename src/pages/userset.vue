<template> 
<div class="content userset-page"> 
  <nav> 
    <h3 class="title">{{title}}</h3>
    <div class="common-content">
      <div class="userSet clearfix">
        <div class="avatar f-l">
          <img :src="$getPublicImg('/images/common/icon/avatar-defalut-s.png')"/> 
        </div>
        <div class="user_info f-l">
          <p>会员账号：<span>{{username}}</span></p>         
          <p>彩票余额：<span style="color:#eb6877;">￥{{banlance}}</span></p>          
        </div>
      </div>
      <div class="hotLottery">
        <h3>热门彩票游戏</h3>
        <div class="userSetData">
          <el-tabs v-model="activeName" @tab-click="handleClick">            
             <el-tab-pane v-for="(item,i) in navdata" :label="gameNav[item].name" :name="item" :key="i"></el-tab-pane>           
          </el-tabs>
          
          <el-table
            :data="resultHistory"
            stripe
            style="width: 100%">
            <el-table-column
              prop="ClassName"
              label="玩法">
            </el-table-column>
          
            <el-table-column
              prop="positiona"
              label="A盘">
            </el-table-column> 
          
            <el-table-column
              prop="gamemin"
              label="单注限额">
            </el-table-column> 
          
            <el-table-column
              prop="gamemax"
              label="单期限额">
            </el-table-column>  
          </el-table>
        </div> 
      </div>      
    </div>
  </nav>   
</div>
</template>


<script> 
import BindPhone from '../components/Account/bindPhone'
export default {
  data() {
    return {
      banlance:this.$store.state.lotteryMoney,
      username:sessionStorage.im_username,
      activeName:null,
      getApiName: getApiName(),
      isDemo: true,
      title: '会员信息',    
      resultHistory: [],
      gameNav: { 
        260:{name:'88赛马',code:260,page:'race'},
        270:{name:'极速六合彩',code:270,page:'jslh'},
        240:{name:'极速赛车',code:240,page:'jssc'},
        250:{name:'极速时时彩',code:250,page:'jsssc'},
        210:{name:'威尼斯赛艇',code:210,page:'veniceRowing'},
        46:{name:'罗马时时彩',code:46,page:'roma'},
        51:{name:'北京赛车',code:51,page:'pk10'},
        2:{name:'重庆时时彩',code:2,page:'cqssc'},
        69:{name:'香港六合彩',code:69,page:'markSix'},
        160:{name:'PC蛋蛋',code:160,page:'pcegg'},
        171:{name:'幸运飞艇',code:171,page:'luckyAirship'},
        3:{name:'广东快乐十分',code:3,page:'happyTen'},
        47:{name:'重庆幸运农场',code:47,page:'luckFarm'},
        172:{name:'江苏骰宝(快3)',code:172,page:'jsks'},
        180: { name: "北京快乐8", code: 180, page: "bjkl8" }                 
      },
      navdata:null,    
    }
  },
  created() {    
    if (!sessionStorage.getItem('im_token')) {
      this.$router.push({path: '/home'})
    }
    this.gamesort();
          
  },
  methods: {
    gamesort(){
      this.$http.post("/systems/game_sort").then(res => {
          let sort = res.data.sort;
          let a = [];
          for(var i in sort){
            if(sort[i] in this.gameNav){
              a.push(sort[i])
            }
          } 
          this.navdata=a;
          this.activeName = this.navdata[0];
          this.getData(this.activeName); 
      });
    },
    handleClick(tab) {   
      this.getData(tab.name)
    },   
    getData(gamecode) {       
      let params={};
      
       
      params.game_code = gamecode;
      this.$http.post('/getinfo/getLimitbalance', JSON.stringify(params)).then(res => {
        if(res.data.msg === 4001){
          this.$swal({
            text: "账户已下线，请重新登陆", 
            type: "error",
            timer: 1200, 
          })
          this.$router.push({path: '/home'})
          return
        } else {
          this.resultHistory = res.data.UserGameSet         
        }     
      })
    }
  }
}
</script>
<style>
.el-tabs__nav-next, .el-tabs__nav-prev{
  margin-top:-8px;
}
  .common-content .header-modal-content .el-tabs__item{
    border-radius: 4px;
    background-color: #f1f3f8;
    margin-right: 5px;
    font-size: 14px;
    color: #666;
    height:40px;
    line-height: 40px;
    border-right:none;
}
.common-content .header-modal-content .el-tabs__item.is-active{
      color: #fff;
    background-color: #1c4fa8
}
</style>

<style scoped>

.rules-page {
    background-color: #fff;
    min-height: 700px;
}
.user_info {
    padding-top: 10px;
}
.userSet {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  height: 80px;
}
.userSet .avatar {
  width: 72px;
  height: 72px; 
  text-align: center;
  background-color: #2d2d3a;
  border-radius: 50%;

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
.hotLottery h3 {
  text-align: left;
  color: #000;
  font-size: 16px;
  margin: 10px 0;
}
</style>
<style>
.userset-page .el-tabs__item:nth-child(2){
    padding-left:20px!important;
}
.userset-page .el-tabs__item:last-child{
    padding-right:20px!important;
}

</style>

