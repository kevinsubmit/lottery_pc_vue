<template>
    <div class="content pk10">
        <!-- 右侧头部导航 -->
     <div style='height:80px'>
             <lottery-area v-if = "isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime" gameType="25" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
        <div v-else = "isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
     </div>

      <!-- 下注弹窗 -->
      <bet-dialog v-if="showDialog" :betArr="betArr" :betlm="betlm" :game_code=game_code :type_code=type_code :round="round"  v-on:child-say="listenToMyBoy"></bet-dialog>

      <!-- 连码下注弹窗 -->
      <lm-dialog v-if="showLmDialog" :betArr="betArr" :game_code=game_code :type_code=type_code :round="round"  v-on:child-lm="listenLm"></lm-dialog>

        <nav class="top-nav">
          <ul class="clearfix">
              <li :class="`${param.type_code===0 &&isZ === false ?'active':''}`" @click = "changeNav(0)">两面盘</li>
              <li :class="`${param.type_code===1?'active':''}`" @click = "changeNav(1)">第一球</li>
              <li :class="`${param.type_code===2?'active':''}`" @click = "changeNav(2)">第二球</li>
              <li :class="`${param.type_code===3?'active':''}`" @click = "changeNav(3)">第三球</li>
              <li :class="`${param.type_code===4?'active':''}`" @click = "changeNav(4)">第四球</li>
              <li :class="`${param.type_code===5?'active':''}`" @click = "changeNav(5)">第五球</li>
              <li :class="`${param.type_code===6?'active':''}`" @click = "changeNav(6)">第六球</li>
              <li :class="`${param.type_code===7?'active':''}`" @click = "changeNav(7)">第七球</li>
              <li :class="`${param.type_code===8?'active':''}`" @click = "changeNav(8)">第八球</li>
              <li :class="`${param.type_code===0 &&isZ === true?'active':''}`" @click = "changeNav(10)">总和、龙虎</li>
              <li :class="`${param.type_code===9?'active':''}`" @click = "changeNav(9)">连码</li>
          </ul>
        </nav>
         <div class="bet-content">
            <div class="bet-center">
              <div class="bet-box">
                  <div class="bet-area" :class="type" v-if = "param.type_code!==9">
                      <div class="game" :id="`farm_${type_code}`">
                          <div class="game_info">
                              <ul class=""  ref='cName'>
                                  <li class="clearfix " v-for='item in list'>
                                      <div class="game_title">
                                          <h3>{{item.name}}</h3>
                                      </div>
                                      <div class="clearfix" v-for='(ite,i,j) in item.list'>
                                        <label>
                                          <span :class="`ten_farm_ball_${ite.name}`" style='cursor:pointer;'>{{ite.name}}</span>
                                          <span class="jsks_odds" @click='confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>
                                          <input ref='kuang' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)"  @focus="inputFocus($event)" @input="chkInput()" min="1" type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-if="closeBet" maxlength="7"/>
                                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                                        </label>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="bet-area" :class="type" v-if = "param.type_code===9">
                    <div class="game" id="farm_lm">
                      <ul class=""  ref='cName'>
                          <li class="clearfix " v-for='item in list'>
                              <div class="game_title">
                                  <h3>{{item.name}}</h3>
                              </div>
                              <div v-for='ite in item.list' class="lm-title">
                                <div :class="`${ite.key==typecode?'cboxOn':'cbox'}`" @click = "lianmCheck(ite.key,ite.name)">
                                  <i class="el-icon-success"></i>
                                </div>
                                <span>{{ite.name}}</span>
                                <span class="jsks_odds">{{ite.odds}}</span>
                              </div>
                          </li>
                      </ul>
                      <div class="lm_ball">
                        <ul class="">
                          <li v-for = "i in [1,6,11,16,2,7,12,17,3,8,13,18,4,9,14,19,5,10,15,20]">
                            <label>
                              <span :class="`lm_ball_${i}`">{{i}}</span>
                              <input type="checkbox" v-if = "param.type_code===9" :value="i" ref="check" :disabled="!closeBet"  @click="chkBox()">
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="btn-bet">
                       <el-checkbox  v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
                       <input type="text" @input="checkMoney()" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney"/>

                     <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
                      <input @click="reset" type="button" name="" class="btn-blue" value="重置"/>

                   </div>
              </div>

              <!-- 露珠组件 -->
               <lu-zhu :game_code="game_code"></lu-zhu>
            </div>
            <!-- 长龙组件 -->
            <chang-long :game_code="game_code"></chang-long>
        </div>
    </div>
</template>

<script scoped>
import lotteryArea from '../../components/lotteryArea'
import betDialog from '../../components/betDialog'
import lmDialog from '../../components/lmDialog'
import changLong from '../../components/changlong'
import luZhu from '../../components/luzhu'
export default {
    data () {
        return {
          name:null,
          getApiName: getApiName(),
          type:"luckyFram",
          lotteryName:"重庆幸运农场",
          type_code: 0,
          list:[],
          list1:[],
          typecode:"2032",
          classCode:0,
          isZ:false,
          st1:[],
          fentime:120,
          param:{game_code:47,type_code:0},
          LimitMin: 2,
          LimitMax: 8,
          game_code: 47,
          round: 0,
          endtime: 0,
          closetime: 0,
          oddsMoney: {},
          closeBet: true,
          betlm: {},
          betArr: [],
          body: {},
          betArrs: [],
          isLotteryArea: false,
          showDialog: false,
          showLmDialog: false,
          isSaveMoney: false,
          todayWinLost: 0,
          quickyMoney: 0
        }
    },
    created(){
      this.fetchData();
      // 保存快捷金额
      let quickyMoney = sessionStorage.getItem("quickyMoney");
      if (quickyMoney) {
        this.isSaveMoney = true
        this.quickyMoney = quickyMoney
      } else {
        this.isSaveMoney = false
        this.quickyMoney = ''
      }
    },
    components: {
      lotteryArea,
      betDialog,
      lmDialog,
      changLong,
      luZhu
    },
    methods: {
      checkMoney(){
        let r = /^\+?[1-9][0-9]*$/;　　//正整数
        if(!r.test(this.quickyMoney)){
          this.quickyMoney = ''
        }
         if(this.quickyMoney==""){
        
           sessionStorage.removeItem('quickyMoney')
        }
      },
      fetchData(i) {
        let params = {};
        
        params.game_code = 47;
        // console.log(params)
         this.$http.post('/getinfo/game', JSON.stringify(params)).then(res => {
           if (res.data.msg == 4001) {
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
            }
            this.$store.commit('updatelotteryMoney', res.data.lcurrency)
            // this.closeBet = true;
            this.isLotteryArea = true;
            (res.data.next.isclose)?this.closeBet=false:this.closeBet=true;
            let timeStamp = res.data.next.timestap;
            this.endtime = parseInt(res.data.next.endtime) - parseInt(timeStamp);
            this.closetime = parseInt(res.data.next.closetime) - parseInt(timeStamp);
            this.body = res.data;
            this.isLotteryArea = true;
            this.round = res.data.next.round;
            this.todayWinLost = parseFloat(res.data.UserResult);
         }).catch(function(){
            console.log('网络异常！');
         });
         if (i != 1) {
             if (localStorage.getItem('farm_list')) {
                this.list = JSON.parse(localStorage.getItem('farm_list'));
              } else {
               this.$http.post('/getinfo/odds', JSON.stringify(this.param)).then(res => {
                if (res.data.msg == 4001) {
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
                 } else {
                  this.list = res.data
                  localStorage.setItem('farm_list',JSON.stringify(this.list));
                 }
               }).catch(function(){

               });
             }

        }
      },
      listenToMyBoy: function (i){
        if (i === "close") {
          this.showDialog = false
          this.reset()
        }
      },
      listenLm: function (i){
        if (i === "close") {
          this.showLmDialog = false
        }
      },
      lianmCheck(e,a){
        this.name = a;
        for (let i = 0; i < this.$refs.check.length; i++) {
          this.$refs.check[i].checked = false;  // 移除checkbox disabled
        }
        this.typecode = e;
        switch(e){
          case 2032:
            this.LimitMin=2;
            this.LimitMax=8;
            break;
          case 2035:
            this.LimitMin=3;
            this.LimitMax=8;
            break;
          case 2038:
            this.LimitMin=4;
            this.LimitMax=6;
            break;
          case 2039:
            this.LimitMin=5;
            this.LimitMax=6;
            break;
        }
        
      },
      confirms (name, key, ite) {
        if (!this.closeBet) {
          this.$swal({
            text: "已封盘！",
            type: "error",
            timer: 1200,
          });
          return
        }
        this.betArr = [];
        let ites = JSON.parse(ite)
        ites.title = name
        ites.money = this.quickyMoney          
        this.betArr.push(ites) 
        if (this.betArr.length == 0) {
          this.$swal({
            text: "请选择下注项目！",
            type: "error",
            timer: 1200,
          });
          return
        }
        this.reset();
        this.showDialog = true
      },
      confirm () {
        if(sessionStorage.getItem("im_realname") == "11"){
           this.$swal({
            text: "请登录正式账号！",
            type: "error",
            timer: 1200,
          });
          return
        }
        if (!this.closeBet) {
          this.$swal({
            text: "已封盘！",
            type: "error",
            timer: 1200,
          });
          return
        }
        if (this.type_code === 9) { // 连码下注
          this.chkBox ();
          let betnumber = [];
          this.betArr.length = [];

          this.betlm.game_code = this.game_code;
          this.betlm.type_code = this.type_code;
          this.betlm.round = this.round;
          this.betlm.typecode = this.typecode;
          this.betlm.title = this.name||"任选二";

          for (let i = 0; i < this.$refs.check.length; i++) {
            if (this.$refs.check[i].checked) {
              betnumber.push(this.$refs.check[i].value);
            }
          }

          // 判断选中的号码数量
          let cboxLength = 0;
          for (let i = 0; i < this.$refs.check.length; i++) {
            if (this.$refs.check[i].checked) {
              cboxLength ++;
            }
          }
          if (cboxLength === 0) {
            // console.log('00')
            return
          }
          if(cboxLength < this.LimitMin || cboxLength > this.LimitMax) {
            this.$swal({
              text: '选项范围：' + this.LimitMin + '~' + this.LimitMax + '个号码',
              type: "error",
              timer: 1200,
            });
            this.showLmDialog = false;
            return
          }

          for (let j = 0; j < betnumber.length; j++) {
            betnumber[j].split("").join(",");
          }
          this.betlm.number = betnumber;
          // console.log(this.betlm)
          this.betArr.push(this.betlm);
          this.showLmDialog = true
          this.reset();

        } else { // 其他下注
          this.betArr.length = [];
          for (let i = 0; i < this.$refs.kuang.length; i++) {
            if (this.$refs.kuang[i].value>0) {
              let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"))
              let title = this.$refs.kuang[i].getAttribute("name")
              ite.title = title;
              ite.money = this.$refs.kuang[i].value;
              this.betArr.push(ite);
            }
          }

          if (this.betArr.length == 0) {
            this.$swal({
              text: "请选择下注项目！",
              type: "error",
              timer: 1200,
            });
            return
          }
          this.reset();
          this.showDialog = true
        }
      },
      chkInput () {
        for (let i = 0; i < this.$refs.kuang.length; i++) {
           this.$refs.kuang[i].value.replace(/\D/g, '');
           if(this.$refs.kuang[i].value==0){
              this.$refs.kuang[i].value='';
           }
          if (this.$refs.kuang[i].value === 'e') {
            return 0;
          }
        }
      },
      chkBox () {
        this.showLmDialog = false;
        let cboxLength = 0;
        for (let i = 0; i < this.$refs.check.length; i++) {
          if (this.$refs.check[i].checked) {
            cboxLength ++;
          }
        }
 
          if (cboxLength === 0) {
            return
          }

          if(cboxLength < 1) {
            this.$swal({
              text: '选项范围：' + this.LimitMin + '~' + this.LimitMax + '个号码',
              type: "error",
              timer: 1200,
            });
            this.showLmDialog = false;
            return
          }

        // if (cboxLength > this.LimitMax-1) {
        //   for (let i = 0; i < this.$refs.check.length; i++) {
        //     if (!this.$refs.check[i].checked) {
        //       this.$refs.check[i].setAttribute("disabled", "true");
        //     } else {
        //       this.$refs.check[i].removeAttribute("disabled");
        //     }
        //   }
        //   return
        // }
      },
      inputFocus (key) {
        let quickyMoney = sessionStorage.getItem("quickyMoney");
        if(quickyMoney > 0) {
          key.target.value = quickyMoney;        
        } else {
          return false
        }
      },
      saveMoneyBlur (quickyMoney) {
        if (quickyMoney <= 0 || quickyMoney === '') {
          this.isSaveMoney = false
          sessionStorage.removeItem('quickyMoney')        
        }
        if (quickyMoney > 0 && this.isSaveMoney === true) {
          sessionStorage.removeItem('quickyMoney')
          sessionStorage.setItem('quickyMoney', this.quickyMoney)
        }
      },
      saveMoney () {
        if (this.isSaveMoney === true) {
            sessionStorage.setItem('quickyMoney', this.quickyMoney)
            this.isSaveMoney = true
        } else {
          sessionStorage.removeItem('quickyMoney')
          this.isSaveMoney = false
          this.quickyMoney = ''
        } // 保存快捷金额
      },
      reset(){
        if (this.type_code === 9) {
          for (let i = 0; i < this.$refs.check.length; i++) {
            this.$refs.check[i].checked = false;  // 移除checkbox disabled
          }
        }
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          this.$refs.kuang[i].value = "";
        }
      },
      changeNav(i){
        i==9?(this.list=null):'';
        this.type_code = i;
        if (i!=10) {
          this.isZ = false;
          this.param.type_code = i;
          this.$http.post('/getinfo/odds', JSON.stringify(this.param)).then(res => {
            this.list = res.data;
            this.reset();
          })
        }
        else {
          this.isZ = true;
          this.type_code = 0;
          this.param.type_code = 0;
          this.$http.post('/getinfo/odds', JSON.stringify(this.param)).then(res => {
            let p=res.data[0];            
              if(this.list1.length==0){
                this.list1.push(p)
              }
              this.list=this.list1;

          })
        }
      }
    },
    mounted() {
      setInterval(() => {
        if (this.endtime > 0) {
          this.endtime--;
        }
        if (this.closetime <= 0) {
          this.closeBet = false;
          this.showDialog=false;
          /*for (let i = 0; i < this.$refs.check.length; i++) {  // 封盘后设置checkbox不可选
            this.$refs.check[i].setAttribute("disabled", "true");
          }*/
        } else {
          this.closetime--;
          let timeStamp = Date.parse(new Date()) / 1000;
        }
      }, 1000)
    },
    watch: {
      endtime: function () {
        if (this.endtime == 0||this.endtime ==440||this.endtime ==450||this.endtime ==540||this.endtime ==550||this.endtime==530||this.endtime==500||this.endtime ==560||this.endtime ==570||this.endtime ==580) {
          this.fetchData(1);
          this.showDialog = false;
        }
      }
    }
}
</script>

<style socped>
  .lm-title {
    width: 25%!important;
    float: left;
  }
  .cbox,
  .cboxOn {
    width: 14px!important;
    height: 14px;
    border: 1px solid #eb6877;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 7px;
    float: none!important;
    display: inline-block;
    vertical-align: sub;
  }
  .cboxOn {
    background-color: #eb6877;
    position: relative;
  }
  .lm_ball li {
    width: 25%;
    display: inline-block;
    height: 20px!important;
    cursor: pointer;
  }
  .lm_ball li:hover {
    background-color: #f0f0f0;
  }
  .lm_ball li span {
    width: 20px;
    height: 20px;
    padding: 1px;
    color: #fff;
    line-height: 20px;
    display: inline-block;
    background-color: #eb6877;
    border-radius: 30px;
    margin-right: 55px;
    text-align: center;
  }
  .game_title h3 {
      text-align: left;
  }
  .cbox .el-icon-success {
    display: none;
  }
  .cboxOn .el-icon-success {
    position: absolute;
    top: 0!important;
    left: 0;
    color: #68494d!important;
    font-size: 20px;
    top: -3px!important;
    left: -2px;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .cboxOn .el-icon-success:before {
      color: #eb6877;
  }
</style>
