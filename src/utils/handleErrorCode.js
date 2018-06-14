import { Message } from "element-ui";


let errCodeArr;
if (localStorage) {
	if (localStorage.getItem("errCode")) {
		errCodeArr = JSON.parse(localStorage.getItem("errCode"));
	} else {
		//用户手动清除localStorage
		import("../utils/errCode.json").then(data => {
			errCodeArr = data;
			//将数据重新存在localStorage里面
			localStorage.setItem("errCode", JSON.stringify(data));
		});
	}
} else {
	//不支持localStorage的时候，从utils/errCode.json文件里面取
	import("../utils/errCode.json").then(data => {
		errCodeArr = data;
	});
}

export default function handleErrorCode(res) {
	let code = res.data.msg;
	errCodeArr.forEach(item => {
		//特别的code提示，特别处理
		if (code === 2001) {
			Message({
				type: "error",
				showClose: true,
				message: "账号/密码错误,你还有" + res.data.times + "次机会"
			});
			return;
		}
		if (item.code === code) {
			Message({
				type: "error",
				showClose: true,
				message: item.msg
			});
		}
	});
}
