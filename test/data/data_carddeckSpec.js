var should   = require('should');
var Card     = require('../../server/data/data_card.js');
var CardDeck = require('../../server/data/data_carddeck.js');


describe('DATA.CardDeck', function () {
	var cardDeck = new CardDeck();

	describe('#addCard()', function() {
		it('should add a card to the deck', function() {
			var card1 = new Card({suit: 'blue', value: 1});
			var card2 = new Card({suit: 'red', value: 2});

			cardDeck.addCard(card1);
			cardDeck.addCard(card2);

			cardDeck.m_availableCards.length.should.equal(2);
		});
	});


	describe('#getCard()', function() {
		it('should return the last added card if not shuffled', function() {
			var card = cardDeck.getCard();

			card.suit.should.equal('red');
			card.value.should.equal(2);
		});

		it('should copy the requested card to the distributed cards array', function() {
			var card = cardDeck.m_distributedCards[0];

			card.suit.should.equal('red');
			card.value.should.equal(2);
		});
	});


	describe('#reset()', function() {
		it('should move all distributed cards to the available cards array', function() {
			cardDeck.reset();

			cardDeck.m_availableCards.length.should.equal(2);
			cardDeck.m_distributedCards.length.should.equal(0);
		});
	});


	describe('#shuffle()', function() {
		it('should not break anything', function() {
			var card1 = new Card({suit: 'blue', value: 1});
			var card2 = new Card({suit: 'red', value: 2});

			cardDeck.addCard(card1);
			cardDeck.addCard(card2);

			cardDeck.shuffle();

			cardDeck.m_availableCards.length.should.equal(4);
			cardDeck.m_distributedCards.length.should.equal(0);
		});
	});


	describe('#clear()', function() {
		it('should make the card deck empty', function() {
			cardDeck.clear();

			cardDeck.m_availableCards.length.should.equal(0);
			cardDeck.m_distributedCards.length.should.equal(0);
		});
	});
});