var paramsObj = {};
var splittedArray = location.href.split("?");
var paramsArray =
	splittedArray.length == 2
		? location.href.split("?")[1].split("&")
		: splittedArray.length == 3
			? location.href.split("?")[2].split("&")
			: [];
for (var i = 0; i < paramsArray.length; i++) {
	// 查找第一个索引的index
	var equalIndex = paramsArray[i].search("=");
	var strLen = paramsArray[i].length;

	var key = paramsArray[i].substr(0, equalIndex);
	var val = paramsArray[i].substr(equalIndex + 1, strLen);
	paramsObj[key] = val;
}

export default paramsObj;

