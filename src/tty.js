var events = require('events');
var tty = require('tty');

function TTYDevice(inputStream, outputStream) {
	events.EventEmitter.call(this);
	this.inputStream = inputStream;
	this.outputStream = outputStream;
}

TTYDevice.prototype = Object.create(events.EventEmitter.prototype);

TTYDevice.prototype.writeAtPosition = function(position, string) {
	this.outputStream.write('\033[' + position.y + ';' + position.x + 'H' + string);
};

TTYDevice.prototype.clearScreen = function() {
	this.outputStream.write('\033[2J');
};

TTYDevice.prototype.width = function() {
	return this.outputStream.columns;
};

TTYDevice.prototype.height = function() {
	return this.outputStream.rows;
};

TTYDevice.prototype.isInteractive = function() {
	return tty.isatty(this.inputStream);
};

TTYDevice.prototype.initializeKeyboard = function() {
	this.inputStream.resume();
	this.inputStream.setEncoding('utf-8');
	this.inputStream.setRawMode(true);
	var self = this;
	this.inputStream.on('data', function(chr) {
		if(chr === '\u001b[A') {
			self.emit('upPressed');
		}
		else if(chr === '\u001b[B') {
			self.emit('downPressed');
		}
		else if(chr === '\u001b[D') {
			self.emit('leftPressed');
		}
		else if(chr === '\u001b[C') {
			self.emit('rightPressed');
		}
		else if(chr === '\u0003') {
			self.emit('exitPressed');
		}
	});
};

module.exports = TTYDevice;