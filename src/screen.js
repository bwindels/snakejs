var Point = require('./point.js');

function Screen(tty) {
	this.tty = tty;	
}

Screen.prototype = {
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
	clearCell: function(point) {
		this.tty.writeAtPosition(this._mapPoint(point), ' ');
	},
	drawScore: function(score) {
		this.tty.writeAtPosition({x: 1, y: 0}, 'Score: ' + score);
	},
	drawGameOver: function(score) {
		this.tty.clearScreen();
		this.tty.writeAtPosition({x: 0, y: 0}, 'Game over with score ' + score);
	},
	fieldSize: function() {
		return {
			width: this.tty.width(),
			height: this.tty.height()
		};
	}
}

module.exports = Screen;