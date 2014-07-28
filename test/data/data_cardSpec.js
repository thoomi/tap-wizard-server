var should = require('should');
var Card   = require('../../server/data/data_card.js');


describe('DATA.Card', function () {
	var gameCard = new Card({suit: 'blue', value: 1});

	it('should have a property "suit" with value "blue"', function() {
		gameCard.should.have.property('suit', 'blue');
	});

	it('should have a property "value" with value "1"', function() {
		gameCard.should.have.property('value', 1);
	});
});