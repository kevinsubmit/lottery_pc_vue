<template>
  <!-- <transition name="drop"> -->
      <div>
          <div class="overlay"></div>
              <div class="modal-content">
                <h2 class="title">投注明细<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
                <ul>
                  <li class="dialog-title">
                    <span>号码</span>
                    <span>期数</span>
                  </li>
                  <li v-for="(item,j) in betInfo">
                    <span style='word-wrap: break-word;width:49%;'>{{item.title}}{{item.number1}}</span>
                    <span>{{item.round}}</span>
                  </li>

                </ul>

                <div class="dialog-total betInput clearfix">
                  <div class="f-l">
                    <span>组数：</span>
                    <span>{{totalNum}}</span>
                  </div>
                  <div class="f-r">
                    <span>单注金额：</span>
                    <input v-model="inputMoney"  :maxlength="maxlength" type="text"  @input="chkInput()" onkeyup="value=this.value.replace(/\D+/g,'')"/>
                  </div>
                </div>

                <div class="btnbetOrder">

                  <span class="btn-pink" @click="submit" ref="btnSubmit">确认</span>
                  <span class="btn-blue" @click="closeDialog">取消</span>
                </div>
              </div>
        </div>
      </div>
  <!-- </transition> -->
</template>
<script>
import { Loading } from 'element-ui';
import {cacheGame} from "@/utils";
export default {
  data() {
    return {
      maxlength: 7,
      betParams: {},
      betInfo: [],
      singleMoney: 0,
      totalNum: null,
      totalMoney: null,
      inputMoney: sessionStorage.getItem('quickyMoney')
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
    },
    indeT:{
      type:Number
    }
  },
  created() {
    this.sendPost ();
  },
  beforeUpdate(){
  },
  methods: {
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
        this.$store.commit('updatelotteryMoney', res.data.money)
        sessionStorage.setItem('todayWinLost', JSON.stringify(this.todayWinLost))
      })
    },
    chkInput(){
      // console.log(this.inputMoney)
      if(this.inputMoney=='0'){
        this.inputMoney=1
      }
    },
    sendPost () {
      this.betInfo = this.betArr;
      // console.log(this.betInfo,111)
      for (let i = 0; i < this.betInfo.length; i++) {

        this.betInfo[i].number1 = this.betInfo[i].number1.join()
        this.betInfo[i].number = this.betInfo[i].number.join()
      }
      if (this.type_code>=27) {
        let i = this.betInfo[0].number1.split(',').length;
        this.totalNum = this.kadun(i,this.indeT);
      }
      else {
        this.totalNum=1
      }
    },
    kadun(m, s) {
      function factorial(n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
      }
      return factorial(m) / factorial(m - s) / factorial(s)
    },
    closeDialog(){
      this.$emit('child-hm', 'close');
    },
    submit() {
      this.betInfo = this.betArr;
      if (this.inputMoney <= 0) {
        this.$swal({
          text: "请输入正确的下注金额！",
          type: "error",
          timer: 1200,
        })
        .then(function (response) {
        }).catch(e => {
        })
        return
      }
      for (let j = 0; j < this.betInfo.length; j++) {
        this.betInfo[j].betmoney = parseInt(this.inputMoney);
      }

      let loadingInstance = Loading.service({background:'rgba(0, 0, 0, 0.5)'});
       delete this.betInfo[0].number1;
      this.$http.post('/inup', JSON.stringify(this.betInfo[0])).then(res => {
          loadingInstance.close();
         if ((res.data) instanceof Array) {
           cacheGame('inuptoken',res.data[0].token)
          // if (res.data[0].re === true) {
            this.$swal({
              text: "下注成功！",
              type: "success",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
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
          }  else if (res.data.msg === 5009) {
            this.$swal({
              text: "提交太频繁，请稍等在试",
              type: "error",
              timer: 1200,
            })
            .then(function (response) {

            }).catch(e => {
                console.log(e)
            })
          }else if (res.data.msg === 7001) {
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
          } else {
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
          // this.$refs.btnSubmit.removeAttribute("disabled");
          // this.$refs.btnSubmit.innerText = '确认';
          this.closeDialog();
          loadingInstance.close();
      })
    },
  },
  components: {
  }
}
</script>

<style scoped>
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
		min-height: 90px;
    max-height: 280px;
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
  float: left;
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
</style>
