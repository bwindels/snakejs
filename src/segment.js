var Point = require('./point.js');

function sign(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

function Segment(head, tail) {
	this.head = head;
	this.tail = tail;

	this.axis = function() {
		if(this.head.x === this.tail.x) {
			return new Point(0, sign(this.head.y - this.tail.y));
		}
		if(this.head.y === this.tail.y) {
			return new Point(sign(this.head.x - this.tail.x), 0);
		}
		throw new Error('segment should be axis aligned');
	}

	this.length = function() {
		if(this.head.x === this.tail.x) {
			return Math.abs(this.head.y - this.tail.y);
		}
		if(this.head.y === this.tail.y) {
			return Math.abs(this.head.x - this.tail.x);
		}
		throw new Error('segment should be axis aligned');
	}

	this.shrink = function() {
		this.tail = this.tail.translate(this.axis());
		return this.tail;
	}

	this.grow = function() {
		this.head = this.head.translate(this.axis());
		return this.head;
	}

	this.iteratePoints = function(callback) {
		var axis = this.axis();
		var length = this.length();
		var i = 1;

		while(i <= length) {
			callback(this.tail.translate(axis.multiply(i)));
			++i;
		}
	}

	this.containsPoint = function(point) {
		var min, max, value;
		if(this.head.x === this.tail.x && this.head.x === point.x) {
			min = Math.min(this.head.y, this.tail.y);
			max = Math.max(this.head.y, this.tail.y);
			value = point.y;
		}
		else if(this.head.y === this.tail.y && this.head.y === point.y) {
			min = Math.min(this.head.x, this.tail.x);
			max = Math.max(this.head.x, this.tail.x);
			value = point.x;
		}
		else {
			return false;
		}
		return value > min && value <= max;
	}

}

module.exports = Segment;