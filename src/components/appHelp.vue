<template>
	<div>
		<div  class="jc">
			<div class="jsc">
				<span class="close" @click="$emit('update:code', 0)"></span>
				<img :src="imgSrc" height="725" width="1043" alt="" class="help-img">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// APP安装教程
	name: 'AppHelp',
	props: {
		code: [String, Number],// 1：IOS页面，2：Android页面
	},
	data() {
		return {
			getApiName: getApiName(),
		}
	},
	computed: {
		imgSrc() {
			if (this.code == 1) {
				return `/static/images/${ this.getApiName }/iosapp.png`
			} else {
				return `/static/images/${ this.getApiName }/adrid.png`
			}
		}
	}
}
</script>

<style scoped>
.close{
	position: absolute;
	top: 0;
	right: 0;
	width: 48px;
	height: 42px;
	cursor: pointer;
}
.jc{
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 20001;
}
.jsc{
	width:1054px;
	position: relative;
	margin: 0 auto;
}
@media screen and (max-width: 1400px) {
	.jsc{
		width: 914px;
	}
	.jsc img {
		width: 900px;
		height:600px!important;
	}
}
.help-img{
	margin-top: initial!important;
}
</style>
