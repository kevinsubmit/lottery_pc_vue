<template>
  <!-- <transition name="drop"> -->
  <div>
    <div class="overlay"></div>
    <div class="modal-content">
      <h2 class="title">投注明细
        <i class="el-icon-circle-close-outline" @click="closeDialog"></i>
      </h2>
      <ul>
        <li style="border-bottom:none;width:100%;text-align:left" class="dialog-title">
          <span style="width:48%;padding-left:15%">号码</span>
          <span>赔率</span>
        </li>
        <li style="width:100%;text-align:left;" class="dian">
          <span style="width:auto">{{groupNam}}(</span>
          <span v-for="(item,j) in betInfos">
            <span>{{item.title}}</span>
            <span class="pls">,</span>
            <span>
              <label>
                <input class="zuzhu" ref="inputMoney" v-focus v-model="money" @change="totalCalc" :id="item.ip" maxlength="7" @input="chkInput(item,$event)" type="number" style="line-height:15px" />
              </label>
            </span>
          </span>
          <span>)</span>
          <span style="position:absolute;right:29%">{{len}}</span>
        </li>
      </ul>
      <div class="dialog-total clearfix">
        <div class="f-l">
          <span>组数：</span>
          <span>1</span>
        </div>
        <div class="f-r">
          <span style="margin-right:85px">总金额：<span style="color:red!important">{{money_z}}</span>元</span>
          <!-- <span><input ref="inputMoney" v-focus v-model="item.money" @change="totalCalc"  :id="item.ip" maxlength="7" @input="chkInput(item,$event)" type="number" style="line-height:15px" /></span> -->
          <!-- <span><span style="color:red!important;">{{totalMoney}}</span>&nbsp;元</span> -->
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
import { Loading } from "element-ui";
import { cacheGame } from "@/utils";
export default {
  data() {
    return {
      betParams: {},
      betInfo: [],
      singleMoney: 0,
      totalNum: 0,
      totalMoney: 0,
      groupNam: "",
      betInfos:[],
      money_z:'',
      money:''
    };
  },
  props: {
    betArr: {
      type: Array
    },
    round: {
      type: String
    },
    game_code: {
      type: Number
    },
    type_code: {
      type: Number
    }
  },
  computed: {
    a() {
      this.totalNum = 0;
      for (let i = 0; i < this.betInfo.length; i++) {
        if (this.betInfo[i].money) {
          this.totalNum++;
        }
      }
      return this.totalNum;
    }
  },
  created() {
    this.betInfo = this.betArr;
    for (let i = 0; i < this.betInfo.length; i++) {
      this.betInfos = this.betInfo[i];
      for (let j = 0; j < this.betInfos.length; j++) {
        let ss = this.betInfos[j].ip.slice(3, 7);
        if (ss == 6211) {
          this.groupNam = "组选三";
        }
        if (ss == 6212) {
          this.groupNam = "组选六";
        }
      }
      this.len = this.betInfos[this.betInfos.length - 1].odds;
      this.singleMoney = this.betInfo[i].money || 0;
      if (this.betInfo[i].money) {
        this.totalNum++;
      }
      this.totalMoney += parseInt(this.singleMoney);
    }
  },
  beforeUpdate() {},
  methods: {
    deleteRow(j) {
      this.betInfo.splice(j, 1);
      this.totalNum--;
      this.betParams = {};

      this.totalCalc(this.betInfo.length, j);

      if (!this.betInfo.length) {
        this.closeDialog();
      }
      if (this.totalNum === 0) {
        this.closeDialog();
      }
    },

    chkInput(item, key) {
      this.money_z = this.money
    },
    closeDialog() {
      this.$emit("child-zx", "close");
    },
    getBalance() {
      let params = {};

      getApiName() == "hg" ? (params.sports = 1) : "";
      this.$http.post("/getinfo/money", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$router.push({
            path: "/home"
          });
        }
        this.banlance = res.data.money;
        this.todayWinLost = res.data.user_win_lose;
        this.$store.commit("updatelotteryMoney", res.data.money);
        sessionStorage.setItem(
          "todayWinLost",
          JSON.stringify(this.todayWinLost)
        );
      });
    },
    submit() {
      let loadingInstance = Loading.service({
        background: "rgba(0, 0, 0, 0.5)"
      });
      this.touzhu();
      this.betParams.game_code = this.game_code;
      this.betParams.type_code = this.type_code;
      this.betParams.round = this.round;
      this.betParams.token = cacheGame("inuptoken");
      if (this.$store.state.lotteryMoney == 0) {
        this.$swal({
          text: "余额不足！",
          type: "error",
          timer: 2000
        });
        this.closeDialog();
        loadingInstance.close();
      }
        this.$http.post("/inup", JSON.stringify(this.betParams)).then(res => {
          loadingInstance.close();
          if (res.data instanceof Array) {
            cacheGame("inuptoken", res.data[0].token);
            this.$swal({
              text: "下注成功！",
              type: "success",
              timer: 2000
            })
              .then(function(response) {
                loadingInstance.close();
              })
              .catch(e => {});
            this.getBalance();
          } else if (res.data.msg === 4001) {
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5001) {
            this.$swal({
              text: "下注项为空，金额不正确，请重新输入",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5003) {
            this.$swal({
              text: "下注期数错误",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5004) {
            this.$swal({
              text: "余额不足,下注失败",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5002) {
            this.$swal({
              text: "游戏已封盘",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5008) {
            cacheGame("inuptoken", []);
            this.$swal({
              text: "网络繁忙，请稍等在试",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5009) {
            cacheGame("inuptoken", []);
            this.$swal({
              text: "提交太频繁，请稍等在试",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else if (res.data.msg === 5010) {
            cacheGame("inuptoken", []);
            this.$swal({
              text: "请勿重复提交",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          } else {
            cacheGame("inuptoken", []);
            this.$swal({
              text: "下注失败！",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {
                console.log(e);
              });
          }
          this.closeDialog();
          loadingInstance.close();
        });
    },
    touzhu(i) {
      this.betParams = {};
      let lengI = 0;
      i < this.$refs.inputMoney.length ? (lengI = 1) : (lengI = 0);
      for (var i = lengI; i < this.$refs.inputMoney.length; i++) {
        this.betParams[this.$refs.inputMoney[i].id] = parseInt(
          this.$refs.inputMoney[i].value,
        );
      }
      return this.betParams;
    },
    totalCalc(i, j) {
      this.totalMoney = 0;
      let lengI = 0;
      i < this.$refs.inputMoney.length ? (lengI = 0) : (lengI = 0);
      for (var i = lengI; i < this.$refs.inputMoney.length; i++) {
        if (parseInt(this.$refs.inputMoney[i].value) <= 0) {
          this.$refs.inputMoney[i].value = "";
        }
        if (i == j) {
          this.totalMoney += 0;
        } else {
          parseInt(this.$refs.inputMoney[i].value)
            ? (this.totalMoney += parseInt(this.$refs.inputMoney[i].value))
            : (this.totalMoney += 0);
        }

        // console.log(i)
      }
      return this.totalMoney;
    },
    reset() {
      if (this.navI !== 4) {
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if ((this.$refs.kuang.type = "checkbox")) {
            this.$refs.kuang[i].checked = false;
          } else {
            this.$refs.kuang[i].value = "";
          }
        }
      } else {
        for (let i = 0; i < this.$refs.check.length; i++) {
          this.$refs.check[i].checked = false;
        }
      }

      for (let i = 0; i < this.$refs.kuang.length; i++) {
        this.$refs.kuang[i].value = "";
      }
    },
    getBalance() {
      let params = {};
      getApiName() == "hg" ? (params.sports = 1) : "";
      this.$http.post("/getinfo/money", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          this.$router.push({
            path: "/home"
          });
        }
        this.banlance = res.data.money;
        this.todayWinLost = res.data.user_win_lose;
        // console.log(this.banlance)
        this.$store.commit("updatelotteryMoney", res.data.money);
        sessionStorage.setItem(
          "todayWinLost",
          JSON.stringify(this.todayWinLost)
        );
      });
    }
  },
  components: {},
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style scoped>
.drop-enter-active {
  transition: all 0.5s ease;
}
.drop-leave-active {
  transition: all 0.8s ease;
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
  opacity: 0.5;
  filter: alpha(opacity=50);
  z-index: 66;
  left: 0;
  top: 0;
  transition: all ease 0.8s;
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
  height: 30px;
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
.modal-content li {
  padding: 5px 5px 0 5px;
  float: left;
}
.dialog-title {
  padding: 0 10px !important;
}
.dialog-title span:last-child{
	margin-left: 174px;
}
.modal-content li span {
  font-size: 14px;
  /*display: inline-block;*/
  display: initial;
  color: #000;
}
.dialog-title span,
.dialog-total span {
  color: #666 !important;
}
.modal-content li span .el-input__inner {
  height: 23px;
  text-align: center !important;
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
.zuzhu {
  position: absolute;
  top: 90px;
  right: 10px;
}
.pls:nth-last-child(1){
  display:none;
}
.dian span:nth-last-child(3) span:nth-child(2){
  display:none;
}
</style>
