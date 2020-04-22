class Block {
	constructor(x, y, w, v, m) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.v = v;
		this.m = m;
	}

	drawBlock(c, color) {
		c.beginPath();
		c.fillStyle = `${color}`;
		c.fillRect(this.x, this.y, this.w, this.w);
	}

	hit(other) {
		return !(this.x + this.w < other.x || this.x > other.x + other.w);
	}

	bounce(other) {
		let sumM = this.m + other.m;
		let diffM = this.m - other.m;
		let newV = diffM / sumM * this.v + 2 * other.m / sumM * other.v;
		return newV;
	}

	hitWall() {
		return (this.x <= 0);
	}

	bounceWall() {
		this.v = -this.v;
	}

	move() {
		this.x += this.v;
	}
}
