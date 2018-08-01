<template>
<div>
    <div class="overlay"></div>
      <transition name="drop">
        <div class="modal-content">
          <h2 class="title">投注明细</h2>
          <ul>
            <li class="dialog-title test5">
              <span>号码</span>
              <span>赔率</span>
              <span>金额</span>
              <span>确认</span>
            </li>
            <li v-for="(item,j) in betArr">
              <span>{{item.name}}</span>
              <span>{{item.odds}}</span>
              <span><el-input v-model="item.money"></el-input></span>
              <span><i class="el-icon-circle-close-outline" @click="deleteRow(j)"></i></span>
            </li>

          </ul>
          <div class="dialog-total clearfix">
            <div class="f-l">
              <span>组数：</span>
              <span>{{totalNum}}</span>
            </div>
            <div class="f-r">
              <span>总金额：</span>
              <span><span style="color:red;">{{totalMoney}}</span>元</span>
            </div>
          </div>
          <div class="btnbetOrder">
            <span class="btn-pink" @click="submit">确认</span>
            <span class="btn-blue" @click="closeDialog">取消</span>
          </div>
        </div>
      </transition>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      betParams: {},
      betInfo: [],
      singleMoney: 0,
      totalNum: 0,
      totalMoney: 0
    }
  },
  mounted() {

  },

  props: {
    betArr: {
      type: Array
    },
    round: {
      type: String
    },
    game_code:{
      type: Number
    },
    type_code:{
      type: Number
    }
  },
  created() {
    this.betInfo = this.betArr;
    for (let i = 0; i < this.betInfo.length; i++) {
    // console.log(this.betInfo[i].key)
      let s = this.betInfo[i].key;
      this.betParams[s]  = this.betInfo[i].money
      this.singleMoney = this.betInfo[i].money;
      this.totalNum ++;
      this.totalMoney = this.totalNum * this.singleMoney
    }
  },
  beforeUpdate(){
  },
  methods: {
    deleteRow(j) {
      // console.log(j)
      this.betInfo.splice(j,1);
      this.totalNum--;
      this.totalMoney = this.totalNum * this.singleMoney;
      if (this.totalNum === 0) {
        this.closeDialog();
      }
    },
    closeDialog(){
      this.$emit('child-say', 'close');
    },
    submit() {
      this.betParams.game_code = this.game_code;
      this.betParams.type_code = this.type_code;
      this.betParams.round = this.round;


      this.$http.post('/inup', JSON.stringify(this.betParams)).then(res => {
          // console.log(res.data);
          if ((res.data) instanceof Array) {
            this.$message('下注成功！');
          } else if (res.data.msg === 4001) {
            this.$message('下注失败！');
          } else if (res.data.msg === 5001) {
            this.$message('下注项为空，金额不正确,请重新输入');
          } else if (res.data.msg === 5002) {
            this.$message('游戏已封盘');
          } else if (res.data.msg === 5003) {
            this.$message('下注期数错误');
          } else if (res.data.msg === 5004) {
            this.$message('余额不足,下注失败');
          } else if (res.data.msg === 7001) {
            this.$message('PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注');
          } else if (res.data.msg === 3004) {
            this.$message('PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注');
          } else if (res.data.msg === 5002) {
            this.$message('游戏已封盘');
          } else {
            this.$message('下注失败！');
          }
          this.closeDialog();
      })
    }
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
.drop-enter {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
}
.drop-leave-active {
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
  opacity: 0;
}
.overlay {
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: .5;
  filter: alpha(opacity=50);
  z-index: 66;
  left: 0;
  top: 0;
  transition: all ease .8s;
}
.modal-content {
  background-color: #fff;
  box-shadow: 0 0 10px #808080;
  min-height: 100px;
  width: 450px;
  margin-left: -225px;
  border-radius: 10px;
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 88;
  font-family: "microsoft yahei";
}
.modal-content ul {
  padding: 10px;
}
.modal-content .btnbetOrder {
  margin: 20px 0;
}
.modal-content .btnbetOrder span {
  display: inline-block;
}
.btnbetOrder .btn-pink,
.btnbetOrder .btn-blue {
  height: 34px;
  line-height: 34px;
  width: 45%;
}
.modal-content h2.title {
  background-color: #f1f3f8;
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  color: #666;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.dialog-title {
  border-bottom: 1px solid #ddd;
}
.dialog-total {
  border-top: 1px solid #ddd;
  margin: 0 10px;
}
.modal-content li,
.dialog-total {
  padding: 0 10px;
}
.modal-content li span {
  font-size: 14px;
  display: inline-block;
  color: #000;
}
.dialog-title span,
.dialog-total span {
  color: #666!important;
}
.modal-content li span .el-input__inner {
  height: 23px;
  text-align: center!important;
}
.modal-content .el-icon-circle-close-outline {
    font-size: 22px;
    color: #999;
    vertical-align: middle;
    cursor: pointer;
}
.modal-content .el-icon-circle-close-outline:hover {
  color: #666;
}
.modal-content li span:nth-child(1) {
  width: 46%;
  text-align: left;
}
.modal-content li span:nth-child(2) {
  width: 15%;
}
.modal-content li span:nth-child(3) {
  width: 20%;
}
.modal-content li span:nth-child(4) {
  width: 15%;
}

</style>

