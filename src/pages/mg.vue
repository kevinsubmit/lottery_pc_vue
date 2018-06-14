<template>
    <div>
        <hg-Header  :showLoginListen="showLoginListen"></hg-Header>
        <div class="tu">
            <el-carousel trigger="click" height="400px!important">
                <el-carousel-item v-for="(item, index) in slider" :key="index">
                    <img :src="item.icoSrc" @click="(getApiName == 'sd'&&index==1)?$router.push('/notice:notices'):''">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="tabs">
            <div class="tab" style="margin-left:10px;text-align:left;" :class="{active:$index==active}" v-for="(item,$index) in tabs" @click="toggleTab(item.tab,$index)">
                <a style="color:#666;font-family:'SimHei';font-size:14px;font-weight:bold">{{item.name}}</a>
            </div>
        </div>
        <game :is="currentTab" keep-alive></game>
    </div>
</template>
<script>
import hgHeader from '@/components/hgHeader'
import game from './game'
import machine from './machine'
import puke from './puke'
import tabgame from './tabgame'
export default {
    data(){
        return {
            showLoginListen: false,
            slider:[ 
                {icoSrc: require(`../../static/images/common/banner1.png`)},
                {icoSrc: require(`../../static/images/common/banner2.png`)},
                {icoSrc: require(`../../static/images/common/banner3.png`)}
            ],
            tabs:[
                {name:'全部游戏',tab:'game'},
                {name:'精选游戏',tab:'puke'},
                {name:'视频老虎机',tab:'machine'},
                {name:'经典老虎机',tab:'tabgame'}
            ],
            currentTab:'game',    //currentTab用于表示当前触发的子组件
            active:0,
        }
    },
    components: {
        hgHeader,
        game,
        machine,
        puke,
        tabgame
    },
    methods:{
        toggleTab:function(tab,index){
            this.currentTab = tab;   //tab为触发当前标签页的组件名
            this.active=index
        },
    },
    created(){
        
    }
}
</script>
<style>
    body{
        background:#fff;
    }
    .tu{
        width:100%;
        height:400px;
        position:relative;
        top:60px;
    }
    .f-1{
        margin-top:2rem;
    }
    .tabs{
        height:80px;
        position: relative;
        top:70px;
        width:1300px;
        margin:0 auto;
    }
    .tab a{
        font-size:16px;
        color:#000;
        background: none;
    }
    .tabs div{
        width: 8%;
    }
    .tabs div:nth-child(2){
        width:9%;
    }
    .table{
        float:left;
    }
    .table{
        float:left;
    }
    .tabs div.active{
        border-bottom:none;
    }
    .tabs div.active a{
        border-bottom:2px solid blue;
    }
    .el-carousel__container{
        height:400px !important;
    }
</style>


