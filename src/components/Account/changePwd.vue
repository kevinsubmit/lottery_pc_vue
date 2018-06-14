<template>
  <div class="changePwdPage"> 
    <div class="overlay"></div>
    <div class="popup-content">
      <h2 class="popup-title">更改登录密码<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2>
      <div class="popup-body">
        <div class="row">
          <i class="ico ico-my-pwd-old"></i>
          <input v-model="old_password" autofocus="autofocus" type="password" placeholder="请输入旧的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="15"/>
        </div>
        <div class="row">
          <i class="ico ico-my-pwd-new"></i>
          <input type="password" v-model="new_password"  placeholder="请输入新的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="15"/>
        </div>
        <div class="row" >
          <i class="ico ico-my-pwd-re"></i>
          <input style="border-top:none" v-model="new_password_again"  type="password" placeholder="请再次确认新的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="15"/>
        </div>
        <div class="btn-form">
          <button class="btn-blue" @click="submit">确认修改</button>
        </div>
      </div>
       <div class="popup-footer">
        <span>有疑问?</span>
        <a  @click="openService">联系客服</a>
      </div>

    </div> 
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        csUrl: '',
        old_password:"",
        new_password:"",
        new_password_again:"",
        title:"",
        isHao:false
      }
    },
    methods: {
      openService () {
        window.open(this.csUrl,'','width=600,height=510');
      },
      submit(){
        let prams={};
        prams.password=this.new_password;
        prams.oldpassword=this.old_password;
        let pwtest=/^\w+$/.test(this.new_password); 
        if (this.old_password === '') {
          this.$message('旧密码不能为空！');
        } else if (this.new_password === '') {
          this.$message('新密码不能为空！');
        } else if (this.new_password_again === '') {
          this.$message('新确认密码不能为空！');
        }  else if (this.new_password_again !== this.new_password) {
          this.$message('两次新密码不一致，请重新输入！');
        } else if (!pwtest || prams.password.length < 6) {
          this.$message('新密码不符合格式，6~15位英文或数字！');
        } else if (this.old_password === this.new_password) {
          this.$message('新密码和旧密码不能一样！');
        } else {
          this.$http.post('/user/info',JSON.stringify(prams)).then(res => {
            // console.log(res.data)
            if (res.data.msg == "4001") {
              this.$router.push({
                path: '/home'
              })
            }
            else if(res.data.msg == "3003"){
              this.$message({
                type: 'error',
                message: '缺失必填项,请重试！'
              });
               
            }
            else if(res.data.msg == "2006"){
              sessionStorage.clear();
              this.$swal({
                text: "修改成功，请重新登录！",
                type: "success",
                timer: 1200,
              })
              .then(function (response) {
                window.location.reload();
                this.$emit('doClose', 'close');
              }).catch(e => {
                  console.log(e)
              })                         
            }
            else if(res.data.msg == "2001"){
              this.$message({
                type: 'error',
                message: '原始密码输入错误！'
              });              
            }
          });
        }
      },
      closeDialog(){
        this.$emit('doClose', 'close');
      }
    },
    created() {
      this.csUrl = sessionStorage.getItem('serviceUrl');
    },
    components: {
    }
  }
</script>
<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .8s ease;
}
.popup-content .row .ico + input{
  border-bottom: 1px solid #ccc;
}
.drop-enter {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
}
.drop-leave-active {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
  opacity: 0;
}
</style>
