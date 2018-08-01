//按需注册全局组件
import Vue from "vue";
// ag真人视讯入口页面
Vue.component(
	"ag-game", () => {
		return import("../pages/ag");
	}
);
// 6686富豪平台的入口页面
Vue.component(
	"sd-ag-game", () => {
		return import("../pages/Platform/sd/ag");
	}
);

// 世界杯体育游戏入口
Vue.component(
	"sport-game", () => {
		return import("../pages/sportBetting");
	}
);

// 6686富豪平台的世界杯体育游戏入口
Vue.component(
	"sd-sport-game", () => {
		return import("../pages/Platform/sd/worldCup");
	}
);


// 捕鱼游戏入口页面
Vue.component(
	"fish-game", () => {
		return import("../pages/fish");
	}
);

// 6686富豪平台的捕鱼游戏入口页面
Vue.component(
	"sd-fish-game", () => {
		return import("../pages/Platform/sd/fish");
	}
);


// 弹出层
Vue.component(
	"mask-layer", () => {
		return import("../components/common/maskLayer.vue");
	}
);

// confirm组件
Vue.component(
	"confirm", () => {
		return import("../components/common/confirm.vue");
	}
);

// 数字输入框组件
Vue.component(
	"input-number", () => {
		return import("../components/common/inputNumber.vue");
	}
);
