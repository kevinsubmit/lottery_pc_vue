<template>
  <header :class="`header_${getApiName}`">
    <div class="header-main clearfix">
      <h1 class="logo">
        <router-link to="/home"></router-link>
      </h1>
      <ul class="nav f-l clearfix">
        <li v-show="getApiName!='ly'&&getApiName!='yiteng'" :style="item.title=='真人视讯'?{color:'#fff!important',fontWeight:700}:''" v-for="(item,index) in gameNavs" v-if="(getApiName=='ct'||getApiName=='agcai')&&item.title=='官方开奖'?false:(getApiName=='hg'&&item.title=='存取记录')||(getApiName=='hg'&&item.title=='真人视讯')?false:true" @click="goAddress(item.gamePath)" :class='{active:(pathRoute.indexOf("Games") >= 0 && item.gamePath.indexOf("Games") >= 0)==1||(pathRoute.indexOf("notice") >= 0 && item.gamePath.indexOf("notice") >= 0)==1||(pathRoute.indexOf("record") >= 0 && item.gamePath.indexOf("record") >= 0)==1||item.gamePath==pathRoute}'>
          {{item.title}}
        </li>
        <li v-show="getApiName=='ly'||getApiName=='yiteng'" :style="item.title=='真人视讯'?{color:'#fff!important',fontWeight:700}:''" v-for="(item,index) in gameNavs" v-if="(getApiName=='ct'||getApiName=='agcai')&&item.title=='官方开奖'?false:(getApiName=='hg'&&item.title=='存取记录')||(getApiName=='hg'&&item.title=='真人视讯')?false:true" @click="goAddress(item.gamePath)" :class='{active:(pathRoute.indexOf("Games") >= 0 && item.gamePath.indexOf("Games") >= 0)==1||(pathRoute.indexOf("notice") >= 0 && item.gamePath.indexOf("notice") >= 0)==1||(pathRoute.indexOf("record") >= 0 && item.gamePath.indexOf("record") >= 0)==1||item.gamePath==pathRoute}'>
          {{item.title}}
        </li>
        <li v-show="(getApiName=='ly'||getApiName=='yiteng')&&moreNavs.length">
          <el-dropdown :style="setDropDownColor()" trigger="click" @command="handleMoreClick">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in moreNavs" :key="item.title" :command="item.gamePath">{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="userInfo f-r clearfix" v-if="isLogin">
        <span class="avatar f-l">
          <img :src="$getPublicImg('/images/common/icon/avatar-defalut-s.png')">
        </span>
        <div class="detail f-l">
          <div class="ger">
            <span>{{username}}</span>
            <span class="balance">￥{{$store.state.lotteryMoney}}</span>
          </div>
          <div class="hah f-r clearfix">
            <el-dropdown @command="handleCommand1" trigger="click">
              <span class="el-dropdown-link " style='margin-top:-18px'>
                <i class="ico el-icon-arrow-down" style></i><br>
              </span>
              <el-dropdown-menu slot="dropdown" style='width:150px;min-height:40px;'>

                <el-dropdown-item command="goAddress1">会员信息</el-dropdown-item>
                <el-dropdown-item command="changePwd" v-if="getApiName=='hg'?false:true">修改登录密码</el-dropdown-item>
                <el-dropdown-item command="changePayPwd" v-if="getApiName=='hg'?false:true">修改取款密码</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="btns f-l" v-if="getApiName=='hg'?false:true">
          <div @click="goAddress('/Payment/record:deposit?a='+Math.random());">
            <span>
              <i class="ico ico-my-in"></i><br>充值</span>
          </div>
          <div @click="goAddress('/Payment/record:withdraw');">
            <span>
              <i class="ico ico-my-out"></i><br>提款</span>
          </div>
          <div v-show="getApiName != 'fulicai'" @click="goAddress('/Payment/record:transfer');">
            <span>
              <i class="ico ico-my-tran"></i><br>转额</span>
          </div>
        </div>

        <div class="setting f-r clearfix" v-if="getApiName=='hg'?false:true">
          <span class="el-dropdown-link" @click='logout'>
            <i class="ico ico-my-set"></i><br> 退出
          </span>
        </div>

        <my-changePayPwd v-if="isShowChangePayPwd" v-on:doClose="listenCloseOrder"></my-changePayPwd>
      </div>
      <my-changePwd v-if="isShowChangePwd" v-on:doClose="listenCloseOrder"></my-changePwd>
      <div class="f-l f2" v-show="getApiName != 'tt'" v-if="!isLogin">
        <div class="longin">
          <div>
            <input type="text" @blur="verification_1(userName)" v-model="userName" ref="username" placeholder="会员账号" tabindex="1" autofocus="autofocus" />
            <!--  <p style='text-align:left;font-size:12px;line-height:16px;color:#70a8e9;cursor: pointer;'  @click.prevent="chgRestPwd()">
                  忘记密码
               </p> -->
            <!-- <p class="agentLogin" @click="goAgent">代理登录</p> -->
          </div>
          <div>
            <input type="password" v-model="passWord" placeholder="登录密码" ref="password" @keyup.enter="subMit" tabindex="2" />
          </div>
          <div class="btn-box-login">
            <span @click="subMit" class="btn-login" tabindex="3">登录</span>
            <span @click="showReg" class="btn-try">注册</span>
          </div>
          <p @click="tryPlay" class="joinus">试玩入口</p>
        </div>
      </div>
      <my-resetPwd v-if="isShowResetPwd" v-on:doClose="listenCloseOrder"></my-resetPwd>
      <register v-if="isShowReg" v-on:doClose="listenCloseOrder" v-on:loginType="listenLoginType" :result="result"></register>
      <agreement v-if="isShowAgreement" v-on:doClose="listenCloseOrder" v-on:isAgree="listenAgree"></agreement>
    </div>
  </header>

</template>

<script>
import myResetPwd from "./Account/resetPwd";
import myChangePwd from "./Account/changePwd";
import myChangePayPwd from "./Account/changePayPwd";
import Register from "./Account/register";
import Login from "./Account/login";
import Agreement from "./agreement";
export default {
  components: {
    myChangePayPwd,
    myChangePwd,
    Register,
    myResetPwd,
    Login,
    Agreement
  },
  props: {
    updateMoney: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      result: null,
      getApiName: getApiName(),
      kaijiangwang: getKaijiangwang(),
      agentLogin: "",
      agree: false, // 是否同意协议 1 yes
      isShowAgreement: false,
      daili: false,
      todayWinLost: 0,
      isShowReg: false,
      isShowLogin: false,
      isShowResetPwd: false,
      pathRoute: null,
      isLogin: false,
      openAudio: true,
      from: {
        input1: false
        // popup-body:false
      },
      userName: "",
      passWord: "",
      csUrl: "",
      input1: false,
      banlance: 0,
      isShowChangePwd: false,
      isShowChangePayPwd: false,
      gameNavs: [],
      sportUrl: "",
      mgUrl: "",
      moreNavs: [],
      navs: [],
      sor:[],
      sort:[],
      gameNavs1  :{
        260: "/Games/race",                   
        270:"/Games/jslh",
        240:"/Games/jssc",
        250:"/Games/jsssc",
        210: "/Games/veniceRowing",
        46: "/Games/roma",
        51:"/Games/pk10",
        2:"/Games/cqssc",
        69:"/Games/markSix",                   
        160:"/Games/pcegg",
        171:"/Games/luckyAirship",
        3:"/Games/happyTen",
        47:"/Games/luckFarm",
        172: "/Games/jsks",
        180:"/Games/bjkl8",
        280:"/Games/jlk3",
        4:"sport",
        5:"fish",
        1:"ag",
        7:"mg"
    }, 
    sorts:[],   
    };
  },
  created() {
     this.$http.post("/systems/game_sort").then(res => {
        this.sort = res.data.sort;
        this.sorts = this.gameNavs1[this.sort[0]]
        console.log(this.sorts)
     })
    // if(sessionStorage.getItem("im_token")){
    //   this.sort = sessionStorage.getItem("sort")
    //   this.sor = this.sort.split(",")
    //   this.sorts = this.gameNavs1[this.sor[0]]
    //  }
    this.getApiName == "sd" &&
    !sessionStorage.getItem("im_username") &&
    this.$route.path == "/home"
      ? this.showReg()
      : "";
    let navs = [
      { title: "首页", gamePath: "/home" },
      { title: "开户注册", gamePath: "zhuce" },
      { title: "优惠活动", gamePath: "/notice:notices" },
      { title: "游戏规则", gamePath: "/rules" },
      { title: "加盟合作", gamePath: "/agent" },
      { title: "关于我们", gamePath: "/aboutus" },
      { title: "常见问题", gamePath: "/faq" },
      { title: "游戏大厅", gamePath: "/Games/race" },
      { title: "下注记录", gamePath: "/historyXZ" },
      { title: "存取记录", gamePath: "/Payment/accessList" },
      { title: "开奖走势", gamePath: "/result:_260" },
      { title: "开奖网", gamePath: "kaijiang" },
      { title: "APP下载", gamePath: "/mobile" }
    ];
    if (!sessionStorage.getItem("im_token")) {
      this.gameNavs = navs;
      this.gameNavs.splice(7, 7);
      this.gameNavs.splice(8, 1);
      if(this.getApiName == 'tt'){
        this.gameNavs.splice(1, 7);
      }
      if(this.getApiName == '618cp'){
        this.gameNavs.push({ title: "在线客服", gamePath: "serv" });
      }
      if(this.getApiName == 'yiteng'){
        this.gameNavs.splice(1, 1);
      }
    } else {
      this.getBalance()
      if (sessionStorage.getItem("im_username") === "游客") {
        this.gameNavs = navs;
        this.gameNavs.splice(0, 7);
        this.gameNavs.splice(8, 1);
        if (this.getApiName == "agcai" || this.getApiName == "ct"||this.getApiName == "yile" || this.getApiName == "fulicai"||this.getApiName == "crown"||this.getApiName == "618cp"||this.getApiName == "ylh"||this.getApiName == "yy"||this.getApiName == "yiteng"||this.getApiName == "letian" ) {
          this.gameNavs.splice(-2, 1);
        }
        if (this.getApiName == "tt" || this.getApiName == "gd"||this.getApiName == "fulicai" || this.getApiName == "yile"||this.getApiName == "crown"||this.getApiName == "618cp"||this.getApiName == "ylh"||this.getApiName == "yy"||this.getApiName == "yiteng") {
          this.gameNavs.push({ title: "游戏规则", gamePath: "/rules" });
        }
      } else {
        this.gameNavs = navs;
        this.gameNavs.splice(0, 7);
        this.gameNavs.splice(8, 1);
        if (this.getApiName == "uc") {
          this.gameNavs.push({ title: "抢红包雨", gamePath: "/bonus" });
          this.gameNavs.push({ title: "充值返水", gamePath: "/returnWater" });
        }
         if (this.getApiName == "agcai" || this.getApiName == "ct"||this.getApiName == "yile" || this.getApiName == "fulicai"||this.getApiName == "crown"||this.getApiName == "618cp"||this.getApiName == "ylh"||this.getApiName == "yy"||this.getApiName == "letian") {
          this.gameNavs.splice(-2, 1);
        }
        if (this.getApiName == "yiren") {
          this.gameNavs.push({ title: "游戏规则", gamePath: "/rules" });
          this.gameNavs.push({
            title: "优惠活动",
            gamePath: "/notice:notices"
          }),
            this.gameNavs.push({ title: "加盟合作", gamePath: "/agent" });
        }
        if (this.getApiName == "tt" || this.getApiName == "gd"||this.getApiName == "fulicai" || this.getApiName == "yile"||this.getApiName == "crown"||this.getApiName == "618cp"||this.getApiName == "ylh"||this.getApiName == "yy"||this.getApiName == "yiteng" ) {
          console.log('debug gameNavs=', this.gameNavs);
          this.gameNavs.push({ title: "游戏规则", gamePath: "/rules" });
          console.log('debug gameNavs1=', this.gameNavs);
        }
        if (this.getApiName == "ly") {
          this.gameNavs.push(
            { title: "游戏规则", gamePath: "/rules" },
            { title: "优惠活动", gamePath: "/notice:notices" },
            { title: "加盟合作", gamePath: "/agent" },
            { title: "DNS教程", gamePath: "dns" }
          );
        }
        if(this.getApiName=="yiteng"){
          this.gameNavs.push(
            { title: "优惠活动", gamePath: "/notice:notices" },
            { title: "加盟合作", gamePath: "/agent" },
            { title: "DNS教程", gamePath: "dns" }
          );
        }
      }
    }
    // 下掉天天的开奖网，加上加盟合作
    if (this.getApiName == "tt") {
      var hasAgent;
      this.gameNavs.forEach((item, index) => {
        if (item.title === "开奖网") {
          this.gameNavs.splice(index, 1);
        }
        if (item.title === "加盟合作") {
          hasAgent = true;
        }
      });
      if (!hasAgent) {
        this.gameNavs = [
          ...this.gameNavs,
          { title: "加盟合作", gamePath: "/agent" }
        ];
      }
    }

    //乐盈单独处理
    if (this.getApiName == "ly"||this.getApiName=="yiteng") {
      this.gameNavs.forEach((item, index) => {
        if (item.title === "首页") {
          this.gameNavs.splice(index, 1);
        }
      });
      if (this.gameNavs.length > 6) {
        this.moreNavs = this.gameNavs.slice(5, this.gameNavs.length);
        this.gameNavs = this.gameNavs.slice(0, 5);
        console.log(this.gameNavs, this.moreNavs);
      }
    }
    this.pathRoute = this.$route.path;
    if (sessionStorage.getItem("serviceUrl")) {
      this.csUrl = sessionStorage.getItem("serviceUrl");
    } else {
      this.getServiceUrl();
    }
    this.loginStatue();
  },
  mounted() {
    this.loginStatue();
    if (
      !sessionStorage.getItem("im_token") &&
      sessionStorage.getItem("im_username")
    ) {
      // this.$swal({
      //   text: "您的账户已失效,请重新登录",
      //   type: "error",
      //   timer: 1200,
      //   confirmButtonText: "关闭"
      // });
      // this.$router.push({
      //   path: '/home'
      // })
    }
    // 判断是否同意协议
    if (
      (sessionStorage.getItem("im_token") &&
        sessionStorage.getItem("agree") === null) ||
      (sessionStorage.getItem("im_token") &&
        sessionStorage.getItem("agree") === "false")
    ) {
      sessionStorage.clear();
      if (this.$router.path != "/home") {
        this.$router.push({
          // path: "/Games/race"
          path: this.sorts
        });
      }
    }
  },
  methods: {
    setDropDownColor(){
      /* 设置下拉更多的字体颜色 */
      if(this.getApiName=='ly'){
        return {
          color:'#FBA117'
        }
      }else{
        return {
          color:'white'
        }
      }
    },
    handleMoreClick(path) {
      this.goAddress(path);
    },
    goToFishGame() {
      this.$router.push("/Gamesfish");
    },
    subMit() {
      if (sessionStorage.getItem("im_realname") == "11") {
        sessionStorage.clear();
      }
      //判定填写表单符合验证标准，且不为空
      if (this.userName === undefined || this.passWord === undefined) {
        this.$message({
          type: "error",
          showClose: true,
          message: "账号或密码不能为空!"
        });
        return;
      }
      if (this.userName === "" || this.passWord === "") {
        this.$message({
          type: "error",
          showClose: true,
          message: "账号或密码不能为空!"
        });
        return;
      }
      if (this.userName.length > 1 && this.passWord.length > 1) {
        let params = {};
        params.username = this.userName;
        params.password = this.passWord;
        params.domain = window.location.host;
        this.$http.post("/user/signin", JSON.stringify(params)).then(res => {
          if (res.data.msg == 4003) {
            this.$router.push({ name: "maintain" });
          }
          if (res.data.msg == 2001) {
            this.$message({
              type: "error",
              showClose: true,
              message: "账号/密码错误,你还有" + res.data.times + "次机会"
            });
            return;
          } else if (res.data.msg == 2002) {
            this.$message({
              type: "error",
              showClose: true,
              message: "用户不存在!"
            });
            return;
          } else if (res.data.msg == 2013) {
            this.$message({
              type: "error",
              showClose: true,
              message: "请联系客服解锁！或2小时后再尝试登录！"
            });
            return;
          } else if (res.data.msg == 2005) {
            this.$message({
              type: "error",
              showClose: true,
              message: "帐号已经被禁用，请联系客服人员！"
            });
            return;
          }
          if (res.data.oid) {
            if (res.data.msg == 2018) {
              this.isShowChangePwd = true;
              this.$message({
                type: "error",
                showClose: true,
                message: "需修改密码"
              });
            }
            this.isShowAgreement = true;
            this.listenAgree();
            this.loginStatue();
            sessionStorage.setItem("im_token", res.data.oid);
            sessionStorage.setItem("im_username", res.data.username);
            sessionStorage.setItem("im_realname", res.data.realname);
            sessionStorage.setItem("im_telphone", res.data.telphone);
            // 重新加载赔率
            if (
              localStorage.getItem('odds_version') &&
              res.data.rate_version != localStorage.getItem('odds_version')
            ) {
              localStorage.clear()
            }
            localStorage.setItem('odds_version', res.data.rate_version)
            this.$store.commit('setToken', res.data.oid);
            this.$store.commit("updatelotteryMoney", res.data.money);
          } else {
            // this.$message('账号或密码输入不正确');
            this.$message({
              type: "error",
              showClose: true,
              message: "账号或密码输入不正确!"
            });
            return false;
          }
        });
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "账号或密码输入格式不正确!"
        });
        return false;
      }
    },
    chgRestPwd() {
      this.isShowResetPwd = true;
    },
    isShowAgree() {
      this.$emit("doClose", "showAgree");
    },
    verification_1(userName) {
      //长度在6~16之间
      if (!/\w{0,14}$/.test(userName)) {
        this.from.input1 = true;
      } else {
        this.from.input1 = false;
      }
    },
    verification_2(passWord) {
      //长度在6~16之间
      if (!/\w{0,14}$/.test(passWord)) {
        this.from.input1 = true;
      } else {
        this.from.input1 = false;
      }
    },
    goAgent() {
      switch (this.getApiName) {
        case "ct":
          this.agentLogin = "//ag.ctdaili.com";
          break;

        case "uc":
          this.agentLogin = "//ag.uc2222.com/";
          break;

        case "gd":
          this.agentLogin = "//ag.uc2222.com/";
          break;

        case "sd":
          this.agentLogin = "//ag.uc2222.com/";
          break;
      }
      setTimeout(() => {
        window.open(this.agentLogin);
      }, 600);
    },
    getServiceUrl() {
      this.$http.post("/user/getCustomerService").then(res => {
        this.csUrl = res.data.kefu;
        sessionStorage.setItem("serviceUrl", this.csUrl);
      });
    },
    listenCloseOrder: function(i) {
      if (i === "close") {
        this.closeDialog();
        this.isShowChangePwd = false;
        this.isShowChangePayPwd = false;
      }
      if (i === "sucess") {
        this.closeDialog();
        this.isShowChangePwd = false;
        this.isShowChangePayPwd = false;
        this.loginStatue();
      }
      if (i === "showAgree") {
        this.isShowAgreement = true;
      }
    },
    listenLoginType(i) {
      if (i === "reg") {
        this.isShowReg = true;
        this.isShowLogin = false;
      }
    },
    listenAgree(msg) {
      if (msg === "agree") {
        this.isShowAgreement = false;
        this.agree = true;
        sessionStorage.setItem("agree", "true");
        sessionStorage.getItem("im_username") === "游客"
          ?  this.$router.push(this.sorts)
          : (this.$window.location.href = "/#"+this.sorts);
          // ? this.$router.push("/Games/race")
          // : (this.$window.location.href = "/#/Games/race");
      } else if (msg === "disagree") {
        this.isLogin = false;
        this.isShowAgreement = false;
        this.agree = false;
        sessionStorage.clear();
      }
    },
    closeDialog() {
      this.isShowLogin = false;
      this.isShowReg = false;
      this.isShowResetPwd = false;
    },
    showLogin() {
      this.isShowLogin = true;
    },
    showReg() {
      this.daili = false;
      sessionStorage.setItem("im_isAgent", this.daili);
      this.isShowReg = true;
    },
    goAddress1(path) {
      // alert(2)
      this.$router.push({
        path: path
      });
    },
    goAddress(path) {
      if (sessionStorage.getItem("im_realname") == "11") {
        this.$router.push({
          path: path
        });
      }
      if (
        sessionStorage.getItem("im_username") === "游客" &&
        path.indexOf("Payment") > 0
      ) {
        this.$swal({
          text: "请登录正式账号操作",
          type: "error",
          timer: 1200,
          confirmButtonText: "关闭"
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      }
      if (path == "/Payment/record:deposit") {
        sessionStorage.setItem("change", Math.random());
      }
      if (path == "im") {
        window.open(
          `http://vip.leyingcdn.com/index.php/chat/index/oid/${sessionStorage.getItem(
            "im_token"
          )}`
        );
        return;
      }
      if (path == "dns") {
        window.open('/ios.html');
        return;
      }
      if (path == "serv") {
        window.open('https://static.meiqia.com/dist/standalone.html?_=t&eid=105102');
        return;
      }
      if (path == "kaijiang") {
        setTimeout(() => {
          window.open(this.kaijiangwang);
        }, 500);
        return;
      }
      if (path == "zhuce") {
        this.showReg();
        return;
      }
      if (path == "/sevie" || path == "call") {
        setTimeout(() => {
          window.open(this.csUrl, "", "width=600,height=510");
        }, 500);
        return;
      }
      if (path == "/mg") {
        window.open(this.mg);
      }
      if (path == "/sport") {
        this.sport();
      }
      this.$router.push({
        path: path
      });
    },
    logout() {
      let _this = this;
      this.$swal({
        text: "确定要登出吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "取消操作",
        confirmButtonText: "确定登出"
      })
        .then(result => {
          if (result.value == true || result == true) {
            this.$swal({
              text: "登出成功！",
              type: "success",
              timer: 1200
            })
              .then(function(response) {
                // 清除除了promotionId之外的所有session
                Object.keys(sessionStorage).forEach((item, index) => {
                  if (item != "promotionId") {
                    sessionStorage.removeItem(item);
                  }
                });
                /* 退出登陆的时候有2种情况
                  *跳转到home页面
                  * 跳转到某些平台特有的登陆页
                  */
                if (
                  getApiName() == "ly" ||
                  getApiName() == "yiren" ||
                  getApiName() == "tt"
                ) {
                  location.href =
                    location.origin +
                    (_this.$route.query.promotionId
                      ? `?promotionId=${_this.$route.query.promotionId}`
                      : "");
                } else {
                  location.href = "./";
                }
              })
              .catch(e => {});

            // alert(111)
          } else if (result.dismiss == "cancel") {
            this.$swal({
              text: "取消登出",
              type: "warning",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
          }
        })
        .catch(e => {});
    },
    loginStatue() {
      if (
        sessionStorage.getItem("im_token") &&
        sessionStorage.getItem("im_realname") != "11"
      ) {
        this.username = sessionStorage.getItem("im_username");
        this.banlance = this.$store.state.lotteryMoney;
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    handleCommand1(command) {
      switch (command) {
        case "goAddress1":
          this.$router.push({
            path: "/userset"
          });
          break;
        case "changePwd":
          if (sessionStorage.getItem("im_username") === "游客") {
            this.$swal({
              text: "请登录正式账号操作",
              type: "error",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            return;
          }
          this.isShowChangePwd = true;
          break;

        case "changePayPwd":
          if (sessionStorage.getItem("im_username") === "游客") {
            this.$swal({
              text: "请登录正式账号操作",
              type: "error",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            return;
          }
          this.isShowChangePayPwd = true;
          break;
      }
    },
    handleCommand(command) {
      // 下拉事件
      switch (command) {
        case "logout":
          this.logout();
          break;

        case "changePwd":
          if (sessionStorage.getItem("im_username") === "游客") {
            this.$swal({
              text: "请登录正式账号操作",
              type: "error",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            return;
          }
          this.isShowChangePwd = true;
          break;

        case "changePayPwd":
          if (sessionStorage.getItem("im_username") === "游客") {
            this.$swal({
              text: "请登录正式账号操作",
              type: "error",
              timer: 1200,
              confirmButtonText: "关闭"
            })
              .then(function(response) {})
              .catch(e => {});
            return;
          }
          this.isShowChangePayPwd = true;
          break;
      }
    },
    // oid_all() {
    //   this.$http.post("/user/signdemo").then(res => {
    //     if (res.data.oid) {
    //       sessionStorage.setItem("im_token", res.data.oid);
    //       sessionStorage.setItem("im_username", "");
    //       sessionStorage.setItem("im_realname", "11");
    //       sessionStorage.setItem("agree", "true");
    //       this.isLogin = false;
    //     }
    //   });
    // },
    tryPlay() {
      this.$http.post("/user/signdemo").then(res => {
        if (res.data.msg == 4003) {
          this.$router.push({ name: "maintain" });
        }
        if (res.data.msg == "4001") {
          this.$router.push({
            path: "/home"
          });
        }
        if (res.data.oid) {
          this.isShowAgreement = true;
          this.isLogin = true;
          this.listenAgree();
          this.loginStatue();
          /*  setTimeout(() => {
            this.isLogin = true;
            this.agree = true;  
            this.listenAgree();
            this.loginStatue();
          },2000) */
          res.data.money = res.data.money.replace('"', "").replace('"', "");
          sessionStorage.setItem("im_token", res.data.oid);
          this.$store.commit("updatelotteryMoney", res.data.money);
          this.$store.commit('setToken', res.data.oid)
          sessionStorage.setItem("im_username", res.data.username);
          sessionStorage.setItem("im_realname", res.data.realname);
          sessionStorage.setItem("im_email", JSON.stringify(res.data.qqskype));
          sessionStorage.setItem(
            "im_telphone",
            JSON.stringify(res.data.telphone)
          );
        } else {
          this.$message("登陆失败,请重试!");
          return false;
        }
      });
    },
    getBalance() {
      let params = {};

      getApiName() == "hg" ? (params.sports = 1) : "";
      this.$http.post("/getinfo/money", JSON.stringify(params)).then(res => {
        if (res.data.msg == "4001") {
          if (this.$route.query.user && this.$route.query.user) {
          } else {
            this.$router.replace({
              path: "/home"
            });
          }
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
    sport() {
      let params = {};

      this.$http
        .post("/SportFunction/logToSport", JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 2006) {
            console.log(res.data.info);
            window.location.href = res.data.info;
          } else if (res.date.msg == 7001) {
            this.$router.replace({
              path: "/home"
            });
          }
        });
    },
    mg() {}
  },
  watch: {
    $route(to, from) {
      // this.getBalance();
      this.pathRoute = to.path; // 对路由变化作出响应...
      if (from.path.indexOf("Games") > 0) {
        this.gameNavs[0].gamePath = from.path;
      }
    },
    banlance(val) {},
    isLogin: function() {}
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../assets/less/variable.less";
@media screen and (max-width: 1260px) {
  .header-main {
    width: 100% !important;
  }
}
header {
  background: #1952b4;
}
.header_ct,
.header_uc {
  background-image: url("@{public_img}/images/ct/bg-header.jpg");
}
.ico-my-in {
  background: url("@{public_img}/images/common/icon/ico-my-in-h.png");
}
.ico-my-out {
  background: url("@{public_img}/images/common/icon/ico-my-out-h.png");
}
.ico-my-tran {
  background: url("@{public_img}/images/common/icon/ico-my-tran-h.png");
}
.ico-my-set {
  background: url("@{public_img}/images/common/icon/tuichu1.png") no-repeat;
  opacity: 0.5;
}
.ico-my-set:hover {
  background: url("@{public_img}/images/common/icon/tuichu1.png") no-repeat;
  opacity: 1;
}
.ico-my-user {
  background: url("@{public_img}/images/common/icon/ico-my-user.png");
}
.ico-my-pwd {
  background: url("@{public_img}/images/common/icon/ico-my-pwd.png");
}
.ico-my-pwd-old {
  background: url("@{public_img}/images/common/icon/ico-my-pwd-old.png");
}

.ico-my-pwd-new {
  background: url("@{public_img}/images/common/icon/ico-my-pwd-new.png");
}
.ico-my-pwd-pay {
  background: url("@{public_img}/images/common/icon/ico-my-pwd-pay.png");
}
.ico-my-pwd-re {
  background: url("@{public_img}/images/common/icon/ico-my-pwd-re.png");
}
.ico-arrow-left-circle {
  background: url("@{public_img}/images/common/icon/ico-arrow-left-circle-h.png");
  opacity: 0.5;
}
.ico-arrow-right-circle {
  background: url("@{public_img}/images/common/icon/ico-arrow-right-circle-h.png");
}
.ico-arrow-left-circle:hover {
  opacity: 1;
}
.ico-arrow-right-circle:hover {
  background: url("@{public_img}/images/common/icon/ico-arrow-right-circle.png");
}

/* .btns span:hover .ico-my-in {
  // background: url("/static/images/common/icon/ico-my-in-h.png");
}
.btns span:hover .ico-my-out {
  // background: url("/static/images/common/icon/ico-my-out-h.png");
}
.btns span:hover .ico-my-tran {
  // background: url("/static/images/common/icon/ico-my-tran-h.png");
} */
.ico-my-paymethods {
  background: url("@{public_img}/images/common/icon/ico-my-paymethods.png");
}
.ico-my-bank {
  background: url("@{public_img}/images/common/icon/ico-my-bank.png");
}
.ico-my-alipay {
  background: url("@{public_img}/images/common/icon/ico-my-alipay.png");
}
.ico-my-wechat {
  background: url("@{public_img}/images/common/icon/ico-my-wechat.png");
}
.ico-my-jd {
  background: url("@{public_img}/images/common/icon/ico-my-jd.png");
}
.ico-my-yunpay {
  background: url("@{public_img}/images/common/icon/ico-my-yunpay.png");
}
.ico-my-cai {
  background: url("@{public_img}/images/common/icon/ico-my-cai.png");
}
.ico-my-qq {
  background: url("@{public_img}/images/common/icon/ico-my-qq.png");
}
.ico-my-name {
  background: url("@{public_img}/images/common/icon/ico-my-name.png");
}
.ico-my-code {
  background: url("@{public_img}/images/common/icon/ico-my-code.png");
}
.ico-my-phone {
  background: url("@{public_img}/images/common/icon/ico-my-phone.png");
}
.ico-my-union {
  background: url("@{public_img}/images/common/icon/ico-my-yl.png");
  background-size: 100% 100%;
}
.ico-my-news {
  background: url("@{public_img}/images/common/icon/ico-my-news.png") no-repeat;
  background-size: 100% 100%;
}

.el-dropdown-audio .el-switch__label {
  color: #5a5e66;
}
</style>

<style scoped>
@media screen and (min-width: 1260px) {
  .header .header-main {
    width: 100% !important;
  }
}
header {
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 55;
  background-size: 100% 100%;
}
header .header-main {
  width: 1260px;
  height: 100%;
  background-size: 100% 100%;
  margin: 0 auto;
}
.el-dropdown-link {
  margin-top: 2px;
}
.f2 {
  height: 100%;
  float: right;
}
.longin {
  display: flex;
  /*min-width: 280px;*/
  /*line-height: 50px;*/
  height: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: -8px;
}
.btn-box-login {
  margin: 10px 0 10px 5px;
}
.joinus,
.agentLogin {
  position: absolute;
  right: 0;
  bottom: -7px;
  font-size: 12px;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  color: #ccc;
}
.joinus:hover,
.agentLogin:hover {
  color: #fff;
}
.agentLogin {
  left: 0;
  right: auto;
}
.longin div:nth-child(1),
.longin div:nth-child(2),
.longin div:nth-child(1) input,
.longin div:nth-child(2) input {
  width: 94px;
  line-height: 1;
  height: 25px;
  font-size: 12px;
  outline: none;
  border-radius: 5px;
}
.longin div:nth-child(1) input,
.longin div:nth-child(2) input {
  width: 80px;
  padding-left: 8px;
}
.longin div:nth-child(3) {
  width: 93px;
  line-height: 1;
  height: 26px;
  cursor: pointer;
}
.longin span {
  color: #fff;
}
.longin div:nth-child(3) span {
  width: 46px;
  height: 100%;
  line-height: 26px;
  float: left;
  /*border-radius: 5px;*/
}
.longin div:nth-child(3) span:first-child {
  border-right: 1px solid rgba(0, 0, 0, 0);
  background: #3e6ee7;
  border-radius: 5px 0 0 5px;
}
.longin div:nth-child(3) span:last-child {
  background: #e58e56;
  border-radius: 0 5px 5px 0;
}
.longin div:nth-child(4) {
  width: 43px;
  line-height: 2;
  border-radius: 5px;
  height: 30px;
  background: #e58e56;
  cursor: pointer;
}
.el-icon-arrow-right {
  height: 18px;
  line-height: 1.5;
}
h1.logo {
  float: left;
  margin: 8px 25px 0 0;
  width: 175px;
  font-size: 30px;
  background-size: 100% 100%;
  /*-webkit-text-fill-color: transparent;*/
  font-weight: bold;
}
.hah {
  float: left;
  width: 20%;
}
.el-icon-arrow-down {
  cursor: pointer;
}
.el-icon-arrow-down:before {
  font-size: 20px;
}
.nav li {
  float: left;
  text-align: center;
  width: 66px;
  /* padding: 0 6px; */
  display: block;
  height: 100%;
  font-size: 14px;
  color: #fff;
  opacity: 0.9;
  cursor: pointer;
}

.nav li:hover,
.nav li.active {
  opacity: 1;
  font-weight: bold;
}
.userInfo {
  padding: 5px 0;
  height: 50px;
  min-width: 200px;
  border-top: none;
  border-bottom: none;
  border-left: 1px solid #153b7c;
}
.offline {
  border: none;
}
.userInfo span {
  display: block;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
}
.userInfo .avatar {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50px;
  margin: 2px 5px 0 5px;
  opacity: 1;
}
.userInfo .detail {
  margin: 8px 15px 0 0;
  min-width: 80px;
}
.userInfo .detail .ger {
  float: left;
  /*display: block;*/
  width: 80%;
}
.userInfo .balance {
  font-size: 16px;
  text-align: left;
  opacity: 1;
}
.userInfo .detail span {
  text-align: left;
}

.avatar img {
  margin: 0;
  width: 100%;
}
.setting {
  width: 50px;
}
.userInfo .btns {
  border-left: 1px solid #153b7c;
  border-right: 1px solid #153b7c;
  text-align: left;
  font-size: 12px;
  line-height: 30px;
  height: 55px;
  margin-top: -5px;
  padding-top: 5px;
}
.userInfo .btns div {
  float: left;
}
.setting span {
  cursor: pointer;
  color: #fff;
  opacity: 0.5;
  line-height: 10px;
}
.setting:hover span {
  opacity: 1;
}
.btns span {
  display: inline-block;
  text-align: center;
  padding: 2px 5px 5px 5px;
  line-height: 10px;
}
.btns a {
  display: inline-block;
}

.userInfo .btns i,
.setting i {
  font-size: 22px;
}
.setting .el-dropdown {
  margin-top: 2px;
}
.nav li a:hover,
.setting i:hover,
.setting span:hover,
.userInfo .btns i:hover,
.userInfo .btns span:hover {
  opacity: 1;
  transition: all 0.5s ease;
  cursor: pointer;
}
.el-dropdown-menu {
  right: 10px;
  top: 46px !important;
  width: 200px;
  border-radius: 8px;
  padding-top: 0;
}
li.el-dropdown-menu__item {
  border-bottom: 1px solid #ddd;
  margin: 0 20px;
  padding: 6px 0 0 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
li.el-dropdown-menu__item:last-child {
  border-bottom: none;
}
.popper__arrow {
  left: auto !important;
  right: 18px;
}
.el-dropdown-menu__item:not(.setTitle):hover {
  background-color: #fff;
  color: #000;
}

.el-dropdown-menu .btn-logout {
  border-bottom: none;
  margin-top: 20px;
}

.el-dropdown-menu .btn-change {
  border-bottom: none;
  margin-bottom: 20px;
}
.setTitle {
  background-color: #f0f0f6;
  margin: 0 !important;
  padding: 0 0 0 20px !important;
  border-bottom: none !important;
  font-size: 16px;
}
.el-dropdown-menu__item.setTitle:hover {
  color: #333;
  background-color: #f0f0f6;
}
.offline div {
  /*min-width: 330px;*/
  margin-top: -4px;
}
.offline div a,
.offline div span {
  padding: 0 20px;
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.btns-before-login .btn-reg {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.btns-before-login .btn-try {
  color: #fff;
}
/* .offline div a:hover {
  background-color: #f0f0f0;
} */
.longin div:nth-child(3) span:last-child:hover {
  background-color: #fb9b5d;
}
.longin div:nth-child(3) span:first-child:hover {
  background-color: #5182ff;
}
.demo-reg {
  font-style: normal;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  opacity: 1;
  border: 1px solid #fff;
  cursor: pointer;
}
#lightColor {
  color: #eed91e;
  opacity: 1;
}
#lightColor:hover {
  color: #fff;
}
.nav li:hover,
.nav li.active {
  opacity: 1 !important;
  color: #fff !important;
}
.el-dropdown-audio {
  border-bottom: 1px solid #ddd;
  margin: 0 20px;
  padding: 6px 0 0 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  list-style: none;
  line-height: 36px;
  font-size: 14px;
  color: #5a5e66;
  cursor: pointer;
}
</style>

