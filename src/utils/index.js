import config from "@/config";
import store2 from "store2";
// 替换公共的图片路径
const getPublicImg = (path) => {
	return `${config.publicImg}${path}`;
};

const cacheGame = (key,value) => {
	return value ? store2.set(key, value):store2.get(key);
};

export {getPublicImg, cacheGame};
