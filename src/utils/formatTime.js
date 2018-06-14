export default function formatDate(dateParam){
	const time = new Date(dateParam);
	let year = time.getFullYear();
	let month = time.getMonth() + 1;
	let date = time.getDate();
	let hour = time.getHours();
	let minute = time.getMinutes();
	let seconds = time.getSeconds();

	month = (month.toString().length == 1 ? ("0" + month) : month);
	date = (date.toString().length == 1 ? ("0" + date) : date);
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds; 
}