var Point = require('./point.js');

function Screen(tty) {
	this.tty = tty;	
}

Screen.prototype = {
	clear: function() {
		this.tty.clearScreen();
	},
	_mapPoint: function(p) {
		//ansi cursor origin is 1,1 (upper left corner)
		//snake coordinates system origin is 0,0 (upper left corner)
		return p.translate(new Point(1, 1));
	},
	fillWallCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), '#');
	},
	fillAppleCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), '@');
	},
	fillSnakeCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), '*');
	},
	fillDeadSnakeCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), 'x');
	},
	clearCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), ' ');
	},
	drawScore: function(score) {
		this.tty.writeAtPosition({x: 3, y: 1}, ' Score: ' + score + ' ');
	},
	drawStatus: function(text) {
		this.tty.writeAtPosition({x: 5, y: this.tty.height()}, text);
	},
	drawGameOver: function(score) {
		this.tty.writeAtPosition({x: 6, y: 3}, 'Game over with score ' + score + ', hit n for a new game');
	},
	fieldSize: function() {
		return {
			width: this.tty.width(),
			height: this.tty.height()
		};
	}
}

module.exports = Screen;