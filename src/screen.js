function Screen(tty) {
	this.tty = tty;	
}

Screen.prototype = {
	fillWallCell: function(point) {
		this.tty.writeAtPosition(point, '#');
	},
	fillAppleCell: function(point) {
		this.tty.writeAtPosition(point, '@');
	},
	fillSnakeCell: function(point) {
		this.tty.writeAtPosition(point, '*');
	},
	clearCell: function(point) {
		this.tty.writeAtPosition(point, ' ');
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