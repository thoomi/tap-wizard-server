var should = require('should');
var Player = require('../../server/data/data_player.js');


describe('DATA.Player', function () {
	var player = new Player({id: 567, name: 'Thomas'});

	it('should have the same name as specified during construction', function() {
		player.m_name.should.equal('Thomas');
	});

	describe('#getId()', function() {
		it('should return the same id as specified during construction', function() {
			player.getId().should.equal(567);
		});
	});
});