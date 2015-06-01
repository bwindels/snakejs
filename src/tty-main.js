var TTYDevice = require('./tty');
var Screen = require('./screen');
var SnakeGame = require('./snakegame');

var tty = new TTYDevice(process.stdin, process.stdout);

if(!tty.isInteractive()) {
	console.log('stdin is not a tty, need an interactive tty to run this game');
	process.exit();
}

tty.initializeKeyboard();
tty.clearScreen();

var screen = new Screen(tty);
var game = new SnakeGame(screen);

tty.on('exitPressed', function() {
	process.stdout.write('\n');
	process.exit();
});
tty.on('leftPressed', function() {
	game.turnLeft();
});

tty.on('rightPressed', function() {
	game.turnRight();
});

game.start();