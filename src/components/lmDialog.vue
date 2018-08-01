<template>
  <!-- <transition name="drop"> -->
      <div>
          <div class="overlay"></div>
              <div class="modal-content lm-modal">
                <h2 class="title">投注明细<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
                <ul>
                  <li class="dialog-title">
                    <span>号码</span>
                    <span>期数</span>
                  </li>
                  <li v-for="(item,j) in betInfo">
                    <span>{{item.title}}{{item.number}}</span>
                    <span>{{item.round}}</span>
                  </li>

                </ul>

                <div class="dialog-total betInput clearfix">
                  <div class="f-l">
                    <span>组数：</span>
                    <span>{{totalNum}}</span>
                  </div>
                  <div class="f-r">
                    <span>金额：</span>
                    <input v-model="inputMoney"  :maxlength="maxlength" type="text"  @input=' chkInput()'  onkeyup="value=this.value.replace(/\D+/g,'')"/>
                  </div>
                </div>

                <div class="btnbetOrder">
                  
                  <span class="btn-pink" @click="submit" ref="btnSubmit">确认</span>
                  <span class="btn-blue" @click="closeDialog">取消</span>
                </div>
              </div>
        <!-- </div> -->
      </div>
  <!-- </transition> -->
</template>
<script>
import { Loading } from 'element-ui';
import {cacheGame} from "@/utils";
export default {
  data() {
    return {
      title_r:'',
      maxlength: 7,
      betParams: {},
      betInfo: [],
      singleMoney: 0,
      totalNum: 1,
      totalMoney: 0,
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
        // console.log(this.banlance)
        this.$store.commit('updatelotteryMoney', res.data.money)
        sessionStorage.setItem('todayWinLost', JSON.stringify(this.todayWinLost))
      })
    },
    chkInput(){
      if(this.inputMoney=='0'){
        this.inputMoney=1
      }
    },
    sendPost () {
      this.betInfo = this.betArr;
      for (let i = 0; i < this.betInfo.length; i++) {
        let ballLength = parseInt(this.betInfo[i].number.length);
        switch (Number(this.betInfo[i].typecode)) {

          case 2032:
            this.title_r = "任选二";

            this.totalNum = this.kadun(ballLength, 2);
            // this.zonghe = this.lengthss * this.money

            break;
          case 2035:
            this.title_r = "任选三"
            this.totalNum = this.kadun(ballLength, 3);
            // this.zonghe = this.lengthss * this.money
            break;
          case 2038:
            this.title_r = "任选四"
            this.totalNum = this.kadun(ballLength, 4);
            // this.zonghe = this.lengthss * this.money
            break;
          case 2039:
            this.title_r = "任选五"
            this.totalNum = this.kadun(ballLength, 5);
            // this.zonghe = this.lengthss * this.money
            break;
          case 613:
            this.title_r = "二全中"
            this.totalNum = this.kadun(ballLength, 2);
            // this.zonghe = this.lengthss * this.money
            break;
          case 619:
            this.title_r = "三中二中三"
            this.totalNum = this.kadun(ballLength, 3);
            // this.zonghe = this.lengthss * this.money
            break;
          case 615:
            this.title_r = "二中特中二"
            this.totalNum = this.kadun(ballLength, 2);
            // this.zonghe = this.lengthss * this.money
            break;
          case 617:
            this.title_r = "三全中"
            this.totalNum = this.kadun(ballLength, 3);
            // this.zonghe = this.lengthss * this.money
            break;
          case 616:
            this.title_r = "特串"
            this.totalNum = this.kadun(ballLength, 2);
            // this.zonghe = this.lengthss * this.money
            break;
          case 808:
            this.title_r = "四中一"
            this.totalNum = this.kadun(ballLength, 4);
            // this.zonghe = this.lengthss * this.money
            break;



        }
        this.betInfo[i].number = this.betInfo[i].number.join()
      }
      
    },
    kadun(m, s) {
      function factorial(n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
      }
      return factorial(m) / factorial(m - s) / factorial(s)
    },
    closeDialog(){
      this.$emit('child-lm', 'close');
    },
    submit() {
      this.betInfo = this.betArr;
      if (!(parseInt(this.inputMoney) > 0)) {
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
      this.$http.post('/inup', JSON.stringify(this.betInfo[0])).then(res => {
          loadingInstance.close();
          if ((res.data) instanceof Array) {
          // if (res.data[0].re === true) {
            cacheGame('inuptoken',res.data[0].token)
            this.$swal({
              text: "下注成功！",
              type: "success",
              timer: 1200,
            })
            .then(function (response) {
              
            }).catch(e => {
              loadingInstance.close();
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
          } else if (res.data.msg === 5009) {
            this.$swal({
              text: "提交太频繁，请稍等在试",
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
          loadingInstance.close();
          this.closeDialog();
      })
    },
  },
  components: {
  }
}
</script>

<style scoped>
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
}
.modal-content .btnbetOrder {
  margin: 20px 0;
}
.modal-content .btnbetOrder span {
  display: inline-block;
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
.modal-content li  {
  padding: 10px 10px 0 10px;
}
.dialog-title {
  padding: 0 10px!important;
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
  width: 60%;
  text-align: left;
}
.modal-content li span:nth-child(2) {
  width: 38%;
}

.el-input {
  width: 100px;
}
.el-input__inner {
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


.lm-modal .btn-blue {
  margin-left: 0;
}
.total-group {
  width: 50%;
}
.total-group .el-input__inner {
  height: 30px;
}
</style>
