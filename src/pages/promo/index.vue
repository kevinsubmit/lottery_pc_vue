<template>
<div>
  <div class="notice">
    <div class="noticesBox">
      <div class="noticesList clearfix" v-for="(item,index) in all"> 
    <div class="noticesImg">
      <img :src="item.pc_titleImg">
    </div>
    <div>
      <h4>{{item.title}}</h4>
      <p>{{item.intro}}</p>  
      <button v-if="!item.pc_bgimg&&!item.description" class="btn-promo btn-promo-closed">暂无详情</button> 
      <button v-else-if="item.route_path != ''" class="btn-promo" @click="showDeatils(item.route_path)" ref="btnPromo">查看详情</button>   
      <button v-else class="btn-promo" @click="showDeatil(index)" ref="btnPromo">查看详情</button>
    </div>
    <!-- pushHTML代码页面 -->
    <div :class="`hj hj_${index}`" v-if="item.ptype == 2" class="promo-content" v-html="item.description" ></div>
    <div :class="`hj hj_${index}`" v-if="item.ptype == 0" class="promo-content">
      <img :src="item.pc_bgimg" alt="" width="100%">
    </div>     
  </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  computed: {
    setShow () {
      return this.current === 1 ? true : false
    }
  },
  data() {
    return {
      getApiName: getApiName(),
      current: -1,
      title:"",
      all:"",
      isShowUc: false,
    }
  },
  methods: {
    showDeatil (id) {
      let dom = document.getElementsByClassName('hj_'+id)[0];
      let doms = document.getElementsByClassName('hj');
      for (let i = 0; i < doms.length; i++) {
        if (doms[i] != dom) {
          doms[i].style.display="none";
        }
      }
      if (dom.style.display!="block") {
        dom.style.display="block"
      }else{
        dom.style.display="none"
      }
    },
    showDeatils (path) {
      this.$router.push({
        path:path
      })
    }
  },
  created(){
    let params = {};
    params.client = 1;
    this.$http.post('/Promotion/getPromotionList',JSON.stringify(params)).then(res => {
      this.all = res.data;
    });
  }
}
</script> 
<style>
  .btn-promo{
    padding: 8px 23px;
    background-color: #1c4fa8;
    border-color: #1c4fa8;
    width: 120px;
    color: #fff;
    border-radius: 30px;
    box-shadow: 2px 2px 5px #ccc;
    float: right;
    outline: none;
    cursor: pointer;
  }
  .hj {
    display: none;
  }
  .btn-promo-closed {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
</style>