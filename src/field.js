var Point = require('./point.js');
var Segment = require('./segment.js');

function Field(width, height) {
	this.width = width;
	this.height = height;
}

Field.prototype = {
	draw: function(callback) {
		var i;
		for(i = 0; i < this.width; ++i) {
			callback(new Point(i, 0));
			callback(new Point(i, this.height - 1));
		}
		for(i = 1; i < (this.height - 2); ++i) {
			callback(new Point(0, i));
			callback(new Point(this.width - 1, i));
		}
	},
	isPointWall: function(point) {
		return point.x === 0 || point.y === 0 || point.x === this.width - 1 || point.y === this.height - 1;
	},
	initialSnakeSegment: function() {
		var len = 4;
		var x = Math.floor((this.width / 2) - (len / 2));
		var y = Math.floor(this.height / 2);
		var head = new Point(x,y);
		var tail = head.translate(new Point(0, len));
		return new Segment(head,tail);
	},
	randomPoint: function() {
		var x = Math.floor(Math.random() * (this.width - 2)) + 1;
		var y = Math.floor(Math.random() * (this.height - 2)) + 1;
		return new Point(x,y);
	}
	
}