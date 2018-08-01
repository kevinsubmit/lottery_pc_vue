<template>
  <confirm title="投注明细" @confirm="requestBet">
    <div class="bet-confirm-list">
      <div>
        <ul>
          <li>
            <div>号码</div>
            <div>赔率</div>
            <div>金额</div>
          </li>
        </ul>
      </div>
      <div>
        <ul class="bet-number-list">
          <li v-for="(item,index) in shitBetData">
            <div>
              {{`${item.title} ${item.number}`}}
            </div>
            <div>
              {{item.odds}}
            </div>
            <div>
              <input type="text" class="input-number" v-model="item.money" @change="handleMoneyChange" @keyup="handleMoneyChange" />
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
import { cacheGame } from '../../utils'
export default {
  data() {
    return {
      totalGroup: 0,
      totalMoney: 0,
      betList: [...(this.betData && this.betData.betList)],
      inupParamsObj: {},
      shitBetData: []
    }
  },
  props: ['betData'],
  created() {
    this.generateShitBetData()
    this.caculateSummary(this.shitBetData)
  },
  methods: {
    generateShitBetData() {
      let betNumberList = [],
        zhixuanNumber = [],
        numberStr
      if (this.betList[0].title.search('直选') != -1) {
        this.betList.forEach(item => {
          let index = item.key.split('_')[2] - 1
          if (!betNumberList[index]) {
            betNumberList[index] = [item]
          } else {
            betNumberList[index].push(item)
          }
        })
        console.log(betNumberList)
        betNumberList.forEach((item, index) => {
          zhixuanNumber[index] = _.map(item, 'name')
        })
        /* 号码 */
        numberStr = zhixuanNumber.join('|')
        /* 组数 */
        let totalGroup = 1
        zhixuanNumber.forEach(item => {
          totalGroup *= item.length
        })
        this.totalGroup = totalGroup
        // this.totalMoney
        console.log(this.shitBetData)
      } else {
        this.betList.forEach(item => {
          betNumberList.push(item.name)
        })
        numberStr = betNumberList.join(',')
      }

      let shitBetData = {
        title: this.betList[0] && this.betList[0].title,
        number: numberStr,
        odds: this.betList[0] && this.betList[0].odds,
        money: this.betList[0] && this.betList[0].money
      }
      this.shitBetData = [shitBetData]
    },
    deleteItem(index) {
      this.betList.splice(index, 1)
    },
    handleMoneyChange(e) {
      this.caculateSummary(this.shitBetData)
    },
    caculateSummary(betList) {
      let totalMoney = 0
      betList.forEach(item => {
        totalMoney += parseInt(item.money) || 0
      })
      /* 直选 */
      if (this.betList[0].title.search('直选') != -1) {
        this.totalMoney = totalMoney * this.totalGroup
        return
      } else {
        // 总的投注组数
        this.totalGroup = betList.length
        // 总的投注金额
        this.totalMoney = totalMoney
      }
    },
    getBalance() {
      let params = {}
      this.$http.post('/getinfo/money', JSON.stringify(params)).then(res => {
        if (res.data.msg == '4001') {
          this.$router.push({
            path: '/home'
          })
        }
        this.todayWinLost = res.data.user_win_lose
        this.$store.commit('updatelotteryMoney', res.data.money)
        sessionStorage.setItem(
          'todayWinLost',
          JSON.stringify(this.todayWinLost)
        )
      })
    },
    generateInupParams() {
      let typeCodeArr = this.betList.length && this.betList[0].key.split('_')
      let type_code = `${typeCodeArr[1]}`,
        betList = {}
      let { game_code, round } = this.betData
      let token =
        localStorage.getItem('inuptoken') &&
        JSON.parse(localStorage.getItem('inuptoken'))
      this.betList.forEach(item => {
        betList[item.key] = this.shitBetData[0].money
      })
      this.inupParamsObj = { game_code, type_code, round, token, ...betList }
    },
    requestBet() {
      // 生成下注的参数
      this.generateInupParams()
      let inupParams = JSON.stringify(this.inupParamsObj)
      this.$http.post('/inup', inupParams).then(res => {
        if (res.data.length) {
          cacheGame('inuptoken', res.data[0].token)
          this.$swal({
            text: '下注成功！',
            type: 'success',
            timer: 1200
          })
          this.getBalance()
        }
        if (res.data.msg === 5002) {
          this.$swal({
            text: '游戏已封盘',
            type: 'error',
            timer: 1200
          })
        }
        if (res.data.msg === 5001) {
          this.$swal({
            text: '下注项为空，金额不正确，请重新输入',
            type: 'error',
            timer: 1200
          })
        }
      })
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

