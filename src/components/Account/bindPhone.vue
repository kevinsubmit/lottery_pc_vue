<template>
  <div>
    <div class="bind-phone-page" >
    <div class="overlay"></div>
      <div class="popup-content" >
        <h2 class="popup-title">绑定手机号<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
        <img src="/static/images/common/bind.jpg" class="promo-img">
        <div class="popup-body">
          <div class="row">
             <i class="ico ico-my-phone"></i> 
            <input type="text" onkeyup="value=this.value.replace(/\D+/g,'')" v-model="iponeNumber"   placeholder="请输入您要绑定的手机号" maxlength="11" />
          </div>
          <div class="row msg-code">
            <label>
              <i class="ico ico-my-code"></i>
              <input type="text" pattern="\d*"  oninput="if(value.length>6)value=value.slice(0,6)" placeholder="获取并输入验证码"  v-model="verificationCode"  maxlength="6"  :style="{width: widthData}"/>
              <i class="btn-msg-code" @click="getCode">{{countdown}}</i>
            </label>
          </div>
          <div id="btn-bind-form">
            <button class="btn-blue" @click='subMit'>确认绑定</button>
          </div>
        </div>
        <div class="popup-footer">
          <ul class="clearfix"> 
            <li><a href="javascript:void(0);" @click.prevent="closeDialog">跳过</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ispassWord:false,
        isShowReg:false,
        userName: '',
        passWord: '',
        isHao: false,
        money:0,
        iponeNumber:'',
        verificationCode:'',
        showCurtion:false,
        countdown:'获取验证码',
        nums:90,
        timer:null,
        disbol:true,
        widthData:'150',
        title:""
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
      subMit(){
        if(this.iponeNumber === ''){
          this.$message({
            type: 'error',
            showClose: true,
            message: '手机号码不能为空!'
          });
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.iponeNumber))){
          this.$message({
            type: 'error',
            showClose: true,
            message: '请输入正确的手机号码!'
          });
          return
         }
        if(this.verificationCode==''){
          this.$message({
            type: 'error',
            showClose: true,
            message: '验证码不能为空!'
          });
          return
        } 
        if(this.verificationCode.length>6){
          this.$message({
            type: 'error',
            showClose: true,
            message: '验证码不正确!'
          });
          return
        }

        let params = {}
        params.verification_code= this.verificationCode
        this.$http.post('/sms/bindMobilePhone',JSON.stringify(params)).then(res => {

            if(res.data.msg == 4001){
                sessionStorage.clear();
                this.$swal({
                  text: "您的账户已失效，请重新登录", 
                  type: "error",
                  timer: 1200, 
                });
                this.$router.push({
                  path: '/login'
                })
            }else if(res.data.msg == 8010){
                this.$swal({
                  text: "未开通短信功能", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8011){
                this.$swal({
                  text: "手机号码不符合规范", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8012){
              this.showCurtion=false
                this.isHao = true;
                this.title = "网络错误，请重试";
                setTimeout(() => {
                  this.isHao = false;
                },1000);
                this.$swal({
                  text: "手机号码不符合规范", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8013){
                this.$swal({
                  text: "验证码错误", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8014){
                this.$swal({
                  text: "验证码失效", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8002){
                this.$swal({
                  text: "该用户已经领取过彩金", 
                  type: "error",
                  timer: 1200, 
                });
            }else if(res.data.msg == 8001){
                this.$swal({
                  text: "该手机号已绑定用户", 
                  type: "error",
                  timer: 1200, 
                });
                setTimeout(() => {
                  this.$router.push({
                    path: '/home'
                  })
                },1000);
            }else if(res.data.msg==2006){
                this.$swal({
                  text: "恭喜你绑定成功", 
                  type: "success",
                  timer: 1200, 
                });
                
              // this.imMoney=this.imMoney+Number(res.data.money)
              this.$store.commit("updatelotteryMoney", this.imMoney);
              sessionStorage.setItem('im_telphone',JSON.stringify(this.iponeNumber))
              // sessionStorage.setItem('user_phonen',JSON.stringify(this.iponeNumber))
              this.closeDialog();
            }else if(res.data.msg==8016){
                this.$swal({
                  text: "该手机号已绑定用户", 
                  type: "error",
                  timer: 1200, 
                });              
            }
        })
      },
      getCode(){
        let params = {}
        params.mobile_phone= this.iponeNumber
        params.type_code = 0; 
        this.$http.post('/sms/getVerificationCode',JSON.stringify(params)).then(res => {
          console.log(res.data)
          if (res.data.msg === 2006) {
            this.$swal({
              text: "短信发送成功！", 
              type: "success",
              timer: 1200, 
            });
          } else {
            // if () {}
            console.log(res.data.info)
            this.$swal({
              text: res.data.info, 
              type: "error",
              timer: 1200, 
            });            
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
    }
  }
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
  border-bottom: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  outline: none;
  width: 100%;
  padding-top: 10px;
}
.popup-body {
  padding: 45px;
}
#btn-bind-form {
  margin-top: 20px;
}
#btn-bind-form button {
  border: none;
  width: 100%;
  border-radius: 30px;
  margin-bottom: 10px;
}
#btn-bind-form button a {
  color: #fff;
}
#btn-bind-form .btn-blue {
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
.bind-phone-page .popup-body {  
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
.bind-phone-page .popup-footer ul {
    padding-left: 150px;
}
</style>
