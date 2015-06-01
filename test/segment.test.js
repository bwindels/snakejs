var Point = require('../src/point.js');
var Segment = require('../src/segment.js');

function collectPoints(segment) {
	var points = [];
	segment.iteratePoints(function(p) {
		points.push({x: p.x, y: p.y});
	});
	return points;
}

module.exports = {
	'test shrink': function(test) {
		var s = new Segment(new Point(1,4), new Point(1,0));
		test.strictEqual(s.length(), 4);
		
		var clearedCell = s.shrink();
		test.strictEqual(clearedCell.x, 1);
		test.strictEqual(clearedCell.y, 1);

		test.strictEqual(s.length(), 3);
		test.deepEqual(collectPoints(s), [
			{x: 1, y: 2},
			{x: 1, y: 3},
			{x: 1, y: 4}
		]);
		test.done();
	},

	'test grow': function(test) {
		var s = new Segment(new Point(1,4), new Point(1,2));
		test.strictEqual(s.length(), 2);

		var filledCell = s.grow();
		test.strictEqual(filledCell.x, 1);
		test.strictEqual(filledCell.y, 5);

		test.strictEqual(s.length(), 3);
		test.deepEqual(collectPoints(s), [
			{x: 1, y: 3},
			{x: 1, y: 4},
			{x: 1, y: 5}
		]);
		test.done();
	},

	'test axis': function(test) {
		var s, axis;
		
		s = new Segment(new Point(1,4), new Point(1,0));
		axis = s.axis();
		test.strictEqual(axis.x, 0);
		test.strictEqual(axis.y, 1);

		s = new Segment(new Point(1,4), new Point(1,5));
		axis = s.axis();
		test.strictEqual(axis.x, 0);
		test.strictEqual(axis.y, -1);
		
		s = new Segment(new Point(100,5), new Point(7,5));
		axis = s.axis();
		test.strictEqual(axis.x, 1);
		test.strictEqual(axis.y, 0);
		
		s = new Segment(new Point(-100,5), new Point(9,5));
		axis = s.axis();
		test.strictEqual(axis.x, -1);
		test.strictEqual(axis.y, 0);

		s = new Segment(new Point(0,0), new Point(1,1));
		test.throws(function() {
			s.axis();
		})

		test.done();
	},

	'test iteratePoints with tail smaller than head': function(test) {
		var points = [];
		var s = new Segment(new Point(1,4), new Point(1,0));
		test.deepEqual(collectPoints(s), [
			{x: 1, y: 1},
			{x: 1, y: 2},
			{x: 1, y: 3},
			{x: 1, y: 4}
		]);
		test.done();
	},

	'test iteratePoints with tail bigger than head': function(test) {
		var points = [];
		var s = new Segment(new Point(1,4), new Point(1,8));
		test.deepEqual(collectPoints(s), [
			{x: 1, y: 7},
			{x: 1, y: 6},
			{x: 1, y: 5},
			{x: 1, y: 4}
		]);
		test.done();
	},

	'test containsPoint with segment on y-axis': function(test) {
		var a = new Point(1,1);
		var b = new Point(1,6);
		var c = new Point(1,3);
		var d = new Point(3,3);
		var s = new Segment(a,b);
		test.strictEqual(s.containsPoint(a), false);
		test.strictEqual(s.containsPoint(b), true);
		test.strictEqual(s.containsPoint(c), true);
		test.strictEqual(s.containsPoint(d), false);
		test.done();
	},

	'test containsPoint with segment on x-axis': function(test) {
		var a = new Point(1, 1);
		var b = new Point(6, 1);
		var c = new Point(3, 1);
		var d = new Point(3, 3);
		var s = new Segment(a,b);
		test.strictEqual(s.containsPoint(a), false);
		test.strictEqual(s.containsPoint(b), true);
		test.strictEqual(s.containsPoint(c), true);
		test.strictEqual(s.containsPoint(d), false);
		test.done();
	}
}