<template>
  <div id="bigChat" ref="bigChat">
    <!-- <a @click="showBiggerChat">聊天室</a> -->
  </div>
</template>

<script>
export default {
  methods: {
    showBiggerChat() {
      if (document.getElementById('biggerChatObj') == null) {
        try {
          document.getElementById("chatButton").style.display = "block";
        } catch (error) {}
        
        try {
          // document.querySelector('.footer-notice').style.display = "none";
        } catch (error) {}

        try {
          document.getElementById("chatObject").outerHTML = "";
        } catch (error) {}
        
        if (
          sessionStorage.im_token != undefined &&
          sessionStorage.im_token != ""
        ) {
          var object;
              object = document.createElement('iframe');
              object.id = "biggerChatObj";
              object.style.height = '95.7%';
              object.style.width = '100%';
              object.style.position = 'absolute';
              object.style.overflow = 'hidden';
              object.style.top = '65px';
              object.style.bottom = '0';
              object.style.left = '0';
              object.style.right = '0';
              object.style.margin = '0 auto';
              object.setAttribute('src', "//www.chatroomtech.com/chat?data=" + sessionStorage.im_token + "-" + window.type + "-" + sessionStorage.im_username + '-' + window.location.origin);
              object.setAttribute('frameborder', 0);
              object.setAttribute('scrolling', 'no');
              document.getElementById('mainContainer').appendChild(object);
            }
      }
    }
  },
  mounted() {
    // window.onmessage = function(event) {
    //   switch (event.data) {
    //       case 'close':
    //           try {
    //             document.getElementById('biggerChatObj').outerHTML = "";
    //           } catch (error) {
    //             console.log(error);
    //           }
    //           break;
    //       case 'showMiniChat':
    //         document.getElementById('biggerChatObj').outerHTML = "";
    //         console.log(true);
    //         chat.load();
    //         break;
    //       default:
    //           break;
    //   }
    // };
    
    window.showBiggerChat = this.showBiggerChat;
  }
};
</script>

<style>
    #biggerChatObj {
      position: absolute;
      overflow: hidden;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: 0px auto;
      z-index: 1000;
      /* -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.12);
      -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.12);
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.12); */

      border-radius: 5px 5px 5px 5px;
      -moz-border-radius: 5px 5px 5px 5px;
      -webkit-border-radius: 5px 5px 5px 5px;
      border: 0px solid #000000;
    }

    @media screen and (max-height: 720px) {
       #biggerChatObj {
         height: 580px;
       }
    }
</style>