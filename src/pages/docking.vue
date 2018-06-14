<template></template>
<script>
export default {
  data () {
      return {
        oid:ApiOid,
        showName:showName,
        gameNavs:{
          260: "/Games/race",                   
          270:"/Games/jslh",
          240:"/Games/jssc",
          250:"/Games/jsssc",
          210: "/Games/veniceRowing",
          46: "/Games/roma",
          51:"/Games/pk10",
          2:"/Games/cqssc",
          69:"/Games/markSix",                   
          160:"/Games/pcegg",
          171:"/Games/luckyAirship",
          3:"/Games/happyTen",
          47:"/Games/luckFarm",
          172: "/Games/jsks"
        },        
      }
  },
  created(){
    // this.$http.post("/user/getPersonalCenter",JSON.stringify({oid:this.oid})).then(res => {
    //     if(res.data.msg==4001){
    //       this.$swal({
    //         text: "请登录正式账号操作",
    //         type: "error",
    //         timer: 1200,
    //         confirmButtonText: "关闭"
    //       })
    //       .then(function (response) {
    //       }).catch(e => {
    //       })
    //     }else{
    //       sessionStorage.setItem('im_token', res.data.oid);
    //       this.$store.commit('updatelotteryMoney', res.data.balance);
    //       sessionStorage.setItem('im_username',this.showName);
    //       sessionStorage.setItem('im_realname',this.showName);
    //       sessionStorage.setItem('im_telphone',"");
    //       sessionStorage.setItem('agree', true);
    //       sessionStorage.setItem('im_onf', true);
    //       this.$router.push(this.gamesort);
    //     }
    // });
  },
  methods: {
    gamesort(){
      this.$http.post("/systems/game_sort").then(res => {
        if(res.data.msg==4003){
          this.$router.push({name:'maintain'});
        }else{
          let sort = res.data.sort[0]; 
            return this.gameNavs[sort[0]]       
        }          
      });
    }
  }

}
</script>

