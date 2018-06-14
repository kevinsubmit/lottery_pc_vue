<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
          <h3>提示：<span class="dialog-close" @click="closeMyself"></span></h3>
          <span class="ico">x</span>
          <slot>empty</slot>
          <!-- <p class="btn-close" @click="closeMyself">确定</p> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowDialog: false
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.dialog-cover {
  background: #000;
  opacity: .5;
  position: fixed;
  z-index: 666;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 1s ease;
}
.dialog-content {
  width: 360px;
  min-height: 180px;
  position: fixed; 
  overflow: auto; 
  font-size: 14px;
  top: 30%;
  left: 50%;
  margin-left: -180px;
  z-index: 999; 
  line-height: 1.6;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  box-sizing: border-box;
}
.dialog-content h3 {
  background: #e1e2ee;
  line-height: 35px;
  height: 35px;
  text-align: left;
  padding: 0 20px;
  color: #666;
  font-size: 16px;
}
.dialog-close {
  position: absolute;
    right: 15px;
    top: 12px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  /*background: url(./ico_close.png) no-repeat;*/
}
.dialog-close:hover {
  color: #4fc08d;
  opacity: .7;
  filter: alpha(opacity=70)
}
.dialog-content .btn-close {
  width: 120px;
  line-height: 32px;
  background: #dd0000;
  margin: 20px auto;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.dialog-content .btn-close:hover {
  background: red;
}
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
 

</style>
