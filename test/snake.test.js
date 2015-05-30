var Point = require('../src/point.js');
var Segment = require('../src/segment.js');
var Snake = require('../src/snake.js');

function createDrawMock() {
	var drawOps = [];

	function drawFunction(fill, point) {
		drawOps.push([fill, {x: point.x, y: point.y}]);
	}

	drawFunction.drawOps = drawOps;

	return drawFunction;
}

module.exports = {
	'test turnLeft with snake looking upwards': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(0,4), new Point(0,0), mock);
		test.strictEqual(snake.length(), 4);
		snake.turnLeft();
		test.strictEqual(snake.length(), 4);
		test.deepEqual(mock.drawOps, [
			[false, {x: 0,  y: 1}],
			[true,  {x: -1, y: 4}]
		]);
		test.done();
	},

	'test turnLeft with snake looking left': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(-4,0), new Point(0,0), mock);
		test.strictEqual(snake.length(), 4);
		snake.turnLeft();
		test.strictEqual(snake.length(), 4);
		test.deepEqual(mock.drawOps, [
			[false, {x: -1, y: 0}],
			[true,  {x: -4, y: -1}]
		]);
		test.done();
	},

	'test turnRight looking downwards': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(0,-4), new Point(0,0), mock);
		test.strictEqual(snake.length(), 4);
		snake.turnRight();
		test.strictEqual(snake.length(), 4);
		test.deepEqual(mock.drawOps, [
			[false, {x: 0, y: -1}],
			[true,  {x: -1, y: -4}]
		]);
		test.done();
	},

	'test turnRight looking right': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(4,0), new Point(0,0), mock);
		test.strictEqual(snake.length(), 4);
		snake.turnRight();
		test.strictEqual(snake.length(), 4);
		test.deepEqual(mock.drawOps, [
			[false, {x: 1, y: 0}],
			[true,  {x: 4, y: -1}]
		]);
		test.done();
	},

	'test moveForward': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(0,4), new Point(0,0), mock);
		test.strictEqual(snake.length(), 4);
		snake.moveForward();
		test.strictEqual(snake.length(), 4);
		test.deepEqual(mock.drawOps, [
			[false, {x: 0, y: 1}],
			[true,  {x: 0, y: 5}]
		]);
		test.done();
	},

	'test drawInitial and length after complex movement': function(test) {
		var mock = createDrawMock();
		var snake = new Snake(new Point(0,4), new Point(0,0), mock);
		//let the snake grow by 3 cells over the coming moves
		snake.grow(3);
		/*
		make turn like this
			h
		   xx
		   x
		   xx
			t
		*/
		snake.turnLeft();
		snake.turnRight();
		snake.moveForward();
		snake.turnRight();
		snake.turnLeft();
		//clear drawOps, we only want the onwe for the drawInitial below
		mock.drawOps.splice(0, mock.drawOps.length);
		
		snake.drawInitial();
		
		var points = mock.drawOps.map(function(op) {
			var fill = op[0];
			var point = op[1];
			test.strictEqual(fill, true);
			return {x: point.x, y: point.y};
		});

		test.strictEqual(snake.length(), 7);
		test.deepEqual(points, [
			{x:  0, y: 3},
			{x:  0, y: 4},
			{x: -1, y: 4},
			{x: -1, y: 5},
			{x: -1, y: 6},
			{x:  0, y: 6},
			{x:  0, y: 7}
		]);

		test.done();
	},

	
}