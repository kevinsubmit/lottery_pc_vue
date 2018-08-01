

<style scoped>
    .game_title {
         text-align: left;
    }
    .line-item-wp {
        margin-top: 10px;
        text-align: left;
    }
    .line-item {
        width:18%;
				margin: 0 1% 0;
				padding: 3px;
				box-sizing: border-box;
				border-radius: 4px;
    }
		.bjk8-view .bet-area .game_title{
				margin-bottom: 16px;
		}
		.bjk8-view .line-item{
			margin-top: -6px
		}
		.game_info ul li input{
				padding-left: 0;
		}
    .bjk8-view .lebel-ball{
        width: 24px;
        height: 24px;
        line-height: 24px;
        background-color: transparent;
    }
    .bjk8-view .ball-t-blue-f {
        background: url("/static/images/common/blue_f_ball.png") no-repeat;
        background-size: 100%;
        color:#fff;
    }
    .bjk8-view .ball-t-gray-f {
        background: url("/static/images/common/gray_f_ball.png") no-repeat;
        background-size: 100%;
        color:#000;
    }
    .tab-ctx-2 {
        padding-top: 20px;
    }
    .game_info .tab-ctx-1 ul li span:first-child {
        width: 55px;
    }
    /*.game li {
        padding-top: 0px;
        padding-bottom: 0px;
    }*/
</style>

<template>
    <div class="content bjk8-view">
        <!-- 右侧头部导航 -->
        <div style='height:80px;'>
            <lottery-area v-if = "isLotteryArea" :todayWinLost="todayWinLost" :lotteryName="lotteryName" :game_code="game_code" :lotteryObj="body" :endtime="endtime" gameType="" :closetime="closetime" :fentime='fentime' :closeBet="closeBet"></lottery-area>
            <div v-else = "isLotteryArea" :class="`bet-top bet-top-placeholder bet-top-placeholder_${getApiName}`">数据加载中...</div>
        </div>
        <!-- 下注弹窗 -->
        <bet-dialog v-if="showDialog" :betArr="betArr" :game_code="game_code" :type_code="type_code" :round="round"  v-on:child-say="listenToMyBoy"></bet-dialog>

        <nav class="top-nav">
            <ul class="clearfix">
              <li v-for="(itmek, indexNav) in navDatas"  @click="changeNav(itmek,indexNav)" :class="itmek.active ? 'active' : ''">{{itmek.name}}</span></li>
            </ul>
        </nav>
        <div class="bet-content">
            <div class="bet-center">
                <div class="bet-box">
                    <div class="bet-area">
                        <div class="game">
                            <div class="game_info">
                                <div class="tab-ctx-1" v-show="isShowTabCtx1">
                                    <div class="game_title">
                                        <h3>总和、总和过关</h3>
                                    </div>
                                    <ul class="line-item-wp">
                                        <li v-for='(item, j) in list.total' class="line-item hover-color" @click="togglePlay($event)" style="cursor: pointer">
                                            <!--<label>-->
                                                <span style='cursor:pointer;'>{{item.name}}</span>
                                                <!--<span @click='confirms("总和、总和过关", item.key ,JSON.stringify(item))' style='cursor:pointer;'>{{item.odds}}</span>-->
                                                <span style='cursor:pointer;'>{{item.odds}}</span>
                                                <input ref='kuang' :id="item.key" :name="item.name" title="总和、总和过关" :data-obj="JSON.stringify(item)" @input="chkInput()"  @focus="inputFocus($event, ite)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                                <input v-else readonly value="封盘" class="closeBet">
                                            <!--</label>-->
                                        </li>
                                    </ul>
                                    <div class="game_title">
                                        <h3>前后和</h3>
                                    </div>
                                    <ul class="line-item-wp">
                                        <li v-for='(item, j) in list.front_behind'  class="line-item hover-color" @click="togglePlay($event)" style="cursor: pointer">
                                            <!--<label>-->
                                                <span style='cursor:pointer;'>{{item.name}}</span>
                                                <!--<span @click='confirms("前后和", item.key ,JSON.stringify(item))' style='cursor:pointer;'>{{item.odds}}</span>-->
                                                <span style='cursor:pointer;'>{{item.odds}}</span>
                                                <input ref='kuang' :id="item.key" :name="item.name" title="前后和" :data-obj="JSON.stringify(item)" @input="chkInput()"  @focus="inputFocus($event, ite)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                                <input v-else readonly value="封盘" class="closeBet">
                                            <!--</label>-->
                                        </li>
                                    </ul>
                                    <div class="game_title">
                                        <h3>单双和</h3>
                                    </div>
                                    <ul class="line-item-wp">
                                        <li v-for='(item, j) in list.odd_even' class="line-item hover-color" @click="togglePlay($event)" style="cursor: pointer">
                                            <!--<label>-->
                                                <span style='cursor:pointer;'>{{item.name}}</span>
                                                <!--<span @click='confirms("单双和", item.key ,JSON.stringify(item))' style='cursor:pointer;'>{{item.odds}}</span>-->
                                                <span style='cursor:pointer;'>{{item.odds}}</span>
                                                <input ref='kuang' :id="item.key" :name="item.name" title="单双和" :data-obj="JSON.stringify(item)" @input="chkInput()"  @focus="inputFocus($event, ite)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                                <input v-else readonly value="封盘" class="closeBet">
                                            <!--</label>-->
                                        </li>
                                    </ul>
                                    <div class="game_title">
                                         <h3>五行</h3>
                                    </div>
                                    <ul class="line-item-wp">
                                        <li v-for='(item, j) in list.five' class="line-item hover-color" @click="togglePlay($event)" style="cursor: pointer">
                                            <!--<label>-->
                                                <span style='cursor:pointer;'>{{item.name}}</span>
                                                <!--<span @click='confirms("五行", item.key ,JSON.stringify(item))' style='cursor:pointer;'>{{item.odds}}</span>-->
                                                <span style='cursor:pointer;'>{{item.odds}}</span>
                                                <input ref='kuang' :id="item.key" :name="item.name" title="五行" :data-obj="JSON.stringify(item)" @input="chkInput()"  @focus="inputFocus($event, ite)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                                <input v-else readonly value="封盘" class="closeBet">
                                            <!--</label>-->
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-ctx-2" v-if="navDatas[1].active">
                                    <ul class="line-item-wp" v-if="list.length > 0">
                                        <template  v-for='(items) in bolls80Array' >
                                            <li v-for="(val, j) in items" class="line-item hover-color" @click="togglePlay($event)" style="cursor: pointer">
                                                <!--<label>-->
                                                    <span class="lebel-ball" :class=" (val > 40) ? 'ball-t-blue-f' : 'ball-t-gray-f'"  style="cursor:pointer;">{{val}}</span>
                                                    <!--<span @click='confirms("正码", list[val-1].key ,JSON.stringify(list[val-1]))' style='cursor:pointer;'>{{list[val-1].odds}}</span>-->
                                                    <span style='cursor:pointer;'>{{list[val-1].odds}}</span>
                                                    <input ref='kuang' :id="list[val-1].key" :name="list[val-1].title" title="正码" :data-obj="JSON.stringify(list[val-1])" @input="chkInput()"  @focus="inputFocus($event, ite)" min="1" type="text" v-if="closeBet" onkeyup="value=this.value.replace(/\D+/g,'')"  maxlength="7"/>
                                                    <input v-else readonly value="封盘" class="closeBet">
                                                <!--</label>-->
                                            </li>
                                        </template >
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-bet">
                        <el-checkbox  v-model="isSaveMoney" @change="saveMoney" :disabled="!quickyMoney>0">预设金额</el-checkbox>
                        <input type="text" @input="checkMoney()" @blur="saveMoneyBlur(quickyMoney)" v-model="quickyMoney"/>
                        <input @click="confirm" type="button" name="" class="btn-pink" value="确定">
                        <input @click="reset" type="button" name="" class="btn-blue" value="重置"/>
                    </div>
                </div>
                <!-- 露珠组件  -->
                <lu-zhu :game_code="game_code"></lu-zhu>

            </div>
            <!-- 长龙组件 -->
            <chang-long :game_code="game_code"></chang-long>
        </div>
    </div>
</template>

<script scoped>
    import lotteryArea from "../../components/lotteryArea";
    import betDialog from "../../components/betDialog";
    import changLong from "../../components/changlong";
    import luZhu from '../../components/luzhu';
    import {cacheGame} from "@/utils";
		import { togglePlayActive, clearAllActives } from '../../utils/common'
    export default {
            data() {
            return {
                oid: null,
                getApiName: getApiName(),
                isLotteryArea: false,
                lotteryType: "pk10_0101",
                classCode: "0101",
                lotteryName: "北京快乐8",
                type_code: 5000,
                game_code: 180,
                navDatas: [
                    {
                        name: "总和、比数、五行",
                        active: true,
                        index: 1
                    },
                    {
                        name: "正码",
                        active: false,
                        index: 2
                    },
                ],
                round: 0,
                isSaveMoney: false,
                todayWinLost: 0,
                body: {},
                endtime: 0,
                closetime: 0,
                closeBet: true,
                fentime: 40,
                betArr: [],
                betArrs: [],
                // typeCodes: [5000], // , 5001, 5003, 5004, 5005, 5006, 5007, 5008, 5010, 5011, 5012, 5020, 5021, 5021, 5035
                typeCode: {
                    TYPE_CODE_SUM: 5000,
                    TYPE_CODE_ZHENG: 5035
                },
                cachedOddsData: {},
                list: [],
                bolls80Array: [
                    [1, 17, 33, 49, 65],
                    [2, 18, 34, 50, 66],
                    [3, 19, 35, 51, 67],
                    [4, 20, 36, 52, 68],
                    [5, 21, 37, 53, 69],
                    [6, 22, 38, 54, 70],
                    [7, 23, 39, 55, 71],
                    [8, 24, 40, 56, 72],
                    [9, 25, 41, 57, 73],
                    [10, 26, 42, 58, 74],
                    [11, 27, 43, 59, 75],
                    [12, 28, 44, 60, 76],
                    [13, 29, 45, 61, 77],
                    [14, 30, 46, 62, 78],
                    [15, 31, 47, 63, 79],
                    [16, 32, 48, 64, 80]
                ],
                showDialog: false
            }
        },
        computed: {
            isShowTabCtx1() {
                return this.navDatas[0].active && Object.prototype.toString.call(this.list) == '[object Object]';
            }
        },
        created (){
            this.oid = sessionStorage.getItem('im_token');
            this.changeNav(this.navDatas[0]);
            this.fetchData();
        },
        mounted (){

        },
        components:{
            lotteryArea,
            betDialog,
            //lmDialog,
            //lhDialog,
            changLong,
            luZhu
        },
        methods: {
            checkMoney(val){
                let r = /^\+?[1-9][0-9]*$/;　　//正整数
                if(!r.test(this.quickyMoney)){
                    this.quickyMoney = ''
                }
                if(this.quickyMoney==""){
                    sessionStorage.removeItem('quickyMoney')
                }

							// 将预设的金额赋值到选中玩法的金额
							const presetPrice = this.quickyMoney
							Array.prototype.forEach.call(document.querySelectorAll('.active-color input'), el => el.value = presetPrice)
            },
            fetchData(i) {
                let _this = this;
                let params = {};
                params.oid = this.oid;
                params.game_code = this.game_code;
                this.$http.post('/getinfo/game', JSON.stringify(params)).then(res => {
                    if (res.data.msg == 4001) {
                        this.$swal({
                            text: "账户已下线，请重新登陆",
                            type: "error",
                            timer: 1200,
                        })
                        .then(function (response) {
                        }).catch(e => {
                        })
                        this.$router.push({
                            path: '/home'
                        })
                        return
                    } else {
                        this.$store.commit("updatelotteryMoney", res.data.lcurrency);
                        let data = res.data,
                            last = data.last,
                            next = data.next;

                        sessionStorage.setItem('im_money', data.lcurrency)
                        // this.closeBet = true;
                        this.isLotteryArea = true;
                        (next.isclose) ? this.closeBet=false : this.closeBet=true;
                        let timeStamp = next.timestap;
                        this.endtime = parseInt(next.endtime) - parseInt(timeStamp);
                        this.closetime = parseInt(next.closetime) - parseInt(timeStamp);
                        this.fentime = this.endtime - this.closetime;
                        this.body = data;
                        this.isLotteryArea = true;
                        this.round = next.round;
                        this.todayWinLost = parseFloat(data.UserResult);
                        if (next.isclose === true) {
                            this.closeBet = false;
                        } else {
                            this.closeBet = true;
                        }
                    }
                }).catch(function(){
                    console.log('网络异常！');
                })
                // 保存快捷金额
                let quickyMoney = sessionStorage.getItem("quickyMoney");
                if (quickyMoney) {
                    this.isSaveMoney = true
                    this.quickyMoney = quickyMoney
                } else {
                    this.isSaveMoney = false
                    this.quickyMoney = ''
                }
            },
            listenToMyBoy: function (i){
                if (i === "close") {
                    this.showDialog = false
                    this.reset()
                }
            },
            getOdds(typeCode) {
                let _this = this,
                    params = {
                        oid: _this.oid,
                        game_code: _this.game_code,
                        type_code: typeCode
                    };
                return this.$http.post('/getinfo/odds', JSON.stringify(params));
            },
            changeNav(item){
							  clearAllActives()// 去掉颜色的选中状态

                let _this = this;
                for(let i = 0; i < this.navDatas.length; i++) {
                    this.navDatas[i].active = false;
                }
                item.active = true;
                switch(item.index) {
                    case  1 :
                        this.type_code = this.typeCode.TYPE_CODE_SUM;
                        if  (this.cachedOddsData && this.cachedOddsData.sumData) {
                            this.list = this.cachedOddsData.sumData;
                            break;
                        }
                        this.getOdds(this.typeCode.TYPE_CODE_SUM).then((res) => {
                            if (res.status == 200) {
                                _this.list = res.data[0].list;
                                _this.cachedOddsData.sumData = res.data[0].list;
                            }
                        }).catch((res) => {
                            console.log(res);
                        });
                    break;
                    case  2:
                        this.type_code = this.typeCode.TYPE_CODE_ZHENG;
                        if  (this.cachedOddsData && this.cachedOddsData.zhengData) {
                            this.list = this.cachedOddsData.zhengData;
                            break;
                        }
                        this.getOdds(this.typeCode.TYPE_CODE_ZHENG).then((res) => {
                            if (res.status == 200) {
                                _this.list = res.data[0].list;
                                _this.cachedOddsData.zhengData = res.data[0].list;
                            }
                        }).catch((res) => {
                            console.log(res);
                        });
                    break;
                    default:
                    break
                }
                this.reset();
            },
            confirms (title, key, ite) {
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
                ites.title = title
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
            confirm () {
                if (!this.closeBet) {
                    this.$swal({
                        text: "已封盘！",
                        type: "error",
                        timer: 1200,
                    })
                    .then(function (response) {

                    }).catch(e => {
                        console.log(e)
                    })
                    return
                }
                this.betArr.length = [];
                for (let i = 0; i < this.$refs.kuang.length; i++) {
                    if (this.$refs.kuang[i].value>0) {
                    let ite = JSON.parse(this.$refs.kuang[i].getAttribute("data-obj"))
                    let title = this.$refs.kuang[i].getAttribute("title")
                    ite.title = title;
                    ite.money = this.$refs.kuang[i].value;
                    console.log('debug money=', i, JSON.stringify(ite))
                    this.betArr.push(ite);
                    }
                }
                if (this.betArr.length == 0) {
                    this.$swal({
                        text: "请选择下注项目！",
                        type: "error",
                        timer: 1000,
                    })
                    .then(function (response) {
                    }).catch(e => {
                        console.log(e)
                    })
                    return
                }
                this.reset();
                this.showDialog = true
            },

            chkInput(){
                for (let i = 0; i < this.$refs.kuang.length; i++) {
                    this.$refs.kuang[i].value.replace(/\D/g, '');
                    if(this.$refs.kuang[i].value==0){
                        this.$refs.kuang[i].value='';
                    }
                    if (this.$refs.kuang[i].value === 'e') {
                    return 0;
                    }
                }
            },
					  inputFocus (event, item) {
							  event.target.value = sessionStorage.getItem("quickyMoney") || ''
                /*let quickyMoney = sessionStorage.getItem("quickyMoney");
                if(quickyMoney>0){
                    key.target.value = quickyMoney;
                } else {
                    return false
                }*/
            },
            saveMoneyBlur (quickyMoney) {
                if (quickyMoney <= 0 || quickyMoney === '') {
                    this.isSaveMoney = false
                    sessionStorage.removeItem('quickyMoney')
                }
                if (quickyMoney > 0 && this.isSaveMoney === true) {
                    sessionStorage.removeItem('quickyMoney')
                    sessionStorage.setItem('quickyMoney', this.quickyMoney)
                }
            },
            saveMoney () {
                if (this.isSaveMoney === true) {
                    sessionStorage.setItem('quickyMoney', this.quickyMoney)
                    this.isSaveMoney = true
                } else {
                    sessionStorage.removeItem('quickyMoney')
                    this.isSaveMoney = false
                    this.quickyMoney = ''
                } // 保存快捷金额
            },
            reset(){
                if (this.$refs.kuang) {
                    for (let i = 0; i < this.$refs.kuang.length; i++) {
											let el = this.$refs.kuang[i]
											el.value = "";
											el.parentNode.classList.remove('active-color')
                    }
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
                    this.showDialog=false;
                } else {
                    this.closetime--;
                    let timeStamp = Date.parse(new Date()) / 1000;
                }
            }, 1000)
        },
        watch: {
            endtime: function() {
                if (this.endtime == 0||this.endtime ==200||this.endtime ==240||this.endtime ==260||this.endtime ==270||this.endtime ==285||this.endtime ==295) {
                    this.fetchData(1);
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
    }
</script>











