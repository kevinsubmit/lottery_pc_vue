<template>
  <div class="footer-notice">
    <div class="main clearfix">
      <div @click="more()" class="more">
        <i class="ico ico-my-news"></i>
        <div style='margin-left:10px;width:93%;'>
          <marquee onmouseover=stop() onmouseout=start() v-if="hasLoadData">
            <pre v-html="notice">
            </pre>
          </marquee>
        </div>
        <span style='cursor: pointer;' class="more-news">
          <i class="el-icon-d-arrow-right"></i>详情</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcementArr: [],
      notice: null,
      csUrl: "",
      getTitle: getTitle(),
      jian: false,
      isShowNotice: false,
      sj: 0,
      hasLoadData: false
    };
  },
  created() {
    this.getData();

    if (sessionStorage.getItem("serviceUrl")) {
      this.csUrl = sessionStorage.getItem("serviceUrl");
    } else {
      this.getServiceUrl();
    }
  },
  mounted() {},
  methods: {
    more() {
      this.$router.push({
        path: "/notice:promo"
      });
    },
    openService() {
      setTimeout(() => {
        window.open(this.csUrl, "", "width=600,height=510");
      }, 500);
    },
    getData() {
      this.$http
        .post("/user/getIndexContent")
        .then(res => {
          if (res.status === 200) {
            if (res.data.info === "success") {
              let announcements = res.data.announcements;
              let scrollAnnouncements = [];
              // 筛选出pop值为0的item
              announcements.forEach((item, index) => {
                if (item.isPop === "0") {
                  scrollAnnouncements.push(item.content);
                }
              });
              for (let i in scrollAnnouncements) {
                scrollAnnouncements[i] =
                  i * 1 + 1 + "." + scrollAnnouncements[i];
              }
              console.log(scrollAnnouncements);
              this.notice = scrollAnnouncements.join(
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              );
              this.hasLoadData = true;
              localStorage.setItem("notice", res.data.announcements[0].content);
              for (let i = 0; i < res.data.announcements.length; i++) {
                res.data.announcements[i].time = formatDate(
                  new Date(res.data.announcements[i].time * 1000),
                  "yyyy-MM-dd hh:mm"
                );
              }
            }
          }
        })
        .catch(function() {});
    },
    getServiceUrl() {
      this.$http.post("/user/getCustomerService").then(res => {
        this.csUrl = res.data.kefu;
        sessionStorage.setItem("serviceUrl", this.csUrl);
      });
    }
  }
};
</script>

<style scoped>
pre {
  font-family: sans-serif;
}
.scrollNews {
  background: white;
  overflow: hidden;
  display: inline-block;
}
.scrollNews > div > ul {
  transition: transform 0.5s;
}

.scroll-list {
  height: 25px;
}

.scrollNews > div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scrollNews ul > li {
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  max-width: 1000px;
}
.more {
  cursor: pointer;
  color: red;
  font-family: "Microsoft yahei";
  display: flex;
}
.more-news {
  color: #409eff;
}
.main {
  width: 1260px;
  background: #fff;
  margin: 0 auto;
  height: 25px !important;
}
.f-l {
  float: none;
}
.ico-my-news {
  width: 40px;
  height: 25px;
  float: left;
}
.footer-notice {
  opacity: 0.9;
  line-height: 25px;
  width: 100%;
  background: #fff;
  font-size: 12px;
  width: 100%;
  height: 25px;
  margin-top: -10px;
  color: #999;
  position: fixed;
  color: #999;
  bottom: 0px;
  z-index: 999;
  box-shadow: 0 0 5px #ccc;
}
.foot-nav a,
.foot-nav span {
  color: #999;
  cursor: pointer;
}
</style>
