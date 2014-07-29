var should    = require('should');
var GameRoom  = require('../../server/data/data_gameroom.js');
var Player    = require('../../server/data/data_player.js');


describe('DATA.GameTable', function () {
	var gameRoom = new GameRoom(1);

	describe('#addPlayer()', function () {
		it('should add a player to the gametable', function() {
			var player1 = new Player({id: 12, name: 'Thomas'});
			var player2 = new Player({id: 34, name: 'Manuel'});

			gameRoom.addPlayer(player1);
			gameRoom.m_players.length.should.equal(1);

			gameRoom.addPlayer(player2);
			gameRoom.m_players.length.should.equal(2);
		});
	});

	
	describe('#getIndexOfPlayerById()', function () {
		it('should return the correct index of the player specified by id', function() {
			var player3 = new Player({id: 56, name: 'Michael'});
			var player4 = new Player({id: 78, name: 'Harald'});

			gameRoom.addPlayer(player3);
			gameRoom.addPlayer(player4);
			
			gameRoom.getIndexOfPlayerById(56).should.equal(2);
			gameRoom.getIndexOfPlayerById(12).should.equal(0);
		});

		it('should return -1 if no player is found for the specified id', function() {
			gameRoom.getIndexOfPlayerById(99).should.equal(-1);
		});
	});


	describe('#removePlayerById()', function () {
		it('should remove the player specified by id', function() {
			gameRoom.removePlayerById(12);

			gameRoom.getIndexOfPlayerById(12).should.equal(-1);
		});
	});


	describe('#getPlayerById()', function () {
		it('should return the correct player specified by id', function() {
			var player1 = gameRoom.getPlayerById(34);
			player1.m_id.should.equal(34);
			player1.m_name.should.equal('Manuel');

			var player1 = gameRoom.getPlayerById(56);
			player1.m_id.should.equal(56);
			player1.m_name.should.equal('Michael');
		});

		it('should return null if no player is found', function() {
			(gameRoom.getPlayerById(99) === null).should.be.true;
		});
	});
});