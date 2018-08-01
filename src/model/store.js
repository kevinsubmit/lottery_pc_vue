import Vuex from "vuex";
function getImToken () {
	let imToken = sessionStorage.getItem("im_token") || '',
		matched = imToken.match(/\"/g);
	if (matched !== null && matched.length == 2) {
		return imToken.replace(/\"/g, '');
	}
	return imToken;
}
export default new Vuex.Store({
	state: {
		chatOpenStatus: false,
		availWinHeight: 0,
		lotteryMoney: "",
		token: getImToken(),
		confirmShow: false,
	},
	mutations: {
		openChatFunc (state, bool) {
			state.chatOpenStatus = bool;
		},
		setAvailWindowHeight (state, height) {
			state.availWinHeight = height;
		},
		updatelotteryMoney (state, money) {
			state.lotteryMoney = money;
		},
		setToken (state, token) {
			state.token = token;
		},
		setConfirmShow (state, bool) {
			state.confirmShow = bool;
		}
	}
});
