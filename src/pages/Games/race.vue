<template>
    <div class="content pk10">
      <!-- 右侧头部导航 -->
     <div style='height:80px;'>
        <lottery-area v-if = "isLotteryArea" :todayWinLost="todayWinLost" :lotteryName="lotteryName" :game_code=260 :lotteryObj="body" :endtime="endtime" gameType="55" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
       <div v-else = "isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
     </div>

      <!-- 下注弹窗 -->
      <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=260 :type_code=type_code :round="round"  v-on:child-say="listenToMyBoy"></bet-dialog>

      <nav class="top-nav">
          <ul class="clearfix" style='height:100%'>
              <li :class="`${classCode==='0101'?'active':''}`" @click = "changeNav('0101')">两面盘</li>
              <li :class="`${classCode==='0102'?'active':''}`" @click = "changeNav('0102')">单号1-10</li>
              <li :class="`${classCode==='0103'?'active':''}`" @click = "changeNav('0103')">冠亚军组合</li>
          </ul>
      </nav>
      <div class="bet-content">

        <div class="bet-center">
          <div class="bet-box">
              <div class="bet-area" :class="lotteryType">
                  <div class="game">
                      <div class="game_info">
                          <ul class=""  ref='cName'>
                              <li v-for='(item,j) in list'>
                                  <div class="game_title">
                                      <h3>{{item.name}}</h3>
                                  </div>
                                  <div class="clearfix" v-for='(ite,i,j) in item.list'>
                                    <label>
                                      <span class="icon-rect-ball" :class='classCode==="0103"?"":`icon-rect-ball-${ite.name} pk_${ite.name}`' style='cursor:pointer;'>{{ite.name}}</span>
                                      <span @click='confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>
                                      <input ref='kuang' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)" @input="chkInput()"  @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                                    </label>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="btn-bet">
                   <!-- <input id='fast' type="button" name="" value="快选金额"/> -->
                   <!-- <input type="checkbox" />预设金额: -->
                   <el-checkbox  v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
                   <input type="text" @input="checkMoney(quickyMoney)" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney"/>
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

<script>
import lotteryArea from '../../components/lotteryArea'
import betDialog from '../../components/betDialog'
import changLong from '../../components/changlong'
import luZhu from '../../components/luzhu'
/*import utils from '../../assets/js/game'
console.log(utils.reset)*/
export default {
  data () {
    return {
      getApiName: getApiName(),
      // type: 'pk10',
      lotteryType: "pk10_0101",
      classCode: "0101",
      lotteryName: "88赛马",
      type_code: 0,
      game_code: 260,
      round: 0,
      endtime: 0,
      closetime: 0,
      fentime:30,
      list: [],
      list_0: [],
      oddsMoney: {},
      closeBet: true,
      betInfo: {},
      betArr: [],
      list_1: [],
      list_3: [],
      body: {},
      betArrs: [],
      isLotteryArea: false,
      showDialog: false,
      isSaveMoney: false,
      quickyMoney: 0,
      todayWinLost: 0
    }
  },
  created (){ 
    this.fetchData();
  },
  mounted (){
    // this.fetchData(1);
  },
  components:{
    lotteryArea,
    betDialog,
    changLong,
    luZhu
  },
  methods: {
    checkMoney(val){
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
      params.game_code = 260;
      // this.classCode='0101'
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
          } else {
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

            if (res.data.next.isclose === true) {
              this.closeBet = false;
            } else {
              this.closeBet = true;
            }
          }
       }).catch(function(){
          console.log('网络异常！');
       })
       if (i!=1) {
	       let lmp = {},gyh = {},ydw = {},lds = {}
	       lmp.game_code = 260;lmp.type_code = 0;
	       gyh.game_code = 260;gyh.type_code = 1;
	       ydw.game_code = 260;ydw.type_code = 2;
	       lds.game_code = 260;lds.type_code = 3;
	       if (localStorage.getItem('list_0') && localStorage.getItem('list_1') && localStorage.getItem('list_3')) {
	          this.list_0 = JSON.parse(localStorage.getItem('list_0'));
	          this.list_1 = JSON.parse(localStorage.getItem('list_1'));
	          this.list_3 = JSON.parse(localStorage.getItem('list_3'));
	          this.list = this.list_0;
	       }else{
	          this.$http.all([this.getOdds(lmp),this.getOdds(gyh)]).then(this.$http.spread((acct, perms) => {
	            if(acct.status === 200) {
	              this.list_1 = perms.data;
	              acct.data.unshift(this.list_1[0]);
	              this.list_0 = acct.data;
	              this.list = this.list_0;
	              this.$refs.cName.className='gyh';
	              localStorage.setItem('list_0',JSON.stringify(this.list_0));
	              localStorage.setItem('list_1',JSON.stringify(this.list_1));
	            }
	         }));
         this.$http.all([this.getOdds(ydw),this.getOdds(lds)]).then(this.$http.spread((acct, perms) => {
            if(acct.status === 200) {
              for (let i = 0; i < perms.data.length; i++) {
               acct.data.push(perms.data[i])
              }
              this.list_3 = acct.data;
              localStorage.setItem('list_3',JSON.stringify(this.list_3));
            }
         }));
       }
       }
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
    listenToMyBoy: function (i){
      if (i === "close") {
        this.showDialog = false
        this.reset()
      }
    },
    getOdds(i){
      return this.$http.post('/getinfo/odds', JSON.stringify(i))
    },
    changeNav(code){
      switch(code) {
        case  '0101' :
          if (this.classCode==="0101"){
            return
          }else{
            this.list=this.list_0;
            this.$refs.cName.className='gyh'
            this.type_code = 0
          }
          break;

        case  '0103' :
          if (this.classCode==="0103"){
              return
            }else{
              this.list=this.list_1;
              this.$refs.cName.className='zuhe'
              this.type_code = 1
            }
          break;

        case  '0102' :
          if (this.classCode==="0102"){
            return
          }else{
            this.list=this.list_3
            this.$refs.cName.className='danhao'
            this.type_code = 4
          }
          break
      }
      this.classCode=code;
      this.reset();
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
        })
        .then(function (response) {
          
        }).catch(e => {
            console.log(e)
        })
        return
      }
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
          timer: 1000,
        })
        .then(function (response) {
        }).catch(e => {
            console.log(e)
        })
        return
      }
      this.reset();
      this.showDialog = true;
      // if(!this.closeBet){
      //   alert(111)
      //   this.showDialog = false
      // }
    },

    chkInput(){
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
    inputFocus(key){
      let quickyMoney = sessionStorage.getItem("quickyMoney");
      if(quickyMoney>0){
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
      for (let i = 0; i < this.$refs.kuang.length; i++) {
        this.$refs.kuang[i].value = "";
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
      } else {
        this.closetime--;
        let timeStamp = Date.parse(new Date()) / 1000;
      }
    }, 1000)
  },
  watch: {
    endtime: function() {
      if (this.endtime == 0||this.endtime ==86||this.endtime ==84||this.endtime == 30) {
        this.fetchData(1);
        this.showDialog = false;
      }
    }
  }
}
</script>

<style>
.siderLeft_gd + .content .zuhe li div span:first-child {
  background-color: #e74368!important
}
</style>
