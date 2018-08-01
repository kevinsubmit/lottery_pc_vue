<template>
<div class="reg-form">  
  <div class="overlay"></div>
  <div class="popup-content" >
     <h2 class="popup-title" v-if="haha">代理注册<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
    <h2 class="popup-title"  v-if="!haha">会员注册<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
    <div class="form popup-body">
      <div class="row">
        <i class="ico ico-my-user" style='top:18px'></i>
        <input  @blur="verification_1(userName)" type="text" v-model="userName" ref='user' placeholder="用户账号(6-15英文数字)" autofocus="autofocus"/>
        <!-- <img v-show="from.input1" src="../../../static/images/warning _b.png" width="20"/> -->
      </div>
      <div class="row">
        <i class="ico ico-my-pwd" style='top:18px'></i>
        <input ref="passwordInput" @blur="verification_2(passWord)" type="password"   placeholder="登录密码(6-15英文数字)" v-model="passWord"/><i @click="changePasswordType_a" :class="`${ispassword_a?'openEyes':'closeEyes'}`"></i>
        <!-- <img v-show="from.input2" src="../../../static/images/warning _b.png" width="20"/> -->
      </div>
      <div class="row">
        <i class="ico ico-my-pwd-re" style='top:18px'></i>
        <input ref="passwordInput_again" @blur="verification_3(passWordAgain)" type="password"  placeholder="确认密码(6-15英文数字)" v-model="passWordAgain"/><i @click="changePasswordType_b"  :class="`${ispassword_b?'openEyes':'closeEyes'}`" ></i>
        <!-- <img v-show="from.input3" src="../../../static/images/warning _b.png" width="20" /> -->
      </div>
      <div class="row">
        <i class="ico ico-my-name" style='top:18px'></i>
        <input @blur="verification_4(realName)" type="text" placeholder="您的姓名(与提款的银行户名一致)" ref='rename' v-model="realName"/>
        <!-- <img v-show="from.input4" src="../../../static/images/warning _b.png" width="20"/> -->
      </div>

      <div class="row payPwd">
        <i class="ico ico-my-pwd-pay" style='top:18px' ></i>
        <div class="input3 pay-pwd">
          <select v-model="selected1">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
              </option>
          </select>
          <select v-model="selected2">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
              </option>
          </select>
          <select v-model="selected3">
            <option v-for="option in options" v-bind:value="option">
              {{option}}
              </option>
          </select>
          <select v-model="selected4">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
            </option>
          </select>
        </div>
        <!-- <div>提现密码</div> -->
      </div>


      <!--<div>-->
        <!--<span class="recommend"></span>-->
        <!--<input type="text" placeholder="便于日后找回密码" v-model="email"/>-->
        <!--<img v-show="from.input5" src="../../../static/images/warning _b.png" width="20"/>-->
      <!--</div>-->
      <div class="btn-reg-form btn-form">
        <button class="btn-reg btn-blue"  @click="subMit">提交</button>
      </div>
    </div>
    <!-- <div class="popup-footer">
      <span>已有账号?</span>
      <a @click='chgLogin("home")'>马上登录</a>
    </div> -->
    </div> 
</div>
</template>



<script>
  // base 64
  // import base64 from 'js-base64'
  //  md5
  // import md5 from 'blueimp-md5'
  //import { getUrl} from '../../api'
  export default {
    props:['result'],
    data() {
      return {
        showCurtion: false,
        paypasswd: '',
        realName: "",
        passWordAgain: '',
        haha:false,
        email: '',
        agname: "",
        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        selected1: 0,
        selected2: 0,
        selected3: 0,
        selected4: 0,
        // 手机号码
        userName: '',
        // 验证码
        passWord: '',
        passWordE: '', // 验证码错误信息
        // 邀请码
        inviteCode: '',
        //错误信息
        errormsg: '',
        input1:false,
        dialog: false,
        codeMessage: '', //  返回的验证码信息
        from: {
          input1: false,
          input2: false,
          input3: false,
          input4: false,
          input5: false
        },
        isHao: false,
        ispassword_a: false,
        ispassword_b: false,
        title: ''
      }
    },
    created(){
      if(this.result){
        this.userName = this.result.userName||'';
        this.passWord = this.result.passWord||'';
        this.passWordAgain = this.result.passWord||'';
        this.realName = this.result.realName||'';
        this.selected1 = this.result.paypwd[0]||0;
        this.selected2 = this.result.paypwd[1]||0;
        this.selected3 = this.result.paypwd[2]||0;
        this.selected4 = this.result.paypwd[3]||0;
        this.subMit();
      }
      
       if(sessionStorage.getItem('im_isAgent')=='false'){
          // alert(11)
            this.haha=false;
       }else{
          this.haha=true;
       }
       // console.log(this.haha)
    },
    methods: {
      changePasswordType_a(){
        (this.ispassword_a = !this.ispassword_a)?this.$refs.passwordInput.type = "text":this.$refs.passwordInput.type = "password"
      },

      changePasswordType_b(){
        (this.ispassword_b = !this.ispassword_b)?this.$refs.passwordInput_again.type = "text":this.$refs.passwordInput_again.type = "password"
      },
      isShowAgree (){
        this.$emit('doClose', 'showAgree');
      },
      closeDialog(){
        this.$emit('doClose', 'close');
      },
      chgLogin(){
        this.$emit('doClose', 'close');
        this.$router.push('/home')
      },
      subMit() {
        //判定填写表单符合验证标准，且不为空
          this.showCurtion = true
          if(!this.from.input1 && !this.from.input2 && !this.from.input3 && !this.from.input4 && !this.from.input5 && this.userName.length > 0 && this.passWord.length > 0 && this.passWordAgain.length > 0 && this.realName.length > 0) {
            for(let i = 1; i < 5; i++){
              let j = `selected${i}`
              let w = this[j]
              this.paypasswd = `${this.paypasswd}${this[j]}`
            }
            let params = {};
            params.username = this.userName;
            params.password = this.passWord;
            params.realname = this.realName;
            params.paypasswd = this.paypasswd;

            if (this.$route.query.promotionId) {
              params.pn = this.$route.query.promotionId
            }
            if (this.$route.query.b) {
              params.pid = this.$route.query.b
            }
            if (this.$route.query.c) {
              params.agname = this.$route.query.c
            } 

            // params.agname = (this.agname) ? this.agname : window.location.href.split("=")[1];
            if(this.haha){
                params.isAgent=1
            }else{
              params.isAgent=0
            }
            let href = window.location.href;
            if(href.indexOf("www.") > 0 || href.indexOf("wap.") > 0) {
              href = href.split("//")[1];
              href = href.split("/")[0];
              params.domain = href.split("/")[0];
            } else {
              href = href.split("//")[1];
              params.domain = href.split("/")[0];
            }
            // console.log(params)
            this.$http.post(`/user/signup`, JSON.stringify(params)).then(res => {
              // console.log(res)
              if(res.data.msg == 2004) {
                this.showCurtion = false
                // this.title = "账户不符合规范或者已经存在"
                // this.isHao = true
                this.$message('账户不符合规范或者已经存在');
                this.paypasswd = ''
                setTimeout(() => {
                  this.isHao = false
                }, 1200);
              } else if(res.data.msg == 2014) {
                this.showCurtion = false
                this.$message(res.data.resmsg);
                setTimeout(() => {
                  this.isHao = false
                }, 600);
              }else if(res.data.msg == 2011) {
                this.showCurtion = false
                this.$message(res.data.resmsg);
                setTimeout(() => {
                  this.isHao = false
                }, 600);
              }  else if(res.data.msg == 2003) {
                this.showCurtion = false
                // this.title = "注册失败"
                // this.isHao = true
                this.$message('注册失败');
                this.paypasswd = ''
                setTimeout(() => {
                  this.isHao = false
                }, 1200);
              } else if(res.data.msg == 2006) {
                 if(this.haha){
                  let agentLoginUrl="http://"+res.data.agentLoginUrl
                  this.$message('注册成功');
                  this.$emit('doClose', 'sucess');
                   // window.open('http://www.1188kai.com/html/public/home.html');
                   setTimeout(() => {
                      window.open(agentLoginUrl)
                    }, 1000);
                  
                  return;
                 }
                this.paypasswd = ''
                this.$http.post(`/user/signin`, JSON.stringify(params)).then(res => {

                  this.showCurtion = false
                  if(res.data.msg == 2001) {
                    // this.title = "密码错误"
                    // this.isHao = true
                    this.$message('密码错误');
                    setTimeout(() => {
                      this.isHao = false
                    }, 600);
                  } else if(res.data.msg == 2002) {
                    this.showCurtion = false
                    // this.title = "用户不存在"
                    // this.isHao = true
                    this.$message('用户不存在');
                    setTimeout(() => {
                      this.isHao = false
                    }, 600);
                  } else if(res.data.msg == 2003) {
                    this.showCurtion = false
                    // this.title = "注册失败"
                    // this.isHao = true
                    this.$message('注册失败');
                    this.paypasswd = ''
                    setTimeout(() => {
                      this.isHao = false
                    }, 1200);
                  } else if(res.data.msg == 2004) {
                    this.showCurtion = false
                    // this.title = "账户不符合规范或者已经存在"
                    // this.isHao = true
                    this.$message('账户不符合规范或者已经存在');
                    this.paypasswd = ''
                    setTimeout(() => {
                      this.isHao = false
                    }, 1200);
                  } else if(res.data.msg == 2005) {
                    this.showCurtion = false
                    // this.title = "账户被冻结或停用"
                    // this.isHao = true
                    this.$message('账户被冻结或停用');
                    setTimeout(() => {
                      this.isHao = false
                    }, 600);
                  } else if(res.data.oid) {
                     // this.$swal({
                     //    text: "登陆成功！", 
                     //    type: "success",
                     //    timer: 1200, 
                     //  });
                      sessionStorage.setItem('im_token', res.data.oid)
                      this.$store.commit('updatelotteryMoney',res.data.money)
                      sessionStorage.setItem('im_username',res.data.username)
                      sessionStorage.setItem('im_realname',res.data.realname)
                      // 重新加载赔率
                      if (
                        localStorage.getItem('odds_version') &&
                        res.data.rate_version != localStorage.getItem('odds_version')
                      ) {
                        localStorage.clear()
                      }
                      localStorage.setItem('odds_version', res.data.rate_version)
                      this.$store.commit('setToken', res.data.oid)
                      this.$emit('doClose', 'sucess');
                      this.isShowAgree ();
                  }
                })
              } else if(res.data.msg == 3003){
                this.showCurtion = false
                // this.title = "注册失败"
                this.$message('注册失败');
                this.paypasswd = ''
                setTimeout(() => {
                  this.isHao = false
                }, 1200);
              } else if(res.data.msg == 2008){
                this.showCurtion = false
                // this.title = "用户名:字母或者数字组合，必须以字母开头，6~15位"
                this.$message('用户名:字母或者数字组合，必须以字母开头，6~15位');
                this.isHao = true
                // this.title = "注册失败"
                this.paypasswd = ''
                setTimeout(() => {
                  this.isHao = false
                }, 1200);
              } else if(res.data.msg == 2011){
                this.showCurtion = false
                // this.title = "该名字已经被注册过了"
                // this.isHao = true
                this.$message('该名字已经被注册过了');
                this.paypasswd = ''
                setTimeout(() =>{
                  this.isHao = false
                }, 1200);
              } else {
                this.showCurtion = false
                // this.title = "注册失败,注册信息不符合规范"
                // this.isHao = true
                this.$message('注册失败,注册信息不符合规范');
                this.paypasswd = ''
                setTimeout(() =>{
                  this.isHao = false
                }, 1200);
              }
            })
          } else {
          
            this.showCurtion = false
            if(this.userName.length <= 0 ) {
              // this.title = "信息填写不完整"
              // this.isHao = true
                this.$message('用户名不能为空');
              this.paypasswd = '';
              this.$refs.user.focus()
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } 
            else if( this.passWord.length <= 0) {
              // this.title = "信息填写不完整"
              // this.isHao = true
                this.$message('密码不能为空');
              this.paypasswd = ''
               this.$refs.passwordInput.focus()
              

              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } 
            else if(this.passWordAgain.length <= 0 ) {
              // this.title = "信息填写不完整"
              // this.isHao = true
                this.$message('确认密码不能为空');
              this.paypasswd = ''
               this.$refs.passwordInput_again.focus()
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } 
            else if(this.passWordAgain != this.passWord ) {
              // this.title = "信息填写不完整"
              // this.isHao = true
                this.$message('密码输入不一致');
              this.paypasswd = ''
               this.$refs.passwordInput_again.focus()
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } 
            else if(this.realName.length <= 0) {
              // this.title = "信息填写不完整"
              // this.isHao = true
                this.$message('真实姓名不能为空');
              this.paypasswd = ''
               this.$refs.rename.focus()
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } 


            else if(this.from.input1) {
              this.showCurtion = false
              // this.title = "用户账号已存在或不符合规范,只能输入字母或数字,字符长度为6至15位"
              // this.isHao = true
                this.$message('用户账号已存在或不符合规范,只能输入字母或数字,字符长度为6至15位');
              this.paypasswd = ''
              setTimeout(() => {
                this.isHao = false
              }, 1800);
            } else if(this.from.input2) {
              this.showCurtion = false
              // this.title = "登录密码,必须混合字母和数字,字符长度为6至15位"
              // this.isHao = true
              this.$message('登录密码,必须字母或数字,字符长度为6至15位');
              this.paypasswd = ''
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if(this.from.input5) {
              this.showCurtion = false
              // this.title = "电子邮件不符合规范"
              // this.isHao = true
              this.$message('电子邮件不符合规范');
              this.paypasswd = ''
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if(this.from.input4) {
              this.showCurtion = false
              // this.title = "姓名填写不符合规范"
              // this.isHao = true
              this.$message('姓名填写不符合规范');
              this.paypasswd = ''
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if(this.passWordAgain != this.passWord) {
              this.showCurtion = false
              // this.title = "登录密码与确认密码不同"
              // this.isHao = true
              this.$message('登录密码与确认密码不同');
              this.paypasswd = ''
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            }
          }
        
      },

      verification_1(userName) {
        //字母、数字组成，字母开头，6-15位。
        if(!(/^[a-zA-Z0-9]{6,115}$/.test(userName))) {
          this.from.input1 = true
        } else {
          this.from.input1 = false
          let params = {}
          params.username = this.userName
          params.password = "a123456"
          this.$http.post(`/user/signin`, JSON.stringify(params)).then(res => {
            // console.log(res)
            if(res.data.msg != 2002) {
              this.from.input1 = true
              // this.title = "用户已存在"
              // this.isHao = true
              this.$message('用户已存在');
              this.userName='';
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            }
          })
        }
      },
      verification_2(passWord) {
        //字母、数字、下划线组成，字母开头，6-15位。
        if(!(/^[a-zA-Z0-9]{6,15}$/.test(passWord))) {
          this.from.input2 = true
        } else {
          this.from.input2 = false
        }
      },
      verification_3(passWord) {
        if(!(this.passWord == passWord)) {
          this.from.input3 = true
        } else {
          this.from.input3 = false
        }
      },
      verification_4(realName) {
        //两个以上的中文字
        if(!(/^[\u4E00-\u9FA5·]{2,}$/.test(realName))) {
          this.from.input4 = true
        } else {
          this.from.input4 = false
        }
      },
      verification_5(i) {},
      // 组件方法
      close() {
        this.dialog = false;
      },
      goback() {
        this.$store.dispatch('goBack') // 发送后退的状态
        // 后退
        this.$router.go(-1)

      },
      gotoAddress(path) {
        this.$router.push(path)
      }
      //        验证账号
    }

  }
</script>


<style scoped>
 .reg-form {
  position: fixed;
  top: 10%;
  left: 50%;
  margin-left: -180px; 
  z-index: 88;
 }
 .popup-content .row input {
  border: none;
  /*border-bottom: 1px solid #ddd;*/
  height: 33px;
  line-height:33px;
  background-color: #fff;
  outline: none;
  width: 100%;
  padding-top: 10px;
}
.payPwd select {
  border: none;
  background-color: #f1f3f8;
  height: 30px;
  width: 40px;
  border-radius: 5px;
  text-align: center;
  color: #999;
  margin: 10px 0;
}
.payPwd option {
  text-align: center;
}
.payPwd .pay-pwd {
  margin-left: -60px;
}
</style>
