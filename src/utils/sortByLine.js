export default function sortByLine (array, lineNum) {
	let len = array.length;
	let result = [];
	for (var j = 0; j < lineNum - 1; j++) {
		for (var i = 0; i < len; i++) {
			let x = ((i + j) % (lineNum - 1));
			if (!x) {
				result.push(array[i]);
			}
		}
	}
	return result;
}
