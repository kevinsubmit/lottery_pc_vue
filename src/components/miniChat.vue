<template>
  <div id="miniChat" ref="miniChat">
    <!-- <a id="chatButton" href="javascript:;" onclick="chat.load();"></a> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatIP: "www.chatroomtech.com", // live
      // chatIP: '103.99.62.238', // test
      // chatIP: '10.10.10.90',
      linkInfo: {
        al: {
          name: "al",
          webcode: "45f46fa5a0371dc655d17e99fcfe5c68",
          url: "https://www.alcp66.com"
        },
        gd: {
          name: "gd",
          webcode: "31a58a7e31f80a28aaee1c556e32984d",
          url: "https://www.gdcp188.com"
        },
        fh: {
          name: "fh",
          webcode: "55a229ffe462432705fbc368a5522ee8",
          url: "https://www.97bei.com"
        },
        ly: {
          name: "ly",
          webcode: "ffd7283fc377d3a594267e1886990a5e",
          url: "https://www.le079.com"
        },
        uc: {
          name: "uc",
          webcode: "c265d8b50355960bf8b8d2748cb820bc",
          url: "https://www.uc22.com"
        },
        ct: {
          name: "ct",
          webcode: "50516e074d428f45b482f31f7b0d23f7",
          url: "https://www.caitou999.com"
        },
        "618cp": {
          name: "618cp",
          webcode: "db5bc06fea53b0f352445c1c708defdf",
          url: "https://618cpcp.com/"
        }
      }
    };
  },
  methods: {
    initiateMiniChat() {
      let md5 = require("md5");
      let _this = this;
      this.chatJsUrl = location.protocol + `//${this.chatIP}/chat-client/js/`;

      var loadChat = () => {
        if (sessionStorage.getItem("im_username") != undefined) {
          // Clear Current Session
          sessionStorage.removeItem("636861745f757365726e616d65"); // chat_username
          sessionStorage.removeItem("636861745f77656273697465436f6465"); // chat_websiteCode
          sessionStorage.removeItem("636861745f6f4944"); // chat_oID
          sessionStorage.removeItem("636861745f72616e646f6d"); // chat_random
          sessionStorage.removeItem("636861745f726571756573744b6579"); // chat_requestKey

          // Set New Session
          sessionStorage["636861745f757365726e616d65"] =
            sessionStorage.getItem("im_username") != "游客"
              ? sessionStorage.getItem("im_username")
              : "demo" + this.generateSerial(20);
          sessionStorage["636861745f77656273697465436f6465"] = this.linkInfo[
            window.type
          ].webcode;
          sessionStorage["636861745f6f4944"] = sessionStorage.getItem(
            "im_token"
          );
          sessionStorage["636861745f72616e646f6d"] = this.generateSerial(13);
          sessionStorage["636861745f726571756573744b6579"] = md5(
            sessionStorage["636861745f757365726e616d65"].substr(1, 5) +
              sessionStorage["636861745f72616e646f6d"].substr(0, 3) +
              sessionStorage["636861745f77656273697465436f6465"].substr(8, 30) +
              sessionStorage["636861745f72616e646f6d"].substr(4) +
              sessionStorage["636861745f72616e646f6d"].substr(-1) +
              sessionStorage["636861745f6f4944"].substr(12, 18)
          );

          var clientChatMain = document.createElement("script");
          clientChatMain.type = "text/javascript";
          clientChatMain.src = this.chatJsUrl + "client.chat.main.js";
          clientChatMain.onload = function() {
            _this.$store.commit("openChatFunc", true);
          };
          this.$refs.miniChat.appendChild(clientChatMain);
        }
      };

      var jquery = document.createElement("script");
      jquery.type = "text/javascript";
      jquery.src = this.chatJsUrl + "jquery-3.2.1.min.js";
      jquery.addEventListener("load", loadChat, false);

      // 加载资源出错时,也需要显示侧边菜单
      jquery.addEventListener("error", function(){
        _this.$store.commit("openChatFunc", true);
      }, false);
      
      this.$refs.miniChat.appendChild(jquery);
    },
    generateSerial(length) {
      var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = length;
      var randomstring = "";

      for (var x = 0; x < string_length; x++) {
        var letterOrNumber = Math.floor(Math.random() * 2);
        if (letterOrNumber == 0) {
          var newNum = Math.floor(Math.random() * 9);
          randomstring += newNum;
        } else {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum, rnum + 1);
        }
      }

      return randomstring;
    }
  },
  created() {},
  mounted() {
    this.initiateMiniChat();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// @import '../assets/less/variable.less';
</style>
