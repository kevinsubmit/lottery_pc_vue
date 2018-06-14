<template>
  <div class="content fucai3d">
    <!-- 右侧头部导航 -->
    <div style='height:80px'>
      <lottery-area v-if="isLotteryArea" :todayWinLost="todayWinLost" :game_code=game_code :lotteryName="lotteryName" :lotteryObj="body" :endtime="endtime" gameType="30" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
      <div v-else="isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
    </div>
    <!-- 下注弹窗 -->
    <bet-dialog v-if="showDialog" :betArr="betArr" :betlm="betlm" :game_code=game_code :type_code=type_code :round="round" v-on:child-say="listenToMyBoy"></bet-dialog>
    <!-- 连码下注弹窗 -->
    <lm-dialog v-if="showLmDialog" :betArr="betArr" :game_code=game_code :type_code=type_code :round="round" v-on:child-lm="listenLm"></lm-dialog>
    <nav class="top-nav">
      <ul class="clearfix" style='height:100%'>
        <li :class="`${classCode==='0101'?'active':''}`" @click="changeNav('0101')">主势盘</li>
        <li :class="`${classCode==='0102'?'active':''}`" @click="changeNav('0102')">一字组合</li>
        <li :class="`${classCode==='0103'?'active':''}`" @click="changeNav('0103')">二字组合</li>
        <li :class="`${classCode==='0104'?'active':''}`" @click="changeNav('0104')">三字组合</li>
        <li :class="`${classCode==='0105'?'active':''}`" @click="changeNav('0105')">一字定位</li>
        <li :class="`${classCode==='0106'?'active':''}`" @click="changeNav('0106')">二字定位</li>
        <li :class="`${classCode==='0107'?'active':''}`" @click="changeNav('0107')">三字定位</li>
        <li :class="`${classCode==='0108'?'active':''}`" @click="changeNav('0108')">二字和数</li>
        <li :class="`${classCode==='0109'?'active':''}`" @click="changeNav('0109')">三字和数</li>
        <li :class="`${classCode==='0110'?'active':''}`" @click="changeNav('0110'), addEvent()">组选三</li>
        <li :class="`${classCode==='0111'?'active':''}`" @click="changeNav('0111'), addEvent()">组选六</li>
        <li :class="`${classCode==='0112'?'active':''}`" @click="changeNav('0112')">跨度</li>
      </ul>
    </nav>
    <div class="bet-content">
      <div class="bet-center">
        <div class="bet-box">
          <div class="bet-area" :class="lotteryType">
            <div class="game">
              <div class="game_info">
                <!-- zhushipan -->
                <ul v-if="classCode == '0101'">
                  <ul class="" ref='cName'>
                    <li v-for='(item,j) in list'>
                      <div class="game_title">
                        <h3>{{item.list[0].name}}</h3>
                      </div>
                      <div class="clearfix" v-for='(ite,i,j) in item.list'>
                        <span v-if="i<10">{{i}}</span>
                        <span>{{ite.odds}}</span>
                        <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                        <input v-else="closeBet" readonly value="封盘" class="closeBet">
                      </div>
                    </li>
                  </ul>

                  <ul class="zhihe" ref='cName1'>
                    <li>
                      <div class="game_title" v-for="item in ['种类','大','小','单','双','质','合']">
                        <h3>{{item}}</h3>
                      </div>
                      <div class="clearfix" v-for='(ite, i) in this.zhushipan' v-if="i=='0'||i=='1'||i=='2'">
                        <span class="text"> {{text[i]}} </span>
                        <div class="item" v-for='(itm, index) in ite'>
                          <span> {{itm.odds}}</span>
                          <input ref='kuang' :id="itm.key" :name="index" :data-obj="JSON.stringify(itm)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </div>
                      <div class="clearfix" v-for='(ite, i) in this.zhushipan' v-if="i=='3'||i=='4'||i=='5'">
                        <span class="text"> {{text[i]}} </span>
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item" v-for='(itm, index) in ite'>
                          <span> {{itm.odds}} 345</span>
                          <input ref='kuang' :id="itm.key" :name="index" :data-obj="JSON.stringify(itm)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </div>
                      <div class="clearfix difer" v-for='(ite, i) in this.zhushipan' v-if="i=='6'||i=='7'||i=='8'">
                        <span class="text"> {{text[i]}}</span>
                        <div class="item different" v-for='(itm, index) in ite'>
                          <span> {{itm.odds}} </span>
                          <input ref='kuang' :id="itm.key" :name="index" :data-obj="JSON.stringify(itm)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </div>
                      <div class="clearfix" v-for='(ite, i) in this.zhushipan' v-if="i=='9'">
                        <span class="text"> {{text[i]}} </span>
                        <div class="item" v-for='(itm, index) in ite'>
                          <span> {{itm.odds}}</span>
                          <input ref='kuang' :id="itm.key" :name="index" :data-obj="JSON.stringify(itm)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </div>
                      <div class="clearfix difer" v-for='(ite, i) in this.zhushipan' v-if="i=='10'">
                        <span class="text"> {{text[i]}} </span>
                        <div class="item different" v-for='(itm, index) in ite'>
                          <span> {{itm.odds}}</span>
                          <input ref='kuang' :id="itm.key" :name="index" :data-obj="JSON.stringify(itm)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </div>
                    </li>
                  </ul>
                </ul>

                <ul class="" ref='cName' v-if="classCode == '0102'||classCode=='0112'">
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>{{item.list[0].name}}</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list'>
                      <span v-if="i<10">{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
                <ul class="" ref='cName' v-if="classCode == '0103'">
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>{{item.list[1].name}}</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list'>
                      <span v-if="i<10">0{{i}}</span>
                      <span v-if="i>=10">{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
                <ul class="" ref='cName' v-if="classCode == '0104'">
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>{{item.list[35].name}}</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list'>
                      <span v-if="i<10">00{{i}}</span>
                      <span v-if="i>9 && i<100">0{{i}}</span>
                      <span v-if="i>=100">{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
                <ul class="" ref='cName' v-if="classCode == '0105'" v-for="">
                  <li v-for='(item,j) in list'>
                    <div class="wrap">
                      <div class="game_title">
                        <h3>佰</h3>
                      </div>
                      <div class="clearfix" v-for='(ite,i,j) in item.list.hundreds'>
                        <span>{{i}}</span>
                        <span>{{ite.odds}}</span>
                        <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                        <input v-else="closeBet" readonly value="封盘" class="closeBet">
                      </div>
                    </div>
                    <div class="wrap">
                      <div class="game_title">
                        <h3>拾</h3>
                      </div>
                      <div class="clearfix" v-for='(ite,i,j) in item.list.decade'>
                        <span>{{i}}</span>
                        <span>{{ite.odds}}</span>
                        <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                        <input v-else="closeBet" readonly value="封盘" class="closeBet">
                      </div>
                    </div>
                    <div class="wrap">
                      <div class="game_title">
                        <h3>个</h3>
                      </div>
                      <div class="clearfix" v-for='(ite,i,j) in item.list.unit'>
                        <span>{{i}}</span>
                        <span>{{ite.odds}}</span>
                        <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                        <input v-else="closeBet" readonly value="封盘" class="closeBet">
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="" ref='cName' v-if="classCode == '0106'">
                  <el-tabs type="border-card">
                    <el-tab-pane label="佰拾定位">
                      <li v-for='(item,j) in list'>
                        <div class="game_subtitle">
                          <h3>百位</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.hundreds'>
                          <span v-if="i<10">{{i}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li v-for='(item,j) in list'>
                        <div class="game_subtitle">
                          <h3>拾位</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.decade'>
                          <span>{{i}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                    <el-tab-pane label="佰个定位">
                      <li v-for='(item,j) in list'>
                        <div class="game_subtitle">
                          <h3>百位</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.hundreds'>
                          <span v-if="i<10">{{i}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li>
                        <div class="game_subtitle">
                          <h3>个位</h3>
                        </div>
                        <div class="clearfix" v-for='(ge,index) in gewei'>
                          <span>{{index}}</span>
                          <span>{{ge.odds}}</span>
                          <input ref='kuang' :id="ge.key" :name="index" :data-obj="JSON.stringify(ge)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                    <el-tab-pane label="拾个定位">
                      <li v-for='(item,j) in list'>
                        <div class="game_subtitle">
                          <h3>拾位</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.decade'>
                          <span>{{i}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li>
                        <div class="game_subtitle">
                          <h3>个位</h3>
                        </div>
                        <div class="clearfix" v-for='(ge,index) in gewei'>
                          <span>{{index}}</span>
                          <span>{{ge.odds}}</span>
                          <input ref='kuang' :id="ge.key" :name="index" :data-obj="JSON.stringify(ge)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                  </el-tabs>
                </ul>
                <ul class="" ref='cName' v-if="classCode == '0107'">
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>佰位</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list.hundreds'>
                      <span>{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>拾位</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list.decade'>
                      <span>{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>个位</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list.unit'>
                      <span>{{i}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
                <ul class="" ref='cName' v-if=" classCode == '0108' ">
                  <!-- er zi he shu -->
                  <el-tabs type="border-card">
                    <el-tab-pane label="佰拾和数">
                      <li v-for='(item,j) in list'>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.hd'>
                          <span>{{ite.title}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li>
                        <div class="game_subtitle">
                          <h3>佰拾和数尾数</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,index) in this.ergewei.hd'>
                          <span>{{index}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="index" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                    <el-tab-pane label="佰个和数">
                      <li v-for='(item,j) in list'>
                        <div class="clearfix" v-for='(ite,i,j) in item.list.hu'>
                          <span>{{ite.title}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li>
                        <div class="game_subtitle">
                          <h3>佰个和数尾数</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,index) in this.ergewei.hu'>
                          <span>{{index}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="index" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                    <el-tab-pane label="拾个和数">
                      <li v-for='(item,j) in list'>
                        <div class="clearfix" v-for='(ite,inde) in item.list.du'>
                          <span>{{ite.title}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="inde" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                      <li>
                        <div class="game_subtitle">
                          <h3>拾个和数尾数</h3>
                        </div>
                        <div class="clearfix" v-for='(ite,index) in this.ergewei.du'>
                          <span>{{index}}</span>
                          <span>{{ite.odds}}</span>
                          <input ref='kuang' :id="ite.key" :name="index" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                          <input v-else="closeBet" readonly value="封盘" class="closeBet">
                        </div>
                      </li>
                    </el-tab-pane>
                  </el-tabs>
                </ul>
                <ul class="sanheshuwrap" ref='cName' v-if="classCode == '0109'">
                  <!-- sanziheshu -->
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>{{item.list[0].name}}</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,i,j) in item.list'>
                      <span class="sanheshunum">{{ite.title}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="i" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                  <li v-for='(item,j) in list'>
                    <div class="game_title">
                      <h3>三字和尾</h3>
                    </div>
                    <div class="clearfix" v-for='(ite,index) in sanwei[0].list.tail_3'>
                      <span>{{index}}</span>
                      <span>{{ite.odds}}</span>
                      <input ref='kuang' :id="ite.key" :name="index" :data-obj="JSON.stringify(ite)" @input="chkInput()" @focus="inputFocus($event)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
                <ul class="zuxuansan" ref='cName' v-if="  classCode == '0110' ">
                  <li>
                    <div class="game_title">
                      <h3>组选三</h3>
                    </div>
                    <div class="hardone" style="width:100%;">赔率:
                      <b ref="hardone" v-for="item in hardlist" v-if="item.title == checkNames1.length ? true : false"> {{item.odds}} </b>
                    </div>
                    <div class="clearfix" v-for='(ite,index) in harddata'>
                      <span>{{index}}</span>
                      <input ref='kuang' :id="ite" class="kuangL" :name="index" :value="index" :code="6211" v-model="checkNames1" :data-obj="ite" @focus="inputFocus($event)" min="1" type="checkbox" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" checked="" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet ">
                    </div>
                  </li>
                </ul>
                <ul class="zuxuanliu" ref='cName' v-if="  classCode == '0111' ">
                  <li>
                    <div class="game_title">
                      <h3>组选六</h3>
                    </div>
                    <div class="hardtwo" style="width:100%;">赔率:
                      <b ref="hardtwo" v-for="item in easylist" v-show="item.title == checkNames2.length ? true : false"> {{item.odds}} </b>
                    </div>
                    <div class="clearfix" v-for='(ite,index) in easydata'>
                      <span>{{index}}</span>
                      <input ref='kuang' :id="ite" class="kuangL" :name="index" :value="index" :code="6212" v-model="checkNames2" :data-obj="ite" @focus="inputFocus($event)" min="1" type="checkbox" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="7" checked="" />
                      <input v-else="closeBet" readonly value="封盘" class="closeBet">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="btn-bet">
            <el-checkbox v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
            <input type="text" @input="checkMoney(quickyMoney)" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney" />
            <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
            <input @click="reset" type="button" name="" class="btn-blue" value="重置" />
          </div>
        </div>
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
import luZhu from "../../components/luzhu";

export default {
  data() {
    return {
      toSendData: [],
      lotteryType: "fucai3d",
      classCode: "0101",
      lotteryName: "福彩3D",
      type_code: 6210,
      game_code: 220,
      round: 0,
      endtime: 0,
      closetime: 0,
      fentime: 30,
      list: [],
      list_0: [],
      list_1: [],
      list_2: [],
      list_3: [],
      list_4: [],
      list_6: [],
      list_7: [],
      list_8: [],
      list_9: [],
      list_10: [],
      list_11: [],
      list_12: [],
      list_13: [],
      list13: [],
      text: [
        "佰",
        "拾",
        "个",
        "佰拾和数",
        "佰个和数",
        "拾个和数",
        "佰拾个和数",
        "佰拾和尾数",
        "佰个和尾数",
        "拾个和尾数",
        "佰拾个和尾数"
      ],
      gewei: [],
      ergewei: [],
      checkNames1: [],
      checkNames2: [],
      zhushipan: [],
      oddsMoney: {},
      hard: [],
      harddata: [],
      hardlist: [],
      easydata: [],
      easylist: [],
      sanwei: [],
      hardtitle: 5,
      closeBet: true,
      betInfo: {},
      betArr: [],
      checkboxArray: [],
      body: {},
      betArrs: [],
      isLotteryArea: false,
      showDialog: false,
      showLmDialog: false,
      isSaveMoney: false,
      quickyMoney: 0,
      todayWinLost: 0,
      hundred: []
    };
  },
  components: {
    lotteryArea,
    betDialog,
    changLong,
    luZhu
  },
  methods: {
    addEvent() {
      var _this = this;
      setTimeout(function() {
        var d = document.querySelectorAll(".kuangL");
        for (var i = 0; i < d.length; i++) {
          d[i].onchange = function(e) {
            var name = this.getAttribute("name");
            var data = this.getAttribute("data-obj");
            if (e.target.checked) {
              _this.toSendData.push({
                title: name,
                ip: data
              });
            } else {
              var indx = 0;
              for (var i = 0; i < _this.toSendData.length; i++) {
                if (_this.toSendData[i].title == name) {
                  indx = i;
                  break;
                }
              }
              console.log(indx);
              _this.toSendData.splice(indx, 1);
            }
          };
        }
      }, 0);
    },
    selectAll() {},
    listenBoy: function(i) {
      if (i === "close") {
        this.showLmDialog = false;
      }
    },
    listenToMyBoy: function(i) {
      if (i === "close") {
        this.showDialog = false;
      }
    },
    checkMoney(val) {
      let r = /^\+?[1-9][0-9]*$/; //正整数
      if (!r.test(this.quickyMoney)) {
        this.quickyMoney = "";
      }
      if (this.quickyMoney == "") {
        sessionStorage.removeItem("quickyMoney");
      }
    },
    addclass($event) {
      this.$refs.className = "select";
    },
    fetchData(i) {
      let oid_info = sessionStorage.getItem("im_token");
      let params = {};
      params.oid = oid_info;
      params.game_code = 220;
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
          } else {
            this.$store.commit("updatelotteryMoney", res.data.lcurrency);
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
            } else {
              this.closeBet = true;
            }
          }
        })
        .catch(function() {
          console.log("网络异常！");
        });
      if (i != 1) {
        let yizh = {},
          erzh = {},
          sanzh = {},
          yidw = {},
          erdw = {},
          sandw = {},
          erdw1 = {},
          erdw2 = {},
          erheshu = {},
          sanheshu = {},
          zuxuansan = {},
          zuxuanliu = {},
          kuadu = {},
          weishu = {},
          zhihe = {};
        yizh.oid = oid_info;
        yizh.game_code = 220;
        yizh.type_code = 6194;
        erzh.oid = oid_info;
        erzh.game_code = 220;
        erzh.type_code = 6195;
        sanzh.oid = oid_info;
        sanzh.game_code = 220;
        sanzh.type_code = 6197;
        yidw.oid = oid_info;
        yidw.game_code = 220;
        yidw.type_code = 6201;
        erdw.oid = oid_info;
        erdw.game_code = 220;
        erdw.type_code = 6202;
        erdw1.oid = oid_info;
        erdw1.game_code = 220;
        erdw1.type_code = 6203;
        erdw2.oid = oid_info;
        erdw2.game_code = 220;
        erdw2.type_code = 6204;
        sandw.oid = oid_info;
        sandw.game_code = 220;
        sandw.type_code = 6205;
        erheshu.oid = oid_info;
        erheshu.game_code = 220;
        erheshu.type_code = 6206;
        sanheshu.oid = oid_info;
        sanheshu.game_code = 220;
        sanheshu.type_code = 6207;
        zuxuansan.oid = oid_info;
        zuxuansan.game_code = 220;
        zuxuansan.type_code = 6211;
        zuxuanliu.oid = oid_info;
        zuxuanliu.game_code = 220;
        zuxuanliu.type_code = 6212;
        kuadu.oid = oid_info;
        kuadu.game_code = 220;
        kuadu.type_code = 6208;
        weishu.oid = oid_info;
        weishu.game_code = 220;
        weishu.type_code = 6209;
        zhihe.oid = oid_info;
        zhihe.game_code = 220;
        zhihe.type_code = 6210;
        if (
          localStorage.getItem("list_0") &&
          localStorage.getItem("list_1") &&
          localStorage.getItem("list_2") &&
          localStorage.getItem("list_3") &&
          localStorage.getItem("list_4") &&
          localStorage.getItem("list_5") &&
          localStorage.getItem("list_6") &&
          localStorage.getItem("list_7") &&
          localStorage.getItem("list_8") &&
          localStorage.getItem("list_9") &&
          localStorage.getItem("list_10") &&
          localStorage.getItem("list_11") &&
          localStorage.getItem("list_12") &&
          localStorage.getItem("list_13") &&
          localStorage.getItem("list_14") &&
          localStorage.getItem("list_15")
        ) {
          this.list_0 = JSON.parse(localStorage.getItem("list_0"));
          this.list_1 = JSON.parse(localStorage.getItem("list_1"));
          this.list_2 = JSON.parse(localStorage.getItem("list_2"));
          this.list_3 = JSON.parse(localStorage.getItem("list_3"));
          this.list_4 = JSON.parse(localStorage.getItem("list_4"));
          this.list_5 = JSON.parse(localStorage.getItem("list_5"));
          this.list_6 = JSON.parse(localStorage.getItem("list_6"));
          this.list_7 = JSON.parse(localStorage.getItem("list_7"));
          this.list_8 = JSON.parse(localStorage.getItem("list_8"));
          this.list_9 = JSON.parse(localStorage.getItem("list_9"));
          this.list_10 = JSON.parse(localStorage.getItem("list_10"));
          this.list_11 = JSON.parse(localStorage.getItem("list_11"));
          this.list_12 = JSON.parse(localStorage.getItem("list_12"));
          this.list_13 = JSON.parse(localStorage.getItem("list_13"));
          this.list_14 = JSON.parse(localStorage.getItem("list_14"));
          this.list_15 = JSON.parse(localStorage.getItem("list_15"));
          this.list = this.list_1;
          this.list15 = this.list_15;
          this.gewei = this.list15[0].list.unit;
          this.zhushipan = this.list_13[0].list;
          this.hard = this.list_9[0].list;
          this.harddata = this.list_9[0].list.key;
          this.hardlist = this.list_9[0].list.oddlist;
          this.easydata = this.list_10[0].list.key;
          this.easylist = this.list_10[0].list.oddlist;
          /*  this.list12 = this.list_12;
          this.sanwei = this.list12;
          以上两行变成一行 */
          this.sanwei = this.list_12;
          this.ergewei = this.sanwei[0].list.tail_2;
        } else {
          this.$http.all([this.getOdds(zhihe), this.getOdds(yizh)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_0 = acct.data;
                this.list_1 = perms.data;
                this.$refs.cName.className = "yizh";
                localStorage.setItem("list_0", JSON.stringify(this.list_0));
                localStorage.setItem("list_1", JSON.stringify(this.list_1));
              }
            })
          );
          this.$http.all([this.getOdds(erzh), this.getOdds(sanzh)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_2 = acct.data;
                this.list_3 = perms.data;
                localStorage.setItem("list_2", JSON.stringify(this.list_2));
                localStorage.setItem("list_3", JSON.stringify(this.list_3));
              }
            })
          );
          this.$http.all([this.getOdds(yidw), this.getOdds(erdw)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_4 = acct.data;
                this.list_5 = perms.data;
                this.$refs.cName.className = "yidw";
                this.list = this.list_0;
                this.$refs.cName.className = "gyh";
                localStorage.setItem("list_4", JSON.stringify(this.list_4));
                localStorage.setItem("list_5", JSON.stringify(this.list_5));
              }
            })
          );
          this.$http.all([this.getOdds(sandw), this.getOdds(erheshu)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_6 = acct.data;
                this.list_7 = perms.data;
                localStorage.setItem("list_6", JSON.stringify(this.list_6));
                localStorage.setItem("list_7", JSON.stringify(this.list_7));
              }
            })
          );
          this.$http
            .all([this.getOdds(sanheshu), this.getOdds(zuxuansan)])
            .then(
              this.$http.spread((acct, perms) => {
                if (acct.status === 200) {
                  this.list_8 = acct.data;
                  this.list_9 = perms.data;
                  localStorage.setItem("list_8", JSON.stringify(this.list_8));
                  localStorage.setItem("list_9", JSON.stringify(this.list_9));
                }
              })
            );
          this.$http.all([this.getOdds(zuxuanliu), this.getOdds(kuadu)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_10 = acct.data;
                this.list_11 = perms.data;
                localStorage.setItem("list_10", JSON.stringify(this.list_10));
                localStorage.setItem("list_11", JSON.stringify(this.list_11));
              }
            })
          );
          this.$http.all([this.getOdds(weishu), this.getOdds(zhihe)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_12 = acct.data;
                this.list_13 = perms.data;
                // 以下三行是新增的
                this.zhushipan = this.list_13[0].list;
                this.sanwei = this.list_12;
                this.$refs.cName1.className = "zhihe";
                 this.list = this.list_1;

                localStorage.setItem("list_12", JSON.stringify(this.list_12));
                localStorage.setItem("list_13", JSON.stringify(this.list_13));
              }
            })
          );
          this.$http.all([this.getOdds(erdw1), this.getOdds(erdw2)]).then(
            this.$http.spread((acct, perms) => {
              if (acct.status === 200) {
                this.list_14 = acct.data;
                this.list_15 = perms.data;
                localStorage.setItem("list_14", JSON.stringify(this.list_14));
                localStorage.setItem("list_15", JSON.stringify(this.list_15));
              }
            })
          );
        }
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
    getOdds(i) {
      return this.$http.post("/getinfo/odds", JSON.stringify(i));
    },
    changeNav(code) {
      switch (code) {
        case "0101":
          if (this.classCode === "0101") {
            return;
          } else {
            this.list = this.list_1;
            this.$refs.cName.className = "zhihe";
            this.type_code = 6210;
          }
          break;
        case "0102":
          if (this.classCode === "0102") {
            return;
          } else {
            this.list = this.list_1;
            this.$refs.cName.className = "yizh";
            this.type_code = 6194;
          }
          break;
        case "0103":
          if (this.classCode === "0103") {
            return;
          } else {
            this.list = this.list_2;
            this.$refs.cName.className = "erzh";
            this.type_code = 6195;
          }
          break;
        case "0104":
          if (this.classCode === "0104") {
            return;
          } else {
            this.list = this.list_3;
            this.$refs.cName.className = "sanzh";
            this.type_code = 6197;
          }
          break;
        case "0105":
          if (this.classCode === "0105") {
            return;
          } else {
            this.list = this.list_4;
            this.$refs.cName.className = "yidw";
            this.type_code = 6201;
          }
          break;
        case "0106":
          if (this.classCode === "0106") {
            return;
          } else {
            this.list = this.list_5;
            this.$refs.cName.className = "erdw";
            this.type_code = 6202;
          }
          break;
        case "0107":
          if (this.classCode === "0107") {
            return;
          } else {
            this.list = this.list_6;
            this.$refs.cName.className = "sandw";
            this.type_code = 6205;
          }
          break;
        case "0108":
          if (this.classCode === "0108") {
            return;
          } else {
            this.list = this.list_7;
            this.$refs.cName.className = "erheshu";
            this.type_code = 6206;
          }
          break;
        case "0109":
          if (this.classCode === "0109") {
            return;
          } else {
            this.list = this.list_8;
            this.$refs.cName.className = "sanheshu";
            this.type_code = 6207;
          }
          break;
        case "0110":
          if (this.classCode === "0110") {
            return;
          } else {
            this.list = this.list_9;
            this.$refs.cName.className = "zuxuansan";
            this.type_code = 6211;
          }
          break;
        case "0111":
          if (this.classCode === "0111") {
            return;
          } else {
            this.list = this.list_10;
            this.$refs.cName.className = "zuxuanliu";
            this.type_code = 6212;
          }
          break;
        case "0112":
          if (this.classCode === "0112") {
            return;
          } else {
            this.list = this.list_11;
            this.$refs.cName.className = "huadu";
            this.type_code = 6208;
          }
          break;
      }
      this.classCode = code;
      this.reset();
    },
    confirm() {
      if (!this.closeBet) {
        this.$swal({
          text: "已封盘！",
          type: "error",
          timer: 1200
        })
          .then(function(response) {})
          .catch(e => {
            console.log(e);
          });
        return;
      }
      this.betArr.length = [];
      if (
        this.$refs.kuang[0].getAttribute("code") == 6211 ||
        this.$refs.kuang[0].getAttribute("code") == 6212
      ) {
        this.betArr.push(this.toSendData);
      } else {
        for (let i = 0; i < this.$refs.kuang.length; i++) {
          if (this.$refs.kuang[i].value > 0) {
            let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"));
            let title = this.$refs.kuang[i].getAttribute("name");
            ite.title = title;
            ite.money = this.$refs.kuang[i].value;
            this.betArr.push(ite);
          }
        }
      }
      if (this.betArr.length == 0) {
        this.$swal({
          text: "请选择下注项目！",
          type: "error",
          timer: 1000
        })
          .then(function(response) {})
          .catch(e => {
            console.log(e);
          });
        return;
      }
      this.reset();
      if (this.type_code == 6211 || this.type_code == 6212) {
        this.showDialog = false;
        this.showLmDialog = true;
      } else {
        this.showDialog = true;
        this.showLmDialog = false;
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
        this.$refs.kuang[i].value = "";
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
      } else {
        this.closetime--;
        let timeStamp = Date.parse(new Date()) / 1000;
      }
    }, 1000);
  },
  created() {
    this.fetchData();
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
        this.fetchData(1);
      }
    }
  }
};
</script>
<style scoped>
.erzh li,
.sanzh li,
.sanheshu li,
.erdw li,
.sandw li,
.erheshu li,
.zuxuansan li,
.zuxuanliu li {
  width: 100%;
}

.game li div:hover {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1) 10%,
    rgba(0, 0, 0, 0.1) 95%,
    transparent 95%,
    transparent 100%
  );
  /*outline: 4px solid rgba(0,0,0,.1);*/
}

.game li div.game_title:hover {
  background: none;
}

.yizh li div,
.erzh li div,
.sanzh li div,
.sanheshu li div,
.game li div,
.zuxuanliu li div,
.yidw li div,
.sandw li div,
.erheshu li div,
.zuxuansan li div {
  width: 20%;
  float: left;
  margin-top: 13px;
}

.yizh li div.game_title,
.erzh li div.game_title,
.sanzh li div.game_title,
.sanheshu li div.game_title,
.game li div.game_title,
.yidw li div.game_title {
  width: 100%;
  /*padding-top: 3px;*/
}

.game li div.game_title {
}

.erzh li div span:first-child,
.sanzh li div span:first-child,
.sanheshu li div span:first-child,
.game li div span:first-child {
  width: 40px;
  height: 20px;
  background-color: #3e80d4 !important;
}

.erzh {
}

.yidw li div.wrap {
  width: 33% !important;
  float: left;
  margin-top: 0;
}

.yidw li div {
  width: 100% !important;
}

.yidw li div.wrap:hover {
  background: none;
}

.erdw {
  width: 100%;
}

.erdw li div.wrap {
  width: 100% !important;
}

.zuxuanliu input[type="checkbox"],
.zuxuansan input[type="checkbox"] {
  margin-top: 2px;
}

.erheshu li div.game_title h3,
ul.erdw div.game_title h3 {
  float: left;
  width: 70px;
  height: 30px;
  text-align: center;
  margin-right: 15px;
  cursor: pointer;
}

.erheshu li div.game_title h3:before,
ul.erdw li div.game_title h3:before {
  content: "";
  display: none;
}

.erheshu li div.game_title h3.select,
ul.erdw div.game_title h3.select {
  background-color: #1c4fa8;
  color: white;
}

.erheshu li div.game_title h3.select:before,
.erdw li div.game_title h3.select:before {
  display: block;
}

.game_title h3.select:before {
  bottom: -10px;
}

.erheshu div.game_title,
.erdw div.game_title {
  padding-left: 13px !important;
}

.el-tabs__nav-wrap {
  padding-left: 13px;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: 0 none;
}

.game_subtitle {
  width: 100% !important;
  color: #3e80d4;
}

.game_subtitle li:hover div {
  background-color: none;
}

/*tab栏的样式---开始*/
.el-tabs--border-card > .el-tabs__header {
  background-color: #eff6ff;
  height: 30px;
  border-bottom: 0;
  /*padding-left: 14px;*/
  margin: 0 -20px;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}

.el-tabs__item {
  line-height: 30px;
  font-size: 14px;
  height: 30px;
  width: 70px;
  text-align: center;
  margin-right: 12px;
  padding: 0;
  /*transition: 0;*/
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  transition: all 0s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding-left: 0;
  color: #3e80d4;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  margin-right: 10px;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #1c4fa8;
  height: 30px;
  color: #fff;
  padding: 0;
  transition: all 0s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-right-color: 0 none;
  border-left-color: 0 none;
}

.el-tabs--bottom .el-tabs--left .el-tabs__item:nth-child(2),
.el-tabs--bottom .el-tabs--right .el-tabs__item:nth-child(2),
.el-tabs--bottom.el-tabs--border-card .el-tabs__item:nth-child(2),
.el-tabs--bottom.el-tabs--card .el-tabs__item:nth-child(2),
.el-tabs--top .el-tabs--left .el-tabs__item:nth-child(2),
.el-tabs--top .el-tabs--right .el-tabs__item:nth-child(2),
.el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2),
.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
  padding-left: 0;
}

.el-tabs--bottom .el-tabs--left .el-tabs__item:last-child,
.el-tabs--bottom .el-tabs--right .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--border-card .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--card .el-tabs__item:last-child,
.el-tabs--top .el-tabs--left .el-tabs__item:last-child,
.el-tabs--top .el-tabs--right .el-tabs__item:last-child,
.el-tabs--top.el-tabs--border-card .el-tabs__item:last-child,
.el-tabs--top.el-tabs--card .el-tabs__item:last-child {
  padding: 0;
}

.el-tabs__item {
  padding-left: 0;
}

.el-tabs--border-card {
  -webkit-box-shadow: 0 transparent;
  box-shadow: 0 0 0 transparent;
  border: 0 none;
}

/*tab栏的样式---结束*/
.game .erdw div li {
  margin-top: 0;
}

.zhihe .game_title {
  float: left;
  width: 14.26% !important;
}

.zhihe .clearfix {
  width: 100%;
}

.zhihe .clearfix {
  position: relative;
  padding-left: 100px;
  box-sizing: border-box;
}

.zhihe span.text {
  position: absolute;
  left: 0;
  width: 80px !important;
  top: 12px;
}

.zhihe .clearfix .item {
  width: 16%;
}

.zuxuansan li div.clearfix {
  width: 50% !important;
}

.zuxuanliu li div.clearfix {
  width: 50% !important;
}

.difer .item.differerent {
}

.game_info ul.zhihe li .clearfix.difer .item:nth-child(3) {
  padding-right: 17.5em;
}

.sanheshunum:last-child {
  width: 50px;
}

.sanheshuwrap div:last-child .sanheshunum {
  width: 60px;
}
</style>
