//滚动的项目个数listCounts，每一个项目的高度itemHeight,一次滚动多少个scrollNum,滚动延迟delay单位s

export default class scrollNews {
	constructor({ scrollDom, list, itemHeight, scrollNum = 1, delay = 3, scrolledIndex = 0, scrollDirec = "up", speed = 0.5 }) {
		this.list = list;
		this.itemHeight = itemHeight;
		this.scrollNum = scrollNum;
		this.delay = delay;
		this.scrolledIndex = scrolledIndex;
		this.scrollDirec = scrollDirec;
		this.timerInterval = null;
		this.scrollAccording = scrollDirec == "up" ? -scrolledIndex * itemHeight : scrolledIndex * itemHeight;
		this.scrollDom = scrollDom;
		this.initialIndex = scrolledIndex;
		this.initialScrollAccording = this.scrollAccording;
		this.initialTransition = this.scrollDom.style.transition;
		// this.scrollSpeed = parseFloat(window.getComputedStyle(this.scrollDom).transitionDuration || window.getComputedStyle(this.scrollDom).webkitTransitionDuration || speed) * 1000;

	}

	start() {
		this.timerInterval = setInterval(() => {
			if (this.scrollDirec == "up") {
				this.scrollAccording -= this.scrollNum * this.itemHeight;
			}
			if (this.scrollDirec == "down") {
				this.scrollAccording += this.scrollNum * this.itemHeight;
			}
			this.scrollDom.style.transform = "translate(0," + this.scrollAccording + "px)";
			setTimeout(() => {
				!this.shouldResetScroll() && (this.scrolledIndex += 1);
			}, this.scrollSpeed);
		}, this.delay * 1000);
	}

	shouldResetScroll() {
		if (this.scrolledIndex == (this.scrollDom.children.length / 2) - 1) {
			this.scrollDom.style.transition = "none";
			this.scrollDom.style.webkitTransition = "none";
			this.scrollAccording = this.initialScrollAccording;
			this.scrolledIndex = this.initialIndex;
			this.scrollDom.style.transform = "translate(0," + this.initialScrollAccording + "px)";
			this.scrollDom.style.webkitTransform = "translate(0," + this.initialScrollAccording + "px)";
			setTimeout(() => {
				this.restart();
			}, 100);
			return true;
		}
		return false;
	}

	stop() {
		clearInterval(this.timerInterval);
	}

	restart() {
		clearInterval(this.timerInterval);
		this.scrollDom.style.transition = this.initialTransition;
		this.scrollDom.style.webkitTransition = this.initialTransition;
		this.start();
	}
}
