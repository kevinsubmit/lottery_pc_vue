<template>
  <div>
    <register v-if="isShowReg" v-on:doClose="listenCloseOrder"></register>
    <div class="login-page">
      <div class="overlay"></div>
      <div class="popup-content">
        <h2 class="popup-title">会员登入
          <i class="el-icon-circle-close-outline" @click="closeDialog"></i>
        </h2>
        <div class="popup-body">
          <div class="row">
            <i class="ico ico-my-user"></i>
            <input type="text" @blur="verification_1(userName)" v-model="userName" ref="username" placeholder="会员账号" autofocus="autofocus" />
          </div>
          <div class="row">
            <label>
              <i class="ico ico-my-pwd"></i>
              <input type="password" v-model="passWord" placeholder="登录密码" ref="passwordInput" @keyup.enter="subMit" />
              <i @click="changePasswordType" :class="`${ispassWord?'openEyes':'closeEyes'}`"></i>
            </label>
          </div>

          <!--<input type="text" placeholder="验证码"/>-->
          <!--<input type="text" style="background:#9EABBC"/>-->
          <!--<a href="">-->
          <!--<p class="ty">忘记密码?</p>-->
          <!--</a>-->
          <div id="btn-login-form">
            <button class="btn-pink" @click.prevent="subMit">确认登录</button>
            <!-- <button class="btn-blue" @click='chgLogin("reg")'>马上注册</button> -->
            <button class="btn-blue" @click='tryPlay'>试玩登入</button>
          </div>
        </div>
        <!-- <div class="popup-footer">
          <ul class="clearfix">
            <li><router-link to="" @click='chgLogin()'>忘记密码</router-link></li>
            <li @click="openService"><a href="javascript:void(0);">联系客服</a></li>
            <li><a href="javascript:void(0);" @click.prevent="chgRestPwd()">找回密码</a></li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Register from './register'
export default {
  components: {
    Register
  },
  data() {
    return {
      ispassWord: false,
      isShowReg: false,
      userName: '',
      passWord: '',
      isHao: false,
      money: 0,
      title: '',
      from: {
        input1: false
        // popup-body:false
      },
      csUrl: ''
    }
  },
  methods: {
    openService() {
      window.open(this.csUrl, '', 'width=600,height=510')
    },
    closeDialog() {
      this.$emit('doClose', 'close')
    },
    isShowAgree() {
      this.$emit('doClose', 'showAgree')
    },
    chgLogin() {
      this.$emit('loginType', 'reg')
    },
    chgRestPwd() {
      this.$emit('loginType', 'reset')
    },
    showReg() {
      this.isShowReg = true
    },
    changePasswordType() {
      ;(this.ispassWord = !this.ispassWord)
        ? (this.$refs.passwordInput.type = 'text')
        : (this.$refs.passwordInput.type = 'password')
      // console.log(this.ispassWord)
    },
    gotoAddress(path) {
      this.$router.push(path)
    },
    verification_1(userName) {
      //长度在6~16之间
      if (!/\w{6,14}$/.test(userName)) {
        this.from.input1 = true
      } else {
        this.from.input1 = false
      }
    },
    verification_2(passWord) {
      //长度在6~16之间
      if (!/\w{6,14}$/.test(passWord)) {
        this.from.input1 = true
      } else {
        this.from.input1 = false
      }
    },
    tryPlay() {
      this.$emit('doClose', 'tryPlay')
    },
    subMit() {
      //判定填写表单符合验证标准，且不为空

      if (this.userName.length === 0) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '账号不能为空!'
        })
        return
      } else if (this.passWord.length === 0) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '密码不能为空!'
        })
        return
      }

      if (this.userName.length > 5 && this.passWord.length > 5) {
        let params = {}
        params.username = this.userName
        params.password = this.passWord
        this.$http.post('/user/signin', JSON.stringify(params)).then(res => {
          if (res.data.msg == 2001) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '账号/密码错误,你还有' + res.data.times + '次机会'
            })
            return
          } else if (res.data.msg == 2002) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '用户不存在!'
            })
            return
          } else if (res.data.msg == 2005) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '请联系客服解锁！或2小时后再尝试登录！'
            })
            return
          }
          if (res.data.oid) {
            /*this.$swal({
                text: "登陆成功！", 
                type: "success",
                timer: 1200, 
              });*/

            this.isShowAgree()
            sessionStorage.setItem('im_username', res.data.username)
            sessionStorage.setItem('im_realname', res.data.realname)
            sessionStorage.setItem('im_token', res.data.oid)
            // 重新加载赔率
            if (
              localStorage.getItem('odds_version') &&
              res.data.rate_version != localStorage.getItem('odds_version')
            ) {
              localStorage.clear()
            }
            localStorage.setItem('odds_version', res.data.rate_version)
            
            this.$store.commit('updatelotteryMoney', res.data.money)
            this.$store.commit('setToken', res.data.oid)
            this.$emit('doClose', 'sucess')

            setTimeout(() => {
              this.$router.push('/home')
            }, 600)
          } else {
            // this.$message('账号或密码输入不正确');
            this.$message({
              type: 'error',
              showClose: true,
              message: '账号或密码输入不正确!'
            })
            return false
          }
        })
      } else {
        this.$message({
          type: 'error',
          showClose: true,
          message: '账号或密码输入格式不正确!'
        })
        return false
      }
    }
  },
  mounted() {
    this.$refs.username.focus()
  },
  beforeCreate() {
    // sessionStorage.removeItem("im_token");
  },
  watch: {
    $route(to, from) {}
  }
}
</script>
<style scoped>
.popup-content {
  width: 320px;
  margin-left: -160px;
}
.popup-body {
  padding: 30px;
}
#btn-login-form {
  margin-top: 30px;
}
#btn-login-form button {
  border: none;
  width: 100%;
  border-radius: 30px;
}
#btn-login-form button a {
  color: #fff;
}
.login-page .popup-footer li {
  float: none;
  text-align: center;
  height: 40px;
  line-height: 40px;
  display: inline;
}
.login-page .popup-footer li:first-child a {
  border-right: 1px solid #ddd;
  padding-right: 10px;
}
.login-page .popup-footer li:last-child a {
  padding-left: 5px;
}
.login-page .popup-footer {
  height: 40px;
  line-height: 40px;
}
.login-page .popup-footer ul {
  padding: 0;
}
.login-pag .popup-footer a {
  color: #8c8ab2;
  font-size: 12px;
  border-right: 1px solid #ddd;
}
.login-pag .popup-footer a:hover {
  color: #000;
}
.login-pag .btn-blue {
  margin-top: -10px;
}
.longin {
  display: flex;
  /*min-width: 280px;*/
  /*line-height: 50px;*/
  height: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 4px;
}
</style>
