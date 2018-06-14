<template>
  <div>
    <div class="reset-pwd-page" >
    <div class="overlay"></div>
      <div class="popup-content" >
        <h2 class="popup-title">找回密码<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
        <div class="popup-body">
              <div class="all1"> 
                  <div class="container" >
                    <div class="passwordimg">
                   
                        <!-- <img :src="srcImg"/> -->
                
                    </div>
                    <div class="input1 input2" v-show='second'>
                      <div class="row">
                        <i class="ico ico-my-user"></i> 
                         <!-- <span class="zhanhaofind" style="width: 1rem;"></span> -->
                        <input type="search"  autocapitalize="off"  v-model="userName" placeholder="请输入您的的用户名"/>
                      </div>
                      <div class="row">
                        <i class="ico ico-my-phone"></i> 
                         <!-- <span class="iponenumberq"></span> -->
                        <input type="text"  pattern="\d*" oninput="if(value.length>11)value=value.slice(0,11)" v-model="iponeNumber"   placeholder="请输入已绑定的手机号" maxlength="11" />
                      </div>
                      <div class="row">
                        <i class="ico ico-my-code"></i>
                        <!-- <span class="iponenumberyes"></span> -->
                        <input type="number" pattern="\d*"  oninput="if(value.length>6)value=value.slice(0,6)" placeholder="获取并输入验证码"  v-model="verificationCode"  maxlength="6"  :style="{width: widthData}"/>
                        <i class="yam color1 btn-msg-code" @click="getCode">{{countdown}}</i>
                      </div>

                      <div id="btn">
                        <a>
                          <button class="color1  btn-blue" style="color:#fff" @click="nextlast">下一步</button>
                        </a>
                      </div>

                    </div>
                    <div  class="input2" v-show='second==false'>
                      <div>
                        <!-- <span class="loc"></span> -->
                        <input type="password" v-model="passWord" placeholder="新密码：6-15个英文数字" ref="passwordInput"/>
                        <!-- <i @click="changePasswordType" :class="`${ispassWord?'openEyes':'closeEyes'}`"></i> -->
                      </div>
                      <div>
                        <!-- <span class="loc"></span> -->
                        <input type="password" v-model="new_password
                          " placeholder="重复输入新的密码" ref="passwordInputnew"/>
                        <!-- <i @click="changePasswordTypenew" :class="`${ispassWordnew?'openEyes':'closeEyes'}`"></i> -->
                      </div>
                      
                      <div id="btn">
                          <button class="color1 btn-blue" style="color:#fff" @click="subMit">确认修改</button>
                      </div>
                    </div>
                    
                  </div>

                <!--  <div v-show="isHao">
                    <div class="modal_box_feedback">
                       <div class="modal_div">
                          <div class="modal_header color1">
                            <span>通知</span>
                          </div>
                          <div class="modal_foot">
                            <div ref="rscenter"></div>
                            <p>{{title}}</p>
                          </div>
                      </div>
                    </div>
                  </div> -->
                  
                <div style="position: absolute; left: 0; right: 0; top:0; bottom:0; background: rgba(0,0,0,0.3);z-index: 1000!important;" ref="div" v-if="showCurtion">
                  <div class="loading">
                    <div class="loader-inner line-spin-fade-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>

                </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // is_gd_ali: is_gd_ali(),
        // isIosWebview: isIosWebview,
        isHao: false,
        title:"",
        iponeNumber:'',
        verificationCode:'',
    
        showCurtion:false,
        countdown:'获取验证码',
        srcImg:'',
        nums:90,
        timer:null,
        disbol:true,
        widthData:'7.5rem',
        imMoney:'',
        userName:'',
        second:true,
        ispassWord:false,
        ispassWordnew:false,
        passWord:'',
        new_password:'',
        infoaction:''
      }
    },
    methods: {
      closeDialog(){
        this.$emit('doClose', 'close');
      },
      showReg () {
        this.isShowReg = true;
      },
      gotoAddress(path) {
        this.$router.push(path)
      },
      doLoop(){
        this.nums--;
      
        if(this.nums>0){
          this.countdown = this.nums +'秒后可重新获取';
          this.widthData = '6rem';
          
        }else{
          clearInterval(this.timer);
          this.countdown = '获取验证码';
          this.nums = 90
          this.disbol = true
          this.widthData = '7.5rem'
        }
      },
       changePasswordType(){

          (this.ispassWord = !this.ispassWord)?this.$refs.passwordInput.type = "text":this.$refs.passwordInput.type = "password"
        
      },
       changePasswordTypenew(){

          (this.ispassWordnew = !this.ispassWordnew)?this.$refs.passwordInputnew.type = "text":this.$refs.passwordInputnew.type = "password"
        
      },
      nextlast(){
        if(this.userName==''){
          // this.title = "手机号码不能为空!"
          // // this.isHao = true
          this.$message('用户名不能为空');
          return
        }
        if(this.iponeNumber==''){
          // this.title = "手机号码不能为空!"
          // // this.isHao = true
          this.$message('手机号码不能为空');
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.iponeNumber))){
          // this.title = "请输入正确的手机号码!"
          // // this.isHao = true
          this.$message('请输入正确的手机号码');
          return
         }
        if(this.verificationCode==''){
          // this.title = "验证码不能为空!"
          // // this.isHao = true
          this.$message('验证码不能为空');
          return
        }
        if(this.verificationCode.length!=6){
          // this.title = "请输入正确的验证码"
          // // this.isHao = true
          this.$message('请输入正确的验证码');
          
          return
        }
          let params = {}
        params.username = this.userName
        params.verification_code= this.verificationCode
    
        this.$http.post('/Systems/makeSureVerificationCode',JSON.stringify(params)).then(res => {
          this.showCurtion=true
            if(res.data.msg == 4001){
                sessionStorage.clear();
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "您的账户已失效，请重新登录";
                this.$message('您的账户已失效，请重新登录');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg == 8012){
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "网络错误，请重试";
                this.$message('网络错误，请重试');
                setTimeout(() => {
                  // // this.isHao = false;
                  
                },1000);
            }else if(res.data.msg == 8013){
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = " 验证码错误";
                this.$message('验证码错误 请重新输入');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.second = true;
                },1000);
            }else if(res.data.msg == 8014){
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "验证码失效";
                this.$message('验证码错误 请重新输入');
                
                setTimeout(() => {
                  // // this.isHao = false;
                  this.second = true;
                },1000);
            }else if(res.data.msg == 8001){
               this.showCurtion=false
                // // this.isHao = true;
                // this.title = "该手机号已绑定用户";
                this.$message('该手机号已绑定用户');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg==2006){
              this.showCurtion=false
                  this.infoaction = res.data.info
                 // if(this.is_gd_ali=='gd'){
                 //    this.srcImg = '../../../static/images/gd/findpassword2.png'
                    
                 //  }else{
                 //    this.srcImg = '../../../static/images/ct/findpassword2.png'
                 //  }
                 this.second = false;
            
            }else if(res.data.msg==3003){
               this.showCurtion=false
                // // this.isHao = true;
                // this.title ="账号、密码和验证码不可为空";
                this.$message('账号、密码和验证码不可为空');
                setTimeout(() => {
                  // this.isHao = false
              this.second = true;
                },1000);
              
            }
          
        })
        
        
      },
      goback() {
    this.$store.dispatch('goBack') // 发送后退的状态
    // 后退
    this.$router.go(-1)
     },
     getCode(){
      if (!(/\w{6,14}$/.test(this.userName))){
        this.$message('请输入正确的用户名');
        return
      }
      
      if(this.iponeNumber==''){
        this.$message('手机号码不能为空');
        return
      }
      if (!(/^1[34578]\d{9}$/.test(this.iponeNumber))){
        this.$message('请输入正确的手机号码');
        return
      }
         if(this.disbol){
          this.disbol = false
         }else{
          // console.log(this.disbol)
            return
         }
        this.showCurtion=true
        let params = {}
        params.username = this.userName
        params.mobile_phone= this.iponeNumber
        this.$http.post('/Systems/sendVerificationCode',JSON.stringify(params)).then(res =>{

          if(res.data.msg == 4001){
                sessionStorage.clear();
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "您的账户已失效，请重新登录";
                this.$message('您的账户已失效，请重新登录');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg == 8001){
              this.disbol = true
               this.showCurtion=false
                // // this.isHao = true;
                // this.title = "该手机号已绑定用户";
                this.$message('该手机号已绑定用户');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg == 2006){
              
               this.showCurtion=false
               // if (this.is_gd_ali=='gd') {
               //    this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/gdsuuccen.png')"
               //  }else if(this.is_gd_ali=='ly'){
               //    this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/pn/suuccen.png')"
               //  }else {
               //    this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/suuccen.png')"
               //  }
                // // this.isHao = true;
                // this.title = "短信已发送，请注意查收";
                this.$message('短信已发送，请注意查收');
                setTimeout(() => {
                  // // this.isHao = false;
                   // this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/erreo.png')"
                },1000);   
               this.timer = setInterval(this.doLoop,1000)
            }else if(res.data.msg == 8011){
              this.disbol = true
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "手机号码不符合规范";
                this.$message('手机号码不符合规范');
                return
            }else if(res.data.msg == 8012){
              this.disbol = true
                this.showCurtion=false
                 // // this.isHao = true;
                let iserror = res.data.info.split(':')[1]
                if(iserror=='8'){
                  // this.title = "同一号码提交次数过多";
                  this.$message('同一号码提交次数过多');
                }else{
                  // this.title = "网络错误";
                  this.$message('网络错误');
                }
                return
                  
            }else if(res.data.msg == 8010){
              this.disbol = true
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "未开通短信功能";
                this.$message('未开通短信功能');
                return
            }else if(res.data.msg==8002){
              this.disbol = true
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "该用户已经绑定过手机号";
                this.$message(res.data.info);
                return
            }else if(res.data.msg==8001){
              this.disbol = true
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "路线拥挤，请稍后";
                this.$message('路线拥挤，请稍后');
                return
                
            }else if(res.data.msg==2002){
              // this.disbol = true
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "用户不存在";
                this.$message('用户不存在');
                return
            }else if(res.data.msg==8004){
              // this.disbol = true
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "手机号未绑定,无法进行此操作";
                this.$message('该账号没有绑定手机号 若想继续找回密码 请联系客服');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
                return
            }else if(res.data.msg==8005){
              // this.disbol = true
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "手机号与当前绑定的不一致";
                this.$message('手机号与当前绑定的不一致');
                return
            }
          
        })
     },
    
     subMit(){
      if (!(/\w{6,14}$/.test(this.userName))){
        // this.title = "请输入正确的用户名!"
      this.$message('请输入正确的用户名');
      // this.isHao = true
      setTimeout(() => {
        // this.isHao = false
        this.second = true;
        
      },1200);
      return
      }
       


        if(this.passWord!=this.new_password){
          
             // this.title="两次输入的密码不一致"
      this.$message('两次输入的密码不一致');
              // this.isHao=true
              setTimeout(()=>{
                // this.isHao=false
//                this.second = true;
            },1200);
          return
         }
        
        if(!(/^[a-zA-Z0-9]{6,15}$/.test(this.new_password))){
           // this.title="新密码格式不正确"
          this.$message('新密码格式不正确');
          return
         }
         
        if(this.verificationCode.length>6){
          // this.title = "请输入正确的验证码!"
          this.$message('请输入正确的验证码');
          // this.isHao = true
          setTimeout(() => {
            // this.isHao = false
          },1200);
          return
        }
        let params = {}
        params.username = this.userName
        params.Verification_char=this.infoaction 
        params.new_password =this.new_password
        this.$http.post('/Systems/changepasswd',JSON.stringify(params)).then(res => {
            this.showCurtion=true
            if(res.data.msg == 4001){
                sessionStorage.clear();
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "您的账户已失效，请重新登录";
              this.$message('您的账户已失效，请重新登录');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg == 8012){
              this.showCurtion=false
                // // this.isHao = true;
                // this.title = "网络错误，请重试";
              this.$message('网络错误，请重试');
              return
            }else if(res.data.msg == 8013){
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = " 验证码错误";
                this.$message('验证码错误 请重新输入');
                 if(this.is_gd_ali=='gd'){
                  // this.srcImg = '../../../static/images/gd/findpassword1.png'
                  
                }else{
                  // this.srcImg = '../../../static/images/ct/findpassword1.png'
                }
                setTimeout(() => {
                  // // this.isHao = false;
                  this.second = true;
                },1000);
            }else if(res.data.msg == 8014){
                this.showCurtion=false
                // // this.isHao = true;
                // this.title = "验证码失效";
                this.$message('验证码错误 请重新输入');
                if(this.is_gd_ali=='gd'){
                  // this.srcImg = '../../../static/images/gd/findpassword1.png'
                  
                }else{
                  // this.srcImg = '../../../static/images/ct/findpassword1.png'
                }
                setTimeout(() => {
                  // // this.isHao = false;
                  this.second = true;
                },1000);
                return
            }else if(res.data.msg == 8001){
               this.showCurtion=false
                // // this.isHao = true;
                // this.title = "该手机号已绑定用户";
                this.$message('该手机号已绑定用户');
                setTimeout(() => {
                  // // this.isHao = false;
                  this.$router.push({
                    path: '/login'
                  })
                },1000);
            }else if(res.data.msg==2006){
               this.closeDialog()
               this.showCurtion=false
               this.$swal({
                text: "设置成功",
                type: "success",
                timer: 1200,
              })
               // this.$message('该手机号已绑定用户');
                // setTimeout(() => {
                //    this.$router.push({
                //     path: '/numberpassword'
                //   })
                // },500);
                return
            
            }else if(res.data.msg==3003){
               this.showCurtion=false
                // // this.isHao = true;
                // this.title ="账号、密码和验证码不可为空";
                this.$message('账号、密码和验证码不可为空');
                if(this.is_gd_ali=='gd'){
              // this.srcImg = '../../../static/images/gd/findpassword1.png'
              
            }else{
              // this.srcImg = '../../../static/images/ct/findpassword1.png'
            }
  
                setTimeout(() => {
                  // this.isHao = false
                  this.second = true;
                },1000);
                return
              
            }
          
        })
     }
    },
    beforeCreate(){

    },
    created(){

      // if(this.is_gd_ali=='gd'){
      //   this.srcImg = '../../../static/images/gd/findpassword1.png'
        
      // }else{
      //   this.srcImg = '../../../static/images/ct/findpassword1.png'
      // }
    },
  }
</script>

<style scoped>
 .popup-content {
  border: 1px solid #ccc;
  width: 360px;
  border-radius: 8px;
  background-color: #fff;
  margin-top: 10%;
  margin-left: -180px;
}
.popup-footer ul {
  padding-left: 96px;
}
.modal_header {
  font-size: 22px;
  line-height: 100px;
}

.el-button.is-round {
    border-radius: 20px;
    padding: 7px 33px;
}
.input2 div:nth-child(1),.input2 div:nth-child(2){
    height: 50px;
    border-bottom: 1px solid #ccc;
}
.input2 div:nth-child(1) input,.input2 div:nth-child(2) input{
    outline: none;
}
/*弹窗*/
.popup-title {
  background-color: #e1e2ee;
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding: 0 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 16px;
  color: #666;
}
.popup-content .row input {
  border: none;
  height: 33px;
  line-height: 33px;
  background-color: #fff;
  outline: none;
  width: 100%;
  padding-top: 10px;
}
.popup-body {
  padding: 45px;
}
#btn {
  margin-top: 20px;
}
#btn button {
  border: none;
  width: 100%;
  border-radius: 30px;
  margin-bottom: 10px;
}
#btn button a {
  color: #fff;
}
#btn .btn-blue {
  margin-left: 0;
}
.popup-footer {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.popup-footer li {
  color: #7b73be;
  display: inline-block;
}
.popup-footer a {
  color: #8c8ab2;
  padding: 0 15px;
  font-size: 12px;
  border-right: 1px solid #ddd;
}
.popup-footer a:hover {
  color: #000;
}
.popup-footer li:last-child a {
  border-right: none;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #bbb;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #bbb;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #bbb;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #bbb;
}
.promo-img {
  width: 96%;
  margin: 2%;
}
.reset-pwd-page .popup-body {  
    padding: 0 45px 15px 45px;
}
.msg-code {
  position: relative;
}
.btn-msg-code {
  position: absolute;
  right: 0;
  top: 10px;    
  background-color: #372d61;
  height: 35px;
  line-height: 35px;
  width: 90px;
  color: #fff;
  border-radius: 4px;
  font-style: inherit;
  box-shadow: 2px 2px 5px #a29bbf;
  cursor: pointer;
}
.reset-pwd-page .popup-footer ul {
    padding-left: 150px;
}
.popup-content .row .ico-my-user + input {
  padding-left: 20px;
}
</style>
