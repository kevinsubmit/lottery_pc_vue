<template>
  <div id="changlong">
    <div class="game_title">
      <h3>{{ title }}</h3>
    </div>
    <table>
      <tr v-for="item in changlongObj">
        <td>{{ item.title }}</td>
        <td>已出{{ item.num }}期</td>
      </tr>
      <tr v-if="noData">
        <td colspan="2" class="nodata">
          暂无数据
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  data () {
    return {
      getApiName: getApiName(),
      title: '两面长龙',
      noData: false,
      isDemo: false,
      isShowPromo: true,
      changlongObj: []
    }
  },
  props: {
    game_code: {
      type: Number
    }
  },
  created () {
    this.getChangLongData ();
    if(sessionStorage.getItem('im_username') === '游客'){
      this.isDemo = true
    }
  },
  methods: {
    getChangLongData () {
      let params = {};
      params.game_code = this.game_code;
      this.$http.post('/systems/changlong', JSON.stringify(params)).then(res => {
        let changLongData  = res.data.data
        /* 对接口返回的数据进行处理 */
        changLongData.forEach(item=>{
          item.title = item.title.replace('总和单双-','').replace('总和尾数大小-','').replace('总和大小-','')
        })
        if ((res.data.data) instanceof Array) {
          this.changlongObj = res.data.data;
        } else {
          this.noData = true;
        }
      });
    },
    closePromo () {
      this.isShowPromo = false
    }
  }
}
</script>

<style scoped>

  #changlong {
    width: 155px;
    height: 100%;
    background-color: #fff;
    position: absolute;
    right: -160px;
    top: 0;
    /*overflow-x: visible;
    overflow-y: auto;*/
    /*min-height: 500px;*/
  }
  #changlong h3 {
    color: #3e80d4;
  }
  #changlong table {
    width: 100%;
    margin-top: 10px;
  }
  #changlong td {
    height: 30px;
    line-height: 30px;    
    font-size: 12px;
  }
  #changlong td:first-child {
    padding-left: 10px; 
    text-align: left;
  }
  #changlong td:last-child {
    padding-right: 10px;
    text-align: right;     
  }
  #changlong .nodata {
    text-align: center!important;
  }
  .promotions {    
    position: absolute;
    right: -9px;
    top: 30%;
  }
  .promotions img {
    box-shadow: 0 0 20px #9c9191;
  }
  .promotions i {
    font-size: 22px;
    float: right;
    margin: 0 -14px 3px 0;
    cursor: pointer;
  }
  @media screen and (min-width: 1370px) {
    .promotions {     
      right: -210px; 
    }
    .promotions i { 
      margin: -20px -14px 3px 0; 
    }
  }
</style>
