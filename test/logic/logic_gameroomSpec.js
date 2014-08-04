var should = require('should');

var GameRoom = require('../../server/logic/logic_gameroom.js');
var Player   = require('../../server/logic/logic_player.js');

describe('Gameroom', function () {
	var gameRoom = new GameRoom();

	var player1 = new Player('Heinz');
	var player2 = new Player('Hans');
	var player3 = new Player('Peter');
	var player4 = new Player('Harald');

	it('should allow players to join', function() {
		gameRoom.playerJoin(player1);
		gameRoom.playerJoin(player2);
		gameRoom.playerJoin(player3);
		gameRoom.playerJoin(player4);

		gameRoom.getNumberOfPlayers().should.equal(4);
	});
});