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

}

module.exports = Segment;