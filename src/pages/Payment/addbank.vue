<template>
  <div class="content bank_1">
      <el-container class='sbm'>
        <!-- <span>返回</span> -->
        <el-header style='height:35px;text-align:left;'><span @click='fanhui' style='margin-right:10px;color:#3e80d4;cursor: pointer;' class="el-icon-back"></span>{{title}}</el-header>
        <el-main style='background:#fff;padding:10px 20px;color:#7d73b8'>
            <div  style='text-align:left;'>为了您的账户安全,银行卡号需要与本人真实姓名一致</div>
            <el-container style='border:1px solid #e7e6eb;border-radius:5px;height: calc(100vh - 203px)!important;'>
              <el-header  style='height:35px;line-height: 35px;text-align:left;border-bottom:1px solid #e7e6eb;color:#333; background: #f2f3f8'>{{title1}}</el-header>
              <el-main>
                <el-row>
                 <!--  <el-col :span="2"><div class="grid-content bg-purple-dark" >
                     真实姓名：</el-input>
                  </div></el-col> -->
                  <!-- <el-col :span="6"><div class="grid-content bg-purple-dark">
                     <el-input style='line-height:28px;outline:none' v-model="inputm" placeholder="请输入姓名"></el-input>
                  </div></el-col> -->
                </el-row>
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple-dark" >
                     选择银行：</el-input>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                      <el-select style='height:28px;line-height:28px;outline:none;width:252px;' v-model="value6" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item"
                            :value="item">

                          </el-option>
                        </el-select>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple-dark" >
                     银行卡号：</el-input>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                     <!-- <el-input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style='height:28px;line-height:28px;outline:none' v-model="numbe" placeholder="请输入银行卡号"></el-input> -->
                     <input style='height:30px;line-height:15px;outline:none;border-radius:3px;padding-left:10px;width:240px
                     ' v-model="numbe" placeholder="请输入银行卡号" type="number">
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple-dark" >
                     重复卡号：</el-input>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                     <!-- <el-input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style='height:28px;line-height:28px;outline:none' v-model="numbe1" placeholder="请再次输入银行卡号"></el-input> -->
                     <input style='height:30px;line-height:15px;outline:none;padding-left:10px;width:240px' v-model="numbe1" placeholder="请再次输入银行卡号" type="number">
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple-dark" >
                     开户地址：</el-input>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-dark">
                     <el-input style='height:28px;line-height:28px;outline:none;width:252px' v-model="place" placeholder="请输入开户行地址"></el-input>
                  </div></el-col>
                </el-row>

              </el-main>
              <el-main style='border-top:1px solid #e7e6eb'>
                    <el-row style='margin-top:20px;'>
                      <el-col :span="24"><div class="grid-content ">
                            <div class="conmit" >
                              
                              <div @click='conmit()'>提交</div>
                              <div @click='reset()'>重置</div>
                            </div>

                      </div></el-col>
                    </el-row>
              </el-main>
            </el-container>
        </el-main>

      </el-container>
  </div>
</template>
<script>
  export default {
     data() {
       return {
          title:"银行卡管理",
          numbe:null,
          title1:"",
          place:null,
          numbe1:null,
          value6:'工商银行',
           options: ["农业银行", "中国银行", "招商银行", "建设银行", "交通银行", "工商银行", "渤海银行", "光大银行", "兴业银行", "民生银行", "中信银行", "广发银行", "华夏银行", "平安银行", "邮政储蓄银行", "浦发银行","北京农商", "上海银行"]

       }
     },
     created(){
        if(JSON.parse(sessionStorage.getItem('im_bankcode'))){
          // alert(111)
              this.title1='修改银行卡'
        }else{
           this.title1='添加银行卡'
        }
     },
     methods:{
      fanhui(){
          this.$router.push("/Payment/record:withdraw")
      },
        conmit(){
          if (this.numbe==null) {
              this.$swal({
                text: "银行卡号不能为空",
                type: "error",
                timer: 1200,
              });
              return
          } else if(this.numbe.length > 19 || this.numbe.length < 16){
              this.$swal({
                text: "银行卡位数不正确",
                type: "error",
                timer: 1200,
              });
              return
          }  else if (this.numbe1==null) {
              this.$swal({
                text: "重复卡号不能为空",
                type: "error",
                timer: 1200,
              });
              return
          }  else if(this.numbe1.length > 19 || this.numbe1.length < 16){
              this.$swal({
                text: "重复卡号位数不正确",
                type: "error",
                timer: 1200,
              });
              return
          } else if (this.numbe!=this.numbe1){
              this.$swal({
                text: "两次输入的银行卡号不相同",
                type: "error",
                timer: 1200,
              });
              return
          } else if (this.place==null) {
              this.$swal({
                text: "开户地址不能为空",
                type: "error",
                timer: 1200,
              });
              return
          }
          else{
             
            let params={};
            
            params.bank_address=this.place;
            params.bank_name=this.value6;
            params.bank_code=this.numbe;
            // console.log(params)
            this.$http.post('/user/info',JSON.stringify(params)).then(res => {
                 // console.log(res.data.msg)
                 if (res.data.msg === 2006) {
                  if(JSON.parse(sessionStorage.getItem('im_bankcode'))){
                       this.$swal({
                          text: "修改成功",
                          type: "success",
                          timer: 1200,
                        });
                  }else{
                     this.$swal({
                      text: "绑卡成功",
                      type: "success",
                      timer: 1200,
                    });
                  }
                 
                  this.$router.push('/Payment/record:withdraw');  

                 } else {
                  this.$swal({
                    text: "新增失败",
                    type: "error",
                    timer: 1200,
                  });
                 }
            })
          }

        },
        reset(){
            // this.inputm=null
            this.numbe=null
            this.place=null
            this.numbe1=null
        }
     }

  }
</script>
<style type="text/css" media="screen">
/*.bank_1{
  padding: 0 15px;
   
}*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
  margin: 0; 
}
input[type="number"]{-moz-appearance:textfield;}
  .bank {
    line-height: 36px;
    height: 36px;
    color: #333436;
    text-align:left;
  }
  .main1{
    background: #fff;
    height: 100%;
  }
  .bank_1  .bg-purple-dark{
      margin-bottom: 20px;
          height: 40px;
    line-height: 40px;

      color: #333;
  }
   .bank_1 .grid-content input{
     text-align: left;
   }
   .grid-content .conmit{
  border: none;
  padding: 50px 0;
}
.grid-content .conmit div{
  width: 120px;
  color: #fff;
  display: inline-block;
  border-radius:0 60px  60px  0;
  
    /*background: #453880;*/
  cursor: pointer;
}
.bank_1 .sbm{
      background: #f2f3f8
}
.grid-content .conmit div:first-child{
  border-radius: 60px 0 0 60px;
  /*background: #eb6877;*/
}
</style>
