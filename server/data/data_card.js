////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Card;


////////////////////////////////////////////////////////////////////////////////
/// \fn Card(params)
///
/// \brief The data representation of a card
///
/// \param params Should be e.g.: {suit: 'blue', value: 1}
////////////////////////////////////////////////////////////////////////////////
function Card (_params){
	// -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
	if (typeof(_params.suit) === 'undefined') { throw new Error('suit parameter in DATA::Card constructor is undefined.'); }
    if (typeof(_params.value) === 'undefined') { throw new Error('value parameter in DATA::Card constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
	this.suit  = _params.suit;
	this.value = _params.value;

	// -----------------------------------------------------------------------------
    // This is a reference to the player who played this card.
    // -----------------------------------------------------------------------------
	this.m_playerId = 0;


	////////////////////////////////////////////////////////////////////////////////
    /// \fn setPlayerId(_playerId)
    ///
    /// \brief Sets the id of the player who played the card
    ///
    /// \param _playerId the id of the player who played the card
    ////////////////////////////////////////////////////////////////////////////////
	this.setPlayerId = function (_playerId) {
		this.m_playerId = _playerId;
	};


	////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayedId()
    ///
    /// \brief Getter for the player id who played the card
    ///
    /// \return The id of the player who played this card
    ////////////////////////////////////////////////////////////////////////////////
	this.getPlayedId = function () {
		return this.m_playerId;
	};
}