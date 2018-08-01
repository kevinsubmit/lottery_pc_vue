<template>
  <!-- <transition name="drop"> -->
      <div>
        <div class="overlay"></div>
        <div v-if="lottery_ty == 6202||lottery_ty == 6203||lottery_ty == 6204||lottery_ty == 6205" class="modal-content">
            <h2 class="title">投注明细<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
            <ul>
                <li class="dialog-title">
                  <span>号码</span>
                  <span>赔率</span>
                </li>
                <li>
                  <p class="bsg" v-if="grouo_b.length > 0">
                    <span>佰位</span>
                    <span>(</span>
                    <span v-for="(item,j) in grouo_b">
                      <span>{{item.key.slice(-1)}} </span>
                      <span class="dian-odd">,</span>
                    </span>
                    <a style="color:#333">)</a>
                    <b class="pl">{{oddZ}}</b>
                  </p>
                  <p class="bsg"  v-if="grouo_s.length > 0">
                    <span>拾位</span>
                    <span>(</span>
                    <span v-for="(item,j) in grouo_s">
                      <span>{{item.key.slice(-1)}} </span>
                      <span class="dian-odd">,</span>
                    </span>
                    <a style="color:#333">)</a>
                    <b class="pl">{{oddZ}}</b>
                  </p>
                  <p  class="bsg"  v-if="grouo_g.length > 0">
                    <span>个位</span>
                    <span>(</span>
                    <span v-for="(item,j) in grouo_g">
                      <span>{{item.key.slice(-1)}} </span>
                      <span class="dian-odd">,</span>
                    </span>
                    <a style="color:#333">)</a>
                    <b class="pl">{{oddZ}}</b>
                  </p>
              </li>
            </ul>
            <div class="dialog-total clearfix">
              <div class="f-l">
                <span>组数：</span>
                <span>{{zongNum}}</span>
              </div>
              <div class="f-r">
                <span>总金额：</span>
                <span><span style="color:red!important;">{{zongMoney}}</span>&nbsp;元</span>
              </div>
            </div>
            <div class="btnbetOrder">
              <span class="btn-pink" @click="submit1" ref="btnSubmit">确认</span>
              <span class="btn-blue" @click="closeDialog">取消</span>
            </div>
          </div>
          <div v-else class="modal-content">
            <h2 class="title">投注明细<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
            <ul>
              <li class="dialog-title">
                <span>号码</span>
                <span>赔率</span>
                <span>金额</span>
                <span>确认</span>
              </li>
              <li v-for="(item,j) in betInfo">
                <span><label>{{item.title}}</label>&nbsp;&nbsp;{{item.name}}</span>
                <span>{{item.odds}}</span>
                <span>
                  <label>
                  <input ref="inputMoney" v-focus v-model="item.money" @change="totalCalc"  :id="item.key" maxlength="7" @input="chkInput(item,$event)" type="number" style="line-height:15px" />
                  </label>
                </span>
                <span><i class="el-icon-circle-close-outline" @click="deleteRow(j)"></i></span>
              </li>

            </ul>
            <div class="dialog-total clearfix">
              <div class="f-l">
                <span>组数：</span>
                <span>{{a}}</span>
              </div>
              <div class="f-r">
                <span>总金额：</span>
                <span><span style="color:red!important;">{{totalMoney}}</span>&nbsp;元</span>
              </div>
            </div>
            <div class="btnbetOrder">
              <span class="btn-pink" @click="submit" ref="btnSubmit">确认</span>
              <span class="btn-blue" @click="closeDialog">取消</span>
            </div>
          </div>
      </div>
  <!-- </transition> -->
</template>
<script>
import { Loading } from 'element-ui';
import {cacheGame} from "@/utils"
export default {
  data() {
    return {
      betParams: {},
      betInfo: [],
      singleMoney: 0,
      totalNum: 0,
      totalMoney: 0,
      grouo_b:[],
      grouo_s:[],
      grouo_g:[],
      lottery_ty:'' ,
      zongNum:0    ,
      zongMoney:0,
      oddZ:""
    }
  },
  props: {
    betArr: {
      type: Array
    },
    round: {
      type: String
    },
    game_code:{
      type: Number
    },
    type_code:{
      type: Number
    }
  },
  computed:{
    a(){
       this.totalNum = 0;
      for (let i = 0; i < this.betInfo.length; i++) {
        if(this.betInfo[i].money){
          this.totalNum ++;
        }
      }
      return this.totalNum
    }
  },
  created() {
    // console.log(this.betArr)
    this.betInfo = this.betArr;
    for (let i = 0; i < this.betInfo.length; i++) {
      let s = this.betInfo[i].key;
      this.betParams[s]  = this.betInfo[i].money
      this.singleMoney = this.betInfo[i].money||0;
      this.oddZ = this.betInfo[i].odds;
      if(this.betInfo[i].money){
        this.totalNum ++;
      }
      this.totalMoney += parseInt(this.singleMoney);
      let _key = s.split("_");
      this.lottery_ty = _key[1];
      let group = this.betInfo[i].title;
      console.log(group)
      console.log(this.betInfo[i])
      if(group == "佰位"){
        this.grouo_b.push(this.betInfo[i])
      }
      if(group == "拾位"){
        this.grouo_s.push(this.betInfo[i])
      }
      if(group == "个位"){
        this.grouo_g.push(this.betInfo[i])
      }
      if(this.lottery_ty == 6202){
        this.zongNum = this.grouo_b.length * this.grouo_s.length;
      }
      if(this.lottery_ty == 6203){
        this.zongNum = this.grouo_b.length * this.grouo_g.length;
      }
      if(this.lottery_ty == 6204){
        this.zongNum = this.grouo_s.length * this.grouo_g.length;
      }
      if(this.lottery_ty == 6205){
        this.zongNum = this.grouo_b.length * this.grouo_s.length * this.grouo_g.length;
      }
      this.zongMoney =  this.zongNum * this.betParams[s]
    }
  },
  beforeUpdate(){
  },
  methods: {
    deleteRow(j) {
      this.betInfo.splice(j,1);
      this.totalNum--;
      this.betParams = {};

      this.totalCalc(this.betInfo.length,j);

      if (!this.betInfo.length) {
        this.closeDialog();
      }
      if (this.totalNum === 0) {
        this.closeDialog();
      }
    },

    chkInput(item,key){
      if (item.money=='0') {
        item.money=key.target.value = 1
        // return
      }
      this.totalCalc(this.betInfo.length);
    },
    closeDialog(){

      this.$emit('child-say', 'close');
    },
    getBalance () {
      let params={};

      getApiName()=='hg'?params.sports = 1:'';
      this.$http.post('/getinfo/money', JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$router.push({
            path: '/home'
          })
        }
        this.banlance=res.data.money;
        this.todayWinLost = res.data.user_win_lose
        this.$store.commit('updatelotteryMoney',res.data.money)
        sessionStorage.setItem('todayWinLost', JSON.stringify(this.todayWinLost))
      })
    },
    submit1() {
      console.log(this.lottery_ty)
      let loadingInstance = Loading.service({background:'rgba(0, 0, 0, 0.5)'});
      this.betParams.game_code = this.game_code;
      if(this.lottery_ty == 6203 || this.lottery_ty == 6204){
        this.betParams.type_code = this.lottery_ty;
      }else{
        this.betParams.type_code = this.type_code;
      }
      this.betParams.round = this.round;
      this.betParams.token = cacheGame('inuptoken')
      if(this.$store.state.lotteryMoney==0){
        this.$swal({
          text: "余额不足！",
          type: "error",
          timer: 2000,
        })
         this.closeDialog();
          loadingInstance.close();
      }else{
      this.$http.post('/inup', JSON.stringify(this.betParams)).then(res => {
          loadingInstance.close();
          if ((res.data) instanceof Array) {
            cacheGame('inuptoken',res.data[0].token)
            this.$swal({
              text: "下注成功！",
              type: "success",
              timer: 2000,
            })
            .then(function (response) {
            }).catch(e => {
            })
            this.getBalance();

          } else if (res.data.msg === 4001) {
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5001) {
            this.$swal({
              text: "下注项为空，金额不正确，请重新输入",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5003) {
            this.$swal({
              text: "下注期数错误",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5004) {
            this.$swal({
              text: "余额不足,下注失败",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 7001) {
            this.$swal({
              text: "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 3004) {
            this.$swal({
              text: "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5008) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "网络繁忙，请稍等在试",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5009) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "提交太频繁，请稍等在试",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5010) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "请勿重复提交",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          }
          this.closeDialog();
          loadingInstance.close();
      })
      }
    },
    submit() {
      let loadingInstance = Loading.service({background:'rgba(0, 0, 0, 0.5)'});
      this.touzhu();
      this.betParams.game_code = this.game_code;
      if(this.lottery_ty == 6210){
        this.betParams.type_code = this.lottery_ty;
      }else{
        this.betParams.type_code = this.type_code;
      }
      this.betParams.round = this.round;
      this.betParams.token = cacheGame('inuptoken')
      if(this.$store.state.lotteryMoney==0){
        this.$swal({
          text: "余额不足！",
          type: "error",
          timer: 2000,
        })
         this.closeDialog();
          loadingInstance.close();
      }else{
      this.$http.post('/inup', JSON.stringify(this.betParams)).then(res => {
          loadingInstance.close();
          if ((res.data) instanceof Array) {
            cacheGame('inuptoken',res.data[0].token)
            this.$swal({
              text: "下注成功！",
              type: "success",
              timer: 2000,
            })
            .then(function (response) {
            }).catch(e => {
            })
            this.getBalance();

          } else if (res.data.msg === 4001) {
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5001) {
            this.$swal({
              text: "下注项为空，金额不正确，请重新输入",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5003) {
            this.$swal({
              text: "下注期数错误",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5004) {
            this.$swal({
              text: "余额不足,下注失败",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 7001) {
            this.$swal({
              text: "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 3004) {
            this.$swal({
              text: "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5008) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "网络繁忙，请稍等在试",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5009) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "提交太频繁，请稍等在试",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else if (res.data.msg === 5010) {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "请勿重复提交",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          } else {
            cacheGame('inuptoken',[])
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          }
          this.closeDialog();
          loadingInstance.close();
      })
      }
    },
    touzhu(i){
      this.betParams = {};
      let lengI = 0;
      i<this.$refs.inputMoney.length ? lengI = 1 : lengI = 0
      for (var i = lengI; i < this.$refs.inputMoney.length; i++) {
        this.betParams[this.$refs.inputMoney[i].id] = parseInt(this.$refs.inputMoney[i].value);
        // console.log(parseInt(this.$refs.inputMoney[i].value))
      }
      return this.betParams;

    },
    totalCalc(i,j){
      console.log(i,this.$refs.inputMoney.length);
      this.totalMoney = 0;
      let lengI = 0;
      i<this.$refs.inputMoney.length ? lengI = 0 : lengI = 0
      for (var i = lengI; i < this.$refs.inputMoney.length; i++) {
        if (parseInt(this.$refs.inputMoney[i].value) <= 0) {
          this.$refs.inputMoney[i].value = ''
        }
        if (i == j) {
          this.totalMoney += 0;
        }
        else {
          parseInt(this.$refs.inputMoney[i].value) ? this.totalMoney += parseInt(this.$refs.inputMoney[i].value):this.totalMoney += 0;
        }

        // console.log(i)
      }
      return this.totalMoney;
    },
    getBalance () {
      let params={};
      getApiName()=='hg'?params.sports = 1:'';
      this.$http.post('/getinfo/money', JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$router.push({
            path: '/home'
          })
        }
        this.banlance=res.data.money;
        this.todayWinLost = res.data.user_win_lose
        // console.log(this.banlance)
        this.$store.commit('updatelotteryMoney',res.data.money)
        sessionStorage.setItem('todayWinLost', JSON.stringify(this.todayWinLost))
      })
    }
  },
  components: {
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
  margin: 0;
}
input[type="number"]{-moz-appearance:textfield;}
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .8s ease;
}
.drop-enter {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
}
.drop-leave-active {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
  opacity: 0;
}
.overlay {
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: .5;
  filter: alpha(opacity=50);
  z-index: 66;
  left: 0;
  top: 0;
  transition: all ease .8s;
}
.modal-content {
  background-color: #fff;
  box-shadow: 0 0 10px #808080;
  min-height: 100px;
  width: 450px;
  margin-left: -225px;
  border-radius: 10px;
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 88;
  font-family: "microsoft yahei";
}
.modal-content ul {
    padding: 10px;
    max-height: 280px;
		min-height: 90px;
		overflow-x: hidden;
    overflow-y: auto;
}
.modal-content .btnbetOrder {
  margin: 20px 0;
}
.modal-content .btnbetOrder span {
  display: inline-block;
  margin: 0;
}
.btnbetOrder .btn-pink,
.btnbetOrder .btn-blue {
  height: 34px;
  line-height: 34px;
  width: 45%;
}
.modal-content h2.title {
  background-color: #f1f3f8;
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  color: #666;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  font-weight: normal;
}
.modal-content h2.title .el-icon-circle-close-outline {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: -30px;
    font-size: 30px;
    color: #e8e8e8;
}
.dialog-title {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.dialog-total {
  border-top: 1px solid #ddd;
  margin: 0 10px;
}
.modal-content li,
.dialog-total {
  padding: 0 10px;
}
.modal-content li span {
  font-size: 14px;
  display: inline-block;
  color: #000;
}
.dialog-title span,
.dialog-total span {
  color: #666!important;
}
.modal-content li span .el-input__inner {
  height: 23px;
  text-align: center!important;
}
.modal-content .el-icon-circle-close-outline {
    font-size: 22px;
    color: #999;
    vertical-align: middle;
    cursor: pointer;
}
.modal-content .el-icon-circle-close-outline:hover {
  color: #666;
}
.modal-content li span:nth-child(1) {
  width: 46%;
  text-align: left;
}
.modal-content li span:nth-child(2) {
  width: 15%;
}
.modal-content li span:nth-child(3) {
  width: 20%;
}
.modal-content li span:nth-child(4) {
  width: 15%;
}
.modal-content .el-input__inner {
  padding: 0;
}
.modal-content .el-input {
  width: 100px;
}
.modal-content .el-input__inner {
  padding: 0;
  width: 100px;
  height: 30px;
  text-align: center;
}
.betInput {
  padding-top: 20px;
}
.betInput .f-l span {
  text-align: right;
}
.bsg {
  border-bottom:1px solid #ddd;
  text-align: left;
  padding:5px ;
}
.bsg:nth-last-child(1){
  border-bottom:none!important;
  margin-bottom:-10px;
}
.bsg > span:nth-child(1),.bsg > span:nth-child(2),.bsg > span:nth-child(3),.bsg > span:nth-child(4){
  width:auto!important;
}
.bsg >span:nth-last-child(3) > span:nth-child(2){
  display:none;
}
.pl{
  display: inline-block;
  position: absolute;
  right: 26%;
  color: #333;
}
</style>
