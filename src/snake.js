var Point = require('./point.js');
var Segment = require('./segment.js');

var upAxis = new Point(0, 1);
var leftAxis = new Point(1, 0);
var downAxis = new Point(0, -1);
var rightAxis = new Point(-1, 0);

function Snake(head, tail, drawFunction) {
	this.segments = [new Segment(head, tail)];
	this.drawFunction = drawFunction;
	this.growAmount = 0;
}

Snake.prototype = {
	turnLeft: function() {
		var currentAxis = this._headSegment().axis();
		var newAxis;
		if(currentAxis.equals(leftAxis)) {
			newAxis = upAxis;
		}
		else if(currentAxis.equals(upAxis)) {
			newAxis = rightAxis;
		}
		else if(currentAxis.equals(rightAxis)) {
			newAxis = downAxis;
		}
		else if(currentAxis.equals(downAxis)) {
			newAxis = leftAxis;
		}
		else {
			throw new Error('invalid axis: '+currentAxis.toString());
		}
		this._turn(newAxis);
	},

	turnRight: function() {
		var currentAxis = this._headSegment().axis();
		var newAxis;
		if(currentAxis.equals(leftAxis)) {
			newAxis = downAxis;
		}
		else if(currentAxis.equals(upAxis)) {
			newAxis = leftAxis;
		}
		else if(currentAxis.equals(rightAxis)) {
			newAxis = upAxis;
		}
		else if(currentAxis.equals(downAxis)) {
			newAxis = rightAxis;
		}
		else {
			throw new Error('invalid axis: '+currentAxis.toString());
		}
		this._turn(newAxis);
	},

	_turn: function(newAxis) {
		var tailPoint = this.head();
		var headPoint = tailPoint.translate(newAxis);
		var head = new Segment(headPoint, tailPoint);
		
		this._shrinkTail();
		
		this.segments.push(head);
		head.iteratePoints(this.drawFunction.bind(this, true));
	},

	moveForward: function(n) {
		var p = this._headSegment().grow();
		this._shrinkTail();
		this.drawFunction(true, p);
	},

	drawInitial: function() {
		var callback = this.drawFunction.bind(this, true);
		this.segments.forEach(function(segment) {
			segment.iteratePoints(callback);
		});
	},

	length: function() {
		return this.segments.reduce(function(total, segment) {
			return total + segment.length();
		}, 0);
	},

	grow: function(amount) {
		this.growAmount += amount;
	},

	headCollidesWithBody: function() {
		var head = this.head();
		var allSegmentsButHead = this.segments.slice(0, this.segments.length - 2);
		return allSegmentsButHead.some(function(segment) {
			return segment.containsPoint(head);
		});
	},

	head: function() {
		return this._headSegment().head;
	},
	
	_headSegment: function() {
		return this.segments[this.segments.length - 1];
	},


	_shrinkTail: function() {
		if(this.growAmount > 0) {
			--this.growAmount;
			return;
		}
		var tailSegment = this.segments[0];
		
		var p = tailSegment.shrink();
		this.drawFunction(false, p);

		if(tailSegment.length() === 0) {
			this.segments.splice(0, 1);
		}
	}
}

module.exports = Snake;