<template>
    <div class="content markSixArea">
      <div style='position:fixed;width:100%;height:100%;z-index:999;' v-if="overlay"></div>
        <!-- 右侧头部导航 -->
       <div style='height:80px'>
           <lottery-area v-if = "isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime"  gameType="20" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
        <div v-else = "isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
       </div>

        <!-- 下注弹窗 -->
        <bet-dialog v-if="showDialog" :betArr="betArr" :game_code=270 :type_code=type_code :round="round"  v-on:child-say="listenToMyBoy"></bet-dialog>
         <lh-dialog v-if="showHmDialog" :indeT="indeT" :betArr="betArr" :game_code=game_code :type_code=type_code :round="round"  v-on:child-hm="listenHm"></lh-dialog>
         <!-- 连码下注弹窗 -->
      <lm-dialog v-if="showLmDialog" :betArr="betArr" :game_code=game_code :type_code=type_code :round="round"  v-on:child-lm="listenLm"></lm-dialog>
        <nav class="top-nav">
            <ul class="clearfix">
              <li v-for="(itmek,indexNav) in datas"  @click="changgeNav(itmek,indexNav)" :class='{active:itmek==select}'><span>{{itmek.name}}</span></li>
            </ul>
        </nav>

        <div class="markSixSubNav" v-if = "datas[navI].datasT.length>1">
          <!-- <h3>投注方式</h3> -->
          <div>
              <ul class="clearfix">
                <li class="li_4 f-l" v-for='(item,index) in datas[navI].datasT'>
                  <button :disabled="item.isCheck" :class="{isred:item.isCheck}" @click="one(item)">{{item._name}}</button>
                </li>
              </ul>
            </div>
          </div>

        <div class="bet-content">
          <div class="bet-center">
            <div class="bet-box">
                <div class="bet-area">
                    <div class="game">
                        <!-- <div class="game_title lm_title" v-if = "navI===4"> -->
                            <!-- <h3>连码</h3> -->
                        <!-- </div> -->
                        <div class="six_lm_ball" v-if = "navI===4">
                           <ul class="">
                             <li @click.stop.prevent="toggleCheckbox" v-for = "i in [1,11,21,31,41,2,12,22,32,42,3,13,23,33,43,4,14,24,34,44,5,15,25,35,45,6,16,26,36,46,7,17,27,37,47,8,18,28,38,48,9,19,29,39,49,10,20,30,40]">
                               <label class="hover-color">
                                  <span :class="`lm_ball lm_ball_${i}`">{{i}}</span>
                                  <input type="checkbox" @click.stop="chkbox" :value="i" ref="check"  v-if="closeBet">
                                  <input v-else  readonly value="封盘" class="closeBet" style='width:30px;'>
                                </label>
                             </li>
                           </ul>
                        </div>

                        <!-- <div class="six_lm_ball" v-if = "navI===11">
                           <ul class="">
                             <li v-for = "i in [1,11,21,31,41,2,12,22,32,42,3,13,23,33,43,4,14,24,34,44,5,15,25,35,45,6,16,26,36,46,7,17,27,37,47,8,18,28,38,48,9,19,29,39,49,10,20,30,40]">
                               <label>
                                  <span :class="`lm_ball lm_ball_${i}`">{{i}}</span>
                                  <span></span>
                                  <input type="checkbox" :value="i" ref="check" >
                                </label>
                             </li>
                           </ul>
                        </div> -->

                        <div class="game_info markSix">
                            <ul :id="`marksix_nav_${type_code}`" ref='cName' class="clearfix">
                                <li v-for='(item,j) in list'>
                                    <!-- <div class="game_title" v-if = "isNav.indexOf(param.type_code)===-1"> -->
                                    <div class="game_title" v-if="type_code > 10&&type_code < 17">
                                        <h3>{{item.name}}</h3>
                                    </div>
                                    <!-- <div> -->
                                   <div class="clearfix hover-color" v-for='(ite,i,j) in item.list' @click.stop="toggleCheckbox" style="cursor: pointer">
                                      <label>
                                        <span :class="`tm_ball_${ite.name}`" style='cursor:pointer;'>{{ite.name}}</span>
                                        <!--<span @click='type_code>=17?"":confirms(item.name, ite.key ,JSON.stringify(ite))' style='cursor:pointer;'>{{ite.odds}}</span>-->
                                        <span style='cursor:pointer;'>{{ite.odds}}</span>
                                        <input v-if="closeBet && navI >= 8" type="checkbox" @click.stop="chkBox" ref='kuang' :id="ite.key" :title="item.name" :name="ite.name" :data-obj="JSON.stringify(ite)"  @focus="inputFocus($event, ite)" @input="chkInput()" min="1" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7"/>
                                        <input v-else-if="closeBet && navI < 8" type="text" ref='kuang' :id="ite.key" :title="item.name" :name="ite.name" :data-obj="JSON.stringify(ite)"  @focus="inputFocus($event, ite)" @input="chkInput()" min="1" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7"/>
                                        <input v-else readonly value="封盘" class="closeBet">
                                      </label>
                                  </div>
                                  <div  class="banbo"  v-if='type_code == 14'>
                                    <div  v-for='i in bose' >
                                         <span v-for='j in i'>{{j}}</span>
                                    </div>
                                  </div>

                                   <div  class="marksixNavLeft"  v-if='type_code >=15 && type_code <=33'>
                                      <div  v-for='i in bose1' >
                                           <span v-for='j in i.numbers' class="lhc_ball_num" :class="`lhc_ball_num_${j}`">{{j}}</span>
                                      </div>
                                  </div>

                                  <div  class="marksixNav"  v-if='type_code >=34 && type_code <=39'>
                                      <div  v-for='i in bose2' >

                                           <span v-for='j in i' class="lhc_ball_num" :class="`lhc_ball_num_${j}`">{{j}}</span>
                                      </div>
                                  </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                 <div class="btn-bet">
                   <!-- <input id='fast' type="button" name="" value="快选金额"/> -->
                   <el-checkbox  v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
                   <input type="text" @input="checkMoney()" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney"/>

                   <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
                   <input @click="reset" type="button" name="" class="btn-blue" value="重置"/>

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
import lmDialog from "../../components/lmDialog";
import lhDialog from "../../components/lhDialog";
import changLong from "../../components/changlong";
import {cacheGame} from "@/utils"
import { togglePlayActive, clearAllActives } from '../../utils/common'
export default {
  data() {
    return {
      title:null,
      overlay:false,
      getApiName: getApiName(),
      indeT: 2,
      configT: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 41, 42, 43, 44, 45, 46, 47],
      select: 0,
      navI: 0,
      betlm: {},
      fentime: 60,
      list: [],
      isNav: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: "lotteryMarksix",
      lotteryName: "极速六合彩",
      type_code: 2,
      game_code: 270,
      round: 0,
      lian: false,
      endtime: 0,
      closetime: 0,
      oddsMoney: {},
      showHmDialog: false,
      closeBet: true,
      betInfo: {},
      betArr: [],
      body: {},
      betArrs: [],
      isLotteryArea: false,
      showDialog: false,
      isSaveMoney: false,
      quickyMoney: 0,
      showLmDialog: false,
      todayWinLost: 0,
      param: { game_code:270, type_code: 2 },
      bose: [
        ["1", "7", "13", "19", "23", "29", "35", "45"],
        ["2", "8", "12", "18", "24", "30", "34", "40", "46"],
        ["29", "30", "34", "35", "40", "45", "46"],
        ["1", "2", "7", "8", "12", "13", "18", "19", "23", "24"],
        ["5", "11", "17", "21", "27", "33", "39", "43", "49"],
        ["6", "16", "22", "28", "32", "38", "44"],
        ["27", "28", "32", "33", "38", "39", "43", "44", "49"],
        ["5", "6", "11", "16", "17", "21", "22"],
        ["3", "9", "15", "25", "31", "37", "41", "47"],
        ["4", "10", "14", "20", "26", "36", "42", "48"],
        ["25", "26", "31", "36", "37", "41", "42", "47", "48"],
        ["3", "4", "9", "10", "14", "15", "20"],
        ["1", "7", "23", "29", "45", "12", "18", "30", "34"],
        ["13", "19", "35", "02", "08", "24", "40", "46"],
        ["5", "16", "21", "27", "32", "38", "43", "49"],
        ["6", "11", "17", "22", "28", "33", "39", "44"],
        ["3", "9", "25", "41", "47", "10", "14", "36"],
        ["15", "31", "37", "4", "20", "26", "42", "48"]
      ],
      bose1: null,
      bose2: [
        ["1", "11", "21", "31", "41"],
        ["2", "12", "22", "32", "42"],
        ["3", "13", "23", "33", "43"],
        ["4", "14", "24", "34", "44"],
        ["5", "15", "25", "35", "45"],
        ["6", "16", "26", "36", "46"],
        ["7", "17", "27", "37", "47"],
        ["8", "18", "28", "38", "48"],
        ["9", "19", "29", "39", "49"],
        ["10", "20", "30", "40"]
      ],
      datas: [
        {
          // claaName: "cqList1",
          name: "特码",
          isCheck: true,
          datasT: [
            {
              isCheck: false,
              _name: "特A",
              _index: "tma",
              typecode: 1
            },
            {
              isCheck: true,
              _name: "特B",
              _index: "tmb",
              typecode: 2
            }
          ]
        },
        {
          name: "正码",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _name: "正A",
              _index: "zhma",
              typecode: 3
            },
            {
              isCheck: false,
              _name: "正B",
              _index: "zhmb",
              typecode: 4
            }
          ]
        },
        {
          isCheck: false,
          name: "正码特",
          datasT: [
            {
              isCheck: true,
              _name: "正1特",
              _index: "tm1",
              typecode: 5
            },
            {
              isCheck: false,
              _name: "正2特",
              _index: "tm2",
              typecode: 6
            },
            {
              isCheck: false,
              _name: "正3特",
              _index: "tm3",
              typecode: 7
            },
            {
              isCheck: false,
              _name: "正4特",
              _index: "tm4",
              typecode: 8
            },
            {
              isCheck: false,
              _name: "正5特",
              _index: "tm5",
              typecode: 9
            },
            {
              isCheck: false,
              _name: "正6特",
              _index: "tm6",
              typecode: 10
            }
          ]
        },
        {
          name: "正码1-6",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _index: "zhydl",
              typecode: 11
            }
          ]
        },
        {
          name: "连码",
          isCheck: false,
          lianma: 13,
          datasT: [
            {
              isCheck: true,
              _name: "三全中(670)",
              typecode: 617,
              inde: 3,
              maxIsCheck: 10
            },
            {
              isCheck: false,
              _name: "三中二,三(20/110)",
              typecode: 619,
              inde: 3,
              maxIsCheck: 10
            },
            {
              isCheck: false,
              _name: "二全中(60)",
              typecode: 613,
              inde: 2,
              maxIsCheck: 10
            },
            {
              isCheck: false,
              _name: "二中特,二(25/50)",
              typecode: 615,
              inde: 2,
              maxIsCheck: 10
            },
            {
              isCheck: false,
              _name: "特串(150)",
              typecode: 616,
              inde: 2
            },
            {
              isCheck: false,
              _name: "四中一(1.9)",
              typecode: 808,
              inde: 4,
              maxIsCheck: 10
            }
          ]
        },
        {
          name: "半波",
          isCheck: false,
          datasT: [
            {
              isCheck: true,

              _index: "banbo",
              typecode: 14
            }
          ]
        },
        {
          name: "一肖/尾数",
          isCheck: false,
          datasT: [
            {
              isCheck: true,

              _index: "yxiao",
              typecode: 15
            }
          ]
        },
        {
          name: "特码生肖",
          isCheck: false,
          datasT: [
            {
              isCheck: true,

              _index: "tex",
              typecode: 16
            }
          ]
        },
        {
          name: "合肖",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _name: "二肖",
              _index: "hx2",
              typecode: 17,
              inde: 2
            },
            {
              isCheck: false,
              _name: "三肖",
              _index: "hx3",
              typecode: 18,
              inde: 3
            },
            {
              isCheck: false,
              _name: "四肖",
              _index: "hx4",
              typecode: 19,
              inde: 4
            },
            {
              isCheck: false,
              _name: "五肖",
              _index: "hx5",
              typecode: 20,
              inde: 5
            },
            {
              isCheck: false,
              _name: "六肖",
              _index: "hx6",
              typecode: 21,
              inde: 6
            }
          ]
        },
        // {
        //   name: "过关",
        //   isCheck: false,
        //   datasT: [{
        //     isCheck: true,
        //     _index: "guoguan",
        //     typecode: 12
        //   }]
        // },
        {
          name: "生肖连",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _name: "二肖连中",
              _index: "sxl2zh",
              typecode: 27,
              inde: 2,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "三肖连中",
              _index: "sxl3zh",
              typecode: 28,
              inde: 3,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "四肖连中",
              _index: "sxl4zh",
              typecode: 29,
              inde: 4,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "五肖连中",
              _index: "sxl5zh",
              typecode: 30,
              inde: 5,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "二肖连不中",
              _index: "sx2bzh",
              typecode: 31,
              inde: 2,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "三肖连不中",
              _index: "sx3bzh",
              typecode: 32,
              inde: 3,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "四肖连不中",
              _index: "sx4bzh",
              typecode: 33,
              inde: 4,
              maxIsCheck: 8
            }
          ]
        },
        {
          name: "尾数连",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _name: "二尾连中",
              _index: "wl2zh",
              typecode: 34,
              inde: 2,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "三尾连中",
              _index: "wl3zh",
              typecode: 35,
              inde: 3,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "四尾连中",
              _index: "wl4zh",
              typecode: 36,
              inde: 4,
              maxIsCheck: 8
            },

            {
              isCheck: false,
              _name: "二尾连不中",
              _index: "wl2bz",
              typecode: 37,
              inde: 2,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "三尾连不中",
              _index: "wl3bz",
              typecode: 38,
              inde: 3,
              maxIsCheck: 8
            },
            {
              isCheck: false,
              _name: "四尾连不中",
              _index: "wl4bz",
              typecode: 39,
              inde: 4,
              maxIsCheck: 8
            }
          ]
        },
        {
          name: "全不中",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _name: "五不中",
              _index: "bz5",
              typecode: 40,
              inde: 5
            },
            {
              isCheck: false,
              _name: "六不中",
              _index: "bz6",
              typecode: 41,
              inde: 6
            },
            {
              isCheck: false,
              _name: "七不中",
              _index: "bz7",
              typecode: 42,
              inde: 7
            },

            {
              isCheck: false,
              _name: "八不中",
              _index: "bz8",
              typecode: 43,
              inde: 8
            },
            {
              isCheck: false,
              _name: "九不中",
              _index: "bz9",
              typecode: 44,
              inde: 9
            },
            {
              isCheck: false,
              _name: "十不中",
              _index: "bz10",
              typecode: 45,
              inde: 10
            },
            {
              isCheck: false,
              _name: "十一不中",
              _index: "bz11",
              typecode: 46,
              inde: 11
            },
            {
              isCheck: false,
              _name: "十二不中",
              _index: "bz12",
              typecode: 47,
              inde: 12
            }
          ]
        }
      ]
    };
  },
  components: {
    lotteryArea,
    betDialog,
    lmDialog,
    lhDialog,
    changLong
  },
  created() {
    this.getSixnumber();
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
  methods: {
    overlaymethod(){
      this.overlay = false
    },
    getSixnumber () {
      if (cacheGame('sixnumber')){
        this.bose1 = cacheGame('sixnumber')
      } else {
        this.$http.post("/user/getMarkSixNumbers").then(res => {
          if(res.data) {
            cacheGame('sixnumber', this.bose1)
            this.bose1 = res.data;
          }
        })
      }
    },
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
    fetchData(i) {
      i==1?"":this.select = this.datas[0];

      let params = {};

      params.game_code = 270;
      this.$http.post("/getinfo/game", JSON.stringify(params))
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
          let timeStamp = res.data.next.timestap;
          this.endtime = parseInt(res.data.next.endtime) - parseInt(timeStamp);
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
        })
        .catch(function() {
          this.$router.push({
            path: "/home"
          });
        });
      //  this.param.type_code = 0;

      if (cacheGame(`sixGame_${this.param.type_code}`)){
        this.list = cacheGame(`sixGame_${this.param.type_code}`)
      } else {
        this.$http
        .post("/getinfo/odds", JSON.stringify(this.param))
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
          if (this.configT.indexOf(this.param.type_code) != -1) {
            if (this.type_code == 15) {
              let yixiao = {};
              let weishu = {};
              yixiao.list = res.data[0].list.slice(0, 12);
              weishu.list = res.data[0].list.slice(12, 22);
              res.data = [];
              res.data.push(yixiao, weishu);
            }
            let tema = [];
            for (let i = 0; i <= Math.floor(res.data[0].list.length / 5); i++) {
              for (let j = 0; j < 5; j++) {
                if (res.data[0].list[i + 10 * j]) {
                  tema.push(res.data[0].list[i + 10 * j]);
                }
              }
            }
            res.data[0].list = tema;
          }
          cacheGame(`sixGame_${this.param.type_code}`, res.data)
          this.list = res.data;

        })
        .catch(function() {
        });

      }
    },
    listenToMyBoy: function(i) {
      if (i === "close") {
        this.showDialog = false;
        this.reset()
      }
    },
    listenLm: function(i) {
      if (i === "close") {
        this.showLmDialog = false;
      }
    },
    changgeNav(itmek, index) {
			clearAllActives()// 去掉颜色的选中状态

      let nav = {
        4:"三全中",
        8:"二肖",
        9:"二肖连中",
        10:"二尾连中",
        11:"五不中"
      }
      if(index==4||index==8||index==9||index==10||index==11){
        this.name = nav[index];
      }else{
        this.name = itmek.name
      }
      this.overlay=true
      setTimeout(this.overlaymethod,600)
      for (let i = 0; i < this.datas.length; i++) {
        for (let j = 0; j < this.datas[i].datasT.length; j++) {
          this.datas[i].datasT[j].isCheck = false;
        }
        this.datas[i].datasT[0].isCheck = true;
      }
      if (itmek.name == "特码") {
        this.datas[0].datasT[1].isCheck = true;
        this.datas[0].datasT[0].isCheck = false;
      }

      for (let i = 0; i < this.$refs.kuang.length; i++) {
        this.$refs.kuang[i].value = "";
      }
      itmek.datasT[0].inde
        ? (this.indeT = itmek.datasT[0].inde)
        : (this.indeT = null);
      this.select = itmek;

      this.navI = index;
      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].isCheck = false;
      }
      itmek.isCheck = true;
      index != 0
        ? (this.param.type_code = itmek.datasT[0].typecode)
        : (this.param.type_code = itmek.datasT[1].typecode);
      index != 0
        ? (this.type_code = itmek.datasT[0].typecode)
        : (this.type_code = itmek.datasT[1].typecode);

      if (cacheGame(`sixGame_${this.param.type_code}`)){
        this.list = cacheGame(`sixGame_${this.param.type_code}`)
        this.reset();
      }else{
      this.$http
        .post("/getinfo/odds", JSON.stringify(this.param))
        .then(res => {
          if (this.type_code == 15) {
            let yixiao = {};
            let weishu = {};
            yixiao.list = res.data[0].list.slice(0, 12);
            yixiao.name = "一肖";
            weishu.list = res.data[0].list.slice(12, 22);
            weishu.name = "尾数";

            res.data = [];
            res.data.push(yixiao, weishu);
          }

          if (this.configT.indexOf(this.param.type_code) != -1) {
            let tema = [];
            for (let i = 0; i <= Math.floor(res.data[0].list.length / 5); i++) {
              for (let j = 0; j < 5; j++) {
                if (res.data[0].list[i + 10 * j]) {
                  tema.push(res.data[0].list[i + 10 * j]);
                }
              }
            }
            res.data[0].list = tema;
          }
          cacheGame(`sixGame_${this.param.type_code}`, res.data)
          this.list = res.data;
          this.reset();

        })
        .catch(function() {});
      }
      this.reset();
    },
    one(item, e) {
      this.name = item._name
      this.overlay=true
      setTimeout(this.overlaymethod,600)
      for (let i = 0; i < this.datas[this.navI].datasT.length; i++) {
        this.datas[this.navI].datasT[i].isCheck = false;
      }
      this.typecode = e;
      switch (e) {
        case 617:
          this.LimitMin = 3;
          this.LimitMax = 10;
          break;
        case 619:
          this.LimitMin = 3;
          this.LimitMax = 10;
          break;
        case 613:
          this.LimitMin = 2;
          this.LimitMax = 10;
          break;
        case 615:
          this.LimitMin = 2;
          this.LimitMax = 10;
          break;
        case 616:
          this.LimitMin = 5;
          this.LimitMax = 6;
          break;
        case 808:
          this.LimitMin = 4;
          this.LimitMax = 10;
          break;
        case 12:
          this.LimitMin = 2;
          this.LimitMax = 9;
          break;
      }
      item.inde ? (this.indeT = item.inde) : (this.indeT = 0);

      item.isCheck = true;
      this.param.type_code = item.typecode;
      this.type_code = item.typecode;

      if (cacheGame(`sixGame_${this.param.type_code}`)){
        this.list = cacheGame(`sixGame_${this.param.type_code}`)
        this.reset();
      }else{
      this.$http
        .post("/getinfo/odds", JSON.stringify(this.param))
        .then(res => {
          if (this.configT.indexOf(this.param.type_code) != -1) {
            let tema = [];
            for (let i = 0; i <= Math.floor(res.data[0].list.length / 5); i++) {
              for (let j = 0; j < 5; j++) {
                if (res.data[0].list[i + 10 * j]) {
                  tema.push(res.data[0].list[i + 10 * j]);
                }
              }
            }
            res.data[0].list = tema;
          }
          cacheGame(`sixGame_${this.param.type_code}`, res.data)
          this.list = res.data;


        })
        .catch(function() {});
         this.reset();
      }
    },
    listenHm: function(i) {
      if (i === "close") {
        this.showHmDialog = false;
      }
    },
    closeDialog(){
      this.$emit('child-say', 'close');
    },
    chkBox(event) {
			let inputEl = event.target
			let wrapperEl = inputEl.parentNode.tagName == 'LI' ? inputEl.parentNode : inputEl.parentNode.parentNode
			if (wrapperEl.classList.contains('active-color')) {
				wrapperEl.classList.remove('active-color')// 去掉勾
			} else {
				wrapperEl.classList.add('active-color')// 打上勾
			}
      /*this.showLmDialog = false;
      let cboxLength = 0;

      if (this.type_code === 12) {
        // 过关
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if (this.$refs.kuang[i].checked) {
            cboxLength++;
          }
        }
      } else {
        for (let i = 0; i < this.$refs.check.length; i++) {
          if (this.$refs.check[i].checked) {
            cboxLength++;
          }
        }
      }

      if (cboxLength === 0) {
        this.$swal({
          text: "选项范围：" + this.LimitMin + "~" + this.LimitMax + "个号码",
          type: "error",
          timer: 1200
        })
          .then(function(response) {})
          .catch(e => {});
        this.showLmDialog = false;
        return;
      }

      if (cboxLength > this.LimitMax - 1 && this.type_code !== 12) {
        for (let i = 0; i < this.$refs.check.length; i++) {
          if (!this.$refs.check[i].checked) {
            this.$refs.check[i].setAttribute("disabled", "true");
          } else {
            this.$refs.check[i].removeAttribute("disabled");
          }
        }
        return;
      }*/
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

    confirm(e) {
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
          timer: 1200
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }

      if (
        this.type_code === 617 ||
        this.type_code == 619 ||
        this.type_code == 613 ||
        this.type_code == 615 ||
        this.type_code == 616 ||
        this.type_code == 808 ||
        this.type_code === 12
      ) {
        // 连码下注
        this.betArr = [];
        // this.chkBox();
        let betnumber = [];
        switch (this.type_code) {
          case 617:
            this.LimitMin = 3;
            this.LimitMax = 10;
            break;
          case 619:
            this.LimitMin = 3;
            this.LimitMax = 10;
            break;
          case 613:
            this.LimitMin = 2;
            this.LimitMax = 10;
            break;
          case 615:
            this.LimitMin = 2;
            this.LimitMax = 10;
            break;
          case 616:
            this.LimitMin = 2;
            this.LimitMax = 10;
            break;
          case 808:
            this.LimitMin = 4;
            this.LimitMax = 10;
            break;
          case 12:
            this.LimitMin = 2;
            this.LimitMax = 9;
            break;
        }

        this.betlm = {};
        this.betlm.game_code = this.game_code;
        this.betlm.type_code = this.datas[4].lianma;
        this.betlm.round = this.round;
        this.betlm.typecode = this.type_code;
        this.betlm.title = this.name;

        if (this.type_code === 12) {
          // 过关
          for (let i = 0; i < this.$refs.kuang.length; i++) {
            if (this.$refs.kuang[i].checked) {
              // betnumber.push(this.$refs.kuang[i].value);
              let ite = JSON.parse(
                this.$refs.kuang[i].getAttribute("data-obj")
              );
              let name = ite.name;
              let odds = ite.odds;
              let val = ite.key.replace("ip_", "");
              // betnumber.push(val);
              // betnumber.push(odds);
              betnumber.push(val);
              // this.betArr.push(name);
              // this.betArr.push(val);
            }
          }
        } else {
          for (let i = 0; i < this.$refs.check.length; i++) {
            if (this.$refs.check[i].checked) {
              betnumber.push(this.$refs.check[i].value);
              let ite = JSON.parse(
                this.$refs.check[i].getAttribute("data-obj")
              );
            }
          }
        }


        // 判断选中的号码数量
        let cboxLength = 0;
        if (this.type_code === 12) {
          // 过关
          for (let i = 0; i < this.$refs.kuang.length; i++) {
            if (this.$refs.kuang[i].checked) {
              cboxLength++;
            }
          }
        } else {
          for (let i = 0; i < this.$refs.check.length; i++) {
            if (this.$refs.check[i].checked) {
              cboxLength++;
            }
          }
        }

        if (cboxLength < this.LimitMin || cboxLength > this.LimitMax) {
          this.$swal({
            text: "选项范围：" + this.LimitMin + "~" + this.LimitMax + "个号码",
            type: "error",
            timer: 1200
          })
            .then(function(response) {})
            .catch(e => {});
          this.showLmDialog = false;
          return;
        }

        if (this.type_code === 12) {
          this.betlm.type_code = this.type_code;
          delete this.betlm.typecode;
        }

        this.betlm.number = betnumber;
        this.betArr.push(this.betlm);
        this.showLmDialog = true;
        this.reset();
      } else if (17 <= this.type_code && this.type_code <= 47) {
        // alert(17<=this.type_code<=40)
        this.betArr = [];
        // this.chkBox ();
        let betnumber = [];
        let betnumber1 = [];
        switch (this.type_code) {
          case 17:
            this.LimitMin = 2;
            break;
          case 18:
            this.LimitMin = 3;
            break;
          case 19:
            this.LimitMin = 4;
            break;
          case 20:
            this.LimitMin = 5;
            break;

          case 21:
            this.LimitMin = 6;
            break;
          case 27:
            this.LimitMin = 2;
            this.LimitMax = 8;
            break;
          case 28:
            this.LimitMin = 3;
            this.LimitMax = 8;
            break;
          case 29:
            this.LimitMin = 4;
            this.LimitMax = 8;
            break;
          case 30:
            this.LimitMin = 5;
            this.LimitMax = 8;
            break;
          case 31:
            this.LimitMin = 2;
            this.LimitMax = 8;
            break;
          case 32:
            this.LimitMin = 3;
            this.LimitMax = 8;
            break;
          case 33:
            this.LimitMin = 4;
            this.LimitMax = 8;
            break;
          case 34:
            this.LimitMin = 2;
            this.LimitMax = 8;
            break;
          case 35:
            this.LimitMin = 3;
            this.LimitMax = 8;
            break;
          case 36:
            this.LimitMin = 4;
            this.LimitMax = 8;
            break;
          case 37:
            this.LimitMin = 2;
            this.LimitMax = 8;
            break;
          case 38:
            this.LimitMin = 3;
            this.LimitMax = 8;
            break;
          case 39:
            this.LimitMin = 4;
            this.LimitMax = 8;
            break;
          case 40:
            this.LimitMin = 5;
            this.LimitMax = 10;
            break;
          case 41:
            this.LimitMin = 6;
            this.LimitMax = 10;
            break;
          case 42:
            this.LimitMin = 7;
            this.LimitMax = 10;
            break;
          case 43:
            this.LimitMin = 8;
            this.LimitMax = 10;
            break;
          case 44:
            this.LimitMin = 9;
            this.LimitMax = 11;
            break;
          case 45:
            this.LimitMin = 10;
            this.LimitMax = 12;
            break;
          case 46:
            this.LimitMin = 11;
            this.LimitMax = 13;
            break;
          case 47:
            this.LimitMin = 12;
            this.LimitMax = 15;
            break;
        }

        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if (this.$refs.kuang[i].checked) {
            betnumber.push(this.$refs.kuang[i].name);
            let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"));
            ite.key = ite.key.split("_")[1];
            betnumber1.push(ite.key);
          }
        }
        this.betlm = {};
        this.betlm.game_code = this.game_code;
        this.betlm.round = this.round;
        this.betlm.type_code = this.type_code;
        this.betlm.title = this.name;

        let cboxLength = 0;
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if (this.$refs.kuang[i].checked) {
            cboxLength++;
          }
        }
        if (17 <= this.type_code && this.type_code <= 21) {
          if (cboxLength < this.LimitMin || cboxLength > this.LimitMin) {
            this.$swal({
              text: "请选择" + this.LimitMin + "个号码",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
            this.showHmDialog = false;
            return;
          }
        } else {
          if (cboxLength < this.LimitMin || cboxLength > this.LimitMax) {
            this.$swal({
              text:
                "选项范围：" + this.LimitMin + "~" + this.LimitMax + "个号码",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
            this.showLmDialog = false;
            return;
          }
        }

        this.betlm.number1 = betnumber;
        this.betlm.number = betnumber1;

        this.betArr.push(this.betlm);
        this.showHmDialog = true;
        this.reset();
      } else {
        this.betArr.length = [];
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if (this.$refs.kuang[i].value > 0) {
            let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"));
            let title = this.$refs.kuang[i].getAttribute("title");
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
        this.showDialog = true;
        this.reset();
      }
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
      if (this.navI !== 4) {
        for (let i = 0; i < this.$refs.kuang.length; i++) {
					let el = this.$refs.kuang[i]
          if ((this.$refs.kuang.type = "checkbox")) {
						el.checked = false;
          } else {
						el.value = "";
						el.parentNode.classList.remove('active-color')
          }
        }
      } else {
        for (let i = 0; i < this.$refs.check.length; i++) {
          this.$refs.check[i].checked = false;
        }
      }

			clearAllActives()
    },
		// 切换玩法的选中状态，针对text类型的input输入框
		togglePlay(event) {
			if (!this.closeBet) return// 封盘不能切换
			if (event.target.tagName === 'INPUT') return// input标签不触发切换

			togglePlayActive(event, this.quickyMoney)
		},
		// 切换玩法的选中状态，针对checkbox类型的input输入框
		toggleCheckbox(event) {
			if (!this.closeBet) return// 封盘不能切换

    	var currentTarget = event.currentTarget
			var inputEl = currentTarget.querySelector('input')
			if (inputEl.type === 'text') {
				this.togglePlay(event)// 如果是text输入框， 则转到togglePlay去
				return
			}
			var wrapperEl = currentTarget.getElementsByClassName('hover-color')[0] || currentTarget
			if (inputEl.checked) {
				inputEl.checked = ''
				wrapperEl.classList.remove('active-color')// 去掉勾
			} else {
				inputEl.checked = 'checked'
				wrapperEl.classList.add('active-color')// 打上勾
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
    }, 1000);
  },
  watch: {
    endtime: function() {
      if (
        this.endtime == 0 ||
        this.endtime == 298 ||
        this.endtime == 296 ||
        this.endtime == 60
      ) {
        this.fetchData(1);
        this.showDialog = false;
      }
    },
		'param.type_code'() {
			clearAllActives()// 去掉颜色的选中状态
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

<style scoped>
.markSixArea .top-nav {
  margin-bottom: 10px !important;
}
.markSixArea nav.top-nav {
  margin-bottom: 0;
}
.markSixSubNav {
  position: relative;
  height: 30px;
  margin: 0;
  margin-bottom: 5px;
  background-color: #eff6ff;
}
.markSix #marksix_nav_14 {
  min-height: 630px;
  /*transition: all ease 5s;*/
  /*animation-duration: 1s;*/
  /*animation-name: fadeBanbo;*/
}
#marksix_nav_14 div {
  width: 100%;

  /*float: none;*/
}
#marksix_nav_14 li {
  position: relative;
}
.markSix li:nth-child(1) .marksixNavLeft,
#marksix_nav_33 li:nth-child(1) .marksixNavLeft,
#marksix_nav_32 li:nth-child(1) .marksixNavLeft,
#marksix_nav_31 li:nth-child(1) .marksixNavLeft,
#marksix_nav_30 li:nth-child(1) .marksixNavLeft,
#marksix_nav_29 li:nth-child(1) .marksixNavLeft,
#marksix_nav_27 li:nth-child(1) .marksixNavLeft,
#marksix_nav_28 li:nth-child(1) .marksixNavLeft,
#marksix_nav_18 li:nth-child(1) .marksixNavLeft,
#marksix_nav_19 li:nth-child(1) .marksixNavLeft,
#marksix_nav_20 li:nth-child(1) .marksixNavLeft,
#marksix_nav_21 li:nth-child(1) .marksixNavLeft {
	top: 0px !important;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft {
  top: 6px !important;
}
.markSix #marksix_nav_15 li:nth-child(1) .marksixNavLeft,
.markSix #marksix_nav_16 li:nth-child(1) .marksixNavLeft{
	top: 47px !important;
}
.markSix #marksix_nav_15 li:nth-child(1) .marksixNavLeft > div,
.markSix #marksix_nav_16 li:nth-child(1) .marksixNavLeft > div,
.markSix #marksix_nav_17 li:nth-child(1) .marksixNavLeft > div,
.markSix #marksix_nav_34 li:nth-child(1) .marksixNavLeft > div{
	margin-top: -5px;
}
/*#marksix_nav_17 li:nth-child(1) div:first-child,#marksix_nav_17 li:nth-child(2) div:first-child,*/
#marksix_nav_15 li:nth-child(1) div:first-child,
#marksix_nav_15 li:nth-child(2) div:first-child,
#marksix_nav_16 li:nth-child(1) div:first-child,
#marksix_nav_15 li:nth-child(2) div:first-child {
  width: 100%;
}
#marksix_nav_39 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_38 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_37 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_36 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_35 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_34 li:nth-child(1) div,
.markSix li:nth-child(2) div,
#marksix_nav_28 li:nth-child(1) div,
#marksix_nav_33 li:nth-child(2) div,
#marksix_nav_29 li:nth-child(1) div,
#marksix_nav_32 li:nth-child(2) div,
#marksix_nav_30 li:nth-child(1) div,
#marksix_nav_31 li:nth-child(2) div,
#marksix_nav_31 li:nth-child(1) div,
#marksix_nav_30 li:nth-child(2) div,
#marksix_nav_32 li:nth-child(1) div,
#marksix_nav_29 li:nth-child(2) div,
#marksix_nav_33 li:nth-child(1) div,
#marksix_nav_28 li:nth-child(2) div,
#marksix_nav_27 li:nth-child(1) div,
#marksix_nav_27 li:nth-child(2) div,
#marksix_nav_21 li:nth-child(1) div,
#marksix_nav_21 li:nth-child(2) div,
#marksix_nav_20 li:nth-child(1) div,
#marksix_nav_20 li:nth-child(2) div,
#marksix_nav_19 li:nth-child(1) div,
#marksix_nav_19 li:nth-child(2) div,
#marksix_nav_18 li:nth-child(1) div,
#marksix_nav_18 li:nth-child(2) div,
#marksix_nav_17 li:nth-child(1) div,
#marksix_nav_17 li:nth-child(2) div,
#marksix_nav_15 li:nth-child(1) div,
#marksix_nav_15 li:nth-child(2) div,
#marksix_nav_16 li:nth-child(1) div,
#marksix_nav_16 li:nth-child(2) div {
  width: 48%;
}

.markSix li:nth-child(2) .marksixNav,
.markSix li:nth-child(2) .marksixNavLeft,
#marksix_nav_33 li:nth-child(2) .marksixNavLeft,
#marksix_nav_32 li:nth-child(2) .marksixNavLeft,
#marksix_nav_31 li:nth-child(2) .marksixNavLeft,
#marksix_nav_30 li:nth-child(2) .marksixNavLeft,
#marksix_nav_29 li:nth-child(2) .marksixNavLeft,
#marksix_nav_28 li:nth-child(2) .marksixNavLeft,
#marksix_nav_27 li:nth-child(2) .marksixNavLeft,
#marksix_nav_21 li:nth-child(2) .marksixNavLeft,
#marksix_nav_20 li:nth-child(2) .marksixNavLeft,
#marksix_nav_19 li:nth-child(2) .marksixNavLeft,
#marksix_nav_18 li:nth-child(2) .marksixNavLeft,
#marksix_nav_17 li:nth-child(2) .marksixNavLeft,
#marksix_nav_16 li:nth-child(2) .marksixNavLeft,
#marksix_nav_15 li:nth-child(2) .marksixNavLeft {
  display: none;
}

/*#marksix_nav_17 li:nth-child(2) div,*/
.markSix li:nth-child(2) div,
#marksix_nav_33 li:nth-child(2) div,
#marksix_nav_32 li:nth-child(2) div,
#marksix_nav_31 li:nth-child(2) div,
#marksix_nav_30 li:nth-child(2) div,
#marksix_nav_29 li:nth-child(2) div,
#marksix_nav_28 li:nth-child(2) div,
#marksix_nav_27 li:nth-child(2) div,
#marksix_nav_21 li:nth-child(2) div,
#marksix_nav_20 li:nth-child(2) div,
#marksix_nav_19 li:nth-child(2) div,
#marksix_nav_18 li:nth-child(2) div,
#marksix_nav_17 li:nth-child(2) div,
#marksix_nav_16 li:nth-child(2) div,
#marksix_nav_15 li:nth-child(2) div {
  width: 20%;
  float: left;
  margin-top: 10px;
}

/*.markSix li:nth-child(1) div input,.markSix li:nth-child(2) div input,*/
#marksix_nav_33 li:nth-child(1) div input,
#marksix_nav_33 li:nth-child(2) div input,
#marksix_nav_32 li:nth-child(1) div input,
#marksix_nav_32 li:nth-child(2) div input,
#marksix_nav_31 li:nth-child(1) div input,
#marksix_nav_31 li:nth-child(2) div input,
#marksix_nav_30 li:nth-child(1) div input,
#marksix_nav_30 li:nth-child(2) div input,
#marksix_nav_29 li:nth-child(1) div input,
#marksix_nav_29 li:nth-child(2) div input,
#marksix_nav_28 li:nth-child(1) div input,
#marksix_nav_28 li:nth-child(2) div input,
#marksix_nav_27 li:nth-child(1) div input,
#marksix_nav_27 li:nth-child(2) div input,
#marksix_nav_21 li:nth-child(1) div input,
#marksix_nav_21 li:nth-child(2) div input,
#marksix_nav_20 li:nth-child(1) div input,
#marksix_nav_20 li:nth-child(2) div input,
#marksix_nav_19 li:nth-child(1) div input,
#marksix_nav_19 li:nth-child(2) div input,
#marksix_nav_18 li:nth-child(1) div input,
#marksix_nav_18 li:nth-child(2) div input,
#marksix_nav_17 li:nth-child(1) div input,
#marksix_nav_17 li:nth-child(2) div input,
#marksix_nav_16 li:nth-child(1) div input,
#marksix_nav_16 li:nth-child(2) div input,
#marksix_nav_15 li:nth-child(1) div input,
#marksix_nav_15 li:nth-child(1) div input {
  width: 15%;
}
.markSix li:nth-child(1) .marksixNav div:first-child,
.markSix li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:first-child,
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:first-child {
  width: 25%;
}

.markSix li:nth-child(1) .marksixNav div,
.markSix li:nth-child(1) .marksixNavLeft div,
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div {
  width: 25% !important;
  /*margin-left: 25%;*/
  position: absolute;
  /*left: 25%;*/
}
.markSix li:nth-child(1) .marksixNav div:nth-child(2n-1) {
  left: 19%;
}
.markSix li:nth-child(1) .marksixNav div:nth-child(2n) {
  left: 70%;
}
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(2n-1) {
  left: 25%;
  /*top: 28px;*/
}
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(2n),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(2n) {
  left: 75%;
}
.markSix li:nth-child(1) .marksixNav div:nth-child(1),
.markSix li:nth-child(1) .marksixNav div:nth-child(2),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(1),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(2),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(1) {
  top: 0;
}

.markSix li:nth-child(1) .marksixNav div:nth-child(3),
.markSix li:nth-child(1) .marksixNav div:nth-child(4),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(3),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(4),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(4) {
  top: 33px;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(3),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(4){
	top: 34px;
}
.markSix li:nth-child(1) .marksixNav div:nth-child(5),
.markSix li:nth-child(1) .marksixNav div:nth-child(6),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(5),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(6),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(6) {
  top: 66px;
}
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(6){
	top: 67px;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(5),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(6){
	top: 68px;
}
.markSix li:nth-child(1) .marksixNav div:nth-child(7),
.markSix li:nth-child(1) .marksixNav div:nth-child(8),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(7),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(8),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(8) {
  top: 99px;
}
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(8){
	top: 101px;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(7),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(8){
	top: 102px;
}
.markSix li:nth-child(1) .marksixNav div:nth-child(9),
.markSix li:nth-child(1) .marksixNav div:nth-child(10),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(9),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(10),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(10) {
  top: 132px;
}
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(10){
	top: 134px;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(9),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(10){
	top: 136px;
}
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(11),
.markSix li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div:nth-child(12),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div:nth-child(12) {
  top: 165px;
}
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div:nth-child(12){
	top: 168px;
}
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(11),
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div:nth-child(12){
	top: 170px;
}
/*.markSix ul li:nth-child(1) .marksixNav,*/
.markSix ul li:nth-child(1) .marksixNavLeft,
#marksix_nav_33 li:nth-child(1) .marksixNavLeft,
#marksix_nav_32 li:nth-child(1) .marksixNavLeft,
#marksix_nav_31 li:nth-child(1) .marksixNavLeft,
#marksix_nav_30 li:nth-child(1) .marksixNavLeft,
#marksix_nav_29 li:nth-child(1) .marksixNavLeft,
#marksix_nav_28 li:nth-child(1) .marksixNavLeft,
#marksix_nav_27 li:nth-child(1) .marksixNavLeft,
#marksix_nav_21 li:nth-child(1) .marksixNavLeft,
#marksix_nav_20 li:nth-child(1) .marksixNavLeft,
#marksix_nav_19 li:nth-child(1) .marksixNavLeft,
#marksix_nav_18 li:nth-child(1) .marksixNavLeft,
#marksix_nav_17 li:nth-child(1) .marksixNavLeft,
#marksix_nav_16 li:nth-child(1) .marksixNavLeft,
#marksix_nav_15 li:nth-child(1) .marksixNavLeft {
  width: 100%;
  position: absolute;
  top: 32px;
  left: 0;
}
.markSix ul li:nth-child(1) .marksixNavLeft div,
#marksix_nav_33 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_32 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_31 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_30 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_29 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_28 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_27 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_21 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_20 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_19 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_18 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_17 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_16 li:nth-child(1) .marksixNavLeft div,
#marksix_nav_15 li:nth-child(1) .marksixNavLeft div {
  float: right;
  line-height: 28px;
  height: 28px;
}

.markSix li .marksixNav div span,
.markSix li .marksixNavLeft div span,
.markSix li:nth-child(2) div span:first-child,
.markSix #marksix_nav_33 li .marksixNavLeft div span,
#marksix_nav_33 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_32 li .marksixNavLeft div span,
#marksix_nav_32 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_31 li .marksixNavLeft div span,
#marksix_nav_31 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_30 li .marksixNavLeft div span,
#marksix_nav_30 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_29 li .marksixNavLeft div span,
#marksix_nav_29 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_28 li .marksixNavLeft div span,
#marksix_nav_28 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_27 li .marksixNavLeft div span,
#marksix_nav_27 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_21 li .marksixNavLeft div span,
#marksix_nav_21 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_20 li .marksixNavLeft div span,
#marksix_nav_20 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_19 li .marksixNavLeft div span,
#marksix_nav_19 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_18 li .marksixNavLeft div span,
#marksix_nav_18 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_17 li .marksixNavLeft div span,
#marksix_nav_17 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_16 li .marksixNavLeft div span,
#marksix_nav_16 li:nth-child(2) div span:first-child,
.markSix #marksix_nav_15 li .marksixNavLeft div span,
#marksix_nav_15 li:nth-child(2) div span:first-child {
  margin-top: 0 !important;
}
/*.markSix li  div span:nth-child(1),
.markSix #marksix_nav_27 li  div span:nth-child(1),
.markSix #marksix_nav_16 li  div span:nth-child(1)
.markSix #marksix_nav_17 li  div span:nth-child(1){
 margin-top: 0!important;
 height: 24px;
 width: 60px;
 line-height: 24px;
}*/

.tm_ball_绿波{
  background: #7eb900 !important;
  color:#fff!important;
}
.markSix li .marksixNav div span,
.markSix li .marksixNavLeft div span,
.markSix #marksix_nav_33 li .marksixNavLeft div span,
.markSix #marksix_nav_32 li .marksixNavLeft div span,
.markSix #marksix_nav_31 li .marksixNavLeft div span,
.markSix #marksix_nav_30 li .marksixNavLeft div span,
.markSix #marksix_nav_29 li .marksixNavLeft div span,
.markSix #marksix_nav_28 li .marksixNavLeft div span,
.markSix #marksix_nav_27 li .marksixNavLeft div span,
.markSix #marksix_nav_21 li .marksixNavLeft div span,
.markSix #marksix_nav_20 li .marksixNavLeft div span,
.markSix #marksix_nav_19 li .marksixNavLeft div span,
.markSix #marksix_nav_18 li .marksixNavLeft div span,
.markSix #marksix_nav_17 li .marksixNavLeft div span,
.markSix #marksix_nav_16 li .marksixNavLeft div span,
.markSix #marksix_nav_15 li .marksixNavLeft div span {
  /*background: #e76977;*/
  display: inline-block;
  width: 22px !important;
  line-height: 22px !important;
  height: 22px !important;
  margin-right: 10px;
  border-radius: 50% !important;
  color: #000;
  font-weight: 600;
}
/*绿波：05 ,06 ,11 ,16 ,17 ,21 ,22 ,27 ,28 ,32 ,33 ,38 ,39 ,43 ,44 ,49*/
.lhc_ball_num_5,
.lhc_ball_num_6,
.lhc_ball_num_11,
.lhc_ball_num_16,
.lhc_ball_num_17,
.lhc_ball_num_21,
.lhc_ball_num_22,
.lhc_ball_num_27,
.lhc_ball_num_28,
.lhc_ball_num_32,
.lhc_ball_num_33,
.lhc_ball_num_38,
.lhc_ball_num_39,
.lhc_ball_num_43,
.lhc_ball_num_44,
.lhc_ball_num_49,
#marksix_nav_1 li:last-child div:nth-child(8) span:first-child,
/* #marksix_nav_2 li:last-child div:nth-child(8) span:first-child, */
/* #marksix_nav_5 li:last-child div:nth-child(8) span:first-child, */
#marksix_nav_6 li:last-child div:nth-child(8) span:first-child,
#marksix_nav_7 li:last-child div:nth-child(8) span:first-child,
#marksix_nav_8 li:last-child div:nth-child(8) span:first-child,
#marksix_nav_9 li:last-child div:nth-child(8) span:first-child,
#marksix_nav_10 li:last-child div:nth-child(8) span:first-child
{
  /* background: #7eb900 !important; */
    background:url("/static/images/common/green_ball.png");
    background-size:100% 100% !important;
    color:#000;
}
.tm_ball_红波 {
   background: red!important;
   color:#fff!important;
}

/*红波：01 ,02 ,07 ,08 ,12 ,13 ,18 ,19 ,23 ,24 ,29 ,30 ,34 ,35 ,40 ,45 ,46*/
.lhc_ball_num_1,
.lhc_ball_num_2,
.lhc_ball_num_7,
.lhc_ball_num_8,
.lhc_ball_num_12,
.lhc_ball_num_13,
.lhc_ball_num_18,
.lhc_ball_num_19,
.lhc_ball_num_23,
.lhc_ball_num_24,
.lhc_ball_num_29,
.lhc_ball_num_30,
.lhc_ball_num_34,
.lhc_ball_num_35,
.lhc_ball_num_40,
.lhc_ball_num_45,
.lhc_ball_num_46,
#marksix_nav_1 li:last-child div:nth-child(7) span:first-child,
/* #marksix_nav_2 li:last-child div:nth-child(7) span:first-child, */
/* #marksix_nav_5 li:last-child div:nth-child(7) span:first-child, */
#marksix_nav_6 li:last-child div:nth-child(7) span:first-child,
#marksix_nav_7 li:last-child div:nth-child(7) span:first-child,
#marksix_nav_8 li:last-child div:nth-child(7) span:first-child,
#marksix_nav_9 li:last-child div:nth-child(7) span:first-child,
#marksix_nav_10 li:last-child div:nth-child(7) span:first-child
 {
  /* background: red !important; */
  background:url("/static/images/common/red_ball.png");
  background-size:100% 100% !important;
  color:#000;
}

/*蓝波：03 ,04 ,09 ,10 ,14 ,15 ,20 ,25 ,26 ,31 ,36 ,37 ,41 ,42 ,47 ,48*/
.lhc_ball_num_3,
.lhc_ball_num_4,
.lhc_ball_num_9,
.lhc_ball_num_10,
.lhc_ball_num_14,
.lhc_ball_num_15,
.lhc_ball_num_20,
.lhc_ball_num_25,
.lhc_ball_num_26,
.lhc_ball_num_31,
.lhc_ball_num_36,
.lhc_ball_num_37,
.lhc_ball_num_41,
.lhc_ball_num_42,
.lhc_ball_num_47,
.lhc_ball_num_48{
  /* background: #007fcd !important; */
   background:url("/static/images/common/blue_ball.png");
    background-size:100% 100% !important;
    color:#000!important;
}
.siderLeft_gd + .content .markSix #marksix_nav_15 li:last-child div span:first-child,
.siderLeft_gd + .content .markSix #marksix_nav_34 li:last-child div span:first-child {
  background-color: #e03f5e!important;
}
#marksix_nav_11 li:last-child .game_title {
  margin-bottom: 10px;
}
.markSix #marksix_nav_14 .banbo {
  top: 37px;
}
.markSix #marksix_nav_14 .banbo div {
  line-height: 28px;
  height: 28px;
}
.markSix #marksix_nav_14 li .banbo div span:first-child {
  margin-top: 0 !important;
  margin-right: 10px;
  color: ;
}
.markSix #marksix_nav_14 li .banbo div:nth-child(1) span:nth-child(1) {
  background: #e76977;
}
.markSix #marksix_nav_14 li .banbo div:nth-child(1) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(2) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(3) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(4) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(13) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(14) span {
  /*margin-top: 0!important;*/
  /* background: red !important;
  color: #fff; */
  margin-right: 10px;
  background:url("/static/images/common/red_ball.png")!important;
  background-size:100% 100% !important;
  color:#000!important;
}
.markSix #marksix_nav_14 li .banbo div:nth-child(5) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(6) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(15) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(16) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(7) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(8) span {
  /*margin-top: 0!important;*/
  /* background: #7eb900; */
  /* color: #fff; */
  margin-right: 10px;
  background:url("/static/images/common/green_ball.png")!important;
  background-size:100% 100% !important;
  color:#000!important;
}
.markSix #marksix_nav_14 li .banbo div:nth-child(9) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(10) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(11) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(17) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(18) span,
.markSix #marksix_nav_14 li .banbo div:nth-child(12) span {
  /*margin-top: 0!important;*/
  /* background: #007fcd;
  color: #fff; */
  margin-right: 10px;
  background:url("/static/images/common/blue_ball.png")!important;
  background-size:100% 100% !important;
  color:#000!important;
}
#marksix_nav_33 li div span:first-child,
#marksix_nav_32 li div span:first-child,
#marksix_nav_31 li div span:first-child,
#marksix_nav_30 li div span:first-child,
#marksix_nav_29 li div span:first-child,
#marksix_nav_28 li div span:first-child,
#marksix_nav_21 li div span:first-child,
#marksix_nav_20 li div span:first-child,
#marksix_nav_19 li div span:first-child,
#marksix_nav_18 li div span:first-child {
  height: 20px;
  line-height: 20px;
  width: 50px !important;
  margin-top: 7px !important;
}
.markSix #marksix_nav_27 li .marksixNavLeft div span:first-child,
.markSix #marksix_nav_17 li .marksixNavLeft div span:first-child {
  margin-right: 11.35px;
}
.markSix #marksix_nav_14 li .banbo div:nth-child(2) span {
  /*margin-top: 0!important;*/
  background: red;
  color: #fff;
  margin-right: 10px;
}

#marksix_nav_14 .banbo div span:nth-child(1) {
  float: left;
  width: 22px !important;
  height: 22px !important;
  line-height: 22px !important;
  border-radius: 50% !important;
}
.markSix #marksix_nav_14 .banbo div span {
  float: left;
  width: 22px !important;
  height: 22px !important;
  line-height: 22px !important;
  border-radius: 50% !important;
  margin-top: 0 !important;
  font-weight: 600;
}
#marksix_nav_14 .banbo {
  width: 64%;
}
#marksix_nav_14 div input {
  width: 10%;
}
#marksix_nav_14 div span:nth-child(4) {
  width: 65%;
}
.markSixSubNav ul {
  height: 35px;
  position: absolute;
  left: 5px;
}
/*.markSix  #marksix_nav_39 li div  span:nth-child(1),
.markSix  #marksix_nav_38 li div  span:nth-child(1),
.markSix  #marksix_nav_37 li div  span:nth-child(1),
.markSix  #marksix_nav_36 li div  span:nth-child(1),
.markSix  #marksix_nav_35 li div  span:nth-child(1),
.markSix  #marksix_nav_34 li div  span:nth-child(1){
background-color: #3e80d4!important;
}*/
.markSix #marksix_nav_18 li div span:nth-child(1),
.markSix #marksix_nav_19 li div span:nth-child(1),
.markSix #marksix_nav_20 li div span:nth-child(1),
.markSix #marksix_nav_21 li div span:nth-child(1),
.markSix #marksix_nav_22 li div span:nth-child(1),
.markSix #marksix_nav_29 li div span:nth-child(1),
.markSix #marksix_nav_30 li div span:nth-child(1),
.markSix #marksix_nav_31 li div span:nth-child(1),
.markSix #marksix_nav_32 li div span:nth-child(1),
.markSix #marksix_nav_33 li div span:nth-child(1),
.markSix #marksix_nav_28 li div span:nth-child(1) {
  /*background-color: #3e80d4;*/
  width: 60px;
  border-radius: 5px;
  margin: 0 5% 0 0;
}
.markSixSubNav li button {
  background-color: #eff6ff;
  border: none;
  padding: 6px 15px;
  color: #7b73be;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  position: relative;
  /*border-right: 2px solid #b5b2d8;*/
  outline: none;
}
.markSixSubNav li:last-child button {
  border-right: none;
}
.markSix li:first-child div {
	float: left;
	width: 18%;
	margin: 2px 1% 0;
	padding: 2px 3px;
	border-radius: 4px;
	box-sizing: border-box;
}
.markSix li:first-child .banbo div{
	margin-top: 5px;
}
#marksix_nav_1 li:first-child div,
#marksix_nav_2 li:first-child div{
	margin-top:2px;
	margin-bottom: 2px;
}
#marksix_nav_17 li:first-child div{
	padding: 4px 0;
}
#marksix_nav_27 li:first-child div{
	padding: 4px 0;
}
#marksix_nav_15 li:first-child div:not(.game_title),
#marksix_nav_16 li:first-child div:not(.game_title){
	margin-top: 2px;
}
.markSix li:first-child div span:first-child {
	margin-top: 2px;
}
.bet-area .game:first-child .game_title {
  /*margin: 0 -20px 3px -20px;*/
  /*margin-left: -20px !important;*/
  margin-right: -20px !important;
}
.banbo .markSix li div{
	margin-top: 6px;
}
.markSix li div.game_title {
  width: 100%;
	margin: 0;
}
.markSixSubNav li button.active,
.markSixSubNav li button.isred {
  color: #fff;
  background-color: #3e80d4;
}
.markSix ul li:first-child div span:first-child,
.six_lm_ball li span {
  border-radius: 50%;
  text-align: center;
}
.markSix ul li:first-child{
  position: relative;
}
.six_lm_ball {
  padding-top: 5px;
}
.markSix ul li:last-child span:nth-child(1) {
  /*border-radius: 30px;*/
  /*line-height: 22px;*/
  text-align: center;
}
.markSix ul li:first-child span:nth-child(2){
	margin-top: 4px;
}
.marksixNavLeft span,
.marksixNav span,
.banbo span,
.six_lm_ball span{
	font-size: 12px!important;
}
.markSix ul li:first-child input {
  margin-top: 5px;
}
.six_lm_ball li span {
  width: 24px;
  display: inline-block;
  color: #fff;
  margin-right: 10px;
}

.six_lm_ball li {
  width: 18%;
	margin: 2px 1%;
  display: inline-block;
  cursor: pointer;
}
.six_lm_ball li:last-child {
	text-align: center;
	margin-right: 21%;
}
.lm_title {
  text-align: left;
}
ul#marksix_nav_613,
ul#marksix_nav_615,
ul#marksix_nav_616,
ul#marksix_nav_617,
ul#marksix_nav_808,
ul#marksix_nav_619 {
  display: none;
}
.markSix #marksix_nav_14 .banbo div span {
  float: left;
  width: 22px !important;
  height: 22px !important;
  line-height: 22px !important;
  border-radius: 50% !important;
  margin-top: 0 !important;
}
.markSix
  #marksix_nav_23
  div
  span:first-child
  .markSix
  #marksix_nav_22
  div
  span:first-child
  .markSix
  #marksix_nav_21
  div
  span:first-child
  .markSix
  #marksix_nav_20
  div
  span:first-child
  .markSix
  #marksix_nav_19
  div
  span:first-child
  .markSix
  #marksix_nav_18
  div
  span:first-child {
}
.markSix ul li:first-child div span:first-child {
  /*height: 20px;
  line-height: 20px;*/
}
#marksix_nav_34 .closeBet,
#marksix_nav_35 .closeBet,
#marksix_nav_36 .closeBet,
#marksix_nav_37 .closeBet,
#marksix_nav_38 .closeBet,
#marksix_nav_39 .closeBet{
  width: 10%;
}

#marksix_nav_34 label > span:first-child,
#marksix_nav_35 label > span:first-child,
#marksix_nav_36 label > span:first-child,
#marksix_nav_37 label > span:first-child,
#marksix_nav_38 label > span:first-child,
#marksix_nav_39 label > span:first-child{
	color: white!important;
}

.markSix #marksix_nav_15 li:last-child div span:first-child{
	color: white!important;
}
</style>
