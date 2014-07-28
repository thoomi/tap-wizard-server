var should       = require('should');
var SocketClient = require('socket.io-client');




describe('NETWORK.Server', function () {
	var gameCard = new Card({suit: 'blue', value: 1});

	it('should have a property "suit" with value "blue"', function() {
		gameCard.should.have.property('suit', 'blue');
	});

	it('should have a property "value" with value "1"', function() {
		gameCard.should.have.property('value', 1);
	});
});