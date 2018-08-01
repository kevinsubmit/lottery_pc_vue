<template>
  <!-- <div :id="`bet-top-${getApiName}`" :class="`bet-top clearfix lottery_type_${game_code}`"> -->
  <div :id="`bet-top-${getApiName}`" class="bet-top clearfix" :class="game_code==270?'lottery_type_69':`lottery_type_${game_code}`">
    <div class="leftPart f-l clearfix">
      <div class="ico_game f-l" :class="`ico_game_${game_code}`"></div>
      <div class="round f-l">
        <p class="now-round" v-if="lotteryObj.next.round">{{lotteryObj.next.round}}期</p>
        <p class="lottery-name">{{lotteryName}}</p>
        <p class="today" v-if="shiwan1">今日输赢：{{ parseFloat(todayWinLost).toFixed(2) }}</p>
      </div>
      <div class="closeTime f-l" :class="`closeTime${game_code}`">
        <!-- {{closetime}} -->
        <div class="clock1" :style="{width:time==='待定'?'auto':'90%'}">
          <div class="clock11" v-if='!closeBet'>
            <!-- 已封盘 -->
            <div>
              <span>已</span>
              <span>封</span>
              <span>盘</span>
            </div>

            <!--  <div>
                           <i style="font-size: 1.4rem; line-height: 1.2rem;margin-right: 0.25rem;color: #333;margin-top: 0.05rem;">封</i>
                            <span v-show="h>0"><span style="float: left;">{{lotteryObj.next.round&&!fenpan ? `${h}` : `00`}}</span><i>:</i></span>
                            <span>{{lotteryObj.next.round&&!fenpan ? `${m}` : `00`}}</span>
                            <i>:</i>
                            <span>{{lotteryObj.next.round&&!fenpan ? `${s}` : `00`}}</span>
                          </div> -->
          </div>

        </div>
        <div v-if="closeBet" class="clock11" style='width:92%'>
          <span class="hgfeng">封</span>
          <span v-show="h>0" class="hgfengtime">{{lotteryObj.next.round&&closeBet ? `${h}`: `00`}}</span>{{h>0?":":''}}
          <span>{{lotteryObj.next.round&&closeBet ? `${m}` : `00`}}</span>:
          <span>{{lotteryObj.next.round&&closeBet ? `${s}` : `00`}}</span>
        </div>
        <!--<div class='kaijiangtimes' style='line-height:20px;width:90%'>-->
        <div class='kaijiangtimes' style='line-height:20px;'>
          <span style='font-size:16px'>开奖时间:</span>
          <span v-if="game_code==69">{{time}}</span>
          <span v-show="game_code!=69" style='font-size:16px'>{{lotteryObj.next.round ? `${myfilter(endtime, endtime-fentime)}` : `00:00`}}</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="rightPart f-l">
      <div class="latestResult">
        <div class="round f-l">
          <p class="last-round">{{lotteryObj.last.round}}期</p>
          <p>
            <a :href="kaijiangwang" v-if="getApiName!='ct'&&getApiName!='agcai'&&getApiName!='tt'&&getApiName!='crown'&&getApiName!='yile'&&getApiName!='fulicai'&&getApiName!='618cp'&&getApiName!='yy'&&getApiName!='ylh'&&getApiName!='letian'" target="_blank">>&nbsp;官方开奖</a>
            <router-link :to="`/result:${k}`">>&nbsp;开奖走势</router-link>
          </p>
        </div>
        <div class="openData f-l" >
          <div class="balls clearfix">
            <div v-if="game_code !== 160 && game_code !== 69&& game_code !== 270 && game_code != 180">
              <span v-for="item in lotteryObj.last.number" :class="`num_${item}`">{{item}}</span>
              <span class="dengyu" v-if="game_code === 160">=</span>
              <span class="total f-r" v-if="game_code === 160">{{eggTotal}}</span>
            </div>

            <div v-if="game_code === 160">
              <div v-for="(item,i) in lotteryObj.last.number" class="f-l">
                <span :class="`num_${item}`">{{item}}</span>
                <span class="plus" :class="`plus_${i}`">+</span>
              </div>
              <span class="dengyu">=</span>
              <span class="total f-r" v-if="game_code === 160" :class="`total_${eggTotal}`">{{eggTotal}}</span>
            </div>

            <div v-if="game_code === 69||game_code === 270">
              <span v-for="item in lotteryObj.last.number.slice(0, lotteryObj.last.number.length-1)" :class="`num_${item}`">{{item}}</span>
              <span class="plus">+</span>
              <span :class="`num_${lotteryObj.last.number[lotteryObj.last.number.length-1]}`">{{lotteryObj.last.number[lotteryObj.last.number.length-1]}}</span>
            </div>

            <div v-if="game_code == 180" class="bjkl8">
                <span v-for="item in lotteryObj.last.number" :class="item <= 40 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{item}}</span>
            </div>
          </div>
          <!--北京PK10-->
          <div class="nums" v-show="bjpk==true">
            <span>冠亚和:</span>
            <span>{{pkygh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">1-5球:</span>
            <span>{{pkone}}</span>
            <span>{{pktwo}}</span>
            <span>{{pkthree}}</span>
            <span>{{pkfour}}</span>
            <span>{{pkfive}}</span>
          </div>
          <!--重庆时时彩-->
          <div class="nums" v-show="cqssc==true">
            <span>总和:</span>
            <span>{{kjzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">龙虎:</span>
            <span>{{lh}}</span>
          </div>

          <!--罗马时时彩-->
          <div class="nums" v-show="roma==true">
            <span>总和:</span>
            <span>{{kjzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">龙虎:</span>
            <span>{{lh}}</span>
          </div>

          <!--广东快乐十分-->
          <div class="nums" style="display:inline-block" v-show="gdklsf==true&&game_code!='220'">
            <span>总和:</span>
            <span>{{kjzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">尾大小:</span>
            <span class="habi1">{{wdx}}</span>
            <span class="habi">1-4球:</span>
            <span>{{pkone}}</span>
            <span>{{pktwo}}</span>
            <span>{{pkthree}}</span>
            <span>{{pkfour}}</span>
          </div>
          
          <!--广东快乐11选5-->
          <div class="nums" style="display:inline-block" v-show="game_code==133">
            <span>总和:</span>
            <span>{{kjzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">尾大小:</span>
            <span class="habi1">{{wdx}}</span>
          </div>
          <!--重庆幸运农场-->
          <div class="nums" v-show="cqxync==true">
            <span>总和:</span>
            <span>{{kjzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">尾大小:</span>
            <span class="habi1">{{wdx}}</span>
            <span class="habi">1-4球:</span>
            <span>{{pkone}}</span>
            <span>{{pktwo}}</span>
            <span>{{pkthree}}</span>
            <span>{{pkfour}}</span>
          </div>
          <!--PC蛋蛋-->
          <div class="nums" v-show="pcdd==true" style="display:inline-block">
            <span>总和:</span>
            <span>{{pcddzh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
          </div>
          <!--幸运飞艇-->
          <div class="nums" v-show="xyft==true">
            <span>冠亚和:</span>
            <span>{{pkygh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">1-5球:</span>
            <span>{{pkone}}</span>
            <span>{{pktwo}}</span>
            <span>{{pkthree}}</span>
            <span>{{pkfour}}</span>
            <span>{{pkfive}}</span>
          </div>
          <!--香港彩-->
          <div class="nums" v-show="xglhc==true">
            <span>总分:</span>
            <span>{{kjzh}}</span>
            <span class="habi">生肖:</span>
            <span>{{xgcone}}</span>
            <span>{{xgctwo}}</span>
            <span>{{xgcthree}}</span>
            <span>{{xgcfour}}</span>
            <span>{{xgcfive}}</span>
            <span>{{xgcsix}}</span>
            <span>{{xgcseven}}</span>
          </div>
          <!--江苏骰宝-->

          <div class="nums" v-show="jsks==true" style="display:inline-block">
            <span>总和:</span>
            <span>{{jskszh}}</span>
            <span>{{jsds}}</span>
            <span>{{jsdx}}</span>
            <span class="habi">鱼虾蟹:</span>
            <span :class="{habi1:jsksyxeone.length>1?true:false}">{{jsksyxeone}}</span>
            <span :class="{habi1:jsksyxetwo.length>1?true:false}">{{jsksyxetwo}}</span>
            <span :class="{habi1:jsksyxethreee.length>1?true:false}">{{jsksyxethreee}}</span>
          </div>

          <!--威尼斯赛艇-->
          <div class="nums" v-show="jsft==true">
            <span>冠亚和:</span>
            <span>{{pkygh}}</span>
            <span>{{pkyhgdx}}</span>
            <span>{{pkyghds}}</span>
            <span class="habi">1-5球:</span>
            <span>{{pkone}}</span>
            <span>{{pktwo}}</span>
            <span>{{pkthree}}</span>
            <span>{{pkfour}}</span>
            <span>{{pkfive}}</span>
          </div>

        </div>
      </div>
      <!--</div>-->
    </div>

    <div class="music" :class='{guan:kaiguan}' @click='switchAudio'>
      <audio ref='audio' :src="$getPublicImg('/ling.mp3')"></audio>
      开奖声音
    </div>
    <!-- 开奖视频 -->
    <!-- <div class="video" @click="showVideo"  v-if="game_code != 160 && game_code != 171 && game_code != 210 && game_code != 46">开奖直播</div> -->
    <div @mouseenter="showtips" @mouseout.prevent="showtips" class="video" :class="playVideoClass" @click.prevent="showVideo">
      开奖直播
      <div v-if="cptips" style="position:absolute;right:-85px;top:5px;background:silver;border-radius:3px;line-height:22px;padding:0 8px;font-size:12px;">
        敬请期待！
        <div style='background:silver;width:10px;height:10px;position:absolute;left:-3px;top:6px;transform:rotate(45deg);'></div>
      </div>
    </div>
    <video-play v-if="isShowVideo" @closeVideo="closeVideo" :game_code="game_code"></video-play>
    <div class="resultTabs" @click="getResultData(1,10)">开奖记录</div>
    <div class="ten-reslut" v-if='onff'>
      <div class="overlay1" @click='clos($event)'>
          <div class="ten-content">
            <div class="cha el-icon-circle-close-outline" @click='clos($event)'>

            </div>
            <table class="latest-ten-table" :id="game_code==270?'ten_result_69':`ten_result_${game_code}`">
              <tr class="latest-ten-title">
                <th class="time">期数</th>
                <th class="round">开奖时间</th>
                <th v-if="onoff">开奖号码</th>
                <th v-if='!onoff'>
                  <span @click='haoma1' :class='{activ1e:haoma}' style='display:inline-block;width:70px;background:#b9b9b9;border-radius:5px;color:#fff; cursor: pointer;height:25px;line-height:25px;'>显示号码</span>
                  <span v-if="isShowBigSmallMenu" @click='daxiao1' :class='{activ1e:daxiao}' style='display:inline-block;width:70px;background:#b9b9b9;border-radius:5px;color:#fff; cursor: pointer;height:25px;line-height:25px;margin:0 10px'>显示大小</span>
                  <span @click='danshuang1' :class='{activ1e:danshuang}' style='display:inline-block;width:70px;background:#b9b9b9;border-radius:5px;color:#fff; cursor: pointer;height:25px;line-height:25px'>显示单双</span>
                </th>
                <th>和值</th>
              </tr>
              <tr v-for='i in allnum' :key=i>
                <td class="round">第{{resultHistory && resultHistory[i-1].round}}期</td>
                <td class="time">{{resultHistory && new Date(parseInt(resultHistory[i-1].endtime) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, "")}}</td>
                <td>
                  <!-- pk10 feiting -->
                  <!-- pcddkj -->
                  <template v-if="game_code==180">
                      <span v-show='haoma' :class="j <= 40 ? 'ball-t-gray-f' : 'ball-t-blue-f'" v-for='j in  lhckj(resultHistory && resultHistory[i-1].number.split(","))'>{{j}}</span>
                  </template>
                  <template v-else>
                      <span v-show='haoma' :class="`ten_result_${j}`" v-for='j in  lhckj(resultHistory && resultHistory[i-1].number.split(","))'>{{j}}</span>
                  </template>
                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")'  v-if="game_code==180" :class="j <= 40 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{j>40?'大':"小"}}</span>
                  <span v-show='danshuang' class="feiche" v-for='j in resultHistory && resultHistory[i-1].number.split(",")'v-if="game_code==180" :class="j % 2 == 0 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{j%2?'单':'双'}}</span>

                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>=6?"background:#f9982e":"background:#7f8ab0" ' v-if="game_code==51||game_code==171||game_code==210||game_code==240||game_code==260" :class="`result-ball result-ball_${i}`">{{j>=6?'大':"小"}}</span>
                  <span v-show='danshuang' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j%2?"background:#f9982e":"background:#7f8ab0" ' v-if="game_code==51||game_code==171||game_code==210||game_code==240||game_code==260" :class="`result-ball result-ball_${i}`">{{j%2?'单':'双'}}</span>
                  
                  <!-- 广东11选5 -->
                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>5?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==133" :class="`result-ball result-ball_${i}`">{{j>5?'大':"小"}}</span>
                  <!-- cqssc -->
                  <!-- <span v-show='haoma' :class="`ten_result_${j}`" v-for='j in  resultHistory[i].number.split(",")'>{{j}}</span> -->
                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>4?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==2||game_code==46||game_code==250" :class="`result-ball result-ball_${i}`">{{j>4?'大':"小"}}</span>
                  <span v-show='danshuang' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==2||game_code==46||game_code==250||game_code==133" :class="`result-ball result-ball_${i}`">{{j%2?'单':'双'}}</span>

                  <!-- haapyten -->
                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>10?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==3" :class="`result-ball result-ball_${i}`">{{j>10?'大':"小"}}</span>
                  <span v-show='danshuang' class='feiche' v-for='j in resultHistory　&& resultHistory[i-1].number.split(",")' :style='j%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==3" :class="`result-ball result-ball_${i}`">{{j%2?'单':'双'}}</span>

                  <!-- lunckfarm -->
                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>10?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==47" :class="`result-ball result-ball_${i}`">{{j>10?'大':"小"}}</span>
                  <span v-show='danshuang' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==47" :class="`result-ball result-ball_${i}`">{{j%2?'单':'双'}}</span>
                  <!-- pcegg -->

                  <span v-show='daxiao' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j>4?"background:#f9982e!important;font-size:14px;color: #fff!important;":"background:#7f8ab0!important;font-size:14px;color: #fff!important;" ' v-if="game_code==160" :class="`result-ball result-ball_${i}`">{{j>4?'大':"小"}}</span>
                  <span v-show='danshuang' class='feiche' v-for='j in resultHistory && resultHistory[i-1].number.split(",")' :style='j%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if="game_code==160" :class="`result-ball result-ball_${i}`">{{j%2?'单':'双'}}</span>
                </td>
                <td class="total" v-if="game_code==160" :class="`total_${resultHistory &&resultHistory1(i-1)}`">{{resultHistory &&resultHistory1(i-1)}}</td>

              </tr>
            </table>

          </div>
      </div>

    </div>

  </div>
</template>

<script>
import videoPlay from "./lotteryVideo";
export default {
  components: {
    videoPlay
  },
  data() {
    return {
      allnum: null,
      getApiName: getApiName(),
      kaijiangwang: getKaijiangwang(),
      // fenpan:false,
      // isIosWebview:isIosWebview,
      h: 0,
      m: 0,
      s: 0,
      // onoff:false,
      lastRound: 0,
      yMoney: 0,
      wo: null,
      onff: false,
      onoff: false,
      kaiguan: false,
      haoma: true,
      daxiao: false,
      danshuang: false,
      bjpk: false,
      cqssc: false,
      roma: false,
      xyft: false,
      jsks: false,
      gdklsf: false,
      cqxync: false,
      xglhc: false,
      pcdd: false,
      jsft: false,
      bigger: "0.6rem",
      xgcmager: "2rem",
      jsksyxeone: "",
      jsksyxetwo: "",
      shiwan1: true,
      jsksyxethreee: "",
      pkygh: "",
      pkyhgdx: "",
      pkyghds: "",
      pkone: "",
      pktwo: "",
      jsy: "",
      k: "",
      jsx: "",
      jsxie: "",
      pkthree: "",
      pkfour: "",
      pkfive: "",
      kjzh: "",
      lh: "",
      wdx: "",
      jsds: "",
      numbo: [],
      jsdx: "",
      pcddzh: "",
      jskszh: "",
      pcddone: "",
      resultHistory: null,
      pcddtwo: "",
      pcddthree: "",
      xgcone: "",
      xgctwo: "",
      xgcthree: "",
      xgcfour: "",
      xgcfive: "",
      xgcsix: "",
      xgcseven: "",
      isShowVideo: false,
      cptips: false,
      isShowBigSmallMenu: true
    };
  },
  computed: {
    numbers() {
      console.log('number=', this.lotteryObj.last.number)
      return this.lotteryObj.last.number;
    }
  },
  methods: {
    showtips() {
      this.game_code == 160 ||
      this.game_code == 171 ||
      this.game_code == 210 ||
      this.game_code == 46 ||
      this.game_code == 240 ||
      this.game_code == 270 ||
      this.game_code == 180 ||
      this.game_code == 280 ||
      this.game_code == 220
        ? (this.cptips = !this.cptips)
        : "";
    },
    showVideo() {
      if (
        this.game_code == 160 ||
        this.game_code == 171 ||
        this.game_code == 210 ||
        this.game_code == 240 ||
        this.game_code == 46 ||
        this.game_code == 270 ||
        this.game_code == 180 ||
        this.game_code == 280 ||
        this.game_code == 220||
        this.game_code == 133
      ) {
        return;
      }
      this.isShowVideo = true;
    },
    closeVideo(msg) {
      if (msg === "close") {
        this.isShowVideo = false;
      }
    },
    lhckj(i) {
      if (i) {
        if (this.game_code == 69 || this.game_code == 270) {
          i.splice(6, 0, "+");
        }
        if (this.game_code == 160) {
          i.splice(1, 0, "+");
          i.splice(3, 0, "+");
          // i.splice(5,0,"=")
          // i.splice(6,0,Number(i[0])+Number(i[2])+Number(i[4]))
        }
        return i;
      }
    },
    pcddkj(i) {
      if (this.game_code == 160) {
      }

      return i;
    },
    resultHistory1(i) {
      // console.log(this.resultHistory[i].number)
      // if (i) {
      return (
        Number(this.resultHistory[i].number.split(",")[0]) +
        Number(this.resultHistory[i].number.split(",")[1]) +
        Number(this.resultHistory[i].number.split(",")[2])
      );
      // }
    },
    kssx(item) {
      if (item == "1") {
        return "鱼";
      } else if (item == "2") {
        return "虾";
      } else if (item == "3") {
        return "葫芦";
      } else if (item == "4") {
        return "金钱";
      } else if (item == "5") {
        return "蟹";
      } else if (item == "6") {
        return "鸡";
      }
    },
    dianji() {
      if (
        sessionStorage.getItem("im_kaiguan") == null ||
        sessionStorage.getItem("im_kaiguan") == "false"
      ) {
        this.kaiguan = false;
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      } else {
        this.kaiguan = sessionStorage.getItem("im_kaiguan");
      }
    },
    switchAudio() {
      this.kaiguan = !this.kaiguan;
      sessionStorage.setItem("im_kaiguan", this.kaiguan);
    },
    haoma1() {
      this.haoma = true;
      this.daxiao = false;
      this.danshuang = false;
    },
    daxiao1() {
      this.daxiao = true;
      this.haoma = false;
      this.danshuang = false;
    },
    danshuang1() {
      this.daxiao = false;
      this.haoma = false;
      this.danshuang = true;
    },
    clos(e) {
      let className = e.target && e.target.className || '';
      if (className.indexOf('overlay1') != -1 || className.indexOf('cha') != -1) {
        this.onff = false;
        this.haoma1();
      }
    },
    _getAttrNames() {
      // this.lastRound = (this.lotteryObj.last.round);
      switch (this.gameType) {
        case "15":
          this.pcdd = true;
          // console.log(this.lotteryObj.last.number[1])
          this.pcddzh =
            Number(this.lotteryObj.last.number[0]) +
            Number(this.lotteryObj.last.number[1]) +
            Number(this.lotteryObj.last.number[2]);

          if (this.pcddzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }

          if (this.pcddzh >= 14) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          break;
        case "20":
          this.xglhc = true;
          this.bigger = "0.65rem";
          this.xgcmager = "-0.2rem";
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[6]);
          this.xgcone = this.lotteryObj.last.zodiac[0];
          this.xgctwo = this.lotteryObj.last.zodiac[1];
          this.xgcthree = this.lotteryObj.last.zodiac[2];
          this.xgcfour = this.lotteryObj.last.zodiac[3];
          this.xgcfive = this.lotteryObj.last.zodiac[4];
          this.xgcsix = this.lotteryObj.last.zodiac[5];
          this.xgcseven = this.lotteryObj.last.zodiac[6];
          break;
        case "25":
          // this.xgcmager = "-0.2rem"
          this.cqxync = true;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[6]) +
            parseInt(this.lotteryObj.last.number[7]);
          if (this.kjzh >= 85) {
            this.pkyhgdx = "大";
          } else if (this.kjzh == 84) {
            this.pkyhgdx = "和";
          } else {
            this.pkyhgdx = "小";
          }

          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }

          if (
            this.kjzh.toString().substr(this.kjzh.toString().length - 1) >= 5
          ) {
            this.wdx = "尾大";
          } else {
            this.wdx = "尾小";
          }

          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          break;
        case "35":
          this.xyft = true;

          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "30":
          this.gdklsf = true;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[6]) +
            parseInt(this.lotteryObj.last.number[7]);
          if (this.kjzh >= 85) {
            this.pkyhgdx = "大";
          } else if (this.kjzh == 84) {
            this.pkyhgdx = "和";
          }  else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            this.kjzh.toString().substr(this.kjzh.toString().length - 1) >= 5
          ) {
            this.wdx = "尾大";
          } else {
            this.wdx = "尾小";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          break;
          case "133":
          this.gd11x5 = true;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4])
          if (this.kjzh >= 85) {
            this.pkyhgdx = "大";
          } else if (this.kjzh == 84) {
            this.pkyhgdx = "和";
          }  else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            this.kjzh.toString().substr(this.kjzh.toString().length - 1) >= 5
          ) {
            this.wdx = "大";
          } else {
            this.wdx = "小";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          break;
        case "45":
          this.jsft = true;
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "40":
          this.cqssc = true;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]);

          if (this.kjzh >= 23) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "龙";
          } else if (
            parseInt(this.lotteryObj.last.number[0]) <
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "虎";
          } else {
            this.lh = "和";
          }
          break;
        case "55":
          this.bjpk = true;
          this.xhcLeft = "3.2rem";
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "88":
          this.jsks = true;
          // console.log(this.lotteryObj.last.number[0])
          this.jskszh =
            Number(this.lotteryObj.last.number[0]) +
            Number(this.lotteryObj.last.number[1]) +
            Number(this.lotteryObj.last.number[2]);
          // console.log(this.jskszh)
          if (this.jskszh % 2 == 0) {
            this.jsds = "双";
          } else {
            this.jsds = "单";
          }

          if (this.jskszh > 10) {
            this.jsdx = "大";
          } else {
            this.jsdx = "小";
          }
          this.jsksyxeone = this.kssx(Number(this.lotteryObj.last.number[0]));
          this.jsksyxetwo = this.kssx(Number(this.lotteryObj.last.number[1]));
          this.jsksyxethreee = this.kssx(
            Number(this.lotteryObj.last.number[2])
          );
          break;
      }
    },
    showCloseTime() {
      this.$nextTick(function() {
        var clock = $(".clock").FlipClock(this.endtime, {
          // clockFace: 'MinuteCounter',
          countdown: true,
          callbacks: {
            //回调函数
            stop: function() {
              // console.log('stop')
              this.endtime = "00000000";
            }
          }
        });
      });
    },
    getResultData(page, numb) {
      this.onff = true;
      this.onoff =
        this.game_code == 69 || this.game_code == 172 || this.game_code == 270 || this.game_code == 280 || this.game_code == 220;
      let params = {};
      params.game_code = this.game_code;
      params.page = page;
      params.numb = numb;
      this.$http
        .post("/user/getResult", JSON.stringify(params))
        .then(res => {
          // console.log(res.status)

          if (res.status === 200) {
            let resultHistory = res.data.result;
            let html = "";
            let number = [];
            let all_num = [];
            let all_number = 0;
            let time = "";
            let all_html = "";
            var aa = "";

            if (res.data.result.length > 9) {
              this.allnum = res.data.result.slice(0, 10).length;
            } else {
              this.allnum = res.data.result.length;
            }

            this.resultHistory = resultHistory;
            // console.log( this.resultHistory)
          }
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    },
    p(s) {
      if (s <= 0) {
        return `00`;
      } else if (s > 0 && s < 10) {
        return `0${s}`;
      } else {
        return s;
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
    },
    //过滤分秒
    myfilter(second_time, second_endtime) {
      let time = parseInt(second_time);
      let timeE = parseInt(second_endtime);
      let second = second_time % 60;
      let secondE = second_endtime % 60;
      this.s = this.p(secondE);
      let min = Math.floor(second_time / 60) % 60;
      let minE = Math.floor(second_endtime / 60) % 60;
      this.m = this.p(minE);
      let hour = Math.floor(second_time / 3600);
      let hourE = Math.floor(second_endtime / 3600);

      this.h = this.p(hourE);

      if (hour) {
        time = this.p(hour) + ":" + this.p(min) + ":" + this.p(second);
        return time;
      } else {
        time = this.p(min) + ":" + this.p(second);
        return time;
      }
    }
  },
  created() {
    // this.$refs.audio.play();
    if (sessionStorage.getItem("im_username") === "游客"||sessionStorage.getItem("im_realname")=='11') {
      this.shiwan1 = false;
    }
    // console.log(sessionStorage.getItem('im_kaiguan'))
    // if(sessionStorage.getItem('im_kaiguan')==null||sessionStorage.getItem('im_kaiguan')=='false'){
    //    this.kaiguan=false;

    // }else{
    //    this.kaiguan=sessionStorage.getItem('im_kaiguan')
    // }
    if (
      sessionStorage.getItem("im_kaiguan") == null ||
      sessionStorage.getItem("im_kaiguan") == "false"
    ) {
      this.kaiguan = false;
    } else {
      this.kaiguan = sessionStorage.getItem("im_kaiguan");
    }

    // console.log(sessionStorage.getItem('im_username') === '游客')
    // console.log(this.game_code)
    this.k = "_" + this.game_code;
    // console.log( this.k)
    this._getAttrNames();
    // this.showCloseTime();

    /*
    if (this.game_code == 180) {
      this.isShowBigSmallMenu = false;
    }
    */
  },
  updated() {
    // this.showCloseTime();
  },
  props: {
    lotteryObj: {
      type: Object
    },
    lotteryName: {
      type: String
    },
    closeBet: {
      type: Boolean
    },
    list: {
      type: Object
    },
    endtime: {
      type: Number
    },
    closetime: {
      type: Number
    },
    gameType: {
      type: String,
      default: "55"
    },
    fentime: {
      type: Number
    },
    game_code: {
      type: Number
    },
    zMoney: {
      type: Number
    },
    todayWinLost: {
      type: Number
    }
  },
  computed: {
    playVideoClass() {
      if (
        this.game_code == 160 ||
        this.game_code == 171 ||
        this.game_code == 210 ||
        this.game_code == 240 ||
        this.game_code == 46 ||
        this.game_code == 270 ||
        this.game_code == 180 ||
        this.game_code == 280 ||
        this.game_code == 220||
        this.game_code == 133
      ) {
        return "noclick";
      }
    },
    time() {
      if(!this.endtime){
        return '待定'
      }
      let date = new Date(new Date().getTime() + this.endtime * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return date.getFullYear() ? `${Y}${M}${D} 21:30:00` : "待定";
    },
    eggTotal() {
      return (
        parseInt(this.lotteryObj.last.number[0]) +
        parseInt(this.lotteryObj.last.number[1]) +
        parseInt(this.lotteryObj.last.number[2])
      );
    }
  },
  watch: {
    lotteryObj: {
      handler: function(newValue, oldValue) {
        this.$store.commit("updatelotteryMoney", newValue.lcurrency);
        this._getAttrNames();
        if (oldValue && newValue.last.round != oldValue.last.round) {
          this.dianji();
        }
      },

      deep: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../assets/less/variable.less";
#bet-top-uc,
#bet-top-sd,
#bet-top-ct {
  background: url("@{public_img}/images/ct/bg-top.jpg") no-repeat;
  background-size: cover;
}
#bet-top-gd {
  background: url("@{public_img}/images/gd/bg-top.jpg") no-repeat;
  background-size: cover;
}
.music {
  background: url("@{public_img}/images/common/icon/pc-video.png") no-repeat 4px
    center;
}
.guan {
  background: url("@{public_img}/images/common/icon/pc-cvideo.png") no-repeat
    2px center;
}
.ico_game_270 {
  background: url("@{public_img}/images/common/ico-top-jslh.png") left center
    no-repeat;
}
.ico_game_260 {
  background: url("@{public_img}/images/common/ico-top-race.png?a=1") left
    center no-repeat;
}
.ico_game_46 {
  background: url("@{public_img}/images/common/ico-top-roma.png") left center
    no-repeat;
}
.ico_game_240 {
  background: url("@{public_img}/images/common/ico-top-jssc.png") left center
    no-repeat;
}
.ico_game_250 {
  background: url("../../static/images/common/icon/ico-top-jsssc.png") left center
    no-repeat;
}
.ico_game_51 {
  background: url("@{public_img}/images/common/ico-top-pk10.png") left center
    no-repeat;
}
.ico_game_69 {
  background: url("@{public_img}/images/common/ico-top-six.png") left center
    no-repeat;
}
.ico_game_160 {
  background: url("@{public_img}/images/common/ico-top-pcegg.png") left center
    no-repeat;
}
.ico_game_171 {
  background: url("@{public_img}/images/common/ico-top-ship.png") left center
    no-repeat;
}
.ico_game_3 {
  background: url("@{public_img}/images/common/ico-top-ten.png") left center
    no-repeat;
}
.ico_game_47 {
  background: url("@{public_img}/images/common/ico-top-farm.png") left center
    no-repeat;
}
.ico_game_210 {
  background: url("@{public_img}/images/common/ico-top-speedShip.png") left
    center no-repeat;
  background-size: contain;
  width: 85px;
  margin-right: 24px;
}
.ico_game_180 {
  background: url("@{public_img}/images/common/icon-top-bjkl8.png") left center
    no-repeat;
}
.ico_game_280 {
  background: url("@{public_img}/images/common/icon-top-jlk3.png") left center
    no-repeat;
}

.ico_game_133 {
  background: url("@{public_img}/images/common/icon-top-11x5.png") left center
}
.ico_game_220 {
  background: url("@{public_img}/images/common/icon-top-fc3d.png") left center
    no-repeat;
}
.video {
  background-image: url("@{public_img}/images/common/icon/pc-auto.png?v=3434");
  background-repeat: no-repeat;
  background-position: 4px center;
  // background: url('@{public_img}/images/common/icon/pc-auto.png?v=3434') no-repeat 4px center;
}
.resultTabs {
  background: url("@{public_img}/images/common/icon/pc-history.png?v=3434")
    no-repeat 4px center;
}
</style>

<style lang="css">
.closeTime270 {
  width: 220px !important;
}
.ico_game {
  /*  animation-duration: 1s;
  animation-name: slidein;*/
}
.balls span {
  animation-name: bounceIn;
}
.balls span:nth-child(1) {
  animation-duration: 0.4s;
}
.balls span:nth-child(2) {
  animation-duration: 0.5s;
}
.balls span:nth-child(3) {
  animation-duration: 0.6s;
}
.balls span:nth-child(4) {
  animation-duration: 0.7s;
}
.balls span:nth-child(5) {
  animation-duration: 0.8s;
}
.balls span:nth-child(6) {
  animation-duration: 0.9s;
}
.balls span:nth-child(7) {
  animation-duration: 1s;
}
.balls span:nth-child(8) {
  animation-duration: 1.1s;
}
.balls span:nth-child(9) {
  animation-duration: 1.2s;
}
.balls span:nth-child(10) {
  animation-duration: 1.3s;
}

.ten_result_ +  {
  color: red;
}
.activ1e {
  background: #50515e !important;
}
.overlay1 {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #000;
  /* opacity: 0.5; */
  z-index: 888;
  background: rgba(0, 0, 0, .5);
}
.ten-content {
  position: fixed;
  min-width: 600px;
  padding: 5px 20px 25px;
  height: 400px;
  border-radius: 10px;
  /* left: 50%;
  top: 23%;
  margin-left: -320px; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 889;
  background-color: #fff;
}
.cccw {
  width: 100px;
  /*display: block;*/
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  border-radius: 5px;
  background: blue;
  margin: 20px auto;
  /*margin-left: 00px;*/
}
@keyframes slidein {
  from {
    margin-right: 300px;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.bet-top {
  height: 80px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #fff;
  padding: 0 20px;
  position: relative;
  /* overflow: hidden; */
}
.resultTabs,
.music,
.video {
  opacity: 0.8;

  cursor: pointer;
  padding-left: 20px;
  position: absolute;
  width: 80px;
  height: 33.333%;
  right: 0;
  border-left: 1px solid silver;
  transition: all ease 0.5s;
}

.resultTabs:hover,
.music:hover,
.video:hover {
  transition: all ease 0.5s;
  opacity: 1;
}

.resultTabs {
  bottom: 0;
}

.music {
  top: 0;
}

.video {
  top: 33.3334%;
  border: 1px solid silver;
  border-right: none;
}

.noclick {
  cursor: no-drop;
}

.latestResult .openData {
  padding-top: 14px;
  text-align: left;
}
.latestResult .openData.pd-t-5 {
  padding-top: 5px;
}

.bet-top span,
.bet-top a {
  font-size: 12px;
  color: #fff;
}
.lotteryName {
  color: #fff;
  font-weight: bold;
}

.bet-top .leftPart {
  height: 98%;
  margin-top: 1px;
}
.bet-top .rightPart {
  /* padding-top: 14px; */
}

.leftPart .ico {
  margin: 10px 25px 3px 15px;
  width: 70px;
  height: 70px;
  background-color: #ccc;
  border-radius: 50px;
}
#ten_result_160 td .ten_result_ +  {
  background-color: #fff !important;
}
.clock11 span {
  padding: 0 2px;
  height: 30px;
  border-radius: 3px;
  background: #333;
  font-size: 24px;
  display: inline-block;
}
.pk10 .leftPart .ico {
  background-color: #ccc;
}
.game_lotteryKlsf .leftPart .ico {
  background-color: #dd0000;
}
.game_lotteryXyft .leftPart .ico {
  background-color: #ddd;
}
.game_lotteryPcdd .leftPart .ico {
  background-color: #eee;
}
.game_lotteryCqssc .leftPart .ico {
  background-color: #bbb;
}
.game_lotteryMarksix .leftPart .ico {
  background-color: #666;
}
.game_lotteryKlsf .leftPart .ico {
  background-color: #666;
}

.round .now-round,
.round .last-round {
  /*border: 1px solid #fff;*/
  border-radius: 5px;
  /*padding: 0 10px;*/
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: left;
}
.leftPart .round {
  font-size: 14px;
  margin-top: 12px;
  height: 20px;
  line-height: 20px;
}
.leftPart .round p {
  text-align: left;
}
.leftPart .round .today {
  font-size: 12px;
}
.closeTime {
  font-size: 30px;
  /*background-color: #605893;*/
  border-radius: 5px;
  padding: 10px;
  margin: 12px 0 20px 15px;
  position: relative;
  min-width: 180px;
  padding: 0 !important;
}
.lottery_type_69 .closeTime {
  width: 250px;
}

.lottery_type_270 .closeTime {
  width: 250px;
}

.lottery_type_47 .closeTime,
.lottery_type_3 .closeTime {
  min-width: 150px;
}

.balls {
  padding-left: 3px;
}

.latestResult .round {
  margin: 14px 0 0 20px;
  min-width: 130px;
}
.latestResult p {
  text-align: left;
}
.latestResult p a {
  display: block;
  height: 18px;
  line-height: 18px;
}
.balls span {
  font-size: 24px;
  color: #fff;
  background-color: #ff9338;
  width: 32px;
  height: 32px;
  margin-right: 5px;
  display: block;
  float: left;
  line-height: 32px;
  text-align: center;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.42);
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.42);
}

.balls .num_0,
.balls .num_00 {
  background-color: #ff9338;
  /*box-shadow: 2px 2px 2px #ff9338;*/
}
.balls .num_1,
.balls .num_11 {
  background-color: #e6b525;
  /*box-shadow: 2px 2px 2px #e6b525;*/
}

.balls .num_2,
.balls .num_12 {
  background-color: #008fff;
  /*box-shadow: 2px 2px 2px #008fff;*/
}

.balls .num_3,
.balls .num_13 {
  background-color: #313055;
  /*box-shadow: 2px 2px 2px #313055;*/
}

.balls .num_4,
.balls .num_14 {
  background-color: #ff7600;
  /*box-shadow: 2px 2px 2px #ff7600;*/
}

.balls .num_5,
.balls .num_15 {
  background-color: #65a9aa;
  /*box-shadow: 2px 2px 2px #65a9aa;*/
}

.balls .num_6,
.balls .num_16 {
  background-color: #5234ff;
  /*box-shadow: 2px 2px 2px #5234ff;*/
}

.balls .num_7,
.balls .num_17 {
  background-color: #806e6e;
  /*box-shadow: 2px 2px 2px #806e6e;*/
}

.balls .num_8,
.balls .num_18 {
  background-color: #ff2600;
  /*box-shadow: 2px 2px 2px #ff2600;*/
}

.balls .num_9,
.balls .num_19 {
  background-color: #730b00;
  /*box-shadow: 2px 2px 2px #730b00;*/
}

.balls .num_10,
.balls .num_20 {
  background-color: #07bf00;
  /*box-shadow: 2px 2px 2px #07bf00;*/
}
.openData .nums {
  display: flex;
  display: inline-block;
  justify-content: space-between;
}
.openData .nums .habi {
  width: 40px;
  background: none;
}
.openData .nums .habi1 {
  width: 40px;
  background: #366fbe;
}
.openData .nums span:first-child {
  background: none;
}
.openData .nums span {
  /*margin-right: 10px;*/
  /*width: 20px;*/
  height: 20px;
  padding: 0 5px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
}
.latest-ten-table th {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.latest-ten-table {
  padding: 20px;
  width: 100%;
}
.latest-ten-table th,
.latest-ten-table td,
.latest-ten-table td span {
  color: #000;
}
.latest-ten-table th,
.latest-ten-table tr {
  border-bottom: 1px dashed #ddd;
}
.latest-ten-table td {
  height: 35px;
  line-height: 35px;
  text-align: center;
  padding: 0 15px;
}
.latest-ten-table td.round,
.latest-ten-table td.time {
  /*padding-right: 20px;*/
  /*display: inline-block;*/
  font-size: 12px;
}
.latest-ten-table td.round {
  margin: 0 10px;
}
/* .latest-ten-table td:not(.round) span:nth-child(1),
.latest-ten-table td:not(.round) span:nth-child(2),
.latest-ten-table td:not(.round) span:nth-child(5),
.latest-ten-table td:not(.round) span:nth-child(6),
.latest-ten-table td:not(.round) span:nth-child(10) {
  background-color: #eb6877;
}
.latest-ten-table td:not(.round) span:nth-child(3),
.latest-ten-table td:not(.round) span:nth-child(4),
.latest-ten-table td:not(.round) span:nth-child(5) {
  background-color: #7eb900;
}
.latest-ten-table td:not(.round) span:nth-child(7),
.latest-ten-table td:not(.round) span:nth-child(8),
.latest-ten-table td:not(.round) span:nth-child(9),
.latest-ten-table td:not(.round) span:nth-child(11) {
  background-color: #3f80d4;
} */
.lottery_type_47 .balls span,
.lottery_type_3 .balls span,
.lottery_type_160 .balls span,
.lottery_type_270 .balls span,
.lottery_type_69 .balls span {
  border-radius: 50%;
  font-size: 18px;
}
#ten_result_3 td span,
#ten_result_47 td span,
.lottery_type_47 .balls span,
.lottery_type_3 .balls span,
.lottery_type_160 .balls span {
  background-color: #3e80d4;
}

#ten_result_3 td span.ten_result_19,
#ten_result_3 td span.ten_result_20,
#ten_result_47 td span.ten_result_19,
#ten_result_47 td span.ten_result_20,
.lottery_type_3 .balls span.num_19,
.lottery_type_3 .balls span.num_20,
.lottery_type_47 .balls span.num_19,
.lottery_type_47 .balls span.num_20 {
  background: red !important;
}
#ten_result_172 td span,
.lottery_type_172 .balls span,
#ten_result_280 td span,
.lottery_type_280 .balls span {
  font-size: 0;
  width: 22px;
  height: 22px;
  margin-left: 2px;
  border-radius: 5px;
  background-image: url("/static/images/ct/ico-dice.png");
}

#ten_result_172 td span,#ten_result_280 td span {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #3e80d4;
}
.lottery_type_172 .balls .num_1,.lottery_type_280 .balls .num_1 {
  background-position: 0 0;
}
.lottery_type_172 .balls .num_2 ,.lottery_type_280 .balls .num_2{
  background-position: 0 118px;
}
.lottery_type_172 .balls .num_3 ,.lottery_type_280 .balls .num_3{
  background-position: 0 236px;
}
.lottery_type_172 .balls .num_4 ,.lottery_type_280 .balls .num_4{
  background-position: 0 354px;
}
.lottery_type_172 .balls .num_5,.lottery_type_280 .balls .num_5 {
  background-position: 0 614px;
}
.lottery_type_172 .balls .num_6,.lottery_type_280 .balls .num_6 {
  background-position: 0 590px;
}
.dengyu,
.plus {
  background: none !important;
  box-shadow: none !important;
  font-size: 30px !important;
  display: inline-block !important;
}
.lottery_type_160 .balls span {
  margin: 0 !important;
}
.plus_2 {
  display: none !important;
}
#ten_result_260 td span,
#ten_result_51 td span,
#ten_result_210 td span,
#ten_result_240 td span,
#ten_result_171 td span {
  border-radius: 5px;
}
#ten_result_160 td:nth-child(3) span:nth-child(6),
#ten_result_160 td:nth-child(3) span:nth-child(4),
#ten_result_160 td:nth-child(3) span:nth-child(2) {
  color: #333 !important;
  font-size: 22px;
  vertical-align: middle;
  box-shadow: none;
  background: none !important;
}
.is-checked .el-switch__label {
  color: #409eff !important;
}
.lottery_type_3 .balls .num_19,
.lottery_type_3 .balls .num_20 {
  background: red !important;
}

.bjkl8 {
  overflow: hidden;
  max-width: 400px;
  margin-top: -5px;
}
.bjkl8 span {
  font-size: 14px;
  background-color: transparent;
  width: 32px;
  height: 32px;
  /* margin-right: 5px; */
  float: left;
  line-height: 32px;
  box-shadow: none;
}

.gd11x5 .balls span{
  border-radius: 50%;
  background:url('../../static/images/common/blue_ball.png') no-repeat center center;
  background-size: 100%;
  color: black;
  font-size: 16px;
}

.gd11x5 .openData .nums .habi1{
  width: 10px;
}

#ten_result_133  .time+td span:not(.feiche){
  background:url('../../static/images/common/blue_ball.png') no-repeat center center;
  background-size: 100%;
  color: black
}

</style>
