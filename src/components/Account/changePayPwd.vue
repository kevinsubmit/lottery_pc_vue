<template>
  <div class="changePayPwdPage">
    <div class="overlay"></div>
    <transition name="drop">
      <div class="popup-content">
        <h2 class="popup-title">更改取款密码<i class="el-icon-circle-close-outline" @click="closeDialog"></i></h2> 
        <div class="form popup-body">
          <div class="row">
            <i class="ico ico-my-pwd-old"></i>
            <input v-model="old_password" autofocus="autofocus" type="password" placeholder="请输入旧的取款密码" onkeyup="value=value.replace(/[^\d]/g,'')" minlength="4" maxlength="4"/>
          </div>
          <div class="row">
            <i class="ico ico-my-pwd-new"></i>
            <input type="password" v-model="new_password"  placeholder="请输入新的取款密码，四位的纯数字" onkeyup="value=value.replace(/[^\d]/g,'')" minlength="4" maxlength="4"/>
          </div>
          <div class="row" >
            <i class="ico ico-my-pwd-re"></i>
            <input type="password" style="border-top:none" v-model="new_password_again" placeholder="请再次确认新的取款密码，四位的纯数字" onkeyup="value=value.replace(/[^\d]/g,'')" minlength="4" maxlength="4"/>
          </div>
          <div class="btn-form">
            <button  class="btn-blue" @click="submit">确认修改</button>
          </div>
        </div>

        <div class="popup-footer">
          <span>有疑问?</span>
          <a  @click="openService">联系客服</a>
        </div>
      </div>
    </transition>
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
        title:""
      }
    },
    methods: {
      openService () {
        window.open(this.csUrl,'','width=600,height=510');
      },
      submit(){
        let prams={};
        prams.paypasswd=this.new_password;
        prams.oldpaypasswd=this.old_password;
        if(!this.old_password&&!this.new_password&&!this.new_password_again){
          this.$message('所有项不能为空');
        }else if(this.old_password === this.new_password) {
          this.$message('新密码和旧密码不能一样！');
        } else{
          if(this.new_password_again==this.new_password && this.new_password.length==4){

            this.$http.post('/user/info',JSON.stringify(prams)).then(res => {

              if (res.data.msg == "4001") {
                this.$router.push({
                  path: '/home'
                }) // 跳转到登陆
              }
              else if(res.data.msg == "3003"){
                this.$message({
                  type: 'error',
                  message: '缺失必填项,请重试！'
                });
              }
              else if(res.data.msg == "2006"){
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                });
                this. closeDialog();
              }
              else if(res.data.msg == "2001"){
                this.$message({
                  type: 'error',
                  message: '密码错误！'
                });
              }
            })
          }
          else {
            this.$message({
              type: 'error',
              message: '新密码两次输入不相同或不符合规范'
            });
          }
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
<style>
 
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
