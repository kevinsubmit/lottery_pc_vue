<template>
  <div class="content pk10">
    <!-- 右侧头部导航 -->
    <div style='height:80px'>
      <lottery-area v-if="isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime" gameType="88" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
      <div v-else="isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
    </div>

    <!-- 下注弹窗 -->
    <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=280 :type_code=type_code :round="round" v-on:child-say="listenToMyBoy"></bet-dialog>

    <nav class="top-nav">
      <ul class="clearfix">
        <li :class="`${classCode==='0101'?'active':''}`">大小骰宝</li>
      </ul>
    </nav>

    <div class="bet-content">
      <div class="bet-center">
        <div class="bet-box">
          <div class="bet-area" :class="lotteryType">
            <div class="game">
              <div class="game_info">
                <ul ref='cName'>
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>{{item[0].name}}</h3>
                    </div>
                    <div class="clearfix hover-color" v-for='(ite,i,j) in item[0].list' @click="togglePlay($event, ite)" style="cursor: pointer">
                      <!--<label>-->
                      <span v-for="(it,i) in ite.name.split(',')" :class="`ksball_${it}`" style='cursor:pointer;'>{{it}}</span>
                      <!--<span class="jsks_odds" @click='confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>-->
                      <span class="jsks_odds" style='cursor:pointer;'>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)" @focus="inputFocus($event, ite)" @input="chkInput()" min="1" type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-if="closeBet" maxlength="7" />
                      <input v-else readonly value="封盘" class="closeBet">
                      <!--</label>-->
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="btn-bet">
            <el-checkbox v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
            <input type="text" @input="checkMoney()" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney" />

            <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
            <input @click="reset" type="button" name="" class="btn-blue" value="重置" />
          </div>

        </div>

        <!-- 露珠组件 -->
        <!-- <lu-zhu :game_code="game_code"></lu-zhu> -->
      </div>
      <!-- 长龙组件 -->
      <chang-long :game_code="game_code"></chang-long>
    </div>
  </div>
</template>

<script>
import lotteryArea from "../../components/lotteryArea";
import betDialog from "../../components/betDialog";
import changLong from "../../components/changlong";
import { togglePlayActive, clearAllActives } from "../../utils/common";
// import luZhu from '../../components/luzhu'
/*import utils from '../../assets/js/game'
console.log(utils.reset)*/
export default {
  data() {
    return {
      getApiName: getApiName(),
      // type: 'pk10',
      lotteryType: "jsks",
      classCode: "0101",
      lotteryName: "吉林快3",
      type_code: 0,
      game_code: 280,
      round: 0,
      endtime: 0,
      fentime: 0,
      closetime: 0,
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
      todayWinLost: 0,
      quickyMoney: 0
    };
  },
  created() {
    this.fetchData();
    // 保存快捷金额
    let quickyMoney = sessionStorage.getItem("quickyMoney");
    if (quickyMoney) {
      this.isSaveMoney = true;
      this.quickyMoney = quickyMoney;
    } else {
      this.isSaveMoney = false;
      this.quickyMoney = "";
    }
    let params = {};
    params.game_code = 280;
    this.$http.post("/getinfo/game", JSON.stringify(params)).then(res => {
      this.fentime =
        parseInt(res.data.next.endtime) - parseInt(res.data.next.closetime);
    });
  },
  mounted() {
    this.fetchData();
  },
  components: {
    lotteryArea,
    betDialog,
    changLong
    // luZhu
  },
  methods: {
    checkMoney() {
      let r = /^\+?[1-9][0-9]*$/; //正整数
      if (!r.test(this.quickyMoney)) {
        this.quickyMoney = "";
      }
      if (this.quickyMoney == "") {
        sessionStorage.removeItem("quickyMoney");
      }

      // 将预设的金额赋值到选中玩法的金额
      const presetPrice = this.quickyMoney;
      Array.prototype.forEach.call(
        document.querySelectorAll(".active-color input"),
        el => (el.value = presetPrice)
      );
    },
    fetchData() {
      let oid_info = sessionStorage.getItem("im_token");
      let params = {};
      params.oid = oid_info;
      params.game_code = 280;
      this.classCode = "0101";
      this.$http
        .post("/getinfo/game", JSON.stringify(params))
        .then(res => {
          // console.log(res.status)
          if (res.data.msg == 4001) {
            this.$swal({
              text: "账户已下线，请重新登陆",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
            this.$router.push({
              path: "/home"
            });
            return;
          }
          if (res.status == 200) {
            this.$store.commit("updatelotteryMoney", res.data.lcurrency);
            sessionStorage.setItem("im_money", res.data.lcurrency);
            // this.closeBet = true;
            this.isLotteryArea = true;
            res.data.next.isclose
              ? (this.closeBet = false)
              : (this.closeBet = true);
            let timeStamp = res.data.next.timestap;
            this.endtime =
              parseInt(res.data.next.endtime) - parseInt(timeStamp);
            this.closetime =
              parseInt(res.data.next.closetime) - parseInt(timeStamp);
            this.body = res.data;
            this.isLotteryArea = true;
            this.round = res.data.next.round;
            this.todayWinLost = parseFloat(res.data.UserResult);
            if (res.data.next.isclose === true) {
              this.closeBet = false;
              this.endtime = 0;
            } else {
              this.closeBet = true;
            }
          }
        })
        .catch(function() {
          console.log("网络异常！");
        });

      let dxsb = {};
      dxsb.oid = oid_info;
      dxsb.game_code = 280;
      if (localStorage.getItem("jlk3_list")) {
        this.list = JSON.parse(localStorage.getItem("jlk3_list"));
        // console.log(this.list);
      } else {
        this.$http
          .post("/getinfo/getAllOdds", JSON.stringify(dxsb))
          .then(res => {
            if (res.data.msg == 4001) {
              this.$swal({
                text: "账户已下线，请重新登陆",
                type: "error",
                timer: 1200
              })
                .then(function(response) {})
                .catch(e => {});
              this.$router.push({
                path: "/home"
              });
              return;
            }
            // console.log(res.status);
            if (res.status == 200) {
              this.list = res.data;
              localStorage.setItem("jlk3_list", JSON.stringify(res.data));
              // console.log(res.data);
            }
          });
      }

      // 保存快捷金额
      let quickyMoney = sessionStorage.getItem("quickyMoney");
      if (quickyMoney) {
        this.isSaveMoney = true;
        this.quickyMoney = quickyMoney;
      } else {
        this.isSaveMoney = false;
        this.quickyMoney = "";
      }
    },
    listenToMyBoy: function(i) {
      if (i === "close") {
        this.showDialog = false;
        this.reset();
      }
    },
    getOdds(i) {
      return this.$http.post("/getinfo/odds", JSON.stringify(i));
    },
    confirms(name, key, ite) {
      if (!this.closeBet) {
        this.$swal({
          text: "已封盘！",
          type: "error",
          timer: 1200
        });
        return;
      }
      this.betArr = [];
      let ites = JSON.parse(ite);
      ites.title = name;
      ites.money = this.quickyMoney;
      this.betArr.push(ites);
      if (this.betArr.length == 0) {
        this.$swal({
          text: "请选择下注项目！",
          type: "error",
          timer: 1200
        });
        return;
      }
      this.reset();
      this.showDialog = true;
    },
    confirm() {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$swal({
          text: "请登录正式账号！",
          type: "error",
          timer: 1200
        });
        return;
      }
      if (!this.closeBet) {
        this.$swal({
          text: "已封盘！",
          type: "error",
          timer: 1200
        });
        return;
      }
      this.betArr.length = [];
      for (let i = 0; i < this.$refs.kuang.length; i++) {
        if (this.$refs.kuang[i].value > 0) {
          let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"));
          let title = this.$refs.kuang[i].getAttribute("name");
          ite.title = title;
          ite.money = this.$refs.kuang[i].value;
          this.betArr.push(ite);
        }
      }

      if (this.betArr.length == 0) {
        this.$swal({
          text: "请选择下注项目！",
          type: "error",
          timer: 1200
        });
        return;
      }
      this.reset();
      this.showDialog = true;
    },
    chkInput() {
      for (let i = 0; i < this.$refs.kuang.length; i++) {
        this.$refs.kuang[i].value.replace(/\D/g, "");
        if (this.$refs.kuang[i].value == 0) {
          this.$refs.kuang[i].value = "";
        }
        if (this.$refs.kuang[i].value === "e") {
          return 0;
        }
      }
    },
    inputFocus(event, item) {
      event.target.value = sessionStorage.getItem("quickyMoney") || "";
      /*let quickyMoney = sessionStorage.getItem("quickyMoney");
      if(quickyMoney > 0) {
        key.target.value = quickyMoney;
      } else {
        return false
      }*/
    },
    saveMoneyBlur(quickyMoney) {
      if (quickyMoney <= 0 || quickyMoney === "") {
        this.isSaveMoney = false;
        sessionStorage.removeItem("quickyMoney");
      }
      if (quickyMoney > 0 && this.isSaveMoney === true) {
        sessionStorage.removeItem("quickyMoney");
        sessionStorage.setItem("quickyMoney", this.quickyMoney);
      }
    },
    saveMoney() {
      // console.log(this.isSaveMoney)
      if (this.isSaveMoney === true) {
        // console.log(1)
        sessionStorage.setItem("quickyMoney", this.quickyMoney);
        this.isSaveMoney = true;
      } else {
        sessionStorage.removeItem("quickyMoney");
        this.isSaveMoney = false;
        this.quickyMoney = "";
      } // 保存快捷金额
    },
    reset() {
      for (let i = 0; i < this.$refs.kuang.length; i++) {
        let el = this.$refs.kuang[i];
        el.value = "";
        el.parentNode.classList.remove("active-color");
      }
    },
    // 切换玩法的选中状态
    togglePlay(event) {
      if (!this.closeBet) return; // 封盘不能切换
      if (event.target.tagName === "INPUT") return; // input标签不触发切换

      togglePlayActive(event, this.quickyMoney);
    }
  },
  mounted() {
    setInterval(() => {
      if (this.endtime > 0) {
        this.endtime--;
      }
      if (this.closetime <= 0) {
        this.showDialog = false;
        this.closeBet = false;
      } else {
        this.closetime--;
        let timeStamp = Date.parse(new Date()) / 1000;
      }
    }, 1000);
  },
  watch: {
    endtime: function() {
      if (
        this.endtime == 0 ||
        this.endtime == 540 ||
        this.endtime == 440 ||
        this.endtime == 450 ||
        this.endtime == 250 ||
        this.endtime == 530 ||
        this.endtime == 240 ||
        this.endtime == 560 ||
        this.endtime == 570 ||
        this.endtime == 580
      ) {
        this.fetchData();
        this.showDialog = false;
      }
    },
    closeBet(val) {
      if (!val) {
        // 如果封盘了，则清空玩法的选中状态
        clearAllActives();
      }
    }
  }
};
</script>

<style scoped>
.jsks ul li,
.jsks ul .game_title {
  width: 100%;
}
.jsks ul .game_title {
  margin-bottom: 12px;
}
.jsks ul li div {
  margin: 0;
}
.jsks ul li div:not(.game_title) {
  display: inline-block;
  /*width: 25%;*/
  width: 23%;
  margin: 2px 1%;
  padding: 4px;
  border-radius: 4px;
  box-sizing: border-box;
  vertical-align: top;
}

.jsks .ksball_1,
.jsks .ksball_2,
.jsks .ksball_3,
.jsks .ksball_4,
.jsks .ksball_5,
.jsks .ksball_6 {
  font-size: 0;
  width: 22px;
  height: 22px;
  margin-left: 2px;
  border-radius: 5px;
  border: 1px solid #3e80d4;
}
.jsks .ksball_1 + .jsks_odds,
.jsks .ksball_2 + .jsks_odds,
.jsks .ksball_3 + .jsks_odds,
.jsks .ksball_4 + .jsks_odds,
.jsks .ksball_5 + .jsks_odds,
.jsks .ksball_6 + .jsks_odds,
.jsks .ksball_1 + .jsks_odds + input,
.jsks .ksball_2 + .jsks_odds + input,
.jsks .ksball_3 + .jsks_odds + input,
.jsks .ksball_4 + .jsks_odds + input,
.jsks .ksball_5 + .jsks_odds + input,
.jsks .ksball_6 + .jsks_odds + input {
  /*margin-top: 4px;*/
}
.jsks ul li span:nth-child(1) {
  margin: 0 !important;
  width: 22px;
  height: 22px;
}
.jsks_odds {
  margin-left: 5px;
}
.jsks ul li:nth-child(2) div:last-child span:first-child {
  width: 58px;
}
.jsks ul li:nth-child(3) div:not(.game_title) span:first-child {
  width: 57px;
}
#ten_result_280 td span,
.game_280 .result-ball,
.jsks .ksball_1,
.jsks .ksball_2,
.jsks .ksball_3,
.jsks .ksball_4,
.jsks .ksball_5,
.jsks .ksball_6 {
  background-image: url("/static/images/ct/ico-dice.png");
}
#ten_result_280 .ten_result_1,
.game_280 .result-ball_1,
.jsks .ksball_1 {
  background-position: 0 0;
}
#ten_result_280 .ten_result_2,
.game_280 .result-ball_2,
.jsks .ksball_2 {
  background-position: 0 118px;
}
#ten_result_280 .ten_result_3,
.game_280 .result-ball_3,
.jsks .ksball_3 {
  background-position: 0 236px;
}
#ten_result_280 .ten_result_4,
.game_280 .result-ball_4,
.jsks .ksball_4 {
  background-position: 0 354px;
}
#ten_result_280 .ten_result_5,
.game_280 .result-ball_5,
.jsks .ksball_5 {
  background-position: 0 614px;
}
#ten_result_280 .ten_result_6,
.game_280 .result-ball_6,
.jsks .ksball_6 {
  background-position: 0 590px;
}
</style>
