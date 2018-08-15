<template>
  <div class="content gd11x5">
    <!-- 右侧头部导航 -->
    <div style='height:80px'>
      <lottery-area v-if="isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime" gameType="133" :fentime='fentime' :closetime="closetime" :closeBet="closeBet"></lottery-area>
      <div v-else :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
    </div>

    <!-- 下注弹窗 -->
    <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=133 :type_code=type_code :round="round" v-on:child-say="listenToMyBoy"></bet-dialog>

    <!-- 下注弹窗 -->
    <better-bet-dialog :betData="betData" v-if="$store.state.confirmShow"></better-bet-dialog>

    <nav class="top-nav">
      <ul class="">
        <li :class="{active:classCode===tabIndex}" @click="changeNav(tabIndex,tab.type_code)" v-for="(tab,tabIndex) in gameTabs" v-bind:key="tabIndex">{{tab.name}}</li>
      </ul>
    </nav>

    <div v-show="classCode==2">
      <ul class="lianma-tab-list">
        <li v-for='(item,index) in list_3'>
          <button :class="{'active':lianmaActiveTabIndex==index}" @click="changeSubNav(index,'连码')">{{`${item.title}(${item.list[0]&&item.list[0].odds})`}}</button>
        </li>
      </ul>
    </div>

    <div v-show="classCode==3">
      <ul class="lianma-tab-list">
        <li v-for='(item,index) in list_4'>
          <button :class="{'active':zhixuanActiveTabIndex==index}" @click="changeSubNav(index,'直选')">{{`${item.title}(${item.list[0]&&item.list[0].list[0].odds})`}}</button>
        </li>
      </ul>
    </div>

    <div class="bet-content">
      <div class="bet-center">
        <div class="bet-box" :class="{'bet-box-lianma-tab':classCode==2}">
          <div class="bet-area" :class="type" v-show="classCode==0||classCode==1">
            <div class="game">
              <div class="game_info">
                <ul :id="`gd11x5_nav_${classCode}`" ref='cName'>
                  <li v-for='item in list'>
                    <div class="game_title">
                      <h3>{{item.name}}</h3>
                    </div>
                    <div class=" hover-color" v-for='(ite,i,j) in item.list' @click="toggleSelected($event,ite)">
                      <span style='cursor:pointer;' class="bet-wf-item-title">{{ite.title}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='inputText' :id="ite.key" :name="item.name" :data-obj="JSON.stringify(ite)" @focus="inputFocus($event)" @input="chkInput()" min="1" type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-if="closeBet" maxlength="7" />
                      <input v-else readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 连码 -->
          <div class="gd11x5-lianma" v-show="classCode==2">
            <div class="game_info">
              <ul :id="`gd11x5_nav_${classCode}`" ref='cName'>
                <li v-for='(item,i) in list_3[lianmaActiveTabIndex].list'>
                  <label>
                    <div class="hover-color" @click="toggleSelected($event,item)">
                      <span class="bet-wf-item-title">{{item.name}}</span>
                      <input type="checkbox" :value="item" :disabled="!closeBet" v-model="selectedCheckList" @change="handleInputCheck(item)">
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <!-- 直选 -->
          <div class="gd11x5-lianma" v-show="classCode==3">
            <!-- <h3>投注方式</h3> -->

            <div>
              <div class="game_info">
                <ul :id="`gd11x5_nav_${classCode}`" ref='cName'>
                  <li v-for='(item,index) in list_4[zhixuanActiveTabIndex]&&list_4[zhixuanActiveTabIndex].list'>
                    <div class="game_title">
                      <h3>{{item.name}}</h3>
                    </div>
                    <div v-for='(ite,i,j) in item.list'>
                      <label>
                        <div class="hover-color" @click="toggleSelected($event,ite)">
                          <span style='cursor:pointer;' class="bet-wf-item-title">{{ite.name}}</span>
                          <input type="checkbox" :value="ite" :disabled="!closeBet" v-model="selectedCheckList" @change="handleInputCheck(ite)">
                        </div>
                      </label>
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

import lotteryArea from "../../components/lotteryArea";
import betDialog from "../../components/betDialog";
import betterBetDialog from "../../components/games/betDialog";
import changLong from "../../components/changlong";
import luZhu from "../../components/luzhu";
import gameConfig from "../../config/gd11x5.config";
import sortByLine from "../../utils/sortByLine";
import _ from "lodash";
export default {
  data() {
    return {
      getApiName: getApiName(),
      booleQuick: true,
      type: "gd11x5",
      lotteryName: "广东11选5",
      type_code: 4010,
      game_code: 133,
      round: 0,
      endtime: 0,
      closetime: 0,
      list_0: [],
      list: [],
      fentime: "",
      classCode: 0,
      list_1: [],
      list_2: [],
      list_3: [
        {
          list: []
        }
      ],
      list_4: [
        {
          list: []
        }
      ],
      list_: [],
      body: {},
      closeBet: true,
      betInfo: {},
      betArr: [],
      isLotteryArea: false,
      showDialog: false,
      isSaveMoney: false,
      quickyMoney: 0,
      todayWinLost: 0,
      gameTabs: [
        { name: "两面", type_code: "4010" },
        { name: "单号", type_code: "4018" },
        { name: "连码", type_code: "4019" },
        { name: "直选", type_code: "4028" }
      ],
      lianmaActiveTabIndex: 0,
      zhixuanActiveTabIndex: 0,
      selectedCheckList: [],
      disabledCheckBox: [],
      betData: {
        betList: []
      },
      canShowBetdialog1: false,
      updateLotteryTimer: null
    };
  },
  created() {
    this.fetchData();
    this.getWfData();
    console.log(sortByLine([1, 2, 3, 4, 5, 6, 7, 8], 2));
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
  destroyed() {
    clearTimeout(this.updateLotteryTimer);
  },
  components: {
    lotteryArea,
    betDialog,
    changLong,
    luZhu,
    betterBetDialog
  },
  methods: {
    setSelectedItemMoney(money) {
      console.log(document.querySelectorAll(".selected-bet-item"));
    },
    toggleSelected(event, item) {
      if (event.target.tagName === "INPUT" || !this.closeBet) {
        return;
      }
      let input = (event.currentTarget.querySelector("input").value =
        this.quickyMoney || "");
      event.currentTarget.classList.toggle("selected-bet-item");
    },
    changeSubNav(index, type) {
      this.reset();
      if (type === "直选") {
        this.zhixuanActiveTabIndex = index;
      }
      if (type === "连码") {
        this.lianmaActiveTabIndex = index;
      }
      this.selectedCheckList = [];
      this.betData.betList = [];
    },
    handleInputCheck(checkItem) {
      /* 任选 */
      if (this.classCode == 2) {
        if (this.lianmaActiveTabIndex + 2 <= 8) {
          if (this.selectedCheckList.length > this.lianmaActiveTabIndex + 2) {
            this.selectedCheckList.pop();
          }
          if (this.selectedCheckList.length == this.lianmaActiveTabIndex + 2) {
            this.canShowBetdialog1 = true;
          } else {
            this.canShowBetdialog1 = false;
          }
        }
        if (this.lianmaActiveTabIndex == 7) {
          /* 前二组选 */
          if (this.selectedCheckList.length > 2) {
            this.selectedCheckList.pop();
          }
          if (this.selectedCheckList.length == 2) {
            this.canShowBetdialog1 = true;
          } else {
            this.canShowBetdialog1 = false;
          }
        }

        if (this.lianmaActiveTabIndex == 8) {
          /* 前三组选 */
          if (this.selectedCheckList.length > 3) {
            this.selectedCheckList.pop();
          }
          if (this.selectedCheckList.length == 3) {
            this.canShowBetdialog1 = true;
          } else {
            this.canShowBetdialog1 = false;
          }
        }
      }
      /* 直选 */
      if (this.classCode == 3) {
        if (this.selectedCheckList.length >= 2) {
          let len = 0;
          /* 直选数字不能重复 */
          if (this.selectedCheckList[0].title == "前二直选") {
            len = 2;
          }

          if (this.selectedCheckList[0].title == "前三直选") {
            len = 3;
          }

          var arr = [];
          console.log(this.selectedCheckList, checkItem);
          this.selectedCheckList = _.uniqBy(this.selectedCheckList, "name");
          this.selectedCheckList.forEach(item => {
            arr.push(item.key.split("_")[2]);
          });

          if (Array.from(new Set(arr)).length >= len) {
            this.canShowBetdialog1 = true;
          } else {
            this.canShowBetdialog1 = false;
          }
        }
      }

      this.selectedCheckList.forEach(item => {
        item.money = this.quickyMoney || "";
      });
      let { game_code, round, type_code } = this;
      this.betData = {
        game_code,
        type_code,
        round,
        betList: this.selectedCheckList
      };
    },
    checkMoney() {
      let r = /^\+?[1-9][0-9]*$/; //正整数
      if (!r.test(this.quickyMoney)) {
        this.quickyMoney = "";
      }
      if (this.quickyMoney == "") {
        sessionStorage.removeItem("quickyMoney");
      }
    },
    getWfData() {
      let lmp = {
          game_code: this.game_code,
          type_code: 4010
        },
        danhao = {
          game_code: this.game_code,
          type_code: 4018
        },
        lianma = {
          game_code: this.game_code,
          type_code: 4019
        },
        zhixuan = {
          game_code: this.game_code,
          type_code: 4028
        };

      if (
        localStorage.getItem("gd11x5_list_0") &&
        localStorage.getItem("gd11x5_list_1") &&
        localStorage.getItem("gd11x5_list_2") &&
        JSON.parse(localStorage.getItem("gd11x5_list_0")).msg !== 4001
      ) {
        this.list_0 = JSON.parse(localStorage.getItem("gd11x5_list_0"));
        this.list_1 = JSON.parse(localStorage.getItem("gd11x5_list_1"));
        this.list_2 = JSON.parse(localStorage.getItem("gd11x5_list_2"));

        // console.log(this.type_code)
        if (this.type_code == 0) {
          this.list = this.list_0;
        } else if (this.type_code == 1) {
          this.list = this.list_1;
        } else {
          this.list = this.list_2;
        }
      } else {
        this.$http
          .all([
            this.getOdds(lmp),
            this.getOdds(danhao),
            this.getOdds(lianma),
            this.getOdds(zhixuan)
          ])
          .then(
            this.$http.spread((tab1Data, tab2Data, tab3Data, tab4Data) => {
              this.list_0 = [
                { name: "总和", list: tab1Data.data[0].list["balls"] },
                {
                  name: "第一球",
                  list: tab1Data.data[0].list["total"].slice(0, 4)
                },
                {
                  name: "第二球",
                  list: tab1Data.data[0].list["total"].slice(4, 8)
                },
                {
                  name: "第三球",
                  list: tab1Data.data[0].list["total"].slice(8, 12)
                },
                {
                  name: "第四球",
                  list: tab1Data.data[0].list["total"].slice(12, 16)
                },
                {
                  name: "第五球",
                  list: tab1Data.data[0].list["total"].slice(16, 20)
                }
              ];

              this.list = this.list_0;
              // 对接口返回的单号数据进行处理
              Object.keys(tab2Data.data[0].list).forEach(key => {
                tab2Data.data[0].list[key].map(item => {
                  item.title = item.name;
                });
              });
              this.list_1 = [
                { name: "一中一", list: tab2Data.data[0].list["onebyone"] },
                { name: "第一球", list: tab2Data.data[0].list["first"] },
                { name: "第二球", list: tab2Data.data[0].list["second"] },
                { name: "第三球", list: tab2Data.data[0].list["third"] },
                { name: "第四球", list: tab2Data.data[0].list["fourth"] },
                { name: "第五球", list: tab2Data.data[0].list["fifth"] }
              ];

              this.list_2 = [
                { name: "总和", list: tab2Data.data[0].list["balls"] },
                { name: "大小单双", list: tab2Data.data[0].list["total"] }
              ];

              /* 处理连码数据 */
              let lianmaData = [];
              Object.keys(tab3Data.data[0].list).forEach((key, index) => {
                let title = tab3Data.data[0].list[key][0].title;
                lianmaData[index] = {
                  title,
                  list: tab3Data.data[0].list[key]
                };
              });

              this.list_3 = lianmaData;

              /* 处理直选数据 */

              let zhixuanData = [];
              Object.keys(tab4Data.data[0].list).forEach((key, index) => {
                let title = tab4Data.data[0].list[key]["one"][0].title;
                let list = [];
                Object.keys(tab4Data.data[0].list[key]).forEach(
                  (key1, index) => {
                    let handledKey =
                      key1 == "one"
                        ? "第一球"
                        : key1 == "two"
                          ? "第二球"
                          : key1 == "three" ? "第三球" : "";
                    list[index] = {
                      name: handledKey,
                      list: tab4Data.data[0].list[key][key1]
                    };
                  }
                );
                zhixuanData[index] = {
                  title,
                  list: list
                };
              });
              this.list_4 = zhixuanData;
              console.log(zhixuanData);
              this.$refs.cName.className = "qiu";
              /* localStorage.setItem('gd11x5_list_0', JSON.stringify(this.list_0))
              localStorage.setItem('gd11x5_list_1', JSON.stringify(this.list_1))
              localStorage.setItem('gd11x5_list_2', JSON.stringify(this.list_2)) */
            })
          );
      }
    },
    fetchData(i) {
      let params = {};

      params.game_code = 133;
      this.$http
        .post("/getinfo/game", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == "4001") {
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
          } else {
            this.$store.commit("updatelotteryMoney", res.data.lcurrency);
            let timeStamp = res.data.next.timestap;
            this.endtime =
              parseInt(res.data.next.endtime) - parseInt(timeStamp);
            this.closetime =
              parseInt(res.data.next.closetime) - parseInt(timeStamp);
            this.closeBet = !res.data.next.isclose;
            this.body = res.data;
            this.isLotteryArea = true;
            this.round = res.data.next.round;
            this.todayWinLost = parseFloat(res.data.UserResult);
            /* 封盘时间 */
            this.fentime = res.data.next.endtime - res.data.next.closetime;
            if (res.data.next.round - res.data.last.round != 1) {
              this.updateLotteryTimer = setTimeout(() => {
                this.fetchData(i);
              }, 2000);
            }
          }
        })
        .catch(function() {
          console.log("网络异常！");
        });
    },
    listenToMyBoy: function(i) {
      if (i === "close") {
        this.showDialog = false;
        this.betArr = [];
        this.reset();
      }
    },
    getOdds(i) {
      return this.$http.post("/getinfo/odds", JSON.stringify(i));
    },
    changeNav(i, code) {
      this.list = this[`list_${i}`];
      this.$refs.cName.className = "";
      this.classCode = i;
      this.reset();
      this.type_code = code;
      this.betData.betList = [];
      this.selectedCheckList = [];
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
      if (this.classCode == 2 || this.classCode == 3) {
        this.reset();
      }
      if (!this.closeBet) {
        this.$swal({
          text: "已封盘！",
          type: "error",
          timer: 1200
        });
        return;
      }

      if (this.classCode == 2 || this.classCode == 3) {
        if (!this.canShowBetdialog1) {
          this.$swal({
            text: "不满足下注条件！",
            type: "error",
            timer: 1200
          });
          return;
        }
        this.$store.commit("setConfirmShow", true);
        this.canShowBetdialog1 = false;
        return;
      }

      for (let i = 0; i < this.$refs.inputText.length; i++) {
        if (this.$refs.inputText[i].value > 0) {
          let ite = JSON.parse(
            this.$refs.inputText[i].getAttribute("data-obj")
          );
          let title = this.$refs.inputText[i].getAttribute("name");
          if (this.classCode == 0) {
            ite.title = "";
          }
          if (this.classCode == 1) {
            ite.title = title;
          }
          ite.money = this.$refs.inputText[i].value;
          this.betArr.push(ite);
        }
      }
      console.log(this.betArr);

      if (this.betArr.length == 0) {
        this.$swal({
          text: "请选择下注项目！",
          type: "error",
          timer: 1200
        });
        return;
      }
      this.showDialog = true;
    },
    chkInput() {
      for (let i = 0; i < this.$refs.inputText.length; i++) {
        this.$refs.inputText[i].value.replace(/\D/g, "");
        if (this.$refs.inputText[i].value == 0) {
          this.$refs.inputText[i].value = "";
        }
        if (this.$refs.inputText[i].value === "e") {
          return 0;
        }
      }
    },
    inputFocus(key) {
      let quickyMoney = sessionStorage.getItem("quickyMoney");
      if (quickyMoney > 0) {
        key.target.value = quickyMoney;
      } else {
        return false;
      }
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
      this.selectedCheckList = [];
      for (let i = 0; i < this.$refs.inputText.length; i++) {
        this.$refs.inputText[i].value = "";
      }
      Array.from(document.querySelectorAll(".selected-bet-item")).forEach(
        item => {
          item.classList.remove("selected-bet-item");
        }
      );
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
        this.reset();
      } else {
        this.closetime--;
        let timeStamp = Date.parse(new Date()) / 1000;
      }
    }, 1000);
  },
  watch: {
    endtime: function() {
      if (this.endtime <= 0) {
        this.fetchData(1);
        this.showDialog = false;
      }
    },
    quickyMoney: function(money) {
      let selectedInputList = document.querySelectorAll(
        ".selected-bet-item input"
      );
      Array.from(selectedInputList).forEach(item => {
        item.value = money;
      });
    }
  }
};
</script>

<style scoped>
#gd11x5_nav_0 > li:first-child,
#gd11x5_nav_1 > li:first-child,
#gd11x5_nav_3 > li:first-child {
  width: 100%;
}
#gd11x5_nav_0 > li,
#gd11x5_nav_1 > li {
  width: 20%;
}

#gd11x5_nav_3 > li {
  display: block;
}

#gd11x5_nav_3 .bet-wf-item {
  display: flex;
  flex-wrap: wrap;
}

#gd11x5_nav_3 .bet-wf-item > div {
  width: 16.6%;
  margin-bottom: 10px;
}

#gd11x5_nav_0 > li:first-child .bet-wf-item,
#gd11x5_nav_1 > li:first-child .bet-wf-item,
#gd11x5_nav_3 > li:first-child .bet-wf-item {
  display: flex;
  flex-wrap: wrap;
}
#gd11x5_nav_0 > li:first-child .bet-wf-item > div,
#gd11x5_nav_1 > li:first-child .bet-wf-item > div {
  width: 25%;
}

#gd11x5_nav_3 > li:first-child .bet-wf-item > div {
  width: 16.6%;
}

#gd11x5_nav_3 .game_title {
  border-top: none;
  background-color: #eff6ff;
  padding: 0 20px;
  margin-bottom: 10px;
}

#gd11x5_nav_3 li div:not(.game_title) {
  display: inline-block;
}

.game_info ul li span:nth-child(1) {
  margin: 0;
}
.game_info ul li input {
  margin-left: 0;
}

.game_info ul li span {
  margin: 0 5px;
}

#gd11x5_nav_1 .bet-wf-item-title,
#gd11x5_nav_2 .bet-wf-item-title,
#gd11x5_nav_3 .bet-wf-item-title {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  line-height: 24px;
  background: url("../../../static/images/common/blue_ball.png") no-repeat
    center center;
  background-size: cover;
  color: black;
  font-weight: bold;
  font-size: 12px;
}

#gd11x5_nav_2 {
  text-align: left;
}

/* 二级菜单 */

.lianma-tab-list li button {
  background-color: #eff6ff;
  border: none;
  padding: 6px 8px;
  color: #7b73be;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  position: relative;
  /*border-right: 2px solid #b5b2d8;*/
  outline: none;
}
.lianma-tab-list li:last-child button {
  border-right: none;
}
.lianma-tab-list li button.active {
  color: #fff;
  background-color: #3e80d4;
}
.bet-box-lianma-tab {
  padding: 0;
  padding-bottom: 20px;
}

.lianma-tab-list {
  display: flex;
  position: relative;
  height: 30px;
  margin: 0;
  margin-bottom: 5px;
  background-color: #eff6ff;
}

/* .lianma-tab-list > li {
  flex: 1;
} */

#gd11x5_nav_2 > li {
  width: 20%;
  display: inline-flex;
}

.game_info ul li input[type="checkbox"] {
  margin-left: 15px;
  flex: none;
}

.bet-wf-item > div:hover {
  background-color: #e1e1e1;
}

.selected-bet-item {
  background-color: #ffd194;
}

#gd11x5_nav_0 li:not(:first-child) div:not(.game_title),
#gd11x5_nav_1 li:not(:first-child) div:not(.game_title) {
  width: 94%;
  margin: 3px 2%;
}

.game_info #gd11x5_nav_2 li label,
.game_info #gd11x5_nav_3 li label {
  display: flex;
}
.game_info #gd11x5_nav_2 li label div:not(.game_title) {
  flex: 1;
  line-height: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.game_info #gd11x5_nav_3 li label div:not(.game_title) {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.game_info #gd11x5_nav_2 li label,
.game_info #gd11x5_nav_3 li label {
  width: 96%;
}

.game_info ul li label > div {
  width: 100%;
}
</style>

