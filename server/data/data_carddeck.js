////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var CORE  = CORE || {};
CORE.util = require('../core/core_util.js');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = CardDeck;


function CardDeck () {
	// -----------------------------------------------------------------------------
    // availableCards[] => Those cards which are in the card deck and are available
    // for distribution to players. Typically represents a complete set of cards 
    // (Wizards complete set consists of 60 cards).
    // -----------------------------------------------------------------------------
    this.m_availableCards = [];

    // -----------------------------------------------------------------------------
    // distributedCards[] => An array of cards which are currently in the game. They 
    // are distributed to players and the gametable, thus not available in the deck.
    // -----------------------------------------------------------------------------
    this.m_distributedCards = [];



    ////////////////////////////////////////////////////////////////////////////////
    /// \fn addCard(_card)
    ///
    /// \brief Adds a card to the available card stack
    ///
    /// \param _card The card to add
    ////////////////////////////////////////////////////////////////////////////////
    this.addCard = function(_card) {
    	this.m_availableCards.push(_card);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getCard()
    ///
    /// \brief Getter for the topmost card on the available card stack
    ///
    /// This function "marks" the returned card as distributed by adding it to the
    /// distributed card array. Typically the card deck needs to be shuffled before
    /// calling this function, e.g. for dealing.
    ///
    /// \return the topmost card form the available card stack
    ////////////////////////////////////////////////////////////////////////////////
    this.getCard = function () {
    	var card = null;

    	if (this.m_availableCards.length >= 0)
    	{
    		card = this.m_availableCards.pop();
    		this.m_distributedCards.push(card);
    	}

    	return card;
    };

	////////////////////////////////////////////////////////////////////////////////
    /// \fn shuffle()
    ///
    /// \brief Shuffles the all available cards
    ///
    /// If you want to get random cards through the getCard() method you need to
    /// call this function first in order to shuffle the available cards
    ////////////////////////////////////////////////////////////////////////////////
    this.shuffle = function () {
    	CORE.util.shuffleArray(this.m_availableCards);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn reset()
    ///
    /// \brief Reverts the card deck to it's initial structure.
    ///
    /// Reverting means hereby to move all distributed cards back to the available 
    /// cards array, as if you collect all cards in a real game and put it togehter
    /// on one stack.
    ////////////////////////////////////////////////////////////////////////////////
    this.reset = function () {
    	for (var indexOfCard = this.m_distributedCards.length - 1; indexOfCard >= 0; indexOfCard--) 
        {
    		var card = this.m_distributedCards.pop();
    		this.m_availableCards.push(card);
    	}
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn clear()
    ///
    /// \brief Clears the whole card deck.
    ///
    /// This function clears the whole deck by removing / deleting all available
    /// and distributed cards
    ////////////////////////////////////////////////////////////////////////////////
    this.clear = function () {
    	this.m_availableCards   = [];
    	this.m_distributedCards = [];
    };
}