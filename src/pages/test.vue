<template>
  <confirm show="true" title="投注明细" @confirm="requestBet">
    <div class="bet-confirm-list">
      <div>
        <ul>
          <li>
            <div>号码</div>
            <div>赔率</div>
            <div>金额</div>
            <div>确认</div>
          </li>
        </ul>
      </div>
      <div>
        <ul class="bet-number-list">
          <li v-for="(item,index) in betList">
            <div>
              {{item.name}}
            </div>
            <div>
              {{item.odd}}
            </div>
            <div>
              <input type="text" class="input-number" v-model="item.money" @change="handleMoneyChange" @keyup="handleMoneyChange" />
            </div>
            <div>
              <i class="el-icon-circle-close-outline" @click="deleteItem(index)"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="bet-summary">
        <div>
          组数:{{totalGroup}}
        </div>
        <div>
          总金额:{{totalMoney}}
          <span style="color:red">元</span>
        </div>
      </div>
    </div>
  </confirm>
</template>

<script>
let betList = [
  {
    name: '第一球',
    odd: '1.96',
    money: 100,
    key: 'ip_3002_3014'
  },
  {
    name: '第二球',
    odd: '1.96',
    money: 1001,
    key: 'ip_3002_3014'
  },
  {
    name: '第三球',
    odd: '1.96',
    money: 1002,
    key: 'ip_3002_3014'
  },
  {
    name: '第四球',
    odd: '1.96',
    money: 100,
    key: 'ip_3002_3014'
  },
  {
    name: '第五球',
    odd: '1.96',
    money: 1003,
    key: 'ip_3002_3014'
  }
]

let betData = {
  oid: '',
  game_code: '',
  type_code: '',
  round: '',
  token: '',
  betList
}

let inupParams = {
  oid: 'aa88c02a18376190d65d05b8a085acfd',
  ip_3002_3014: 10,
  ip_3002_3015: 10,
  ip_3002_3016: 10,
  ip_3007_3011: 10,
  ip_3007_3012: 10,
  ip_3007_3013: 10,
  ip_3007_3014: 10,
  game_code: 171,
  type_code: 0,
  round: '20180706041',
  token: '46ba539ddaa5e3084c5e12273a123fa5'
}

export default {
  data() {
    return {
      totalGroup: 0,
      totalMoney: 0,
      betData,
      betList: betData.betList,
      inupParamsObj: {}
    }
  },
  created() {
    this.caculateSummary(this.betList)
  },
  methods: {
    deleteItem(index) {
      this.betList.splice(index, 1)
    },
    handleMoneyChange(e) {
      console.log(e.target.value)
      console.log(this.betList)
    },
    caculateSummary(betList) {
      let totalMoney = 0
      // 总的投注组数
      this.totalGroup = betList.length
      betList.forEach(item => {
        totalMoney += parseInt(item.money) || 0
      })
      // 总的投注金额
      this.totalMoney = totalMoney
    },
    generateInupParams() {
      let { game_code, type_code, round, token } = this.betData
      let betList = {}
      this.betList.forEach(item => {
        betList[item.key] = item.money
      })
      this.inupParamsObj = { game_code, type_code, round, token, ...betList }
    },
    requestBet() {
      // 生成下注的参数
      this.generateInupParams()
      let inupParams = JSON.stringify(this.inupParamsObj)
      console.log(this.inupParamsObj)
      // this.$http.post('/inup', inupParams).then(res => {})
    }
  },
  watch: {
    betList: {
      handler: function(newVal, oldVal) {
        this.caculateSummary(newVal)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.bet-confirm-list {
  padding: 10px;
}

.bet-confirm-list li {
  display: flex;
  line-height: 30px;
}

.bet-confirm-list li > div:nth-child(1) {
  flex: 4;
  text-align: left;
}

.bet-confirm-list li > div:nth-child(2) {
  flex: 1;
}

.bet-confirm-list li > div:nth-child(3) {
  flex: 3;
}

.bet-confirm-list li > div:nth-child(4) {
  flex: 1;
}

.el-icon-circle-close-outline {
  font-size: 22px;
  color: #999;
  cursor: pointer;
}

.input-number {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding-left: 5px;
  width: 80px;
  text-align: center;
  line-height: 15px;
  height: 22px;
}

.bet-number-list {
  max-height: 280px;
  overflow: auto;
  padding: 10px 0;
  border-top: solid thin #ddd;
  border-bottom: solid thin #ddd;
}

.bet-number-list > li {
  border: none;
}

.bet-summary {
  display: flex;
  line-height: 30px;
}

.bet-summary > div {
  flex: 1;
  box-sizing: border-box;
}
</style>

