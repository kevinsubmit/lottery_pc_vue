<template>
    <!-- 右边栏 -->
    <div class='sider-right'>
        <!-- 彩票中心 -->
        <div class="cp_center clearfix">
            <div class="user-info clearfix">
                 <p class="username">admin123</p>
                 <div class="money">
                     可提金额
                    <span class="balance">￥23232.23</span>
                 </div>
                 <div class="btn-money">
                    <a href="#">充值</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="#">提现</a>
                 </div>
            </div>

            <div class="right-nav clearfix">
                <div class="moneyTranfer"><router-link to="/rules">额度转换</router-link></div>
                <div class="gameRule"><router-link to="/rules">游戏规则</router-link></div>
                <div class="record"><router-link to="/record">转账记录</router-link></div>
                <div class="personInfo"><router-link to="/settled">下注记录</router-link></div>
                <div class="report"><router-link to="/report">在线客服</router-link></div>
                <div class="report"><router-link to="/report">快捷选择</router-link></div>
                <!-- <div class="wait"><router-link to="/unsettled">未结明细</router-link></div>
                <div class="finished"><router-link to="/settled">今日已结</router-link></div> -->
                <!-- <div class="report"><router-link to="/report">报表查询</router-link></div> -->
                <!-- <div class="result active"><router-link to="/result">开奖结果</router-link></div> -->
            </div>
        </div>
        <!-- 两面长龙 -->
        <div class="cp_center clearfix">
            <div class="title clearfix">
                <h5>两面长龙</h5>
                <span></span>
            </div>
            <ul class="long">
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>
                <li class="clearfix">
                    <span>亚军-龙</span>
                    <span>已出6期</span>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.sider-right{
}
.right-nav {
    margin-top: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.sider-right .cp_center {
}
.sider-right h5 {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #666;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    text-align: left;
    text-indent: 10px;
}
.user-info .username,
.user-info .btn-money {
    height: 40px;
    line-height: 40px;
    text-align: left;
    background-color: #4d4763;
    padding: 0 15px;
}
.user-info .username {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 16px;
    color: #f0f0f0;
}
.user-info .btn-money{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.user-info .money {
    background-color: #3e3850;
    text-align: left;
    padding: 3px 15px 0 15px;
    color: #a4a4be;
}
 .user-info .balance {
    font-size: 26px;
    display: block;
    color: #fff;
 }
.btn-money a {
    color: #a4a4be;
    font-size: 14px;
}
.right-nav div:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.right-nav div {
    height: 40px;
    line-height: 40px;
    background: #444;
    text-align: left;
}


.right-nav div {
    border-bottom: 1px solid #ddd;
    padding: 3px 9px;
    background-color: #fff;
}
.right-nav div a {
    color: #666;
    font-size: 14px;
    text-decoration: none;
}




.long{
    background: #f7f7f7;
    padding: 5px 12px ;
}
.long  li{
    line-height: 28px;
    font-size: 12px;
    color: #999;
}
.long  li span:nth-child(1){
    float: left;
}
.long  li span:nth-child(2){
    float: right;
}
</style>
