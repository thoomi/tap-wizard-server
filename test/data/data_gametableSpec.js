var should    = require('should');
var GameTable = require('../../server/data/data_gametable.js');
var Player    = require('../../server/data/data_player.js');


describe('DATA.GameTable', function () {
	var gameTable = new GameTable(1);

	describe('#addPlayer()', function () {
		it('should add a player to the gametable', function() {
			var player1 = new Player({id: 12, name: 'Thomas'});
			var player2 = new Player({id: 34, name: 'Manuel'});

			gameTable.addPlayer(player1);
			gameTable.m_players.length.should.equal(1);

			gameTable.addPlayer(player2);
			gameTable.m_players.length.should.equal(2);
		});
	});

	
	describe('#getIndexOfPlayerById()', function () {
		it('should return the correct index of the player specified by id', function() {
			var player3 = new Player({id: 56, name: 'Michael'});
			var player4 = new Player({id: 78, name: 'Harald'});

			gameTable.addPlayer(player3);
			gameTable.addPlayer(player4);
			
			gameTable.getIndexOfPlayerById(56).should.equal(2);
			gameTable.getIndexOfPlayerById(12).should.equal(0);
		});

		it('should return -1 if no player is found for the specified id', function() {
			gameTable.getIndexOfPlayerById(99).should.equal(-1);
		});
	});


	describe('#removePlayerById()', function () {
		it('should remove the player specified by id', function() {
			gameTable.removePlayerById(12);

			gameTable.getIndexOfPlayerById(12).should.equal(-1);
		});
	});


	describe('#getPlayerById()', function () {
		it('should return the correct player specified by id', function() {
			var player1 = gameTable.getPlayerById(34);
			player1.m_id.should.equal(34);
			player1.m_name.should.equal('Manuel');

			var player1 = gameTable.getPlayerById(56);
			player1.m_id.should.equal(56);
			player1.m_name.should.equal('Michael');
		});

		it('should return null if no player is found', function() {
			(gameTable.getPlayerById(99) === null).should.be.true;
		});
	});
});