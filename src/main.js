// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./model/store";
import Vuex from "vuex";
import Axios from "axios";
import "./config/element";
import VueSweetalert2 from "vue-sweetalert2";
import { getPublicImg } from "./utils";
import "babel-polyfill"; //解决ie浏览器不支持promise
import { Base64 } from "js-base64";
Vue.prototype.Base64 = Base64;
//导入全局注册的组件
import "./components/index.js";

if (process.env.NODE_ENV === "development") {
	// Axios.defaults.baseURL = "//apiweb.hgb168.com";
	// Axios.defaults.baseURL = "//agcai.lebole5.com";
	Axios.defaults.baseURL = "//www.leyingcdn.com";
	// Axios.defaults.baseURL = "//www.lebole5.com";
	// Axios.defaults.baseURL = "//wap.l5uc.com";
	// Axios.defaults.baseURL = "//yirenwap.lebole5.com";
	// Axios.defaults.baseURL = "//tt.lebole5.com";
	// Axios.defaults.baseURL = "//crowncai.lebole5.com";
	// Axios.defaults.baseURL = "//fulicai.lebole5.com";
	// Axios.defaults.baseURL = "//618cp.lebole5.com";
	// Axios.defaults.baseURL = "//yiteng.lebole5.com";
	// Axios.defaults.baseURL = "//618cp.lebole5.com";
	// Axios.defaults.baseURL = "//ylh.lebole5.com";
	// Axios.defaults.baseURL = "//yy.lebole5.com";
	// Axios.defaults.baseURL = "//letian.lebole5.com";
	Axios.defaults.baseURL = "//l5ran.lebole5.com";

}

//window.FlipClock = require('flipclock/compiled/flipclock')
Axios.defaults.toPC = typeof toPC == "number" && toPC == "1" ? 1 : 0;
if (Axios.defaults.toPC == 1) {
	Axios.defaults.ApiUsername = ApiUsername;
	Axios.defaults.ApiOid = ApiOid;
}

// axios请求拦截器，避免每次请求接口都带上oid参数
Axios.interceptors.request.use(
	function (config) {
		let params = JSON.parse(config.data || "{}");
		config.data = JSON.stringify({
			oid: sessionStorage.getItem("im_token"),
			...params
		});
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	response => {
		if (response.data.msg == "4001") {
			sessionStorage.removeItem("im_token");
		}
		return response;
	},
	error => {
		return Promise.resolve(error);
	}
);

Vue.prototype.$getPublicImg = path => {
	return getPublicImg(path);
};

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$window = window;
Vue.prototype.$getApiName = getApiName();
Vue.use(VueSweetalert2);
Vue.use(Vuex);

router.beforeEach((to, from, next) => {
	if (!to.query.promotionId) {
		if (
			sessionStorage.getItem("promotionId") &&
			(!sessionStorage.getItem("im_token") ||
				sessionStorage.getItem("im_realname") == "游客")
		) {
			next({
				path: to.path,
				query: {
					promotionId: sessionStorage.getItem("promotionId")
				}
			});
		} else {
			next();
		}
	} else {
		// 参数上面有推广链接,用户已经登陆
		if (sessionStorage.getItem("im_token")) {
			// 用户试玩
			if (sessionStorage.getItem("im_realname") == "游客") {
				next({
					path: to.path,
					query: {
						promotionId: to.query.promotionId
					}
				});
			} else {
				// 用户真实登陆
				next();
			}
		} else {
			// 用户未登录
			next();
		}
	}
});

new Vue({
	isLogin: false,
	el: "#app",
	router,
	store,
	template: "<App/>",
	components: { App }
});
