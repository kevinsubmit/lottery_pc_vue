<template>
  <mask-layer>
    <div class="confirm-box">
      <h2 class="title">{{title}}
        <i class="el-icon-circle-close-outline" @click="closeConfirm"></i>
      </h2>
      <slot></slot>
      <div class="confirm-footer">
        <span class="btn-confirm" @click="handleConfirm">确认</span>
        <span class="btn-cancel" @click="handleCancel">取消</span>
      </div>
    </div>
  </mask-layer>
</template>

<script>
export default {
  data() {
    return {
      confirmShow:false
    }
  },
  props: ['title'],
  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.$store.commit('setConfirmShow',false)
    },
    handleCancel() {
      this.$emit('cancel');
      this.$store.commit('setConfirmShow',false)
    },
    closeConfirm(){
      this.$store.commit('setConfirmShow',false)
    }
  }
}
</script>

<style scoped>
.confirm-box {
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
  font-family: 'microsoft yahei';
  padding: 10px;
}

.confirm-box h2.title {
  background-color: #f1f3f8;
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  color: #666;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  font-weight: normal;
  margin: -10px -10px 0 -10px;
}
.confirm-box h2.title .el-icon-circle-close-outline {
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: -30px;
  font-size: 30px;
  color: #e8e8e8;
}

.confirm-box .el-icon-circle-close-outline {
  font-size: 22px;
  color: #999;
  vertical-align: middle;
  cursor: pointer;
}
.confirm-box .el-icon-circle-close-outline:hover {
  color: #666;
}

.confirm-box .confirm-footer {
  color: white;
}

.confirm-footer .btn-confirm,
.confirm-footer .btn-cancel {
  height: 34px;
  line-height: 34px;
  width: 45%;
  cursor: pointer;
}

.confirm-footer .btn-confirm {
  background-color: #ff9200;
  box-shadow: 2px 2px 5px #f5b3bb;
  border-radius: 34px 0 0 34px;
}

.confirm-footer .btn-cancel {
  background-color: #1c4fa8;
  box-shadow: 2px 2px 5px #a29bbf;
  border-radius: 0 34px 34px 0;
}

.confirm-footer .btn-confirm:hover {
  background-color: #c0740d;
}
.confirm-footer .btn-cancel:hover {
  background-color: #1561e5;
}

.confirm-box .confirm-footer span {
  display: inline-block;
  margin: 0;
}
</style>
