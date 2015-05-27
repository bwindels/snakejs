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
			return (this.head.y - this.tail.y) + 1;
		}
		if(this.head.y === this.tail.y) {
			return (this.head.x - this.tail.x) + 1;
		}
		throw new Error('segment should be axis aligned');
	}

	this.shrink = function(n) {
		this.tail = this.tail.translate(this.axis().multiply(n));
	}
}

module.exports = Segment;