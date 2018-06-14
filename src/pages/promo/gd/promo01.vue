<template>
<div>
  <div class="noticesList clearfix">
    <div class="noticesImg">
      <img src="/static/images/gd/promo/promo01.jpg">
    </div>
    <div>
      <h4>真人荷官，连赢加奖！最高28888彩金等您拿</h4>
      <p>即日起在光大彩票玩真人视讯游戏即有连输/连赢大奖可以领取</p>      
      <button class="btn-promo" @click="showDeatil(1)" ref="btnPromo">查看详情</button>    
    </div> 
    <div class="promo-content" v-show='setShow'>
      <h3>活动详情</h3>
      <table>
        <tr>
          <th>连赢/连输局数</th>
          <th>可获彩金</th>
          <th>最低投注要求</th>
          <th>流水要求</th>
        </tr>
        <tr>
          <td>8局</td>
          <td>188</td>
          <td>100</td>
          <td>1倍</td>
        </tr>
        <tr>
          <td>10局</td>
          <td>588</td>
          <td>100</td>
          <td>1倍</td>
        </tr>
        <tr>
          <td>15局</td>
          <td>1888</td>
          <td>200</td>
          <td>1倍</td>
        </tr>
        <tr>
          <td>20局</td>
          <td>5888</td>
          <td>200</td>
          <td>1倍</td>
        </tr>
        <tr>
          <td>30局</td>
          <td>28888</td>
          <td>300</td>
          <td>1倍</td>
        </tr>
      </table>

      <p>注：请会员在达到上述标准后联系在线客服领取彩金。</p>
 

      <p>活动规则（本次活动仅适用于真人视讯游戏）：</p>
      <ul>
        <li>1、本次优惠活动即日起生效，优惠活动适用于光大彩票全体会员。</li>
        <li>2、每位会员只可拥有一个账号申请该项优惠，同IP、同提款银行卡均视为同一客户。如发现上述情况，重复领取彩金立即冻结该账号。</li>
        <li>3、所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁，滥用公司优惠等行为，公司保留冻结，取消该团体或个人账户结余的权利。</li>
        <li>4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，光大彩票有权要求会员向我们提供充足有效文件，以确认是否享有该优惠的资质。</li>
        <li>5、光大彩票保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利；适用于所有优惠活动。</li>
      </ul> 
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
      current: -1
    }
  },
  methods: {
    showDeatil (obj) {
      if (this.current === obj) {
        this.current = -1
      } else {
        this.current = obj
      }
    }
  }
}
</script> 
