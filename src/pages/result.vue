<template>
<div class="content result-page">
    <nav>
        <h3 class="title result-title">
        {{'开奖走势'}}
        <el-date-picker
            v-model="selectDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            @change="dateChange"
            placeholder="选择日期查询"
            :picker-options="pickerOptions">
        </el-date-picker>
        </h3>
    </nav>
    <div class="resultHistory common-content">
        <div class="bj" @click='hideTitle'>
            <div class="header-is-active toop">
                <div class="header-modal-content" :class="{a:true}">
                    <el-tabs v-model="select" @tab-click="changUrl" ref="elTabs">
                    <el-tab-pane v-for="(value,index) in navdata" :label="gameNav[value].name" :key="index" :name="value"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <div class="biao">
                <table class="result-new" v-if = "iswating">
                    <tr>
                    <th>开奖时间</th> 
                    <th>开奖期数</th> 
                    <th v-if ="urlId==69||urlId==270||urlId==172||urlId==280||urlId==220">开奖号码</th>
                    <th v-if ="urlId!=69&&urlId!=270&&urlId!=172&&urlId!=280&&urlId!=220">
                        <span @click='haoma1' :class='{active:haoma}'  class="tb-tab-bar"  style='' >显示号码</span>
                        <span @click='daxiao1' :class='{active:daxiao}' class="tb-tab-bar" style='margin:0 20px'>显示大小</span>
                        <span @click='danshuang1' :class='{active:danshuang}' class="tb-tab-bar" style=''>显示单双</span>
                        <span @click="tabTotalHandler" v-if="urlId==180" :class='{active:tbTotal}' class="tb-tab-bar" style='margin:0 20px'>总和</span>
                        <span @click="tabNumberHandler" v-if="urlId==180" :class='{active:tbRateNum}' class="tb-tab-bar" >比数量</span>
                    </th>
                    <!-- <th v-if = "urlId==160">和值</th>
                    <th v-if = "urlId==160">特码</th> -->
                    <!-- 北京赛车 -->
                    <th v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260">冠亚和</th>
                    <th v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260">1-5球</th>

                    <!-- 重庆时时彩 -->
                    <th v-if = "urlId==2||urlId==46||urlId==250||urlId==133">总和</th> 
                    <th v-if = "urlId==2||urlId==46||urlId==250||urlId==133">龙虎</th> 

                    <!-- 广东快乐十分 -->
                    <th v-if = "urlId==3||urlId==47">总和</th>
                    <th v-if = "urlId==3||urlId==47">尾大小</th>
                    <th v-if = "urlId==3||urlId==47">1-4球</th>

                    <!-- 香港彩 -->
                    <th v-if = "urlId==69||urlId==270">总分</th>
                    <th v-if = "urlId==69||urlId==270">生肖</th>

                    <!-- PC蛋蛋 -->
                    <th v-if = "urlId==160">和值</th>

                    <!-- 江苏骰宝(快3) -->
                    <th v-if = "urlId==172||urlId==280">总和</th>
                    <th v-if = "urlId==172||urlId==280">鱼虾蟹</th>

                    </tr>
                    <tr v-for='(item,index) in lotteryList' :class="urlId==270?'game_69':`game_${urlId}`">
                    <td>{{ item.endtime }}</td>
                    <td>{{item.round}}期</td>
                    <td>
                        <!-- bjkl8-->
                        <span v-show='daxiao' class='feiche result-ball' v-for='j in isNuber(item.number)'  v-if="urlId==180" :class="j <= 40 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{j>40?'大':"小"}}</span>
                        <span v-show='haoma' class='feiche result-ball' v-for='i in isNuber(item.number)' v-if = "urlId==180" :class="i <= 40 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{i}}</span>
                        <span v-show="tbTotal">
                            <span class="pd-lr-20">{{isSum(item)}}</span>
                            <span class="pd-lr-20">{{isSum(item)>810?'大':'小'}}</span>
                            <span class="pd-lr-20">{{isSum(item)%2=='0'?'双':'单'}}</span>
                            <span class="pd-lr-20">{{five(isSum(item))}}</span>
                        </span>
                        <span v-show="tbRateNum">
                            <span class="pd-lr-20">{{frontBehind(item.number.split(','))}}</span>
                            <span class="pd-lr-20">{{singleDoubleSum(item.number.split(','))}}</span>
                        </span>
                        <span v-show='danshuang' class="result-ball" v-for='i in isNuber(item.number)' v-if = "urlId==180" :class="i % 2 == 0 ? 'ball-t-gray-f' : 'ball-t-blue-f'">{{i%2?'单':'双'}}</span>

                        <!-- pk10 feiting -->
                        <span v-show='haoma' class='feiche' v-for='i in isNuber(item.number)' v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span v-show='daxiao' class='feiche' v-for='i in isNuber(item.number)' :style='i>=6?"background:#f9982e":"background:#7f8ab0" ' v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260" :class="`result-ball result-ball_${i}`">{{i>=6?'大':"小"}}</span>
                        <span v-show='danshuang' class='feiche' v-for='i in isNuber(item.number)' :style='i%2?"background:#f9982e":"background:#7f8ab0" ' v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260" :class="`result-ball result-ball_${i}`">{{i%2?'单':'双'}}</span>
                        <!-- cqssc -->
                        <span v-show='haoma' v-for='i in isNuber(item.number)'  v-if = "urlId==2||urlId==46||urlId==250||urlId==133" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span v-show='daxiao' v-for='i in isNuber(item.number)' :style='i>4?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==2||urlId==46||urlId==250" :class="`result-ball daxiao result-ball_${i}`">{{i>4?'大':"小"}}</span>
                        <!-- 广东11选5 -->
                        <span v-show='daxiao' v-for='i in isNuber(item.number)' :style='i>5?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==133" :class="`result-ball daxiao result-ball_${i}`">{{i>5?'大':"小"}}</span>
                        <span v-show='danshuang' v-for='i in isNuber(item.number)' :style='i%2?"background:#f9982e!important":"background:#7f8ab0!important"'  v-if = "urlId==2||urlId==46||urlId==250||urlId==133" :class="`result-ball danshuang result-ball_${i}`">{{i%2?'单':'双'}}</span>
                        <!-- haapyten -->
                        <span v-show='haoma'  v-for='i in isNuber(item.number)'  v-if = "urlId==3" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span v-show='haoma'  v-for='i in isNuber(item.number)'  v-if = "urlId==220" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span  v-show='daxiao' v-for='i in isNuber(item.number)' :style='i>10?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==3" :class="`result-ball result-ball_${i}`">{{i>10?'大':"小"}}</span>
                        <span v-show='danshuang' v-for='i in isNuber(item.number)' :style='i%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==3" :class="`result-ball result-ball_${i}`">{{i%2?'单':'双'}}</span>
                        <!-- lunckfarm -->
                        <span v-show='haoma'  v-for='i in isNuber(item.number)'  v-if = "urlId==47" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span  v-show='daxiao' v-for='i in isNuber(item.number)' :style='i>10?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==47" :class="`result-ball result-ball_${i}`">{{i>10?'大':"小"}}</span>
                        <span  v-show='danshuang' v-for='i in isNuber(item.number)' :style='i%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==47" :class="`result-ball result-ball_${i}`">{{i%2?'单':'双'}}</span>
                        <!-- <span  v-for='i in isNuber(item.number)' v-if = "urlId==69" :class="`result-ball result-ball_${i}`">{{i}}</span> -->

                        <span  v-for='i in isNuber(item.number).slice(0, isNuber(item.number).length-1)' v-if = "urlId==69||urlId==270" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span class="plus_tm"  v-if = "urlId==69||urlId==270">+</span>
                        <span  v-if = "urlId==69||urlId==270" class="result-ball result-ball_tm" :class="`result-ball_${isNuber(item.number)[isNuber(item.number).length-1]}`">{{isNuber(item.number)[isNuber(item.number).length-1]}}</span>
                        <!-- pcegg -->
                        <span  v-show='haoma' v-for='i in isNuber(item.number)'  v-if = "urlId==160" :class="`result-ball result-ball_${i}`">{{i}}</span>
                        <span v-show='daxiao' v-for='i in isNuber(item.number)' :style='i>4?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==160" :class="`result-ball result-ball_${i}`">{{i>4?'大':"小"}}</span>
                        <span  v-show='danshuang'  v-for='i in isNuber(item.number)' :style='i%2?"background:#f9982e!important":"background:#7f8ab0!important" ' v-if = "urlId==160" :class="`result-ball result-ball_${i}`">{{i%2?'单':'双'}}</span>
                        <!-- <span  v-if = "urlId==160" :class="`result-ball result-ball_${i}`">{{isSum(item)}} </span> -->
                        <span  v-for='i in isNuber(item.number)' v-if = "urlId==172||urlId==280" :class="`result-ball result-ball_${i}`">{{i}}</span>
                    </td>
                    <!-- 北京赛车 -->
                    <td v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260">
                        <ul>
                            <li>{{bjSum(item)}}</li>
                            <li>{{bjSum(item)%2=='0'?'双':'单'}}</li>
                            <li>{{bjSum(item)>11?'大':'小'}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260">
                        <ul>
                        <li>{{parseInt(isNuber(item.number)[0])>parseInt(isNuber(item.number)[9])?'龙':'虎'}}</li>
                        <li>{{parseInt(isNuber(item.number)[1])>parseInt(isNuber(item.number)[8])?'龙':'虎'}}</li>
                        <li>{{parseInt(isNuber(item.number)[2])>parseInt(isNuber(item.number)[7])?'龙':'虎'}}</li>
                        <li>{{parseInt(isNuber(item.number)[3])>parseInt(isNuber(item.number)[6])?'龙':'虎'}}</li>
                        <li>{{parseInt(isNuber(item.number)[4])>parseInt(isNuber(item.number)[5])?'龙':'虎'}}</li>
                        </ul>
                    </td>

                    <!-- 重庆时时彩 -->
                    <td v-if = "urlId==2||urlId==46||urlId==250||urlId==133">
                        <ul>
                            <li>{{isSum(item)}}</li>
                            <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
                            <li>{{isSum(item)>=23?'大':'小'}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==2||urlId==46||urlId==250||urlId==133">
                        <ul>
                        <li>{{ssche(isNuber(item.number)[0],isNuber(item.number)[4])}}</li>
                        </ul>
                    </td>

                    <!-- 广东快乐十分 -->
                    <td v-if = "urlId==3||urlId==47">
                        <ul>
                            <li>{{isSum(item)}}</li>
                            <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
                            <li>{{isSum(item)>=85?'大':isSum(item)==84?'和':'小'}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==3||urlId==47">
                        <ul>
                        <li>{{isSum(item).toString().substr(isSum(item).toString().length-1) >= 5?'尾大':'尾小'}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==3||urlId==47">
                        <ul>
                        <li>{{isNuber(item.number)[0]>isNuber(item.number)[7]?'龙':'虎'}}</li>
                        <li>{{isNuber(item.number)[1]>isNuber(item.number)[6]?'龙':'虎'}}</li>
                        <li>{{isNuber(item.number)[2]>isNuber(item.number)[5]?'龙':'虎'}}</li>
                        <li>{{isNuber(item.number)[3]>isNuber(item.number)[4]?'龙':'虎'}}</li>
                        </ul>
                    </td>

                    <!-- 香港彩 -->
                    <td v-if = "urlId==69||urlId==270">
                        <ul>
                            <li>{{isSum(item)}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==69||urlId==270">
                        <ul>
                            <li>{{xgcsx(isNuber(item.number)[0], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[1], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[2], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[3], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[4], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[5], item.round)}}</li>
                            <li>{{xgcsx(isNuber(item.number)[6], item.round)}}</li>

                        </ul>
                    </td>

                    <!-- PC蛋蛋 -->
                    <td v-if = "urlId==160">
                        <ul>
                            <li :class="`pcegg pcegg_${isSum(item)}`">{{isSum(item)}}</li>
                            <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
                            <li>{{isSum(item)>=14?'大':'小'}}</li>
                        </ul>
                    </td>

                    <!-- 江苏骰宝(快3) -->
                    <td v-if = "urlId==172||urlId==280">
                        <ul>
                            <li>{{isSum(item)}}</li>
                            <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
                            <li>{{isSum(item)>10?'大':'小'}}</li>
                        </ul>
                    </td>
                    <td v-if = "urlId==172||urlId==280">
                        <ul>
                            <li>{{kssx(isNuber(item.number)[0])}}</li>
                            <li>{{kssx(isNuber(item.number)[1])}}</li>
                            <li>{{kssx(isNuber(item.number)[2])}}</li>
                        </ul>
                    </td>
                    </tr>
                </table>
                <div style='width:1030px;height:678px;' v-show="!iswating">数据加载中...</div>

                <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 20, 25]"
                    :page-size="20"
                    layout="total, prev, pager, next, jumper"
                    :total="allnumb">
                </el-pagination>
                </div>
            </div>

        </div>

    </div>

</div>
</template>

<script>
import {formatDate} from '../assets/js/date.js';
import {cacheGame} from "@/utils"
export default {
  data() {
    return {
      iswating:true,
      getApiName: getApiName(),
      select: 0,
      pcDate: '',
      game_code: 51,
      isday:false,
      haoma:true,
      daxiao:false,
      danshuang:false,
      tbTotal:false,
      tbRateNum:false,
      flag:true,
      show_title: false,    // 显示下拉菜单
      dateyes:'',
      allnumb: 2000, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      numb: 20, // 每页的数量
      l:null,
      gameNav: {
        270:{name:'极速六合彩',code:270,page:'jslh'},
        260:{name:'88赛马',code:260,page:'race'},
        240:{name:'极速赛车',code:240,page:'jssc'},
        250:{name:'极速时时彩',code:250,page:'jsssc'},
        210:{name:'威尼斯赛艇',code:210,page:'veniceRowing'},
        46:{name:'罗马时时彩',code:46,page:'roma'},
        51:{name:'北京赛车',code:51,page:'pk10'},
        2:{name:'重庆时时彩',code:2,page:'cqssc'},
        69:{name:'香港六合彩',code:69,page:'markSix'},
        160:{name:'PC蛋蛋',code:160,page:'pcegg'},
        171:{name:'幸运飞艇',code:171,page:'luckyAirship'},
        3:{name:'广东快乐十分',code:3,page:'happyTen'},
        47:{name:'重庆幸运农场',code:47,page:'luckFarm'},
        172:{name:'江苏骰宝(快3)',code:172,page:'jsks'},
        180: { name: "北京快乐8", code: 180, page: "bjkl8" },
        280: { name: "吉林快3", code: 280, page: "jlk3" },
        220: { name: "福彩3D", code: 220, page: "fucai3D" },
        133: { name: "广东11选5", code: 133, page: "gd11x5" }              
      },
      navdata:null,
      lotteryList: [],
      number: 20,
      page: 1,
      urlId: null,
      flag: true,
      pickerOptions: {
        disabledDate(time) { // 限制选择7天日期
          let curDate = (new Date()).getTime();
          let three = 3600 * 1000 * 24 * 7;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;;
        }
      },
      selectDate: ''
    }
  },
  methods: {
    gamesort(){
      this.$http.post("/systems/game_sort").then(res => {
          let sort = res.data.sort;
          let a = [];
          for(var i in sort){
            if(sort[i] in this.gameNav){
              a.push(sort[i])
            }
          }
          this.navdata=a;
      });
    },
    haoma1(){
       this.haoma=true;
       this.daxiao=false;
       this.danshuang=false;
       this.tbRateNum = false;
       this.tbTotal = false;
    },
    daxiao1(){
      this.daxiao=true;
      this.haoma=false;
      this.danshuang=false;
      this.tbRateNum = false;
      this.tbTotal = false;
    },
    danshuang1(){
      this.daxiao=false;
      this.haoma=false;
      this.tbRateNum = false;
      this.tbTotal = false;
      this.danshuang=true;
    },
    tabTotalHandler() {
       this.daxiao = this.haoma = this.danshuang = this.tbRateNum = false;
       this.tbTotal = true;
    },
    tabNumberHandler() {
      this.daxiao = this.haoma = this.danshuang = this.tbTotal = false;
      this.tbRateNum = true;
    },
    dateChange (val) {
      this.pcDate = val;
      this.getData (this.number,this.page,this.pcDate);
      event.stopPropagation()
    },
    //切换每页显示的数据
    handleSizeChange(val) {
      this.iswating=false;
      this.lotteryList =null;
      this.getData (val,1,this.pcDate);
       event.stopPropagation()
    },
    //
    handleCurrentChange(val) {
      this.iswating=false;
        this.lotteryList =null;
          this.page = val;
         this.getData (20, this.page,this.pcDate);
    },
    kssx(item){
      if(item=='1'){
          return '鱼'
      }else if(item=='2'){
          return '虾'
      }else if(item=='3'){
          return '葫芦'
      }else if(item=='4'){
          return '金钱'
      }else if(item=='5'){
          return '蟹'
      }else if(item=='6'){
          return '鸡'
      }
    },
    xgcsx(sx, round){
      if(round<= 2018016){
        if(sx=='10'||sx=='22'||sx=='34'||sx=='46'){
          return '鼠'
        }else if(sx=='8'||sx=='20'||sx=='32'||sx=='44'){
          return '虎'
        }else if(sx=='6'||sx=='18'||sx=='30'||sx=='42'){
          return '龙'
        }else if(sx=='4'||sx=='16'||sx=='28'||sx=='40'){
          return '馬'
        }else if(sx=='2'||sx=='14'||sx=='26'||sx=='38'){
          return '猴'
        }else if(sx=='12'||sx=='24'||sx=='36'||sx=='48'){
          return '狗'
        }else if(sx=='9'||sx=='21'||sx=='33'||sx=='45'){
          return '牛'
        }else if(sx=='7'||sx=='19'||sx=='31'||sx=='43'){
          return '兔'
        }else if(sx=='5'||sx=='17'||sx=='29'||sx=='41'){
          return '蛇'
        }else if(sx=='3'||sx=='15'||sx=='27'||sx=='39'){
          return '羊'
        }else if(sx=='11'||sx=='23'||sx=='35'||sx=='47'){
          return '猪'
        }else if(sx=='1'||sx=='13'||sx=='25'||sx=='37'||sx=='49'){
          return '鸡'
        }
      }else{
        var sixnumber = cacheGame('sixnumber');
        var zodiac = '';
        if (sixnumber){
          sixnumber.forEach((element, i) => {
          if(element.numbers.indexOf(sx) != -1){
              zodiac = element.animal;
            }
          });
        }
        else
        {
          this.$http.post("/user/getMarkSixNumbers").then(res => {
            if(res.data) {
              cacheGame('sixnumber', res.data);
            }
            res.data.forEach((element, i) => {
                if(element.numbers.indexOf(sx) != -1){
                  zodiac = element.animal;
                }
            });
          })
        }
        return zodiac;
      }

    },
    isSum(item){
        // console.log(item.number)
        let len=item.number.split(',');
        let value=0;
        for(let i=0;i<len.length;i++){
          value+=Number(len[i])
        }
        return value
    },
    five(sum) {
      if (sum >= 210 && sum <= 695) return '金';
      if (sum >= 696 && sum <= 763) return '木';
      if (sum >= 764 && sum <= 855) return '水';
      if (sum >= 856 && sum <= 923) return '火';
      if (sum >= 924 && sum <= 1410) return '土';

    },
    frontBehind(nums) {
      if (!nums) return '';
      let frontNumCount = 0, half;
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] <= 40) {
          frontNumCount++;
        }
      }
      half = nums.length / 2;
      if (frontNumCount > half) return '前（多）';
      if (frontNumCount < half) return '后（多）';
      if (frontNumCount == half) return '前后（和）';

    },
    singleDoubleSum(nums) {
      if (!nums) return '';
      let evenCount = 0, half;
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 == 0) {
          evenCount++;
        }
      }
      half = nums.length / 2;
      if (evenCount > half) return '双（多）';
      if (evenCount < half) return '单（多）';
      if (evenCount == half) return '单双（和）';
    },
    ssche(one,two){
      if(one>two){
        return '龙'
      }else if(one<two){
        return '虎'
      }else if(one==two){
        return '和'
      }
    },
    bjSum(item){
        let len=item.number.split(',');
        let value=0;
        for(let i=0;i<2;i++){
          value+=Number(len[i])
        }
        return value
    },
    isxg(item){
      let arr_t=item.number.split(',')
      let arr_xg=arr_t
      let last_te= arr_t.pop()
      return arr_xg;
      return last_te;
    },
    te(item){
      let arr_t=item.number.split(',')
      let last_te= arr_t.pop()
      return last_te;
    },
    showTitle(){
        this.show_title = !this.show_title;
    },
    // 点击任意地方隐藏下拉框
    hideTitle(){
      this.show_title = false;
    },
    isNuber(numberList){
      return numberList.split(',')
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    // 切换不同的
    changUrl(tab) {
        this.iswating=false;
        this.lotteryList =null;
        this.haoma=true;
        this.daxiao=false;
        this.danshuang=false;
        this.tbRateNum = false;
        this.tbTotal = false;
        this.urlId=tab.name
        this.getData (20,1)
    },
    getData (number,page,date) {
      let params = {};
       params.game_code = this.urlId;
       params.number = number;
       params.page = page;
       params.date = date;
       this.$http.post(`/user/getResult`, JSON.stringify(params)).then(res => {
         if (res.data.msg == 4001) {
          this.$swal({
            text: "账户已下线，请重新登陆",
            type: "error",
            timer: 1200,
          })
          this.$router.push({path: '/home'})
          return
        }
         this.lotteryList = res.data.result;
         if(res.data.result.length==0){
            this.$swal({
              text: '今日暂未开奖，请选择相应的日期查询',
              type: "error",
              timer: 1200,
            })
         }
          this.allnumb = parseInt(res.data.allnumb);
          this.currentPage = parseInt(res.data.page);
          this.numb = parseInt(res.data.numb);
          for (let i = 0; i < this.lotteryList.length; i++) {
            this.lotteryList[i].endtime = formatDate(new Date(this.lotteryList[i].endtime * 1000), 'yyyy-MM-dd hh:mm');
          }
         this.iswating = true
       })
    }
  },
  created(){
    this.gamesort();
    this.urlId = this.$route.params.id.split('_')[1];
    console.log(this.$route)
    this.select = this.urlId
    console.log(this.select)
    this.getData (20,1);
  },
	mounted() {
		setTimeout(() => {
			this.$refs.elTabs.$refs.nav.scrollToActiveTab()
		}, 500)
	}
}
</script>

<style>
#ten_result_172 td span,
.game_172 .result-ball,
#ten_result_280 td span,
.game_280 .result-ball,
.jsks .ksball_1,
.jsks .ksball_2,
.jsks .ksball_3,
.jsks .ksball_4,
.jsks .ksball_5,
.jsks .ksball_6 {
  background-image: url('/static/images/ct/ico-dice.png');
}
#ten_result_172 .ten_result_1,
.game_172 .result-ball_1,
#ten_result_280 .ten_result_1,
.game_280 .result-ball_1,
.jsks .ksball_1 {
  background-position:  0 0;
}
#ten_result_172 .ten_result_2,
.game_172 .result-ball_2,
#ten_result_280 .ten_result_2,
.game_280 .result-ball_2,
.jsks .ksball_2 {
    background-position: 0 118px;
}
#ten_result_172 .ten_result_3,
.game_172 .result-ball_3,
#ten_result_280 .ten_result_3,
.game_280 .result-ball_3,
.jsks .ksball_3 {
  background-position: 0 236px;
}
#ten_result_172 .ten_result_4,
.game_172 .result-ball_4,
#ten_result_280 .ten_result_4,
.game_280 .result-ball_4,
.jsks .ksball_4 {
  background-position: 0 354px;
}
#ten_result_172 .ten_result_5,
.game_172 .result-ball_5,
#ten_result_280 .ten_result_5,
.game_280 .result-ball_5,
.jsks .ksball_5 {
  background-position: 0 614px;
}
#ten_result_172 .ten_result_6,
.game_172 .result-ball_6,
#ten_result_280 .ten_result_6,
.game_280 .result-ball_6,
.jsks .ksball_6 {
  background-position: 0 590px;
}
.pd-lr-20 {
  padding: 0 20px;
}
.pd-lr-10 {
  padding: 0 10px;
}
.mg-lr-10 {
  margin: 0 10px;
}
.resultHistory .tb-tab-bar {
  display:inline-block;
  width:70px;
  background:#b9b9b9;
  border-radius:5px;
  color:#fff;
  cursor: pointer;
  height:25px;
  line-height:25px;
}

.bj .el-tabs__nav-next,.bj  .el-tabs__nav-prev {
  margin-top: 0px
}
.el-tabs__nav-wrap.is-scrollable{
  margin:15px 0;
}
.common-content .header-modal-content .el-tabs__item{
    border-radius: 4px;
    background-color: #f1f3f8;
    margin-right: 5px;
    font-size: 14px;
    color: #666;
    height:40px;
    line-height: 40px;
    border-right:none;
}
.common-content .header-modal-content .el-tabs__item.is-active{
      color: #fff;
    background-color: #1c4fa8
}
.result-title .el-input__inner {
  height: 28px!important;
  cursor: pointer;
}
.result-title .el-input__prefix {
    left: 13px;
    transition: all .3s;
}

.result-title .el-input__icon {
    line-height: 36px!important;
    margin-right: 20px!important;
}
span.plus_tm{
  font-size: 25px;
  margin-top: -1px;
  vertical-align: top;
}

.resultHistory .el-tabs__item:nth-child(2){
    padding-left:20px!important;
}
.resultHistory .el-tabs__item:last-child{
    padding-right:20px!important;
}
.a{}
</style>
<style scoped>
  .a .el-tabs__nav{
    transform: translateX(-574px)!important;
  }
  .bj {
    background-color: #fff;
    color: #333;
  }
  .header-modal-content ul {
    text-align: left;
  }
  .header-modal-content li {
    display: inline-block;
    margin-right: 8px;
    background-color: #f2f3f8;
    border-radius: 4px;
    /*height: 25px;*/
    /*line-height: 25px;*/
    padding: 3px 12px;
    color: #333;
    cursor: pointer;
    transition: all ease .5s;
  }
  table.result-new {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  table.result-new td,
  table.result-new th {
    text-align: center;
    padding: 0 8px!important;
    color: #666;
    vertical-align: middle;
    height: 32px;
    line-height: 27px;
  }
  .active{
    background: rgb(80, 81, 95)!important;
  }
  table.result-new th:first-child {
    border-top-left-radius: 5px;
  }
  table.result-new th:last-child {
    border-top-right-radius: 5px;
  }
  table.result-new tr:nth-child(odd) td {
    background-color: #f8f9fb;
  }
  table.result-new th {
    border-bottom: 1px solid #ddd;
    background-color: #f2f3f8;
    height: 35px;
    line-height: 35px;
  }

  table.result-new td li {
    /*float: left;*/
    display: inline-block;
    margin-right: 10px;
    text-align: center;
  }
.resultHistory .result-ball {
  width: 28px;
  height: 28px;
  line-height: 28px;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  margin-right: 8px;
  color: #fff;
  display: inline-block;
}
.result-title {
  position: relative;
}
.result-title .el-input {
  position: absolute;
  right: 45px;
  top: 0;
}
.game_172 .result-ball,.game_280 .result-ball {
  width: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 0;
  border-radius: 5px;
  border: 1px solid #3e80d4;
}
.game_69 .result-ball {
  border-radius: 50%;
}

table.result-new .game_172 td li,table.result-new .game_280 td li {
    /*text-align: left;*/
    width: 80px;
}
table.result-new .game_171 td li {
    width: auto;
}
.box-circle {
    border-radius: 50%!important;
    box-shadow: 2px 2px 4px 0px rgba(16, 15, 15, 0.8);
}
.game_133 .result-ball {
  border-radius:50%;
  background:url('../../static/images/common/blue_ball.png') no-repeat center center;
  background-size:100% 100%;
  color:black;
  font-size:16px;
}

.game_133 .daxiao{
  color:white
}

.game_133 .danshuang{
  color:white  
}
</style>
