var should       = require('should');
var SocketClient = require('socket.io-client');

var socketURL = 'http://0.0.0.0:3000';


describe('NETWORK.Server', function () {
	it('should log the connection event', function(done) {
		var client = SocketClient(socketURL);

		client.on('connect', function() {
			done();
		});
	});

});