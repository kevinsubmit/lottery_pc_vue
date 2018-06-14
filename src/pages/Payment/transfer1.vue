<template>
  <div id="transfer">
    <!-- <Dialog></Dialog> -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!-- <img src="../../../src/assets/images/common/trans1.png"  > -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!-- <img src="../../../src/assets/images/common/trans2.png"  > -->
        </div>
      </el-col>

    </el-row>
    <el-container class='edu'>
      <el-header class='title' style='height:33px'>额度转换
      </el-header>
      <el-main>
        <el-row :gutter="20" style='margin-bottom:10px'>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <div class="zhuan">
                转换方式
              </div>
            </div>
          </el-col>
          <el-col :span="3">
                <el-radio v-model="radio" label="1">{{`彩票转${title}`}}</el-radio>
          </el-col>
          <el-col :span="3">
                <el-radio v-model="radio" label="0">{{`${title}转彩票`}}</el-radio>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content zh">转换金额</div>
          </el-col>
          <el-col :span="6" style="width:66.6%">
            <div class="grid-content"><input type="" v-model='shu' name="" onkeyup="this.value=this.value.replace(/\D/g,'')"></div>
          </el-col>
          <!-- <el-col :span="15">
            <div class="grid-content">
              <el-row :gutter="20" class='huan'>
                <el-col :span="3" v-for='(item,index) in list' :key="index">
                  <div class="grid-content bg-purple lala">
                    <div ref='xuan' @click="select(item,index)">{{item}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col> -->
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="grid-content ">
              <div class="conmit" style="padding:15px 0">

                <div @click.stop='submit()'>提交</div>
                <div @click='reset()'>重置</div>
              </div>

            </div>
          </el-col>
        </el-row>
      </el-main>

    </el-container>
  </div>
</template>
<script>
import { Loading } from "element-ui";
// import Dialog from './dialog'
export default {
  props: ["title", "transferApi"],
  data() {
    return {
      radio: "1",
      selec: false,
      shu: "",
      balance: this.$store.state.lotteryMoney,
      list: [100, 500, 1000, 5000, 10000, 50000]
    };
  },
  methods: {
    select(item, index) {
      this.$emit("child-money", "change1");
      this.shu = item;
      this.$refs.xuan.map(item => {
        item.className = "";
      });
      this.$refs.xuan[index].className = "active";
    },
    reset() {
      this.shu = "";
      /*  this.$refs.xuan.map(item => {
        item.className = "";
      }); */
    },
    setmoney() {
      this.$emit("child-money", "change");
    },
    submit() {
      if (this.shu <= 0 || this.shu == "") {
        this.$swal({
          text: "请输入正确的转换金额",
          type: "error",
          timer: 1200
        })
          .then(function(response) {})
          .catch(e => {});
        return;
      } else {
        
        let params = {};
        
        if (this.title == "捕鱼"||this.title=='体育') {
          params.transfer_io = this.radio;
        }

        if(this.title=='棋牌'){
          params.type = this.radio==="0"?1:0;
        }
        params.amount = this.shu;
        let loadingInstance = Loading.service({
          background: "rgba(0, 0, 0, 0.5)"
        });
        this.$http.post(this.transferApi, JSON.stringify(params)).then(res => {
          console.log(res)
          if (res.data.msg == 4001) {
            this.$swal({
              text: "账户已下线，请重新登陆",
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
            this.$router.push({
              path: "/home"
            });
            return;
          }
          if (res.data.msg == 7001) {
            loadingInstance.close();
            this.$swal({
              text: res.data.info,
              type: "error",
              timer: 1200
            })
              .then(function(response) {})
              .catch(e => {});
          }else if(res.data.msg == 5004){
               loadingInstance.close();
                this.$swal({
                  text: res.data.info,
                  type: "error",
                  timer: 1200
                })
              .then(function(response) {})
              .catch(e => {});
              
          }else if (res.data.msg == 2006) {
            loadingInstance.close();
            this.reset();
            if (this.radio == 1) {
              this.$swal({
                text: `彩票成功转入${this.title}额度` + params.amount + "元",
                type: "success",
                timer: 1200
              })
                .then(function(response) {})
                .catch(e => {});
              this.$emit("transferSuccess");
            } else if (this.radio == 0) {
              loadingInstance.close();
              this.$swal({
                text: `${this.title}额度成功转入彩票` + params.amount + "元",
                type: "success",
                timer: 1200
              })
                .then(function(response) {})
                .catch(e => {});
              this.$emit("transferSuccess");
            }
            this.setmoney();
            // this.$store.commit('updatelotteryMoney', JSON.stringify(this.balance))
            this.shu = "";
            return;
          }
        });
      }
    }
  }
};
</script>
<style>
.foot {
  text-align: left;
}
.grid-content img {
  width: 100%;
}
.edu {
  border: 1px solid #e6e6f0;
  border-radius: 5px;
}
.title {
  text-align: left;
  color: #333333;
  font-weight: bold;

  height: 33px;
  background: #f8f9fb;
  border-bottom: 1px solid #e6e6f0;
  line-height: 30px;
}
.lala {
  cursor: pointer;
}
.grid-content .zhuan {
  border: none;
}
.huan .grid-content div {
  height: 35px;
  line-height: 35px;
  width: 100%;
  border: 1px solid #e6e6f0;
  border-radius: 5px;
}
.zh {
  height: 38px;
  line-height: 38px;
}
.grid-content .zhuan1 {
  text-align: left;
  border: none;
}
</style>
