<template>
  <div class="logincontent" :style="{'height':windowHeight}">
    <div class="loginmain">
      <p class="tc">
        <img src="../../../../static/images/ly/logo.png" alt="">
      </p>
      <p>
        <input type="text" id="username" v-model="userName" class="login-box-input">
      </p>
      <p>
        <input type="password" id="pwd" v-model="passWord" class="login-box-input">
      </p>
      <p id="msg"></p>
      <p>
        <button class="loginbtn cp" @click="handleLogin">登 录</button>
      </p>
      <div class="loginbutton">
        <span class="regbtnuser cp" @click="gotoReg">注册会员</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span id="demo" class="cp" @click="gotoVisit">游客参观</span>
      </div>
    </div>
    <register v-show="isShowReg" @doClose="listenCloseOrder" @loginType="listenLoginType" :result="result"></register>
    <!-- <agreement v-show="isShowAgreement" @doClose="listenCloseOrder" @isAgree="listenAgree"></agreement> -->
  </div>
</template>

<script>
import Register from "../../../components/Account/register";
import base64 from "js-base64";
// import Agreement from "../../../components/agreement";
export default {
  components: {
    Register
    // Agreement
  },
  data() {
    return {
      result: null,
      isShowReg: false,
      isShowAgreement: false,
      windowHeight: "",
      userName: "",
      passWord: ""
    };
  },
  created() {
    this.windowHeight = window.innerHeight + "px";
    this.userName =
      (this.$route.query.account &&
        this.$route.query.account.split("|")[0] &&
        Base64.decode(this.$route.query.account.split("|")[0])) ||
      "";
    this.passWord =
      (this.$route.query.account &&
        this.$route.query.account.split("|").length > 1 &&
        Base64.decode(this.$route.query.account.split("|")[1])) ||
      "";
    console.log(this.userName, this.passWord);
    if (this.userName) {
      this.handleLogin();
    }
  },
  methods: {
    listenAgree(msg) {
      if (msg === "agree") {
        this.isShowAgreement = false;
        sessionStorage.getItem("im_username") === "游客"
          ? this.$router.push("/Games/race")
          : this.$router.push({ path: "/Games/race" });
        this.agree = true;
        sessionStorage.setItem("agree", "true");
      } else if (msg === "disagree") {
        this.isLogin = false;
        this.isShowAgreement = false;
        this.agree = false;
        sessionStorage.clear();
      }
    },
    listenLoginType(i) {
      if (i === "reg") {
        this.isShowReg = true;
      }
    },
    listenCloseOrder(i) {
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
    closeDialog() {
      this.isShowLogin = false;
      this.isShowReg = false;
      this.isShowResetPwd = false;
    },
    loginStatue() {
      if (sessionStorage.getItem("im_token")) {
        this.username = sessionStorage.getItem("im_username");
        this.banlance = this.$store.state.lotteryMoney;
        this.banlance = this.banlance.replace('"', "").replace('"', "");
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    handleLogin() {
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
        this.$http.post("/user/signin", JSON.stringify(params)).then(res => {
          if (res.data.msg == 4003) {
            this.$router.push({ name: "maintain" });
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
            this.listenAgree('agree');
            this.loginStatue();
            this.$store.commit("updatelotteryMoney", res.data.money);
            sessionStorage.setItem("im_username", res.data.username);
            sessionStorage.setItem("im_realname", res.data.realname);
            sessionStorage.setItem("im_token", res.data.oid);
            // 重新加载赔率
            if (
              localStorage.getItem('odds_version') &&
              res.data.rate_version != localStorage.getItem('odds_version')
            ) {
              localStorage.clear()
            }
            localStorage.setItem('odds_version', res.data.rate_version)
            this.$store.commit('setToken', res.data.oid)
            sessionStorage.setItem("im_telphone", res.data.telphone);
          } else {
            // this.$message('账号或密码输入不正确');
            /* this.$message({
                type: 'error',
                showClose: true,
                message: '账号或密码输入不正确!'
              });
              return false */
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
      // this.$emit('loginType', 'reset');
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
    gotoReg() {
      sessionStorage.setItem("im_isAgent", false);
      this.isShowReg = true;
    },
    gotoVisit() {
      // this.isShowAgreement = true;

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
          this.listenAgree('agree');

          this.loginStatue();

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
    }
  }
};
</script>

<style scoped>
.cp {
  cursor: pointer;
}

.login-box-input {
  border: 1px solid #931532;
  height: 35px;
  width: 280px;
  outline: none;
  color: #fff;
  border-radius: 30px;
  padding-left: 35px;
  box-sizing: border-box;
}

.loginmain > p {
  padding: 0;
  margin: 7px 20px;
}

#pwd {
  background: url("/static/images/ly/lock-icon.png") no-repeat 10px center
    #650920;
  background-size: 18px 18px;
}

#username {
  background: url("/static/images/ly/user-icon.png") no-repeat 10px center
    #650920;
  background-size: 18px 18px;
}

.loginbtn {
  background: #b9022e;
  font-size: 16px;
  border: 1px solid #931532;
  height: 35px;
  width: 280px;
  outline: none;
  color: #fff;
  border-radius: 30px;
}

.logincontent {
  display: flex;
  height: 100%;
  background: url("/static/images/ly/bg.png") no-repeat 25% 30% #570019;
  justify-content: flex-end;
}

.loginmain {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-right: 15%;
}

.loginbtn:hover,
.regbtn:hover {
  background: #e51c52;
}

.loginbutton {
  display: flex;
  justify-content: center;
  color: #f83d68;
  font-size: 12px;
  margin-top: 20px;
}

.regbtn {
  background: #b9022e;
  border-radius: 30px;
  color: #fff;
  padding: 5px 0;
}

.reg {
  width: 320px;
  height: 340px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -150px;
  z-index: 99;
  background: #fff;
  border-radius: 10px 10px;
  display: none;
}

.regtitle {
  background: #e1e2ee;
  margin: 0;
  border-radius: 10px 10px 0 0;
  color: #666;
  font-weight: normal;
  padding: 8px 10px;
  margin-bottom: 15px;
}

.reg p input {
  background: none;
  border: none;
  border-bottom: 1px solid #931532;
  color: #931532;
  border-radius: 0;
}

.regmsg {
  height: 28px;
  color: #b9022e;
  font-size: 12px;
  width: 180px;
  margin: 0 auto;
}

.regpay {
  font-size: 14px;
  margin-bottom: 10px;
}

.regcolse {
  position: absolute;
  border: 2px solid #fff;
  right: -25px;
  top: -25px;
  color: #fff;
  border-radius: 100%;
  font-size: 20px;
  line-height: 0;
  padding: 10px 3px 12px 3px;
}

.regaccount {
  background: url(//jkysxh.cn/img/pc/static/images/common/icon/ico-my-user.png)
    no-repeat #fff !important;
}

.regpwd {
  background: url(//jkysxh.cn/img/pc/static/images/common/icon/ico-my-pwd.png)
    no-repeat #fff !important;
}

.regaginpwd {
  background: url(//jkysxh.cn/img/pc/static/images/common/icon/ico-my-pwd-re.png)
    no-repeat #fff !important;
}

.regname {
  background: url(//jkysxh.cn/img/pc/static/images/common/icon/ico-my-name.png)
    no-repeat #fff !important;
}

@media screen and (min-width: 1200px) and (max-width: 1600px) {
  .loginmain {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-right: 7%;
  }
}

@media screen and (max-device-width: 799px) {
  .loginmain {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-right: 0%;
  }
  .logincontent {
    visibility: hidden;
    display: flex;
    height: 100%;
    background: url("/static/images/ly/logo.png") no-repeat -85px 44% #570019 !important;
    justify-content: flex-end;
  }
}
</style>
