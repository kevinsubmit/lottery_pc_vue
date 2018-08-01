var username = "johnremart";
var websiteCode = "c2d916a9b35aea3dd70b401e66c8f728";
var oID = "d0f5bfea025dc0ad022fbab2e285e7d8";
var random = "5a59bfcf791e4";
var requestKey = "e4da3b7fbbce2345d7772b0674a318d5";
if (
	sessionStorage.getItem("im_username") &&
	sessionStorage.getItem("im_token")
) {
	username = sessionStorage.getItem("im_username");
	oID = sessionStorage.getItem("im_token");
}
if (getApiName()) {
	switch (getApiName()) {
		case "ct":
			websiteCode = "50516e074d428f45b482f31f7b0d23f7";
			break;
		case "klc":
			// websiteCode = '50516e074d428f45b482f31f7b0d23f7';
			break;
		case "yiren":
			// websiteCode = '50516e074d428f45b482f31f7b0d23f7';
			break;
		case "uc":
			websiteCode = "c265d8b50355960bf8b8d2748cb820bc";
			break;
		case "gd":
			websiteCode = "31a58a7e31f80a28aaee1c556e32984d";
			break;
		case "fh":
			websiteCode = "55a229ffe462432705fbc368a5522ee8";
			break;
		case "ly":
			websiteCode = "ffd7283fc377d3a594267e1886990a5e";
			break;
		case "ali":
			websiteCode = "45f46fa5a0371dc655d17e99fcfe5c68";
			break;
		case "618cp":
			websiteCode = "db5bc06fea53b0f352445c1c708defdf";
			break;
	}
}

// website code：
// AL = 45f46fa5a0371dc655d17e99fcfe5c68
// GD = 31a58a7e31f80a28aaee1c556e32984d
// FH = 55a229ffe462432705fbc368a5522ee8
// LY = ffd7283fc377d3a594267e1886990a5e
// UC = c265d8b50355960bf8b8d2748cb820bc
// CT = 50516e074d428f45b482f31f7b0d23f7

/* DO NOT MODIFY */
window.chat = (function() {
	var chatIP = "10.10.10.146";
	var chatUrl = "http://" + chatIP + "/";
	var doc = document;
	var head = doc.getElementsByTagName("head")[0];
	var b = doc.getElementsByTagName("body")[0];
	var imageUrl = chatUrl + "chatclientsmall/images/";
	var jsUrl = chatUrl + "chatclientsmall/js/";
	var cssUrl = chatUrl + "chatclientsmall/css/";
	return {
		load: function() {
			var obj = doc.createElement("object");
			obj.id = "chatObject";
			obj.type = "text/html";
			obj.data =
				chatUrl +
				"chatclientsmall/?website_code=" +
				websiteCode +
				"&username=" +
				username +
				"&o_id=" +
				oID +
				"&request_key=" +
				requestKey +
				"&random=" +
				random;
			b.appendChild(obj);
			var h2c = doc.createElement("script");
			h2c.type = "text/javascript";
			h2c.src = jsUrl + "html2canvas.min.js";
			head.appendChild(h2c);
			var cropper = doc.createElement("script");
			cropper.type = "text/javascript";
			cropper.src = jsUrl + "cropper.min.js";
			head.appendChild(cropper);
			var cropperStyle = doc.createElement("link");
			cropperStyle.rel = "stylesheet";
			cropperStyle.type = "text/css";
			cropperStyle.href = cssUrl + "cropper.min.css";
			head.appendChild(cropperStyle);
			var chatButton = doc.getElementById("chatButton");
			chatButton.style.display = "none";
			window.addEventListener("message", function(event) {
				console.log(event.data);
				objEvent = JSON.parse(event.data);
				switch (objEvent.action) {
					case "minimize-chat":
						$("#screenshotResult").remove();
						$("#displayCroppedWrapper").remove();
						$("#displayCropped").remove();
						$("#chatButton").css("display", "block");
						$("#chatObject").remove();
						break;
					case "take-screenshot":
						chat.screenshot();
						break;
				}
			});
		},
		init: function() {
			var styles = doc.createElement("style");
			var styesContent = "";
			styesContent +=
				"#chatButton {border: 0px solid #f00; width: 105px; height: 36px; position: fixed; bottom: 50px; right: 10px; z-index: 10000; background: url('" +
				imageUrl +
				"chat-button.png') no-repeat center center;}";
			styesContent +=
				"#chatObject {border: 0px solid #f00; position: fixed; top: 0px; right: 0px; width: 345px; height: 100%; z-index: 10000; }";
			styesContent +=
				"#screenshotResult {border: 0px solid #f00; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px; z-index: 10000;}";
			styesContent +=
				"#displayCroppedWrapper {border: 0px solid #f00; display: none; position: fixed; top: 0px; right: 0px; bottom: 0px; z-index: 10001; background: rgba(0, 0, 0, 0.5); overflow: hidden; }";
			styesContent +=
				"#displayCropped {border: 0px solid #f00; margin: auto; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: none; z-index: 10002; }";
			styles.setAttribute("type", "text/css");
			if (styles.styleSheet) {
				styles.styleSheet.cssText = styesContent;
			} else {
				styles.appendChild(doc.createTextNode(styesContent));
			}
			head.appendChild(styles);
			var chatButton = doc.createElement("a");
			chatButton.setAttribute("href", "javascript:;");
			chatButton.setAttribute("id", "chatButton");
			chatButton.setAttribute("onclick", "chat.load();");
			b.appendChild(chatButton);
		},
		screenshot: function() {
			$("#screenshotResult").remove();
			$("#displayCroppedWrapper").remove();
			$("#displayCropped").remove();
			$("body").css("cursor", "wait");
			var dsr = doc.createElement("div");
			dsr.id = "screenshotResult";
			b.appendChild(dsr);
			var ddcw = doc.createElement("div");
			ddcw.id = "displayCroppedWrapper";
			b.appendChild(ddcw);
			html2canvas(document.querySelector("html"), {
				width: $(window).width(),
				height: $(window).height(),
				foreignObjectRendering: !0
			}).then(canvas => {
				var dataURL = canvas.toDataURL("image/png");
				$("#screenshotResult").html('<img id = "image">');
				$("#screenshotResult #image").attr("src", dataURL);
				$("#screenshotResult #image").css("width", "100%");
				var imgX = (imgY = imgW = imgH = 0);
				var image = document.getElementById("image");
				var cropper = new Cropper(image, {
					crop: function(e) {
						imgX = e.detail.x;
						imgY = e.detail.y;
						imgW = e.detail.width;
						imgH = e.detail.height;
					},
					zoomable: !1,
					autoCrop: !1,
					viewMode: 1,
					cropend: function() {
						$("#screenshotResult").remove();
						$("body").css("cursor", "default");
						var requestContent = {};
						requestContent.action = "screenshot-result";
						requestContent.position_x = imgX;
						requestContent.position_y = imgY;
						requestContent.width = imgW;
						requestContent.height = imgH;
						requestContent.img = dataURL;
						requestContentJson = JSON.stringify(requestContent);
						document
							.getElementById("chatObject")
							.contentWindow.postMessage(requestContentJson, chatUrl);
					}
				});
			});
		}
	};
})();
chat.init();
