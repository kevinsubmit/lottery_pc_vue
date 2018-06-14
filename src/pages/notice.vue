<template>
  <div>
    <my-header></my-header>
    <div class="content promo-page">
      <div class="promoNav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="系统公告" name="promo" v-if="isSHowNotice">
            <div class="promo common-content">
              <div class="promoBox">
                <div class="promoList clearfix" v-for="item in promo">
                  <div class="promoImg">
                    NEWS
                  </div>
                  <div>
                    <h4>发布日期: {{ item.time }}</h4>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="优惠活动" name="notices">
            <promotion></promotion>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
import myHeader from "../components/hgHeader";
import Promotion from "./promo/index";
import { formatDate } from "../assets/js/date.js";
export default {
  methods: {},
  data() {
    return {
      isSHowNotice: true,
      title: "最新优惠",
      activeName: "promo",
      promo: {}
    };
  },
  components: {
    Promotion,
    myHeader
  },
  created() {
    this.activeName = this.$route.params.id.split(":")[1];
    this.getData();

    if (
      sessionStorage.getItem("im_username") !== "游客" &&
      !sessionStorage.getItem("im_token")
    ) {
      this.isSHowNotice = false;
      this.activeName = "notices";
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({
        path: `/notice:${tab.name}`
      });
    },
    getData() {
      this.$http
        .post("/user/getIndexContent")
        .then(res => {
          if (res.data.msg == 4001) {
            this.$router.push({
              path: "/home"
            });
          }
          if (res.data.info === "success") {
            this.promo = res.data.announcements;
            localStorage.setItem(
              "latestNotice",
              JSON.stringify(res.data.announcements[0].content)
            );
            for (let i = 0; i < res.data.announcements.length; i++) {
              res.data.announcements[i].time = formatDate(
                new Date(res.data.announcements[i].time * 1000),
                "yyyy-MM-dd hh:mm"
              );
            }
          }
        })
        .catch(function() {
          console.log("服务端连接异常！");
        });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../assets/less/variable.less";
.promoImg {
  background: url("@{public_img}/images/common/promo-defalut.jpg");
}
</style>

<style scoped>
.promo-page .page {
  padding: 30px 0 60px 0;
}
.promo-page .el-table th {
  text-align: center !important;
}
.promoBox {
  padding: 10px;
}
.el-tabs__nav-scroll {
  padding-left: 10px;
}

.promoList {
  padding: 15px 0;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.promoList h4 {
  font-size: 14px;
  color: #999;
}
.promoList p {
  line-height: 30px;
  font-size: 16px;
  color: #666;
  height: 120px;
  overflow-y: auto;
}
.promoImg {
  width: 200px;
  height: 120px;
  background-color: #e1e2ee;
  float: left;
  margin-right: 20px;
  color: #f3f3f6;
  font-size: 0;
  line-height: 120px;
  text-align: center;
  border-radius: 5px;
}
.promoNav {
  background-color: #fff;
  padding: 10px 20px;
  min-height: calc(100vh - 100px);
}
#tab-promo,
#tab-notices {
  font-size: 16px;
}
</style>
