var Point = require('../src/point.js');
var Segment = require('../src/segment.js');

module.exports = {
	'test shrink': function(test) {
		var s = new Segment(new Point(1,4), new Point(1,0));
		test.strictEqual(s.length(), 5);
		s.shrink(2);
		test.strictEqual(s.length(), 3);
		test.done();
	}	
}