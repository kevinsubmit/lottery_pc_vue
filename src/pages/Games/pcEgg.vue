<template>
  <div class="content pcegg">

    <!-- 右侧头部导航 -->
    <div style='height:80px'>
      <lottery-area v-if="isLotteryArea" :todayWinLost="todayWinLost" :lotteryName="lotteryName" :game_code=game_code :lotteryObj="body" :endtime="endtime" gameType="15" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
      <div v-else="isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
    </div>

    <!-- 下注弹窗 -->
    <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=game_code :type_code=type_code :round="round" v-on:child-say="listenToMyBoy"></bet-dialog>

    <nav class="top-nav">
      <ul class="clearfix">
        <li :class="`${classCode===0?'active':''}`" @click="changeNav(0)">两面盘</li>
        <!-- <li :class="`${classCode===1?'active':''}`" @click="changeNav(1)">数字盘</li> -->
      </ul>
    </nav>
    <div class="bet-content">
      <div class="bet-center">
        <div class="bet-box">
          <div class="bet-area" :class="type">
            <div class="game">

              <div class="game_info">
                <ul class="clearfix " ref='cName'>
                  <li class="clearfix" :class="'row' + index" v-for='(item, index) in list'>
                    <div class="game_title">
                      <h3>{{item.name}}</h3>
                    </div>
                    <div class="clearfix hover-color" v-for='(ite,i,j) in item.list' @click="togglePlay($event, ite)" style="cursor: pointer">
                      <!--<label>-->
                        <span style='cursor:pointer;' :class="ite.name=='红波'||ite.name=='绿波'||ite.name=='蓝波'?'tm_ball_'+ite.name:''">{{ite.name}}</span>
                        <!--<span @click='confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>-->
                        <span style='cursor:pointer;'>{{ite.odds}}</span>
                        <input ref='kuang' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)" @focus="inputFocus($event, ite)" @input="chkInput()" min="1" type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-if="closeBet" maxlength="7" />
                        <input v-else readonly value="封盘" class="closeBet">
                      <!--</label>-->
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="btn-bet clearfix">
            <!-- <input id='fast' type="button" name="" value="快选金额"/> -->
            <el-checkbox v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
            <input type="text" @input="checkMoney()" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney" />

            <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
            <input @click="reset" type="button" name="" class="btn-blue" value="重置" />
          </div>
        </div>
        <!-- 长龙模块 -->
        <chang-long :game_code="game_code"></chang-long>
      </div>
    </div>
  </div>
</template>

<script scoped>
import lotteryArea from "../../components/lotteryArea";
import betDialog from "../../components/betDialog";
import changLong from "../../components/changlong";
import { togglePlayActive, clearAllActives } from '../../utils/common'
export default {
  data() {
    return {
      getApiName: getApiName(),
      fentime: 30,
      type: "lotteryPcdd",
      lotteryName: "PC蛋蛋",
      type_code: 0,
      game_code: 160,
      round: 0,
      endtime: 0,
      closetime: 0,
      body: {},
      list_0: [],
      list: [],
      classCode: 0,
      list_1: [],
      list_2: [],
      list_3: [],
      closeBet: true,
      betInfo: {},
      betArr: [],
      isLotteryArea: false,
      showDialog: false,
      isSaveMoney: false,
      quickyMoney: 0,
      todayWinLost: 0
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
  },
  components: {
    lotteryArea,
    betDialog,
    changLong
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
			const presetPrice = this.quickyMoney
			Array.prototype.forEach.call(document.querySelectorAll('.active-color input'), el => el.value = presetPrice)
    },
    fetchData() {
      let params = {};

      params.game_code = 160;
      // console.log(params)
      this.$http
        .post("/getinfo/game", JSON.stringify(params))
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
          this.$store.commit("updatelotteryMoney", res.data.lcurrency);
          // this.closeBet = true;
          this.isLotteryArea = true;
          res.data.next.isclose
            ? (this.closeBet = false)
            : (this.closeBet = true);
          // console.log(res.data.next.isclose)
          let timeStamp = res.data.next.timestap;
          this.endtime = parseInt(res.data.next.endtime) - parseInt(timeStamp);
          this.closetime =
            parseInt(res.data.next.closetime) - parseInt(timeStamp);
          this.body = res.data;
          this.isLotteryArea = true;
          this.round = res.data.next.round;
          this.todayWinLost = parseFloat(res.data.UserResult);
        })
        .catch(function() {
          console.log("网络异常！");
        });
      let lmp = {},
        gyh = {};
      lmp.game_code = 160;
      lmp.type_code = 0;
      gyh.game_code = 160;
      gyh.type_code = 1;
      // console.log(JSON.parse(localStorage.getItem('pcegg_list_3')).length)
      if (
        JSON.parse(localStorage.getItem("pcegg_list_3")) &&
        JSON.parse(localStorage.getItem("pcegg_list_3")).length === 2
      ) {
        this.list_3 = JSON.parse(localStorage.getItem("pcegg_list_3"));
        this.list = this.list_3;
      } else {
        this.$http.all([this.getOdds(lmp), this.getOdds(gyh)]).then(
          this.$http.spread((acct, perms) => {
            for (let i = 0; i < perms.data.length; i++) {
              acct.data.push(perms.data[i]);
            }
            this.list_3 = acct.data;
            this.list = this.list_3;
            localStorage.setItem("pcegg_list_3", JSON.stringify(this.list_3));
          })
        );
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
        })
          .then(function(response) {})
          .catch(e => {});
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
        })
          .then(function(response) {})
          .catch(e => {});
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
		inputFocus (event, item) {
			event.target.value = sessionStorage.getItem("quickyMoney") || ''
      /*let quickyMoney = sessionStorage.getItem("quickyMoney");
      if (quickyMoney > 0) {
        key.target.value = quickyMoney;
      } else {
        return false;
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
      if (this.isSaveMoney === true) {
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
				let el = this.$refs.kuang[i]
				el.value = "";
				el.parentNode.classList.remove('active-color')
      }
    },
		// 切换玩法的选中状态
		togglePlay(event) {
			if (!this.closeBet) return// 封盘不能切换
			if (event.target.tagName === 'INPUT') return// input标签不触发切换

			togglePlayActive(event, this.quickyMoney)
		}
  },
  mounted() {
    setInterval(() => {
      if (this.endtime > 0) {
        this.endtime--;
      }
      if (this.closetime <= 0) {
        this.closeBet = false;
        this.showDialog = false;
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
        this.endtime == 200 ||
        this.endtime == 210 ||
        this.endtime == 190 ||
        this.endtime == 220 ||
        this.endtime == 230 ||
        this.endtime == 240
      ) {
        this.fetchData();
        this.showDialog = false;
      }
    },
		closeBet(val) {
			if (!val) {
				// 如果封盘了，则清空玩法的选中状态
				clearAllActives()
			}
		}
  }
};
</script>

<style>
</style>
