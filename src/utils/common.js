/**
 * 切换玩法的选中状态
 * @param event 事件
 * @param presetMoney 预设金额
 */
export function togglePlayActive(event, presetMoney) {
	let inputEl = event.target.querySelector('input') || event.target.parentNode.querySelector('input')
	if (event.currentTarget.classList.contains('active-color')) {
		event.currentTarget.classList.remove('active-color')// 去掉颜色
		inputEl.value = ''// 清空值
	} else {
		event.currentTarget.classList.add('active-color')// 加上颜色
		inputEl.value = presetMoney || ''// 填上预设值
	}
}

/**
 * 将所有玩法恢复成初始状态
 */
export function clearAllActives () {
	Array.prototype.forEach.call(document.querySelectorAll('.active-color'), el => el.classList.remove('active-color'));// 清除选中的颜色

	let checkedEl = document.getElementsByClassName('bet-area')[0].querySelectorAll('input:checked')
	if (checkedEl.length) Array.prototype.forEach.call(checkedEl, el => el.checked = false);// 清除勾选框

	let textEl = document.getElementsByClassName('bet-area')[0].querySelectorAll('input[type="text"]')
	if (textEl.length) Array.prototype.forEach.call(textEl, el => el.value = '');// 清除输入框的值
}
