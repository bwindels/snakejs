function SnakeGame(screen) {
	this.screen = screen;
	var fieldSize = this.screen.fieldSize();
	this.field = new Field(fieldSize.width, fieldSize.height);
	this.nextMove = 0;	//0 is forward, -1 is left, 1 is right
	this.score = 0;
}

SnakeGame.prototype = {
	start: function() {
		var snakeSegment = this.field.initialSnakeSegment();
		this.snake = new Snake(
			snakeSegment.head,
			snakeSegment.tail,
			this.screen.clearCell.bind(this.screen),
			this.screen.fillSnakeCell.bind(this.screen)
		);
		this.apple = this._newApple();
		this._drawInitial();
		this._nextTick();
	},
	turnLeft: function() {
		this.nextMove = -1;
	},
	turnRight: function() {
		this.nextMove = 1;
	},
	_drawInitial: function() {
		this.field.draw(this.screen.fillWallCell.bind(this.screen));
		this.snake.drawInitial();
		this.screen.fillAppleCell(this.apple);
	},
	_nextTick: function() {
		if(this.nextMove === -1) {
			this.snake.turnLeft();
		}
		else if(this.nextMove === 0) {
			this.snake.moveForward();
		}
		else if(this.nextMove === 1) {
			this.snake.turnRight();
		}
		this._checkPosition();
		setTimeout(this._nextTick.bind(this), 1000);
	},
	_newApple: function() {
		var apple;
		//find new random point that is not on the field walls
		//and not on the snake
		do {
			apple = this.field.randomPoint();
		} while (this.snake.containsPoint(apple));
		return apple;
	},
	_checkPosition: function() {
		if(this.snake.headCollidesWithBody()) {
			return this._gameOver();
		}
		if(this.field.pointIsWall(this.snake.head())) {
			return this._gameOver();
		}
		if(this.snake.containsPoint(this.apple)) {
			this._takeApple();
		}
	},
	_takeApple: function() {
		this.snake.grow(5);
		this.apple = this._newApple();
		this.screen.fillAppleCell(this.apple);
		this.score += 5;
		this.screen.drawScore(this.score);
	},
	_gameOver: function() {
		screen.drawGameOver(this.score);
	}
};