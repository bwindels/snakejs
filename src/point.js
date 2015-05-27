function Point(x, y) {
	this.x = x;
	this.y = y;

	this.translate = function(p) {
		return new Point(this.x + p.x, this.y + p.y);
	}

	this.multiply = function(n) {
		return new Point(this.x * n, this.y * n);
	}
}

module.exports = Point;