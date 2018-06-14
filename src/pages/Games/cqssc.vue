<template>
    <div class="content cqssc">
        <!-- 右侧头部导航 -->
       <div style='height:80px'>
          <lottery-area v-if = "isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime" gameType="40" :fentime='fentime' :closetime="closetime" :closeBet="closeBet"></lottery-area>
        <div v-else = "isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
       </div>

        <!-- 下注弹窗 -->
        <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=2 :type_code=type_code :round="round"  v-on:child-say="listenToMyBoy"></bet-dialog>

        <nav class="top-nav">
            <ul class="clearfix">
                <li :class="`${classCode===0?'active':''}`" @click="changeNav(0)">两面盘</li>
                <li :class="`${classCode===1?'active':''}`" @click="changeNav(1)">数字盘</li>
                <li :class="`${classCode===2?'active':''}`" @click="changeNavN(2)">第一球</li>
                <li :class="`${classCode===3?'active':''}`" @click="changeNavN(3)">第二球</li>
                <li :class="`${classCode===4?'active':''}`" @click="changeNavN(4)">第三球</li>
                <li :class="`${classCode===5?'active':''}`" @click="changeNavN(5)">第四球</li>
                <li :class="`${classCode===6?'active':''}`" @click="changeNavN(6)">第五球</li>
            </ul>
        </nav>
         <div class="bet-content">
          <div class="bet-center">
            <div class="bet-box">
                <div class="bet-area" :class="type">
                    <div class="game">
                        <div class="game_info">
                            <ul :id="`ssc_nav_${classCode}`" ref='cName'>
                                <li v-for='item in list'>
                                    <div class="game_title">
                                        <h3>{{item.name}}</h3>
                                    </div>
                                    <div class="clearfix" v-for='(ite,i,j) in item.list'>
                                      <label>
                                        <span style='cursor:pointer;'>{{ite.name}}</span>
                                        <span @click='confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>
                                        <input ref='kuang' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)"  @focus="inputFocus($event)" @input="chkInput()" min="1" type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-if="closeBet" maxlength="7"/>
                                        <input v-else="closeBet" readonly value="封盘" class="closeBet">
                                      </label>
                                    </div>
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
          <!-- <div style="width:200px;height:80px;position:absolute" ref='quickJin' v-if = 'booleQuick'>
            <button class="db" rel="11">下注11元</button>
            <button class="dbclose">停用</button>
          </div> -->
            <!-- 露珠组件 -->
            <lu-zhu :game_code="game_code"></lu-zhu>
          </div>
          <!-- 长龙组件 -->
          <chang-long :game_code="game_code"></chang-long>
        </div>
    </div>
</template>

<script scoped>
//currentTime:1508228802 服务器现在时间
//type:"sync" 标识
//lot_code 彩种标识

import lotteryArea from '../../components/lotteryArea'
import betDialog from '../../components/betDialog'
import changLong from '../../components/changlong'
import luZhu from '../../components/luzhu'
export default {
    data () {
        return {
          getApiName: getApiName(),
          booleQuick:true,
          type: "lotteryCqssc",
          lotteryName:"重庆时时彩",
          type_code: 0,
          game_code: 2,
          round: 0,
          endtime: 0,
          closetime: 0,
          list_0:[],
          list:[],
          fentime:60,
          classCode:0,
          list_1:[],
          list_2:[],
          list_:[],
          body: {},
          closeBet: true,
          betInfo: {},
          betArr: [],
          isLotteryArea: false,
          showDialog: false,
          isSaveMoney: false,
          quickyMoney: 0,
          todayWinLost: 0
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
        params.game_code = 2;
        // console.log(params)
         this.$http.post('/getinfo/game', JSON.stringify(params)).then(res => {

          if (res.data.msg == "4001") {
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
            // this.closeBet = true;
            this.isLotteryArea = true;
            (res.data.next.isclose)?this.closeBet=false:this.closeBet=true;
            let timeStamp = res.data.next.timestap;
            this.endtime = parseInt(res.data.next.endtime) - parseInt(timeStamp);
            this.closetime = parseInt(res.data.next.closetime) - parseInt(timeStamp);
            (res.data.next.isclose)?this.closeBet=false:this.closeBet=true;
            this.body = res.data;
            this.isLotteryArea = true;
            this.round = res.data.next.round;
            this.todayWinLost = parseFloat(res.data.UserResult);
            this.$store.commit('updatelotteryMoney', res.data.lcurrency)
          }
         }).catch(function(){
            console.log('网络异常！');
         })
        if (i!=1) {         let lmp = {},gyh = {},ydw = {}
         lmp.game_code = 2;lmp.type_code = 0;
         gyh.game_code = 2;gyh.type_code = 1;
         ydw.game_code = 2;ydw.type_code = 2;

         if (localStorage.getItem('ssc_list_0') && localStorage.getItem('ssc_list_1')&& localStorage.getItem('ssc_list_2') && JSON.parse(localStorage.getItem('ssc_list_0')).msg !== 4001) {
            this.list_0 = JSON.parse(localStorage.getItem('ssc_list_0'));
            this.list_1 = JSON.parse(localStorage.getItem('ssc_list_1'));
            this.list_2 = JSON.parse(localStorage.getItem('ssc_list_2'));
           
            // console.log(this.type_code)
            if(this.type_code==0){
               this.list = this.list_0;
             }else if(this.type_code==1){
                this.list = this.list_1;
             }else{
               this.list = this.list_2;
             }
         } else {
           this.$http.all([this.getOdds(lmp),this.getOdds(gyh),this.getOdds(ydw)]).then(this.$http.spread((acct,perms,qzhs) => {
            
              // console.log(acct,perms,qzhs)
              this.list_0 = acct.data;
              // console.log(this.list_0)
              this.list = this.list_0;
              this.list_1 = perms.data;
              this.list_2 = qzhs.data;
                // console.log(this.list_2)
              this.$refs.cName.className='qiu';
              localStorage.setItem('ssc_list_0',JSON.stringify(this.list_0));
              localStorage.setItem('ssc_list_1',JSON.stringify(this.list_1));
              localStorage.setItem('ssc_list_2',JSON.stringify(this.list_2));
           }));
         }}

      },
      listenToMyBoy: function (i){
        if (i === "close") {
          this.showDialog = false
          this.betArr = []
          this.reset()
        }
      },
      getOdds(i){
        return this.$http.post('/getinfo/odds', JSON.stringify(i))
      },
      changeNavN(i){
        if (this.list_2.length>3) {
          this.list_2[0] = this.list_1[i-2];
          this.list_2[1] = this.list_0[i-2];
        }
        else {
          this.list_2.unshift(this.list_0[5]);
          this.list_2.unshift(this.list_0[i-2]);
          this.list_2.unshift(this.list_1[i-2]);
        }
        this.list = this.list_2;
        localStorage.setItem('ssc_list_2',JSON.stringify(this.list_2));
        // console.log(this.list);
        this.classCode=i;
        this.$refs.cName.className='qiu';
        this.type_code = i + 1;
        this.reset();
        // console.log(this.type_code)
      },
      changeNav(i){
        this.list = this[`list_${i}`]
        this.$refs.cName.className='';
         this.classCode=i;
         this.reset();
         this.type_code = i;
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
        console.log(this.betArr)

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
        // console.log(this.isSaveMoney)
        if (this.isSaveMoney === true) {
            // console.log(1)
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
      if (this.endtime == 0||this.endtime ==540||this.endtime ==440||this.endtime ==450||this.endtime ==250||this.endtime ==530||this.endtime==240||this.endtime ==560||this.endtime ==570||this.endtime ==580) {
        this.fetchData(1);
        this.showDialog = false;
      }
    }
  }
}
</script>
